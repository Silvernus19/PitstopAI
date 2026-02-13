"use client"

import Image from "next/image"
import { ReactNode } from "react"

interface AuthSplitLayoutProps {
    children: ReactNode
    title: string
    subtitle?: string
}

export function AuthSplitLayout({ children, title, subtitle }: AuthSplitLayoutProps) {
    return (
        <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-pit-black text-pit-text overflow-hidden">
            {/* Left Side: Form Container */}
            <div className="flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 z-10 w-full animate-in fade-in duration-700 slide-in-from-left-4">
                <div className="w-full max-w-md space-y-8">
                    <div className="flex mb-4">
                        <Image
                            src="/dashboard-logo.svg"
                            alt="PitStopAI Logo"
                            width={80}
                            height={80}
                            className="h-20 w-20"
                        />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-pit-subtext text-lg">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    {children}
                </div>
            </div>

            {/* Right Side: Image Container */}
            <div className="relative hidden md:block w-full h-full overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
                    alt="Modern premium car on open road"
                    fill
                    priority
                    className="object-cover object-center scale-105 transition-transform duration-[20s] hover:scale-100"
                />
                {/* Subtle depth overlay */}
                <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-pit-black/60 to-transparent" />

                {/* Logo/Brand overlay (optional but adds premium feel) */}
                <div className="absolute top-12 right-12">
                    <span className="text-2xl font-bold tracking-tighter text-white/80">PitStopAI</span>
                </div>
            </div>

            {/* Mobile Image (Visible only on small screens below form) */}
            <div className="relative md:hidden w-full h-[60vh]">
                <Image
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
                    alt="Modern premium car on open road"
                    fill
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>
        </main>
    )
}
