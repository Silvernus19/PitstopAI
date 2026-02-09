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
        <div className="flex flex-col h-full w-full bg-pit-black">
            {/* Scrollable Messages Area */}
            <div className={cn(
                "flex-1 overflow-y-auto custom-scrollbar pt-10 pb-4 md:pt-16",
                "transition-all duration-300"
            )}>
                {!hasMessages && !isLoading ? (
                    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
                        <div className="w-full max-w-3xl mb-8">
                            <WelcomeScreen onPromptClick={(p) => setInput(p)} username={username} />
                        </div>

                        {!chatId && (
                            <div className="w-full max-w-3xl">
                                <QuickCarDetailsForm />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col max-w-4xl mx-auto px-6 md:px-8">
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
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 text-sm text-center my-8">
                                AI is a bit busy bro, maze hebu try again in a few.
                            </div>
                        )}
                        <div ref={messagesEndRef} className="h-4" />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="w-full border-zinc-900/50">
                <ChatInput
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}
