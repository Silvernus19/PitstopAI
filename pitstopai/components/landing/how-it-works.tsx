export function HowItWorks() {
    return (
        <section className="py-24 bg-zinc-950 border-y border-white/5">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
                    <p className="text-pit-subtext">Three simple steps to car health.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-pit-accent/50 to-transparent border-t border-dashed border-white/20 z-0" />

                    <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                        <div className="h-24 w-24 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shadow-2xl relative">
                            <span className="text-3xl font-bold text-white">1</span>
                            <div className="absolute inset-0 border-2 border-pit-accent/30 rounded-full animate-pulse" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Log the Issue</h3>
                        <p className="text-pit-subtext text-sm max-w-xs">
                            Tell the AI what you hear, feel, or see. Or simply enter an OBD-II error code.
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                        <div className="h-24 w-24 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shadow-2xl relative">
                            <span className="text-3xl font-bold text-white">2</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">Get Analysis</h3>
                        <p className="text-pit-subtext text-sm max-w-xs">
                            Our AI analyzes thousands of possibilities to explain the problem in plain English.
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                        <div className="h-24 w-24 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shadow-2xl relative">
                            <span className="text-3xl font-bold text-white">3</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">Fix It</h3>
                        <p className="text-pit-subtext text-sm max-w-xs">
                            Get immediate advice on urgency, estimated costs, and parts needed.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
