import { z } from "zod";
import { authorSchema } from "./userType";

export const postStatusSchema = z.enum(['draft', 'published', 'archived'])

export type Column = {
    label: string
}

export const categorySchema = z.object({
    _id: z.string(),
    name: z.string(),
    slug: z.string(),
    description: z.string().optional().default(''),
    posts: z.array(z.string()).optional().default([])
})

export const categoriesSchema = z.array(categorySchema)
export type Category = z.infer<typeof categorySchema>
export type Categories = z.infer<typeof categoriesSchema>

export type CategoryDashboardList = Pick<Category, '_id' | 'name' | 'slug' | 'description' | 'posts'>
export type CategoryFormType = Pick<Category, 'name' | 'description'>
export type CategoryEditPostType = Pick<Category, '_id' | 'name'>;

export const tagSchema = z.object({
    _id: z.string(),
    name: z.string(),
    slug: z.string(),
    posts: z.array(z.string()).optional().default([])
})

export const tagsSchema = z.array(tagSchema)
export type Tag = z.infer<typeof tagSchema>
export type Tags = z.infer<typeof tagsSchema>

export type TagDashboardList = Pick<Tag, '_id' | 'name' | 'slug' | 'posts'>
export type TagFormType = Pick<Tag, 'name'>
export type TagEditPostType = Pick<Tag, '_id' | 'name'>;


export const postSchema = z.object({
    _id: z.string(),
    title: z.string(),
    slug: z.string().optional(),
    content: z.string().optional(),
    images: z.array(z.string()).optional().default([]),
    status: postStatusSchema,
    category: categorySchema.pick({
        _id: true,
        name: true,
        slug: true
    }),
    tags: z.array(tagSchema.pick({
        _id: true,
        slug: true
    })).optional().default([]),
    //Lista de comentarios -> Completar
    comments: z.array(z.string()).optional().default([]),
    likes: z.array(z.string()).optional().default([]),
    createdAt: z.union([
        z.string().transform((value) => new Date(value)),
        z.null()
    ]),
    updatedAt: z.union([
        z.string().transform((value) => new Date(value)),
        z.null()
    ]).optional().default(null),
    author: authorSchema.optional(),
    viewCount: z.number().optional()
})

export const postViewSchema = postSchema.pick({
    _id: true,
    title: true,
    slug: true,
    content: true,
    images: true,
    status: true,
    category: true,
    tags: true,
    comments: true,
    likes: true,
    createdAt: true,
    author: true
})

export const postFormSchema = postSchema.pick({
    title: true,
    content: true,
    status: true,
}).extend({
    category: z.string(),
    tags: z.array(z.string()).optional().default([]),
});

export const postEditSchema = postSchema.pick({
    _id: true,
    title: true,
    content: true,
    images: true,
    status: true,
    tags: true,
    category: true,
    author: true
}).extend({
    tags: z.array(
        tagSchema.pick({
            _id: true,
            name: true,
            slug: true,
            posts: true
        })
    ),
    category: categorySchema.pick({
        _id: true,
        name: true
    }),
    author: z.string()
});

export const postsViewSchema = z.array(postViewSchema)

export const postFilterSchema = z.object({
    search: z.string().optional(),
    category: z.string().optional(),
    tag: z.string().optional(),
    status: z.string().optional()
})

export type PostView = z.infer<typeof postViewSchema>
export type PostsView = z.infer<typeof postsViewSchema>

export const postsSchema = z.array(postSchema)

export const postsDashboardSchema = z.object({
    posts: postsSchema,
    categories: z.array(categorySchema.pick({
        _id: true,
        name: true
    })),
    tags: z.array(tagSchema.pick({
        _id: true,
        name: true
    }))
})

export type Post = z.infer<typeof postSchema>
export type PostEdit = z.infer<typeof postEditSchema>
export type Posts = z.infer<typeof postsSchema>
export type PostFormType = z.infer<typeof postFormSchema>;

export type PostFilter = z.infer<typeof postFilterSchema>;
export type AnyFilter = Pick<PostFilter, 'search'>

export const commentStructure = z.object({
    _id: z.string(),
    content: z.string(),
    status: z.enum(['spam', 'approved', 'disabled']).optional(),
    reports: z.number().optional(),
    parentComment: z.union([
        z.string(),
        z.null()
    ]).optional().default(null),
    author: authorSchema.optional(),
    createdAt: z.union([
        z.string().transform((value) => new Date(value)),
        z.null()
    ])
})

export const commentSchema = commentStructure.extend({
    replies: z.array(commentStructure).optional().default([])
})

export const commentsSchema = z.array(commentSchema)

export type Comment = z.infer<typeof commentSchema>
export type Comments = z.infer<typeof commentsSchema>
export type Replies = z.infer<typeof commentStructure>
export type Reply = z.infer<typeof commentStructure>
export type CommentFormType = Pick<Comment, 'content'>




