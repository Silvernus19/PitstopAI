"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface PasswordInputProps {
    id: string
    name: string
    placeholder?: string
    required?: boolean
    minLength?: number
    className?: string
}

export function PasswordInput({ id, name, placeholder = "••••••••", required = true, minLength, className }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="relative">
            <Input
                id={id}
                name={name}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                required={required}
                minLength={minLength}
                className={className}
            />
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-pit-subtext"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                ) : (
                    <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                </span>
            </Button>
        </div>
    )
}
