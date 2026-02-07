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
                "flex w-full mb-10 md:mb-12",
                isUser ? "justify-end" : "justify-start",
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    "max-w-[85%] md:max-w-[70%] px-6 py-5 md:px-8 md:py-6 rounded-2xl md:rounded-3xl text-base md:text-lg leading-relaxed md:leading-8 break-words shadow-sm",
                    isUser
                        ? "bg-pit-accent text-white rounded-br-none"
                        : "bg-pit-card text-pit-text/90 rounded-bl-none border border-pit-gray"
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
