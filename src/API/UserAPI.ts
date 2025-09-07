import api from "@/lib/axios";
import { userDashboardSchema, usersDashboardSchema } from "@/types/type";
import { ChangePasswordForm, EditRoleForm, ProfileForm, profileSchema, User } from "@/types/userType";
import { isAxiosError } from "axios";

export async function getProfile() {

    try {
        const { data } = await api.get('/auth/profile');
        const response = profileSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error)
            throw new Error(error.response.data.error)
        }
    }
}

export async function changePassword(formData: ChangePasswordForm) {
    console.log(formData)
    try {
        const { data } = await api.post<string>('/auth/update-password', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateProfile(formData: ProfileForm) {
    try {
        const { data } = await api.put<string>('/auth/profile', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateProfilePhoto(photoData: string) {
    try {
        const { data } = await api.patch<string>('/auth/photo', { photo: photoData })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error('Error desconocido al actualizar la foto')
    }
}

export async function getAllUsers() {
    try {
        const { data } = await api.get('/dashboard/user')
        const response = usersDashboardSchema.safeParse(data)

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

export async function getUserById(userId: string) {
    try {
        const { data } = await api.get(`/dashboard/user/${userId}`)
        const response = userDashboardSchema.safeParse(data)

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

export async function updateUserRole({ userId, formData }: { userId: User['_id'], formData: EditRoleForm }) {
    try {
        const { data } = await api.patch<string>(`/dashboard/user/${userId}/role`, formData)
        
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function changeUserStatus(userId: string) {
    try {
        const { data } = await api.patch<string>(`/dashboard/user/${userId}/status`)

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
