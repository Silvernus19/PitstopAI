import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search, Zap } from "lucide-react"

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex flex-col justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1494905998402-395d579af36f"
                    alt="Sleek car on open road"
                    fill
                    priority
                    className="object-cover"
                    quality={90}
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="flex flex-col items-center text-center space-y-8">
                    <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white mb-4 backdrop-blur-md">
                        <span className="flex h-2 w-2 rounded-full bg-pit-accent mr-2 animate-pulse"></span>
                        New: AI-Powered Error Code Analysis
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white max-w-4xl mx-auto leading-tight drop-shadow-lg">
                        Your Personal AI Mechanic <br className="hidden md:block" />
                        <span className="text-pit-accent">Always On Call.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                        Instantly diagnose car issues, interpret OBD-II codes, and get maintenance advice tailored to your specific vehicle model.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center">
                        <Link href="/auth/signup">
                            <Button size="lg" className="h-14 px-8 text-lg bg-pit-accent hover:bg-pit-blue-hover text-white rounded-full w-full sm:w-auto shadow-[0_0_30px_-5px_var(--pit-accent)] hover:shadow-[0_0_40px_-5px_var(--pit-accent)] transition-all duration-300 border-none">
                                Diagnose Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/auth/signin">
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/30 hover:bg-white/10 text-white rounded-full w-full sm:w-auto backdrop-blur-md bg-white/5">
                                Existing User?
                            </Button>
                        </Link>
                    </div>

                    <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl w-full mx-auto">
                        <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md hover:bg-black/50 transition-colors">
                            <Search className="h-8 w-8 text-blue-400 mb-4" />
                            <h3 className="font-semibold text-white text-lg mb-2">Instant Answers</h3>
                            <p className="text-gray-300 text-sm">Ask any question about your car and get accurate, model-specific answers in seconds.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md hover:bg-black/50 transition-colors">
                            <Zap className="h-8 w-8 text-yellow-400 mb-4" />
                            <h3 className="font-semibold text-white text-lg mb-2">Error Code Decoder</h3>
                            <p className="text-gray-300 text-sm">Input any OBD-II code (e.g., P0420) and understand exactly what's wrong and how to fix it.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md hover:bg-black/50 transition-colors">
                            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-400 font-bold border border-green-500/20">K</div>
                            <h3 className="font-semibold text-white text-lg mb-2">Kenyan Market Context</h3>
                            <p className="text-gray-300 text-sm">Get rough estimates on repair costs and parts availability in Nairobi.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
