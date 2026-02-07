"use client"

import { ChevronsLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarToggleProps {
    isOpen: boolean
    isCollapsed: boolean
    onToggle: () => void
    className?: string
}

export function SidebarToggle({ isOpen, isCollapsed, onToggle, className }: SidebarToggleProps) {
    return (
        <button
            onClick={onToggle}
            className={cn(
                "z-[9999] flex items-center justify-center rounded-lg transition-all duration-200",
                "bg-pit-dark/50 hover:bg-pit-gray text-white",
                "h-8 w-8", // Small minimalist size like Grok
                "hover:scale-105 active:scale-95",
                className
            )}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
            {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
            ) : (
                <ChevronsLeft className="h-5 w-5" />
            )}
        </button>
    )
}
