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
        <div className="w-full bg-pit-black px-4 py-4 md:py-6">
            <div className="max-w-4xl mx-auto relative flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 rounded-2xl px-4 py-2 shadow-2xl transition-all focus-within:border-zinc-700">
                <button
                    className="p-2 text-zinc-500 hover:text-white transition-colors flex-shrink-0"
                    title="Attach photo/code"
                >
                    <Paperclip className="h-5 w-5" />
                </button>

                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about your car..."
                    className="w-full max-h-[250px] bg-transparent text-white placeholder-zinc-500 resize-none py-2 focus:outline-none text-base min-h-[44px] leading-relaxed"
                    rows={1}
                />

                <button
                    onClick={handleSubmit}
                    disabled={!input.trim() || isLoading}
                    className="p-2 text-pit-accent hover:text-pit-accent-hover disabled:text-zinc-700 transition-colors flex-shrink-0"
                >
                    <Send className="h-5 w-5 fill-current" />
                </button>
            </div>
            <p className="text-center text-[10px] text-pit-subtext mt-3 opacity-50">
                PitStopAI can make mistakes. Verify important car maintenance info.
            </p>
        </div>
    )
}
