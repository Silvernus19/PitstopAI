import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export default function VerifiedPage() {
    return (
        <main className="min-h-screen bg-pit-black flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-green-500/20 bg-pit-card/50 backdrop-blur">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
                        <CheckCircle2 className="h-10 w-10 text-green-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">Email Verified!</CardTitle>
                    <CardDescription className="text-pit-subtext text-lg">
                        Your account has been successfully confirmed. You can now access your dashboard.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center pt-4">
                    <Button asChild className="w-full bg-pit-blue hover:bg-pit-blue-hover text-white font-semibold h-12 text-base">
                        <Link href="/dashboard">Continue to Dashboard</Link>
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}
