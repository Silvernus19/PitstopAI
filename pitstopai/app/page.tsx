import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { CTASection } from "@/components/landing/cta-section"

export default async function RootPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        redirect("/dashboard")
    }

    return (
        <div className="flex flex-col min-h-screen bg-black text-white selection:bg-pit-accent selection:text-white">
            <header className="fixed top-0 left-0 right-0 z-50 px-6 h-16 flex items-center justify-between border-b border-white/5 bg-black/80 backdrop-blur-md">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <Image
                        src="/dashboard-logo.svg"
                        alt="PitStopAI Logo"
                        width={32}
                        height={32}
                        className="h-8 w-8"
                    />
                    PitstopAI
                </div>
                <nav className="flex gap-4">
                    <Link href="/auth/signin">
                        <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">Sign In</Button>
                    </Link>
                    <Link href="/auth/signup">
                        <Button className="bg-pit-accent hover:bg-pit-blue-hover text-white shadow-lg shadow-pit-accent/20">Get Started</Button>
                    </Link>
                </nav>
            </header>

            <main className="flex-1">
                <Hero />
                <Features />
                <HowItWorks />
                <CTASection />
            </main>

            <footer className="py-12 bg-black border-t border-white/10 text-center">
                <div className="flex items-center justify-center gap-2 font-bold text-xl mb-4">
                    <Image
                        src="/dashboard-logo.svg"
                        alt="PitStopAI Logo"
                        width={24}
                        height={24}
                        className="h-6 w-6"
                    />
                    PitstopAI
                </div>
                <p className="text-pit-subtext text-sm">&copy; {new Date().getFullYear()} PitstopAI. Built for Kenyan Roads.</p>
            </footer>
        </div>
    )
}
