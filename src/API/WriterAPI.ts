import api from "@/lib/axios";
import { Contact, ContactFormType, SocialNetwork, SocialNetworkForm, socialProfileSchema, WriterForm, writerSchema } from "@/types/userType";
import { isAxiosError } from "axios";

export async function getProfile() {
    try {
        const { data } = await api.get('/writer/profile');
        const response = writerSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateExtraInformation(formData: WriterForm) {
    try {
        const { data } = await api.put('/writer/profile', formData);

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getSocialProfile() {
    try {
        const { data } = await api.get('/writer/social');
        const response = socialProfileSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addSocialNetwork(formData: SocialNetworkForm) {
    try {
        const { data } = await api.post('/writer/social-network', formData);

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function editSocialNetwork(formData: SocialNetwork) {
    try {
        const socialEdited = {
            name: formData.name,
            type: formData.type,
            url: formData.url
        }

        const { data } = await api.put(`/writer/social-network/${formData._id}`, socialEdited);

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteSocialNetwork(formData: SocialNetwork['_id']) {
    try {
        const { data } = await api.delete(`/writer/social-network/${formData}`);

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addContact(formData: ContactFormType) {
    try {
        const { data } = await api.post('/writer/contact', formData);

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function editContact(formData: Contact) {
    try {
        const contactEdited = {
            name: formData.name,
            type: formData.type
        }

        const { data } = await api.put(`/writer/contact/${formData._id}`, contactEdited);

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteContact(formData: Contact['_id']) {
    try {
        const { data } = await api.delete(`/writer/contact/${formData}`);

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}