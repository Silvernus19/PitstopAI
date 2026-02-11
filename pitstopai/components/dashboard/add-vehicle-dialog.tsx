"use client"

import { useState } from "react"
import { PlusCircle, Loader2, Car } from "lucide-react"
import { addVehicle } from "@/app/dashboard/actions"

// Since I don't recall seeing dialog in the file list, I'll create a simple raw modal if shadcn isn't fully there, but wait, 
// I should probably stick to standard HTML/Tailwind modal to be safe and dependency-free if shadcn is partial.
// Actually, let's build a custom modal to avoid "component not found" issues since I saw Button/Input but not Dialog.

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddVehicleDialog({ children, onSuccess }: { children: React.ReactNode, onSuccess?: () => void }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true)
        setError("")

        const result = await addVehicle(formData)

        setIsSubmitting(false)
        if (result?.error) {
            setError(result.error)
        } else {
            setIsOpen(false)
            if (onSuccess) onSuccess()
        }
    }

    if (!isOpen) {
        return <div onClick={() => setIsOpen(true)}>{children}</div>
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-pit-card border border-pit-gray rounded-xl shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-pit-accent/10 rounded-full">
                            <Car className="h-6 w-6 text-pit-accent" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Add New Vehicle</h2>
                            <p className="text-sm text-pit-subtext">Enter your car details for better AI diagnosis.</p>
                        </div>
                    </div>

                    <form action={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="make" className="text-white">Make</Label>
                                <Input id="make" name="make" placeholder="Toyota" required className="bg-pit-black border-pit-gray text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="model" className="text-white">Model</Label>
                                <Input id="model" name="model" placeholder="Camry" required className="bg-pit-black border-pit-gray text-white" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="model_year" className="text-white">Year</Label>
                                <Input id="model_year" name="model_year" type="number" min="1950" max={new Date().getFullYear() + 1} placeholder="2015" required className="bg-pit-black border-pit-gray text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mileage_km" className="text-white">Mileage (km)</Label>
                                <Input id="mileage_km" name="mileage_km" type="number" placeholder="120000" className="bg-pit-black border-pit-gray text-white" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nickname" className="text-white">Nickname (Optional)</Label>
                            <Input id="nickname" name="nickname" placeholder="e.g. The Tank" className="bg-pit-black border-pit-gray text-white" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="engine_type" className="text-white">Engine (Optional)</Label>
                            <Input id="engine_type" name="engine_type" placeholder="e.g. 2.0L Petrol" className="bg-pit-black border-pit-gray text-white" />
                        </div>

                        {error && <p className="text-sm text-red-500">{error}</p>}

                        <div className="flex gap-3 justify-end mt-6">
                            <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="text-pit-subtext hover:text-white hover:bg-white/5">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting} className="bg-pit-accent hover:bg-pit-blue-hover text-white">
                                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Vehicle"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
