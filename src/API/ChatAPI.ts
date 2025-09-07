import api from "@/lib/axios"
import { chatSchema, Conversation, conversationsSchema, messageSchema, Participants, participantSchema, SendMessage } from "@/types/chatType"
import { isAxiosError } from "axios"

export const emptyReceiver = {
    _id: '',
    name: '',
    lastname: '',
    email: '',
    photo: ''
};

export async function usersWithoutConversation() {
    try {
        const url = '/chat/users-without-conversation'
        const { data } = await api(url, {
            withCredentials: true
        })

        const response = participantSchema.safeParse(data)

        if (response.success) {
            return response.data
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function createConversation(participants: Participants) {
    try {
        const url = '/chat/conversation'
        const { data } = await api.post<string>(url, { participants })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getConversationsByUser() {
    try {
        const url = '/chat/conversation'
        const { data } = await api.get(url)

        const response = conversationsSchema.safeParse(data)

        if (response.success) {
            return response.data
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getMessagesOfConversation(conversationId: Conversation['_id']) {
    try {
        if (conversationId) {
            const url = `/chat/messages/${conversationId}`
            const { data } = await api.get(url)
            const response = chatSchema.safeParse(data)

            if (response.success) {
                return response.data
            }
        } else {
            return {
                messages: [],
                receiver: emptyReceiver
            }
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function sendMessage({ conversationId, text }: SendMessage) {
    try {
        const url = `/chat/messages/${conversationId}`
        const { data } = await api.post<string>(url, { text })
        const response = messageSchema.safeParse(data)

        if(response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}