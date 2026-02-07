"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { SidebarToggle } from "./sidebar-toggle"
import { AccountModal } from "./account-modal"

export function DashboardLayoutClient({
    children,
    user
}: {
    children: React.ReactNode
    user: any
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false)

    return (
        <div className="flex h-screen bg-pit-black overflow-hidden relative">
            <Header
                username={user?.email || "User"}
                avatarUrl={user?.user_metadata?.avatar_url}
                onMobileMenuToggle={() => setSidebarOpen(true)}
                sidebarCollapsed={sidebarCollapsed}
                onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            <Sidebar
                isOpen={sidebarOpen}
                isCollapsed={sidebarCollapsed}
                onClose={() => setSidebarOpen(false)}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                onOpenAccount={() => setIsAccountModalOpen(true)}
            />

            <main className={`flex-1 pt-[60px] relative overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'md:pl-20' : 'md:pl-[280px]'}`}>
                {children}
            </main>

            <AccountModal
                isOpen={isAccountModalOpen}
                onClose={() => setIsAccountModalOpen(false)}
            />
        </div>
    )
}
