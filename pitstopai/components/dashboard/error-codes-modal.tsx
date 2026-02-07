"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, X, Loader2, Car } from "lucide-react"
import { getUserVehicles, createErrorCodeChat } from "@/app/dashboard/actions"
import { Vehicle } from "@/types/database"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ErrorCodesModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [selectedVehicleId, setSelectedVehicleId] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorCode, setErrorCode] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (isOpen) {
            getUserVehicles().then(setVehicles)
        }
    }, [isOpen])

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!errorCode) return

        setIsSubmitting(true)
        setError("")

        try {
            // Call onClose immediately so the user sees the dashboard again
            // while the server action processes the redirection.
            onClose()
            await createErrorCodeChat(errorCode, selectedVehicleId)
        } catch (err: any) {
            // In Next.js, redirect() throws an error that should not be caught as a real error
            if (err.digest?.includes('NEXT_REDIRECT')) {
                return;
            }
            console.error("Failed to start error code chat", err)
            setError(err.message || "Something went wrong. Please try again.")
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-pit-card border border-pit-gray rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="p-6 border-b border-pit-gray flex items-center justify-between bg-pit-black/50">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-pit-accent/10 rounded-full">
                            <AlertTriangle className="h-6 w-6 text-pit-accent" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Explain Error Code</h2>
                            <p className="text-sm text-pit-subtext">Get instant expert advice.</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-pit-subtext hover:text-white transition-colors p-2">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="code" className="text-white text-base font-semibold">Error Code</Label>
                            <Input
                                id="code"
                                value={errorCode}
                                onChange={(e) => setErrorCode(e.target.value)}
                                placeholder="e.g. P0420, P0171"
                                required
                                className="h-14 bg-pit-black border-pit-gray text-white text-lg focus:ring-pit-accent"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="vehicle" className="text-white text-base font-semibold">Vehicle (Optional)</Label>
                            <div className="relative group">
                                <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-pit-subtext group-hover:text-pit-accent transition-colors" />
                                <select
                                    id="vehicle"
                                    value={selectedVehicleId}
                                    onChange={(e) => setSelectedVehicleId(e.target.value)}
                                    className="w-full h-14 pl-10 pr-4 bg-pit-black border border-pit-gray rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pit-accent transition-all appearance-none"
                                >
                                    <option value="">Select your car for better advice</option>
                                    {vehicles.map((v) => (
                                        <option key={v.id} value={v.id}>
                                            {v.nickname || `${v.make} ${v.model} (${v.model_year})`}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <div className="w-2 h-2 border-b-2 border-r-2 border-white rotate-45" />
                                </div>
                            </div>
                        </div>

                        {error && <p className="text-sm text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-14 bg-pit-accent hover:bg-pit-blue-hover text-white text-lg font-bold transition-all shadow-lg hover:shadow-pit-accent/20"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Starting Chat...</span>
                                </div>
                            ) : (
                                "Get Explanation"
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
