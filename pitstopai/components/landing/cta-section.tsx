import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
    return (
        <section className="py-24 bg-pit-black relative overflow-hidden">
            <div className="absolute inset-0 bg-pit-accent/10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pit-accent/20 via-pit-black to-pit-black" />

            <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
                    Ready to understand your car?
                </h2>
                <p className="text-xl text-pit-subtext max-w-2xl mx-auto mb-10">
                    Join thousands of Kenyan car owners who are saving time and money with PitstopAI.
                </p>

                <Link href="/auth/signup">
                    <Button size="lg" className="h-14 px-10 text-lg bg-white text-pit-black hover:bg-gray-200 hover:text-black rounded-full font-bold transition-all duration-300 transform hover:scale-105">
                        Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
            </div>
        </section>
    )
}
