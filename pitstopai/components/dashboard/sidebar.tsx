"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { PlusCircle, Settings, User, Car, MessageSquare, X, ChevronDown, ChevronRight, Plus, AlertTriangle } from "lucide-react"
import { cn, formatRelativeTime } from "@/lib/utils"
import { useEffect, useState } from "react"
import { getUserVehicles, createVehicleChat, getUserChats, ChatListItem } from "@/app/dashboard/actions"
import { Vehicle } from "@/types/database"
import { AddVehicleDialog } from "./add-vehicle-dialog"
import { SidebarToggle } from "./sidebar-toggle"
import { ErrorCodesModal } from "./error-codes-modal"

interface SidebarProps {
    isOpen: boolean
    isCollapsed: boolean
    onClose: () => void
    onToggle: () => void
    onOpenAccount: () => void
}

export function Sidebar({ isOpen, isCollapsed, onClose, onToggle, onOpenAccount }: SidebarProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const activeChatId = searchParams.get('chat')
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [isCarsOpen, setIsCarsOpen] = useState(false)
    const [isLoadingVehicles, setIsLoadingVehicles] = useState(true)
    const [chats, setChats] = useState<ChatListItem[]>([])
    const [isLoadingChats, setIsLoadingChats] = useState(true)
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)

    // Load vehicles on mount
    const loadVehicles = async () => {
        try {
            const data = await getUserVehicles()
            setVehicles(data)
        } catch (e) {
            console.error("Failed to load vehicles", e)
        } finally {
            setIsLoadingVehicles(false)
        }
    }

    const loadChats = async () => {
        try {
            setIsLoadingChats(true)
            const data = await getUserChats()
            setChats(data)
        } catch (e) {
            console.error("Failed to load chats", e)
        } finally {
            setIsLoadingChats(false)
        }
    }

    useEffect(() => {
        loadVehicles()
        loadChats()
    }, [isOpen]) // Reload when sidebar opens

    const handleVehicleClick = async (v: Vehicle) => {
        // Trigger server action to create/nav to chat
        const name = v.nickname || `${v.make} ${v.model}`
        await createVehicleChat(v.id, name)
        // On mobile, close sidebar
        if (window.innerWidth < 768) onClose()
    }

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed top-[60px] bottom-0 left-0 z-40 bg-pit-black border-r border-pit-gray flex flex-col transition-all duration-300 ease-in-out md:translate-x-0",
                    isCollapsed ? "w-20" : "w-[280px]",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-[60px] items-center justify-between px-4 md:hidden border-b border-pit-gray">
                    <span className="font-bold text-lg text-white">Menu</span>
                    <button onClick={onClose} className="text-pit-subtext hover:text-white">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className={cn("flex-1 overflow-y-auto flex flex-col gap-8", isCollapsed ? "p-3" : "p-6 md:p-8")}>
                    {/* Main Nav */}
                    <nav className="flex flex-col gap-3">
                        <Link
                            href="/dashboard"
                            onClick={() => window.innerWidth < 768 && onClose()}
                            className={cn(
                                "flex items-center text-pit-subtext hover:text-white hover:bg-pit-card rounded-md transition-colors w-full",
                                isCollapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-3"
                            )}
                            title={isCollapsed ? "New Chat" : undefined}
                        >
                            <Plus className="h-5 w-5" />
                            {!isCollapsed && <span className="text-base font-medium">New Chat</span>}
                        </Link>
                        <Link
                            href="/settings"
                            className={cn(
                                "flex items-center py-3 text-pit-subtext hover:text-white hover:bg-pit-card rounded-md transition-colors",
                                isCollapsed ? "justify-center px-2" : "gap-3 px-3"
                            )}
                            title={isCollapsed ? "Settings" : undefined}
                        >
                            <Settings className="h-5 w-5" />
                            {!isCollapsed && <span>Settings</span>}
                        </Link>
                        <button
                            onClick={onOpenAccount}
                            className={cn(
                                "flex items-center py-3 text-pit-subtext hover:text-white hover:bg-pit-card rounded-md transition-colors w-full",
                                isCollapsed ? "justify-center px-2" : "gap-3 px-3"
                            )}
                            title={isCollapsed ? "Account" : undefined}
                        >
                            <User className="h-5 w-5" />
                            {!isCollapsed && <span>Account</span>}
                        </button>

                        <button
                            onClick={() => setIsErrorModalOpen(true)}
                            className={cn(
                                "flex items-center py-3 text-pit-subtext hover:text-white hover:bg-pit-card rounded-md transition-colors w-full",
                                isCollapsed ? "justify-center px-2" : "gap-3 px-3"
                            )}
                            title={isCollapsed ? "Error Codes" : undefined}
                        >
                            <AlertTriangle className="h-5 w-5" />
                            {!isCollapsed && <span>Error Codes</span>}
                        </button>

                        {/* My Cars Dropdown */}
                        <div className="flex flex-col">
                            <button
                                onClick={() => !isCollapsed && setIsCarsOpen(!isCarsOpen)}
                                className={cn(
                                    "flex items-center py-3 text-pit-subtext hover:text-white hover:bg-pit-card rounded-md transition-colors w-full group",
                                    isCollapsed ? "justify-center px-2" : "justify-between px-3"
                                )}
                                title={isCollapsed ? "My Cars" : undefined}
                            >
                                <div className={cn("flex items-center", !isCollapsed && "gap-3")}>
                                    <Car className="h-5 w-5" />
                                    {!isCollapsed && <span>My Cars</span>}
                                </div>
                                {!isCollapsed && (isCarsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />)}
                            </button>

                            {isCarsOpen && !isCollapsed && (
                                <div className="pl-9 pr-2 py-1 flex flex-col gap-1 animate-in slide-in-from-top-2 duration-200">
                                    {isLoadingVehicles ? (
                                        <div className="h-8 flex items-center text-xs text-pit-subtext animate-pulse">Loading garage...</div>
                                    ) : vehicles.length > 0 ? (
                                        vehicles.map(v => (
                                            <button
                                                key={v.id}
                                                onClick={() => handleVehicleClick(v)}
                                                className="text-left text-base text-pit-subtext hover:text-white hover:bg-pit-card py-3 px-2 rounded-md truncate transition-colors"
                                            >
                                                {v.nickname || `${v.make} ${v.model}`}
                                            </button>
                                        ))
                                    ) : (
                                        <div className="text-xs text-pit-subtext italic py-1">No cars added yet</div>
                                    )}

                                    {/* Add Car Action */}
                                    <AddVehicleDialog onSuccess={loadVehicles}>
                                        <button className="flex items-center gap-2 text-xs text-pit-accent hover:text-pit-blue-hover py-2 px-2 mt-1 w-full font-medium transition-colors">
                                            <Plus className="h-3 w-3" />
                                            Add New Car
                                        </button>
                                    </AddVehicleDialog>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* History */}
                    <div className="flex flex-col gap-2 mt-8">
                        {!isCollapsed && (
                            <h3 className="text-xs font-semibold text-pit-subtext uppercase tracking-wider px-3">
                                Chat History
                            </h3>
                        )}
                        <div className="flex flex-col gap-1">
                            {isLoadingChats ? (
                                <div className="space-y-2 px-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-10 bg-pit-card animate-pulse rounded-md" />
                                    ))}
                                </div>
                            ) : chats.length > 0 ? (
                                chats.map((chat) => {
                                    const isActive = chat.id === activeChatId
                                    return (
                                        <Link
                                            key={chat.id}
                                            href={`/dashboard?chat=${chat.id}`}
                                            onClick={() => window.innerWidth < 768 && onClose()}
                                            className={cn(
                                                "flex flex-col py-3 px-3 transition-colors hover:bg-pit-card border-l-2",
                                                isActive ? "bg-pit-card border-pit-accent" : "border-transparent",
                                                isCollapsed && "items-center px-1"
                                            )}
                                        >
                                            <div className={cn("flex items-center gap-3 w-full", isCollapsed && "justify-center")}>
                                                <MessageSquare className={cn("h-4 w-4 shrink-0", isActive ? "text-pit-accent" : "text-pit-subtext")} />
                                                {!isCollapsed && (
                                                    <div className="flex flex-col flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <span className={cn("font-bold text-sm truncate", isActive ? "text-white" : "text-pit-text")}>
                                                                {chat.title}
                                                            </span>
                                                        </div>
                                                        {chat.last_message && (
                                                            <p className="text-xs text-pit-subtext truncate mt-0.5">
                                                                {chat.last_message}
                                                            </p>
                                                        )}
                                                        <span className="text-[10px] text-gray-600 mt-1">
                                                            {formatRelativeTime(chat.updated_at)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    )
                                })
                            ) : (
                                <p className="px-3 text-sm text-gray-600 italic">No chats yet – start a new one!</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-pit-gray bg-pit-black relative">
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-600 justify-center mb-4">
                        <Link href="/about" className="hover:text-gray-400">About</Link>
                        <Link href="/privacy" className="hover:text-gray-400">Privacy</Link>
                        <Link href="/contact" className="hover:text-gray-400">Contact</Link>
                    </div>
                    {!isCollapsed && <p className="text-[10px] text-center text-gray-700">© 2026 PitStopAI</p>}

                    {/* Grok-style Sidebar Toggle */}
                    <div className={cn(
                        "absolute transition-all duration-300",
                        isCollapsed ? "inset-x-0 bottom-4 flex justify-center" : "bottom-6 right-4"
                    )}>
                        <SidebarToggle
                            isOpen={isOpen}
                            isCollapsed={isCollapsed}
                            onToggle={onToggle}
                        />
                    </div>
                </div>
            </aside>

            <ErrorCodesModal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
            />
        </>
    )
}
