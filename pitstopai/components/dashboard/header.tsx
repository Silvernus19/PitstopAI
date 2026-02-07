import { AvatarDropdown } from "./avatar-dropdown"
import { Menu, ChevronLeft, ChevronRight } from "lucide-react"

interface HeaderProps {
    chatTitle?: string
    username?: string
    avatarUrl?: string
    onMobileMenuToggle?: () => void
    sidebarCollapsed?: boolean
    onToggleSidebar?: () => void
}

export function Header({ chatTitle, username, avatarUrl, onMobileMenuToggle, sidebarCollapsed, onToggleSidebar }: HeaderProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center justify-between px-6 md:px-12 bg-[#0A0A0A] border-b border-pit-gray transition-all duration-300">
            <div className="flex items-center gap-3">
                {/* Mobile Hamburger */}
                <button
                    className="md:hidden p-2 text-pit-subtext hover:text-white"
                    onClick={onMobileMenuToggle}
                >
                    <Menu className="h-6 w-6" />
                </button>

                <h1 className="text-lg font-semibold text-white truncate max-w-[200px] md:max-w-md">
                    {chatTitle || "PitStopAI"}
                </h1>
            </div>

            <div className="flex items-center gap-4">
                {/* Future: Add more header actions here if needed */}
                <AvatarDropdown
                    userAvatarUrl={avatarUrl}
                    userInitials={username ? username[0].toUpperCase() : "P"}
                />
            </div>
        </header>
    )
}
