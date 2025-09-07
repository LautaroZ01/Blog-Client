import api from "@/lib/axios";
import { categoriesSchema, Category, CategoryFormType, categorySchema } from "@/types/postType";
import { isAxiosError } from "axios";

type CategoryAPI = {
    formData: CategoryFormType
    categoryId: Category['_id']
}

export async function getCategories() {
    try {
        const { data } = await api.get('/category');
        const response = categoriesSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getCategoriesDashboard() {
    try {
        const { data } = await api.get('/dashboard/category');
        const response = categoriesSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getCategoryByIdDashboard(categoryId: CategoryAPI['categoryId']) {
    try {
        const { data } = await api.get(`/dashboard/category/${categoryId}`);
        const response = categorySchema.safeParse(data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addCategory(formData: CategoryFormType) {
    try {
        const { data } = await api.post('/category', formData);

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function editCategory({ formData, categoryId }: CategoryAPI) {
    try {
        const { data } = await api.put(`/category/${categoryId}`, formData);

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteCateogry(categoryId: CategoryAPI['categoryId']) {
    try {
        const { data } = await api.delete(`/category/${categoryId}`);

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}