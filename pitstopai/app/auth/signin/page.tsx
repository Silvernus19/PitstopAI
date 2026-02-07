"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { login, SignupState } from "@/app/auth/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AuthSplitLayout } from "@/components/auth/auth-split-layout"
import { PasswordInput } from "@/components/auth/password-input"

const initialState: SignupState = {
    error: "",
    success: false
}

export default function SigninPage() {
    const [state, formAction, isPending] = useActionState(login, initialState)

    return (
        <AuthSplitLayout
            title="Sign In"
            subtitle="Sign in to continue to your dashboard"
        >
            <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        required
                        className="bg-pit-card border-white/10 text-white placeholder:text-pit-subtext focus-visible:ring-pit-accent h-12"
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="password" className="text-white font-medium">Password</Label>
                        <Link href="#" className="text-sm text-pit-accent hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <PasswordInput
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        className="bg-pit-card border-white/10 text-white placeholder:text-pit-subtext focus-visible:ring-pit-accent h-12"
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
                    className="w-full bg-pit-accent hover:bg-pit-blue-hover text-white font-bold h-12 rounded-lg transition-all duration-200"
                    disabled={isPending}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Signing In...
                        </>
                    ) : (
                        "Sign In"
                    )}
                </Button>

                <p className="text-center text-pit-subtext pt-4">
                    Don't have an account?{" "}
                    <Link href="/auth/signup" className="text-pit-accent font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </form>
        </AuthSplitLayout>
    )
}
