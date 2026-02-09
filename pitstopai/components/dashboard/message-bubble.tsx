import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

export interface Message {
    id: string
    role: "user" | "assistant" | "system" | "data" | "tool"
    content: string
    isLoading?: boolean
}

interface MessageBubbleProps extends ComponentProps<"div"> {
    message: Message
}

export function MessageBubble({ message, className, ...props }: MessageBubbleProps) {
    const isUser = message.role === "user"

    return (
        <div
            className={cn(
                "flex w-full mb-12 md:mb-16",
                isUser ? "justify-end" : "justify-start",
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    "max-w-[85%] md:max-w-[75%] px-8 py-6 md:px-10 md:py-7 rounded-[2rem] text-[17px] md:text-[19px] leading-relaxed md:leading-8 break-words",
                    isUser
                        ? "bg-pit-accent text-white"
                        : "bg-zinc-900/50 text-pit-text/95"
                )}
            >
                {message.isLoading ? (
                    <div className="flex items-center gap-3 text-pit-subtext select-none">
                        <span className="text-sm font-medium animate-pulse">AI is thinking...</span>
                        <svg
                            className="w-5 h-5 animate-spin-slow text-pit-accent"
                            style={{ transformOrigin: 'center' }}
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.3" />
                            <path d="M90 50 A40 40 0 1 1 50 10" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                            {/* Teeth */}
                            {Array.from({ length: 12 }).map((_, i) => (
                                <rect key={i} x="95" y="45" width="10" height="10" fill="currentColor" transform={`rotate(${i * 30} 50 50)`} />
                            ))}
                        </svg>
                    </div>
                ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                )}
            </div>
        </div>
    )
}
