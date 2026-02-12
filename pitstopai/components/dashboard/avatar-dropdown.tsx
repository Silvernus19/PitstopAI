"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Settings, LogOut } from "lucide-react"
import { createClient } from "@/utils/supabase/client"

export function AvatarDropdown({ userAvatarUrl, userInitials }: { userAvatarUrl?: string; userInitials?: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleLogout = async () => {
        setIsOpen(false)
        await supabase.auth.signOut()
        router.push("/")
        router.refresh()
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-10 w-10 overflow-hidden rounded-full border-2 border-transparent hover:border-pit-accent transition-colors cursor-pointer"
                aria-label="User menu"
            >
                {userAvatarUrl ? (
                    <img src={userAvatarUrl} alt="User avatar" className="h-full w-full object-cover" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-pit-card text-pit-text font-bold">
                        {userInitials || "U"}
                    </div>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg border border-pit-gray bg-pit-card shadow-lg ring-1 ring-black/5 focus:outline-none z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="p-1">
                        <Link
                            href="/profile"
                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-pit-text hover:bg-pit-dark transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <User className="h-4 w-4" />
                            Profile
                        </Link>
                        <Link
                            href="/settings"
                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-pit-text hover:bg-pit-dark transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <Settings className="h-4 w-4" />
                            Settings
                        </Link>
                        <div className="my-1 h-px bg-pit-gray" />
                        <button
                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-pit-red hover:bg-pit-dark transition-colors"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
