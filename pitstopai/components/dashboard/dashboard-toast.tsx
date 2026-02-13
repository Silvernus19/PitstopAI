"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { toast } from "sonner"

export function DashboardToast() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const verified = searchParams.get("verified")

    useEffect(() => {
        if (verified) {
            toast.success("Confirmation successful!", {
                description: "Welcome to PitStopAI. Your email has been verified.",
                duration: 5000,
                style: {
                    background: '#1A1A1A', // pit-dark
                    color: '#E0E0E0', // pit-text
                    border: '1px solid #333', // pit-gray
                }
            })

            // Clean URL without refresh
            const url = new URL(window.location.href)
            url.searchParams.delete("verified")
            window.history.replaceState({}, "", url.toString())
        }
    }, [verified])

    return null
}
