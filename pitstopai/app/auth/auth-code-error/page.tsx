import Link from 'next/link'

export default function AuthCodeError() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-pit-black p-4 text-center text-pit-text">
            <div className="max-w-md space-y-6">
                <h1 className="text-3xl font-bold text-red-500">Authentication Error</h1>
                <p className="text-lg">
                    The authentication link you followed is invalid or has expired. This can happen if the link has already been used or if it was pre-fetched by your email provider.
                </p>
                <div className="space-y-4">
                    <p>
                        If your email was already confirmed, you can try signing in directly.
                    </p>
                    <div className="flex flex-col gap-3">
                        <Link
                            href="/auth/signin"
                            className="rounded-lg bg-pit-purple px-6 py-2 font-medium text-white transition-colors hover:bg-pit-purple/80"
                        >
                            Back to Sign In
                        </Link>
                        <Link
                            href="/"
                            className="text-sm text-pit-gray hover:text-white"
                        >
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
