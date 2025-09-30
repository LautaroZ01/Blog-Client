import api from "@/lib/axios";
import { Post, postEditSchema, PostFilter, PostFormType, PostListFilter, postSchema, postsDashboardSchema, postsListSchema, postsSchema } from "@/types/postType";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import { isAxiosError } from "axios";

export async function getPostsHome() {
    try {
        const { data } = await api.get('/post?limit=3');
        const response = postsSchema.safeParse(data.data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getPosts(filter: PostListFilter) {
    try {
        const { data } = await api.get('/post', { params: filter });
        const response = postsListSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getPostDashboard(filter: PostFilter) {
    try {
        const { data } = await api.get('/dashboard/post', { params: filter });
        const response = postsDashboardSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getPostBySlug(slug: string) {
    try {
        const { data } = await api.get(`/post/${slug}`);
        const response = postSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function createPost(formData: PostFormType) {
    try {
        const { data } = await api.post('/post', formData);

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function uploadPostImages({ postId, images }: { postId: string; images: File[] }) {
    try {

        const uploadedUrls = await Promise.all(
            images.map(file => uploadImageToCloudinary(file))
        );

        const { data } = await api.patch(`/post/images/${postId}`, {
            images: uploadedUrls
        });

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deletePost(postId: Post['_id']) {
    try {
        const { data } = await api.delete(`/post/${postId}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getPostByIdFromEdit(postId: Post['_id']) {
    try {
        const { data } = await api.get(`/dashboard/post/${postId}`);
        const response = postEditSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updatePost({ postId, ...formData }: PostFormType & { postId: Post['_id'] }) {
    try {
        const { data } = await api.put(`/post/${postId}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deletePostImage({ postId, imageUrl }: { postId: Post['_id']; imageUrl: string }) {
    try {
        console.log('Deleting image:', imageUrl);
        const { data } = await api.delete(`/post/image/${postId}`, { data: { imageUrl } });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function likePost(postId: Post['_id']) {
    try {
        const { data } = await api.patch<string>(`/post/${postId}/like`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function dislikePost(postId: Post['_id']) {
    try {
        const { data } = await api.patch<string>(`/post/${postId}/dislike`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
