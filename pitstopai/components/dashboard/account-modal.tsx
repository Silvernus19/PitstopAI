"use client"

import { useState, useEffect } from "react"
import { User, Mail, Phone, Globe, Calendar, Shield, Trash2, Loader2, X, Camera, Save, AlertCircle } from "lucide-react"
import { getUserProfile, updateUserProfile, deleteAccount } from "@/app/dashboard/actions"
import { Profile } from "@/types/database"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function AccountModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        if (isOpen) {
            loadProfile()
        }
    }, [isOpen])

    async function loadProfile() {
        setIsLoading(true)
        setError("")
        const data = await getUserProfile()
        if (data) {
            setProfile(data)
        } else {
            setError("Failed to load profile details.")
        }
        setIsLoading(false)
    }

    async function handleSave(formData: FormData) {
        setIsSaving(true)
        setError("")
        setSuccess("")

        const result = await updateUserProfile(formData)

        if (result?.error) {
            setError(result.error)
        } else {
            setSuccess("Profile updated successfully!")
            setTimeout(() => setSuccess(""), 3000)
            loadProfile()
        }
        setIsSaving(false)
    }

    async function handleDeleteConfirm() {
        setIsDeleting(true)
        const result = await deleteAccount()
        if (result?.error) {
            setError(result.error)
            setIsDeleting(false)
            setShowDeleteConfirm(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-pit-card border border-pit-gray rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-pit-gray bg-pit-dark/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-pit-accent/10 rounded-lg">
                            <User className="h-5 w-5 text-pit-accent" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Account Details</h2>
                    </div>
                    <button onClick={onClose} className="p-2 text-pit-subtext hover:text-white hover:bg-white/5 rounded-full transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-4">
                            <Loader2 className="h-8 w-8 text-pit-accent animate-spin" />
                            <p className="text-pit-subtext">Fetching your details...</p>
                        </div>
                    ) : profile ? (
                        <form action={handleSave} className="space-y-8">
                            {/* Avatar Section */}
                            <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-pit-gray/50">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-full bg-pit-accent/20 flex items-center justify-center text-3xl font-bold text-pit-accent border-2 border-pit-accent/30 overflow-hidden">
                                        {profile.avatar_url ? (
                                            <img src={profile.avatar_url} alt={profile.username} className="w-full h-full object-cover" />
                                        ) : (
                                            <span>{profile.username?.[0]?.toUpperCase() || "U"}</span>
                                        )}
                                    </div>
                                    <button type="button" className="absolute bottom-0 right-0 p-2 bg-pit-card border border-pit-gray rounded-full text-pit-subtext hover:text-white shadow-lg transition-transform group-hover:scale-110">
                                        <Camera className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-lg font-semibold text-white">{profile.full_name || profile.username}</h3>
                                    <p className="text-pit-subtext text-sm">Member since {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                                    <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pit-accent/10 text-pit-accent border border-pit-accent/20">
                                        <Shield className="h-3 w-3 mr-1" />
                                        {profile.role.toUpperCase()}
                                    </div>
                                </div>
                            </div>

                            {/* Info Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-white flex items-center gap-2">
                                        <User className="h-4 w-4 text-pit-subtext" />
                                        Username
                                    </Label>
                                    <Input id="username" name="username" defaultValue={profile.username} className="bg-pit-black border-pit-gray text-white h-11" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="full_name" className="text-white">Full Name</Label>
                                    <Input id="full_name" name="full_name" defaultValue={profile.full_name || ""} className="bg-pit-black border-pit-gray text-white h-11" placeholder="Add your full name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-white flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-pit-subtext" />
                                        Email Address
                                    </Label>
                                    <Input id="email" value={profile.email || ""} disabled className="bg-pit-black/50 border-pit-gray text-pit-subtext h-11 cursor-not-allowed" />
                                    <p className="text-[10px] text-pit-subtext flex items-center gap-1">
                                        <Shield className="h-3 w-3" /> Email cannot be changed here.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone_number" className="text-white flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-pit-subtext" />
                                        Phone Number
                                    </Label>
                                    <Input id="phone_number" name="phone_number" defaultValue={profile.phone_number || ""} className="bg-pit-black border-pit-gray text-white h-11" placeholder="+254..." />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="preferred_language" className="text-white flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-pit-subtext" />
                                        Language
                                    </Label>
                                    <select
                                        id="preferred_language"
                                        name="preferred_language"
                                        defaultValue={profile.preferred_language || "en"}
                                        className="w-full bg-pit-black border border-pit-gray text-white h-11 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-pit-accent transition-all"
                                    >
                                        <option value="en">English (US)</option>
                                        <option value="sw">Swahili</option>
                                        <option value="fr">French</option>
                                        <option value="de">German</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-pit-subtext" />
                                        Created At
                                    </Label>
                                    <div className="h-11 flex items-center px-3 bg-pit-black/50 border border-pit-gray rounded-md text-pit-subtext text-sm">
                                        {new Date(profile.created_at).toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            {/* Notifications */}
                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-500 text-sm">
                                    <AlertCircle className="h-4 w-4 shrink-0" />
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 text-green-500 text-sm">
                                    <AlertCircle className="h-4 w-4 shrink-0" />
                                    {success}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-col md:flex-row gap-4 pt-4">
                                <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 bg-pit-accent hover:bg-pit-blue-hover text-white h-12 rounded-xl font-bold shadow-lg shadow-pit-accent/20 transition-all active:scale-[0.98]"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Saving Changes...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Profile
                                        </>
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="text-red-500 hover:text-red-400 hover:bg-red-500/5 h-12 rounded-xl font-medium border border-red-500/10"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Account
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-red-500">{error}</p>
                            <Button onClick={loadProfile} variant="secondary" className="mt-4">Retry</Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-md bg-pit-card border border-red-500/20 rounded-2xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
                        <div className="flex flex-col items-center text-center gap-6">
                            <div className="p-4 bg-red-500/10 rounded-full">
                                <Trash2 className="h-10 w-10 text-red-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Delete Account?</h3>
                                <p className="text-pit-subtext">
                                    This action is <span className="text-red-500 font-bold underline">permanent</span>. All your chats, cars, and diagnostic data will be wiped immediately. This cannot be undone.
                                </p>
                            </div>
                            <div className="w-full flex flex-col gap-3 mt-4">
                                <Button
                                    onClick={handleDeleteConfirm}
                                    disabled={isDeleting}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white h-12 rounded-xl font-bold"
                                >
                                    {isDeleting ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        "Confirm Permanent Deletion"
                                    )}
                                </Button>
                                <Button
                                    disabled={isDeleting}
                                    onClick={() => setShowDeleteConfirm(false)}
                                    variant="ghost"
                                    className="w-full text-pit-subtext hover:text-white h-12 rounded-xl"
                                >
                                    Cancel & Keep Account
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
