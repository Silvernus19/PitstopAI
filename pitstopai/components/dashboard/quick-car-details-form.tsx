"use client"

import { useState } from "react"
import { Loader2, Car, ChevronDown } from "lucide-react"
import { startChatWithDetails } from "@/app/dashboard/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export function QuickCarDetailsForm() {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true)
        await startChatWithDetails(formData)
        // Redirect is handled by server action
        // Form will collapse on unmount/navigation
    }

    return (
        <div className="w-full max-w-2xl mb-10 md:mb-16">
            {/* Accordion Header */}
            <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full bg-pit-dark/50 border border-pit-gray rounded-lg p-5 md:p-6 hover:bg-pit-dark transition-all duration-200 flex items-center justify-between group"
            >
                <div className="flex items-center gap-3">
                    <Car className="h-5 w-5 text-pit-accent" />
                    <span className="text-sm text-pit-text group-hover:text-white transition-colors">
                        Add car details for better advice <span className="text-pit-subtext">(optional)</span>
                    </span>
                </div>
                <ChevronDown
                    className={`h-5 w-5 text-pit-subtext transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Accordion Content */}
            <div
                className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="bg-pit-card/30 border border-pit-gray rounded-lg p-5 md:p-7">
                        <form action={handleSubmit} className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <Label htmlFor="make" className="text-xs text-pit-subtext">Make</Label>
                                    <Input id="make" name="make" placeholder="Toyota" required className="h-9 bg-pit-black border-pit-gray text-white text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="model" className="text-xs text-pit-subtext">Model</Label>
                                    <Input id="model" name="model" placeholder="Premio" required className="h-9 bg-pit-black border-pit-gray text-white text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="model_year" className="text-xs text-pit-subtext">Year</Label>
                                    <Input id="model_year" name="model_year" type="number" placeholder="2012" required className="h-9 bg-pit-black border-pit-gray text-white text-sm" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <Label htmlFor="engine_type" className="text-xs text-pit-subtext">Engine</Label>
                                    <Input id="engine_type" name="engine_type" placeholder="1.5L Petrol" className="h-9 bg-pit-black border-pit-gray text-white text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="mileage_km" className="text-xs text-pit-subtext">Mileage (km)</Label>
                                    <Input id="mileage_km" name="mileage_km" type="number" placeholder="120000" className="h-9 bg-pit-black border-pit-gray text-white text-sm" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="issues" className="text-xs text-pit-subtext">Brief Issues Facing</Label>
                                <Textarea
                                    id="issues"
                                    name="issues"
                                    placeholder="e.g. overheating when stuck in traffic, black smoke"
                                    className="min-h-[60px] bg-pit-black border-pit-gray text-white text-sm resize-none"
                                    maxLength={200}
                                />
                            </div>

                            <div className="flex items-center space-x-2 pt-1">
                                <Checkbox id="save_to_my_cars" name="save_to_my_cars" className="border-pit-gray data-[state=checked]:bg-pit-accent data-[state=checked]:text-white" />
                                <Label htmlFor="save_to_my_cars" className="text-xs text-pit-subtext cursor-pointer">Save this car to 'My Cars'</Label>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setIsExpanded(false)}
                                    className="flex-1 text-pit-subtext hover:text-white hover:bg-white/5 h-9 text-sm"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isSubmitting} className="flex-[2] bg-pit-accent hover:bg-pit-blue-hover text-white h-9 text-sm">
                                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Start Chat with Details"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
