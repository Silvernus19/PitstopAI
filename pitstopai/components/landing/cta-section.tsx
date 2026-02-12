import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
                    alt="Premium car on road"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/70" />
            </div>

            <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6 drop-shadow-lg">
                    Fixing your car shouldn't be a mystery.
                </h2>
                <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10 drop-shadow-md">
                    Join thousands of Kenyan car owners who are saving time and money with PitstopAI.
                </p>

                <Link href="/auth/signup">
                    <Button size="lg" className="h-16 px-12 text-xl bg-white text-pit-black hover:bg-gray-200 hover:text-black rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-xl">
                        Get Started for Free <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                </Link>
            </div>
        </section>
    )
}
