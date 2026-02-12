import Image from "next/image"
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
        <section className="py-24 bg-pit-black relative overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
                                Built for <span className="text-pit-accent">Nairobi Roads.</span>
                            </h2>
                            <p className="text-pit-subtext text-lg leading-relaxed">
                                PitstopAI combines advanced artificial intelligence with local automotive knowledge to give you peace of mind, whether you're in traffic on Mombasa Road or cruising upcountry.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {features.map((feature) => (
                                <div key={feature.name} className="relative group p-5 bg-pit-card border border-white/5 rounded-2xl hover:border-pit-accent/50 transition-colors duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-br from-pit-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                                    <div className="relative z-10">
                                        <div className="h-10 w-10 rounded-lg bg-pit-accent/20 flex items-center justify-center mb-3 text-pit-accent group-hover:scale-110 transition-transform duration-300">
                                            <feature.icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-1">{feature.name}</h3>
                                        <p className="text-pit-subtext text-sm leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Premium Image */}
                    <div className="relative h-[600px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d"
                            alt="Advanced car dashboard interior"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                                <p className="text-white font-medium text-sm">"The most advanced diagnostic tool I've used."</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="h-6 w-6 rounded-full bg-green-500"></div>
                                    <span className="text-xs text-gray-300">Verified User • Nairobi</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
