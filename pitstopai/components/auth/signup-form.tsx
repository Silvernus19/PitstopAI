'use client'

import { useActionState } from 'react'
import { signup } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Link from 'next/link'
import { Loader2, Mail, CheckCircle2 } from 'lucide-react'

import { SignupState } from '@/app/auth/actions'

const initialState: SignupState = {
    error: '',
    success: false
}

export function SignupForm() {
    const [state, formAction, isPending] = useActionState(signup, initialState)

    if (state?.success) {
        return (
            <Card className="w-full max-w-md border-pit-blue/20 bg-pit-card/50 backdrop-blur">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pit-blue/10">
                        <Mail className="h-8 w-8 text-pit-blue" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">Check Your Email</CardTitle>
                    <CardDescription className="text-pit-subtext">
                        We've sent a confirmation link to your email address. Please click it to activate your account.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center">
                    <Button variant="outline" asChild className="w-full border-white/10 text-white hover:bg-white/5 hover:text-white">
                        <Link href="/">Return Home</Link>
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-md border-pit-blue/20 bg-pit-card/50 backdrop-blur shadow-2xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-white text-center">Create Account</CardTitle>
                <CardDescription className="text-center text-pit-subtext">
                    Join PitStopAI to get honest mechanic intel
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-white">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            placeholder="johndoe"
                            required
                            className="bg-pit-black border-white/10 text-white placeholder:text-pit-subtext focus-visible:ring-pit-blue"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            className="bg-pit-black border-white/10 text-white placeholder:text-pit-subtext focus-visible:ring-pit-blue"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-white">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            minLength={6}
                            className="bg-pit-black border-white/10 text-white placeholder:text-pit-subtext focus-visible:ring-pit-blue"
                        />
                    </div>

                    {state?.error && (
                        <Alert variant="destructive" className="bg-red-950/20 border-red-900 text-red-400">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{state.error}</AlertDescription>
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-pit-blue hover:bg-pit-blue-hover text-white font-semibold"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating Account...
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-white/5 pt-6">
                <p className="text-sm text-pit-subtext">
                    Already have an account?{' '}
                    <Link href="/login" className="text-pit-blue hover:underline">
                        Sign In
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
