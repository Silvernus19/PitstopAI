'use client'

import { useActionState } from 'react'
import { login } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

import { SignupState } from '@/app/auth/actions'

const initialState: SignupState = {
    error: '',
    success: false
}

export function LoginForm() {
    const [state, formAction, isPending] = useActionState(login, initialState)

    return (
        <Card className="w-full max-w-md border-pit-blue/20 bg-pit-card/50 backdrop-blur shadow-2xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-white text-center">Welcome Back</CardTitle>
                <CardDescription className="text-center text-pit-subtext">
                    Sign in to continue to your dashboard
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-4">
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
                        <div className="flex justify-between items-center">
                            <Label htmlFor="password" className="text-white">Password</Label>
                            {/* <Link href="/forgot-password" class="text-xs text-pit-blue hover:underline">
                                Forgot password?
                            </Link> */}
                        </div>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
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
                                Signing In...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-white/5 pt-6">
                <p className="text-sm text-pit-subtext">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-pit-blue hover:underline">
                        Sign Up
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
