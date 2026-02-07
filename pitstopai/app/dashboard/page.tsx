import { ChatInterface } from "@/components/dashboard/chat-interface"
import { getChat, getChatMessages, getUserProfile } from "@/app/dashboard/actions"

interface PageProps {
    searchParams: Promise<{ chat?: string }>
}

export const metadata = {
    title: "PitStopAI Dashboard – Your Car AI Advisor",
    description: "Chat with PitStopAI about car maintenance, repairs, and diagnostics.",
}

export default async function DashboardPage(props: PageProps) {
    const searchParams = await props.searchParams
    const chatId = searchParams.chat

    const profile = await getUserProfile()
    const username = profile?.username || undefined

    let context = undefined
    let initialMessages = []

    if (chatId) {
        const chatData = await getChat(chatId)
        if (chatData?.vehicle) {
            context = {
                vehicleName: chatData.vehicle.nickname || `${chatData.vehicle.make} ${chatData.vehicle.model}`,
                mileage: chatData.vehicle.mileage_km
            }
        }

        const messages = await getChatMessages(chatId)
        initialMessages = messages || []
    }

    return (
        <div className="h-full w-full bg-pit-black">
            <ChatInterface
                chatId={chatId}
                initialContext={context}
                initialMessages={initialMessages}
                username={username}
            />
        </div>
    )
}
