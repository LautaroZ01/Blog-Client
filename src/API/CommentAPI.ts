import api from "@/lib/axios"
import { Comment, CommentFormType, commentsSchema, Post } from "@/types/postType"
import { isAxiosError } from "axios"

export async function createComment({ formData, postId }: { formData: CommentFormType, postId: Post['_id'] }) {
    try {
        const url = `/comment/${postId}`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getComments(postId: Post['_id']) {
    try {
        const { data } = await api.get(`/comment/${postId}`)
        const response = commentsSchema.safeParse(data)

        if (response.success) {
            return response.data
        } else {
            return null
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function createReply({ formData, commentId }: { formData: CommentFormType, commentId: Comment['_id'] }) {
    try {
        const url = `/comment/${commentId}/reply`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function reportComment({ commentId }: { commentId: Comment['_id'] }) {
    try {
        const url = `/comment/${commentId}/report`
        const { data } = await api.patch<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateComment({ commentId, formData }: { commentId: Comment['_id'], formData: CommentFormType }) {
    try {
        const url = `/comment/${commentId}`
        const { data } = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteComment({ commentId }: { commentId: Comment['_id'] }) {
    try {
        const url = `/comment/${commentId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getCommentsByPostId(postId: Post['_id']) {
    try {
        const { data } = await api.get(`/dashboard/comment/${postId}`)
        const response = commentsSchema.safeParse(data)
        if (response.success) {
            return response.data
        } else {
            return null
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function changeCommentStatus(commentId: Comment['_id']) {
    try {
        const url = `/comment/${commentId}/status`
        const { data } = await api.patch<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


