export interface Vehicle {
    id: string
    user_id: string
    nickname?: string | null
    make: string
    model: string
    model_year: number
    engine_type?: string | null
    mileage_km?: number | null
    notes?: string | null
    created_at: string
    updated_at: string
}

export interface Chat {
    id: string
    user_id: string
    title: string
    vehicle_id?: string | null
    created_at: string
    updated_at: string
}

export interface Message {
    id: string
    chat_id: string
    role: 'user' | 'assistant'
    content: string
    created_at: string
    metadata?: any
}

export interface Profile {
    id: string
    username: string
    email?: string | null
    full_name?: string | null
    avatar_url?: string | null
    phone_number?: string | null
    preferred_language?: string | null
    role: 'user' | 'moderator' | 'admin'
    is_active: boolean
    created_at: string
    updated_at: string
}
