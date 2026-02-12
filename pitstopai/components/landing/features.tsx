import { Zap, Activity, Wrench, MapPin } from "lucide-react"

const features = [
    {
        name: "AI Diagnostics",
        description: "Describe your car's symptoms in plain English, and our AI will pinpoint potential issues with high accuracy.",
        icon: Zap,
    },
    {
        name: "Interpret Error Codes",
        description: "Got a Check Engine Light? Enter the P-code and get a detailed explanation of what's wrong and how urgent it is.",
        icon: Activity,
    },
    {
        name: "Maintenance Logs",
        description: "Keep track of all your repairs, oil changes, and service history in one secure, digital garage.",
        icon: Wrench,
    },
    {
        name: "Find Trusted Mechanics",
        description: "(Coming Soon) Locate verified mechanics in Nairobi who specialize in your specific car make and model.",
        icon: MapPin,
    },
]

export function Features() {
    return (
        <section className="py-24 bg-pit-black relative">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
                        Everything you need to <span className="text-pit-accent">maintain your ride.</span>
                    </h2>
                    <p className="text-pit-subtext text-lg max-w-[700px] mx-auto">
                        PitstopAI combines advanced artificial intelligence with local automotive knowledge to give you peace of mind.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div key={feature.name} className="relative group p-6 bg-pit-card border border-white/5 rounded-2xl hover:border-pit-accent/50 transition-colors duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-pit-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                            <div className="relative z-10">
                                <div className="h-12 w-12 rounded-lg bg-pit-accent/20 flex items-center justify-center mb-4 text-pit-accent group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.name}</h3>
                                <p className="text-pit-subtext text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
