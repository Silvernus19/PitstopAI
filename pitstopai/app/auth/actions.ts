'use server'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export interface SignupState {
    error?: string
    success?: boolean
}

export async function signup(prevState: SignupState, formData: FormData): Promise<SignupState> {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const username = formData.get('username') as string

    if (!email || !password || !username) {
        return { error: 'Please fill in all fields', success: false }
    }

    // Basic password length validation
    if (password.length < 6) {
        return { error: 'Password must be at least 6 characters', success: false }
    }

    const supabase = await createClient()

    const getURL = async () => {
        let url = process.env.NEXT_PUBLIC_SITE_URL

        // If NEXT_PUBLIC_SITE_URL is not set, try to infer from other sources
        if (!url) {
            // Try headers first (most accurate for Vercel preview URLs etc if env var not set)
            try {
                const headersList = await headers()
                const host = headersList.get('x-forwarded-host') || headersList.get('host')
                const protocol = headersList.get('x-forwarded-proto') || 'https'
                if (host) {
                    url = `${protocol}://${host}`
                }
            } catch (e) {
                // Ignore
            }
        }

        if (!url) {
            url = process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL
        }

        if (!url && process.env.NODE_ENV === 'development') {
            url = 'http://localhost:3000/'
        }

        url = url ?? ''

        // Make sure to include `https://` when not localhost.
        url = url.includes('http') ? url : `https://${url}`
        // Make sure to include a trailing `/`.
        url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
        return url
    }

    const redirectUrl = await getURL()

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
            },
            emailRedirectTo: `${redirectUrl}auth/callback`,
        },
    })

    if (error) {
        return { error: error.message, success: false }
    }

    // Determine if it was a success (check email) or potential auto-sign-in if config is wrong (but we assume it's right)
    // We return a success state to the client to show the "Check your email" message
    return { success: true, error: '' }
}

export async function login(prevState: SignupState, formData: FormData): Promise<SignupState> {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Please enter both email and password', success: false }
    }

    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message, success: false }
    }

    redirect('/dashboard')
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
}
