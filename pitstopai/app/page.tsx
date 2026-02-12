import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function RootPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        redirect("/dashboard")
    }

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <header className="px-6 h-16 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white">P</span>
                    </div>
                    PitstopAI
                </div>
                <nav className="flex gap-4">
                    <Link href="/auth/signin">
                        <Button variant="ghost" className="text-gray-300 hover:text-white">Sign In</Button>
                    </Link>
                    <Link href="/auth/signup">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
                    </Link>
                </nav>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="max-w-3xl space-y-8">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                        Your Personal AI Mechanic
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Diagnose car issues instantly, understand error codes, and get maintenance advice powered by advanced AI.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Link href="/auth/signup">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 text-lg">
                                Start Diagnosing Free
                            </Button>
                        </Link>
                        <Link href="/auth/signin">
                            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-12 px-8 text-lg">
                                Login to Account
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/10">
                <p>&copy; {new Date().getFullYear()} PitstopAI. All rights reserved.</p>
            </footer>
        </div>
    )
}
