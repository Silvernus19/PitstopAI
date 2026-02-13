"use client"

import { MessageSquare } from "lucide-react"
import Image from "next/image"

interface WelcomeScreenProps {
    onPromptClick: (prompt: string) => void
    username?: string
}

export function WelcomeScreen({ onPromptClick, username }: WelcomeScreenProps) {
    const prompts = [
        "Why is my Premio overheating?",
        "How much for genuine brake pads?",
        "Recommend a mechanic in Westlands",
        "What does check engine light mean?"
    ]

    const welcomeMessage = username?.trim()
        ? `Welcome back, ${username}!`
        : "Welcome back!"

    return (
        <div className="flex flex-col items-center justify-center p-4 text-center space-y-12 md:space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-4">
            <div className="flex flex-col items-center space-y-6">
                <div className="bg-pit-card p-6 md:p-8 rounded-full border border-pit-gray shadow-xl shadow-pit-accent/5">
                    <MessageSquare className="h-12 w-12 md:h-14 md:w-14 text-pit-accent" />
                </div>
                <div className="space-y-3">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">PitStopAI</h2>
                    <div className="flex justify-center pt-2">
                        <Image
                            src="/dashboard-logo.svg"
                            alt="PitStopAI Logo"
                            width={120}
                            height={120}
                            className="h-auto w-24 md:w-32"
                        />
                    </div>
                    <p className="text-2xl md:text-3xl text-gray-300 mt-4 text-center font-medium">
                        {welcomeMessage}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full max-w-2xl">
                {prompts.map((prompt, i) => (
                    <button
                        key={i}
                        onClick={() => onPromptClick(prompt)}
                        className="group flex flex-col items-start p-5 md:p-6 text-left bg-pit-card/50 hover:bg-pit-card border border-pit-gray/50 hover:border-pit-accent/50 rounded-xl transition-all duration-200"
                    >
                        <span className="text-sm font-medium text-pit-subtext group-hover:text-white transition-colors">
                            "{prompt}"
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}
