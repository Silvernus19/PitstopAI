"use client"

import { useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { useRouter, useSearchParams } from "next/navigation"
import { createChat } from "@/app/dashboard/actions"
import { MessageBubble } from "./message-bubble"
import { ChatInput } from "./chat-input"
import { WelcomeScreen } from "./welcome-screen"
import { QuickCarDetailsForm } from "./quick-car-details-form"
import { cn } from "@/lib/utils"

interface ChatInterfaceProps {
    initialContext?: {
        vehicleName?: string
        mileage?: number
    }
    chatId?: string
    initialMessages?: any[]
    username?: string
}

export function ChatInterface({ chatId, initialMessages = [], username }: ChatInterfaceProps) {
    const router = useRouter()
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const searchParams = useSearchParams()
    const activeChatId = searchParams.get('chat')
    const { messages, input, handleSubmit, setInput, isLoading, error, append, reload } = useChat({
        api: '/api/chat',
        initialMessages,
        id: chatId,
        streamProtocol: 'text',
        body: {
            chatId,
        },
    })

    useEffect(() => {
        if (error) {
            console.error("useChat Error:", error)
        }
    }, [error])

    useEffect(() => {
        scrollToBottom()

        // Auto-trigger AI response if the "trigger" flag is present in URL
        // and we have a user message but no assistant response yet
        const trigger = searchParams.get('trigger') === 'true'
        if (trigger && messages.length === 1 && !isLoading && !error) {
            reload()
        }
    }, [messages, isLoading, searchParams, reload, error])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleSendMessage = async (messageContent: string) => {
        if (isLoading) return

        if (!chatId) {
            const title = messageContent.length > 30 ? messageContent.substring(0, 30) + "..." : messageContent
            const { data, error: createError } = await createChat(title)
            if (createError || !data) {
                console.error("Failed to create chat", createError)
                return
            }
            // Navigate - initialMessages will be empty on new chat until messages arrive
            router.push(`/dashboard?chat=${data.id}`)
            // Note: In a real app, we'd persist the first message OR pass it via searchParams/state
            // For now, let's assume the user will re-type or the redirect handles it.
            return
        }

        append({
            role: 'user',
            content: messageContent
        })
    }

    const hasMessages = messages.length > 0

    return (
        <div className="relative flex flex-col h-full w-full max-w-5xl mx-auto">
            {/* Scrollable Messages Area */}
            <div className={cn(
                "flex-1 overflow-y-auto px-6 py-10 md:px-12 md:py-16 transition-all duration-300",
                hasMessages ? "pb-32 md:pb-40" : ""
            )}>
                {!hasMessages && !isLoading ? (
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <div className="w-full max-w-2xl mb-8">
                            <WelcomeScreen onPromptClick={(p) => setInput(p)} username={username} />
                        </div>

                        {!chatId && (
                            <div className="w-full max-w-2xl">
                                <QuickCarDetailsForm />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {messages.map((m) => (
                            <MessageBubble key={m.id} message={m as any} />
                        ))}
                        {isLoading && (
                            <MessageBubble
                                message={{
                                    id: 'loading',
                                    role: 'assistant',
                                    content: '',
                                    isLoading: true
                                } as any}
                            />
                        )}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg text-red-500 text-sm text-center my-4">
                                AI is a bit busy bro, maze hebu try again in a few.
                            </div>
                        )}
                        <div ref={messagesEndRef} className="h-20" />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div
                className={cn(
                    "transition-all duration-500 ease-in-out z-10 w-full",
                    hasMessages
                        ? "absolute bottom-0 left-0 right-0 bg-pit-black/80 backdrop-blur-md border-t border-pit-gray/20 p-4"
                        : "relative px-4 pb-20 max-w-2xl mx-auto"
                )}
            >
                <ChatInput
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}
