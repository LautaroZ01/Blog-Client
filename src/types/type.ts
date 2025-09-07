import { z } from "zod"
import { contactsSchema, socialNetworksSchema, userSchema } from "./userType"
import { commentsSchema } from "./postType"

export type DashboardOption = {
    name: string
    component: React.ComponentType
    path: string
}

export const usersDashboardSchema = userSchema.pick({
    _id: true,
    email: true,
    name: true,
    lastname: true,
    photo: true,
    role: true,
    status: true,
}).extend({
    comments: z.array(z.string()).optional().default([]),
    socialNetworks: z.array(socialNetworksSchema).optional().default([]),
    contacts: z.array(contactsSchema).optional().default([])
}).array()

export const userDashboardSchema = userSchema.pick({
    _id: true,
    email: true,
    name: true,
    lastname: true,
    photo: true,
    role: true,
    status: true,
    country: true,
    birthdate: true,
}).extend({
    comments: commentsSchema,
    socialNetworks: z.array(socialNetworksSchema).optional().default([]),
    contacts: z.array(contactsSchema).optional().default([]),
    nickname: z.string().nullable(),
    bio: z.string().nullable(),
    provider: z.string(),
    isVerified: z.boolean().optional().default(false),
    createdAt: z.string().transform((value) => new Date(value))
})

export type UsersDashboard = z.infer<typeof usersDashboardSchema>
export type UserDashboard = z.infer<typeof userDashboardSchema>
