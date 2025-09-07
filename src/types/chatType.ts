import { z } from 'zod'
import { userSchema } from './userType'

export const senderSchema = userSchema.pick({
    _id: true,
    email: true,
    name: true,
    lastname: true,
    photo: true
})

export const messageSchema = z.object({
    _id: z.string(),
    conversationId: z.string(),
    sender: senderSchema,
    text: z.string(),
    isRead: z.boolean(),
    createdAt: z.string().transform((value) => new Date(value))
})

export const listMessageSchema = messageSchema.pick({
    _id: true,
    text: true,
    isRead: true
}).extend({
    sender: z.string()
})

export const messagesSchema = z.array(messageSchema);
export const messageSenderSchema = z.object({
    conversationId: z.string(),
    sender: z.string(),
    text: z.string()
})

export type Message = z.infer<typeof messageSchema>
export type SenderMessage = z.infer<typeof messageSenderSchema>
export type Messages = z.infer<typeof messagesSchema>;
export type SendMessage = Pick<SenderMessage, 'conversationId' | 'text'>
export type SendFormMessage = Pick<SenderMessage, 'text'>

export const participantSchema = z.array(senderSchema)

export const conversationSchema = z.object({
    _id: z.string(),
    participants: participantSchema,
    isActive: z.boolean(),
    messages: z.array(listMessageSchema)
})

export const conversationsSchema = z.array(conversationSchema)

export type Conversation = z.infer<typeof conversationSchema>
export type Conversations = z.infer<typeof conversationsSchema>
export type usersWithoutConversation = Pick<Conversation, 'participants'>
export type Participants = string[]

export const chatSchema = z.object({
    messages: messagesSchema,
    receiver: senderSchema
})

export type Chat = z.infer<typeof chatSchema>
export type Receiver = Pick<Chat, 'receiver'>
export type MessageConversation = z.infer<typeof listMessageSchema>