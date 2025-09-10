import api from "@/lib/axios";
import { AnyFilter, Tag, TagFormType, tagSchema, tagsSchema } from "@/types/postType";
import { isAxiosError } from "axios";

type TagAPI = {
    formData: TagFormType
    tagId: Tag['_id']
}

export async function getTags() {
    try {
        const { data } = await api.get('/tag');
        const response = tagsSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTagsDashboard(filter: AnyFilter) {
    try {
        const { data } = await api.get('/dashboard/tag', { params: filter });
        const response = tagsSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTagByIdDashboard(categoryId: TagAPI['tagId']) {
    try {
        const { data } = await api.get(`/dashboard/tag/${categoryId}`);
        const response = tagSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addTag(formData: TagFormType) {
    try {
        const { data } = await api.post('/tag', formData);

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function editTag({ formData, tagId }: TagAPI) {
    try {
        const { data } = await api.put(`/tag/${tagId}`, formData);

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTag(tagId: TagAPI['tagId']) {
    try {
        const { data } = await api.delete(`/tag/${tagId}`);

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}