import { z } from "zod"
import { contactsSchema, socialNetworksSchema, userSchema } from "./userType"
import { commentsSchema } from "./postType"

export type DashboardOption = {
    name: string
    component: React.ComponentType
    path: string
    isPrivate?: boolean
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

export const paginationSchema = z.object({
    total: z.number(),
    page: z.number(),
    totalPages: z.number()
})

export const userDashboardPaginationSchema = z.object({
    users: usersDashboardSchema,
    pagination: paginationSchema
})

export type UsersDashboard = z.infer<typeof usersDashboardSchema>
export type UserDashboard = z.infer<typeof userDashboardSchema>

export const statsDataSchema = z.object({
    totalPosts: z.number(),
    totalComments: z.number(),
    totalConversations: z.number(),
    totalReactions: z.number(),
    commentsPerMonth: z.array(
        z.object({
            postTitle: z.string(),
            data: z.record(z.string(), z.number()),
        })
    ),
    viewsLastPosts: z.array(
        z.object({
            title: z.string(),
            views: z.number(),
        })
    ),
    lastConversations: z.array(
        z.object({
            _id: z.string(),
            participants: z.array(
                z.object({
                    _id: z.string(),
                    name: z.string(),
                    lastname: z.string(),
                    photo: z.string(),
                })
            ),
            messages: z.array(
                z.object({
                    _id: z.string(),
                    text: z.string(),
                    createdAt: z.string(),
                })
            ),
        })
    ),
});

export const StatsSchema = z.object({
    totalUsers: z.number(),
    totalPosts: z.number(),
    totalViews: z.number(),
    totalConversations: z.number(),
    postsByCategory: z.object({
      labels: z.array(z.string()),
      data: z.array(z.number()),
    }),
    commentsLikesPerPost: z.object({
      labels: z.array(z.string()),
      comments: z.array(z.number()),
      likes: z.array(z.number()),
    }),
    messagesTimeline: z.object({
      labels: z.array(z.string()),
      data: z.array(z.number()),
    }),
  });
  
  export type StatsDataAdmin = z.infer<typeof StatsSchema>;

export type StatsData = z.infer<typeof statsDataSchema>;
