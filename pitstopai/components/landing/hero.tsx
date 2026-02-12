import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search, Zap } from "lucide-react"

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="flex flex-col items-center text-center space-y-8">
                    <div className="inline-flex items-center rounded-full border border-pit-accent/20 bg-pit-accent/10 px-3 py-1 text-sm font-medium text-pit-accent mb-4 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-pit-accent mr-2 animate-pulse"></span>
                        New: AI-Powered Error Code Analysis
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-gradient-to-br from-white via-white to-gray-400 bg-clip-text text-transparent max-w-4xl mx-auto leading-tight">
                        Your Personal AI Mechanic <br className="hidden md:block" />
                        <span className="text-pit-accent">Always On Call.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-pit-subtext max-w-2xl mx-auto leading-relaxed">
                        Instantly diagnose car issues, interpret OBD-II codes, and get maintenance advice tailored to your specific vehicle model.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center">
                        <Link href="/auth/signup">
                            <Button size="lg" className="h-14 px-8 text-lg bg-pit-accent hover:bg-pit-blue-hover text-white rounded-full w-full sm:w-auto shadow-[0_0_30px_-5px_var(--pit-accent)] hover:shadow-[0_0_40px_-5px_var(--pit-accent)] transition-all duration-300">
                                Diagnsoe Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/auth/signin">
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/10 hover:bg-white/5 text-white rounded-full w-full sm:w-auto backdrop-blur-sm">
                                Existing User?
                            </Button>
                        </Link>
                    </div>

                    <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl w-full">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <Search className="h-8 w-8 text-blue-400 mb-4" />
                            <h3 className="font-semibold text-white text-lg mb-2">Instant Answers</h3>
                            <p className="text-pit-subtext text-sm">Ask any question about your car and get accurate, model-specific answers in seconds.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <Zap className="h-8 w-8 text-yellow-400 mb-4" />
                            <h3 className="font-semibold text-white text-lg mb-2">Error Code Decoder</h3>
                            <p className="text-pit-subtext text-sm">Input any OBD-II code (e.g., P0420) and understand exactly what's wrong and how to fix it.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-400 font-bold">K</div>
                            <h3 className="font-semibold text-white text-lg mb-2">Kenyan Market Context</h3>
                            <p className="text-pit-subtext text-sm">Get rough estimates on repair costs and parts availability in Nairobi.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-pit-accent/20 blur-[120px] rounded-full pointer-events-none -z-10 opacity-50" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none -z-10 opacity-30" />
        </section>
    )
}
