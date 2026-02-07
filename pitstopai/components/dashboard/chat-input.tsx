"use client"

import { useState, useRef, useEffect } from "react"
import { Paperclip, Send } from "lucide-react"

interface ChatInputProps {
    onSendMessage: (message: string) => void
    isLoading?: boolean
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
    const [input, setInput] = useState("")
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value)
        adjustHeight()
    }

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
        }
    }

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!input.trim() || isLoading) return

        onSendMessage(input)
        setInput("")
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto px-4 pb-8 pt-4 md:pb-10 bg-gradient-to-t from-pit-black to-transparent">
            <div className="relative flex items-end gap-2 bg-pit-card border border-pit-gray rounded-xl p-3 md:p-4 shadow-lg ring-1 ring-white/5 focus-within:ring-pit-accent/50 focus-within:border-pit-accent transition-all">
                <button
                    className="p-4 text-pit-subtext hover:text-white hover:bg-pit-dark rounded-lg transition-colors flex-shrink-0"
                    title="Attach photo/code"
                >
                    <Paperclip className="h-5 w-5" />
                </button>

                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask PitStopAI about your car..."
                    className="w-full max-h-[200px] bg-transparent text-white placeholder-pit-subtext resize-none py-4 focus:outline-none text-base min-h-[56px]"
                    rows={1}
                />

                <button
                    onClick={handleSubmit}
                    disabled={!input.trim() || isLoading}
                    className="p-4 bg-pit-accent hover:bg-pit-blue-hover disabled:opacity-50 disabled:hover:bg-pit-accent text-white rounded-lg transition-colors flex-shrink-0 shadow-md"
                >
                    <Send className="h-4 w-4" />
                </button>
            </div>
            <p className="text-center text-[10px] text-pit-subtext mt-2">
                PitStopAI can make mistakes. Verify important car maintenance info.
            </p>
        </div>
    )
}
