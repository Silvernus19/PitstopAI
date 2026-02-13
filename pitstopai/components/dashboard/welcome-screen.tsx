import { MessageSquare, Loader2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface WelcomeScreenProps {
    onPromptClick: (prompt: string) => void
    username?: string
}

export function WelcomeScreen({ onPromptClick, username }: WelcomeScreenProps) {
    const [loadingPrompt, setLoadingPrompt] = useState<string | null>(null)

    const prompts = [
        "Why is my Premio overheating?",
        "How much for genuine brake pads?",
        "Recommend a mechanic in Westlands",
        "What does check engine light mean?"
    ]

    const handlePromptClick = (prompt: string) => {
        if (loadingPrompt) return
        setLoadingPrompt(prompt)
        onPromptClick(prompt)
    }

    const welcomeMessage = username?.trim()
        ? `Welcome back, ${username}!`
        : "Welcome back!"

    return (
        <div className="flex flex-col items-center justify-center p-4 text-center space-y-12 md:space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-4">
            <div className="flex flex-col items-center space-y-1">
                <div className="flex justify-center -mb-10">
                    <Image
                        src="/dashboard-logo.svg"
                        alt="PitStopAI Logo"
                        width={280}
                        height={280}
                        className="h-auto w-48 md:w-64"
                    />
                </div>
                <div className="space-y-0.5">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">PitStopAI</h2>
                    <p className="text-xl md:text-2xl text-gray-300 text-center font-medium">
                        {welcomeMessage}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full max-w-2xl">
                {prompts.map((prompt, i) => {
                    const isLoading = loadingPrompt === prompt
                    return (
                        <button
                            key={i}
                            onClick={() => handlePromptClick(prompt)}
                            disabled={!!loadingPrompt}
                            className={cn(
                                "group flex items-center justify-between p-5 md:p-6 text-left bg-pit-card/50 hover:bg-pit-card border border-pit-gray/50 hover:border-pit-accent/50 rounded-xl transition-all duration-200",
                                loadingPrompt && !isLoading && "opacity-50 cursor-not-allowed",
                                isLoading && "border-pit-accent bg-pit-card"
                            )}
                        >
                            <span className="text-sm font-medium text-pit-subtext group-hover:text-white transition-colors">
                                "{prompt}"
                            </span>
                            {isLoading && <Loader2 className="h-4 w-4 text-pit-accent animate-spin shrink-0 ml-3" />}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

// Simple cn utility if not globally available, though it usually is in these templates
function cn(...classes: (string | boolean | undefined | null)[]) {
    return classes.filter(Boolean).join(" ")
}
