"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Loader2, Mail } from "lucide-react"
import { signup, SignupState } from "@/app/auth/actions"
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

export default function SignupPage() {
    const [state, formAction, isPending] = useActionState(signup, initialState)

    if (state?.success) {
        return (
            <AuthSplitLayout
                title="Check Your Email"
                subtitle="We've sent a confirmation link to your email address."
            >
                <div className="flex flex-col items-center space-y-8 animate-in zoom-in duration-500">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-pit-accent/10">
                        <Mail className="h-10 w-10 text-pit-accent" />
                    </div>
                    <p className="text-center text-pit-subtext text-lg">
                        Please click the link in the email to activate your account and start using PitStopAI.
                    </p>
                    <Button asChild className="w-full bg-white text-black hover:bg-gray-200 font-bold h-12">
                        <Link href="/">Return to Home</Link>
                    </Button>
                </div>
            </AuthSplitLayout>
        )
    }

    return (
        <AuthSplitLayout
            title="Sign Up"
            subtitle="Join PitStopAI to get honest mechanic intel"
        >
            <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="username" className="text-white font-medium">Username</Label>
                    <Input
                        id="username"
                        name="username"
                        placeholder="johndoe"
                        required
                        className="bg-pit-card border-white/10 text-white placeholder:text-pit-subtext focus-visible:ring-pit-accent h-12"
                    />
                </div>

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
                    <Label htmlFor="password" className="text-white font-medium">Password</Label>
                    <PasswordInput
                        id="password"
                        name="password"
                        placeholder="Create a strong password"
                        required
                        minLength={6}
                        className="bg-pit-card border-white/10 text-white placeholder:text-pit-subtext focus-visible:ring-pit-accent h-12"
                    />
                    <p className="text-xs text-pit-subtext">Must be at least 6 characters</p>
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
                            Creating Account...
                        </>
                    ) : (
                        "Sign Up"
                    )}
                </Button>

                <p className="text-center text-pit-subtext pt-4">
                    Already have an account?{" "}
                    <Link href="/auth/signin" className="text-pit-accent font-semibold hover:underline">
                        Sign In
                    </Link>
                </p>
            </form>
        </AuthSplitLayout>
    )
}
