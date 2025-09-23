import api from "@/lib/axios";
import { userDashboardPaginationSchema, userDashboardSchema } from "@/types/type";
import { ChangePasswordForm, ContactForm, EditRoleForm, ProfileForm, profileSchema, User, UserFilter } from "@/types/userType";
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

export async function getAllUsers(query: UserFilter) {
    try {
        const { data } = await api.get('/dashboard/user', { params: query })
        const response = userDashboardPaginationSchema.safeParse(data)
        

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

export async function getUserById(userId: User['_id']) {
    try {
        const { data } = await api.get(`/dashboard/user/${userId}`)
        console.log(data)
        const response = userDashboardSchema.safeParse(data)
        console.log(response)

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

export async function changeUserStatus(userId: User['_id']) {
    try {
        const { data } = await api.patch<string>(`/dashboard/user/${userId}/status`)

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteUser(userId: User['_id']){
    try {
        const { data } = await api.delete<string>(`/dashboard/user/${userId}`)

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function sendContactForm(formData: ContactForm) {
    try {
        const { data } = await api.post<string>('/auth/email', formData)
        
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
