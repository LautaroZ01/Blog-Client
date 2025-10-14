import { z } from 'zod'

export const userRoleSchema = z.enum(['user', 'writer', 'admin'])
export const userRoles = ['user', 'writer', 'admin']
export const userStatusSchema = z.enum(['active', 'inactive', 'suspended'])
export const userProviderSchema = z.enum(['local', 'google', 'facebook'])

export const socialNetworksTypeSchema = z.enum([
    'facebook',
    'instagram',
    'youtube',
    'twitter',
    'thrends'
]);

export const contactsTypeSchema = z.enum([
    'phone',
    'email',
    'whatsapp',
    'linkedin',
    'telegram',
    'copy'
])

export const userSchema = z.object({
    _id: z.string(),
    name: z.string(),
    lastname: z.string().nullable(),
    email: z.string().email(),
    birthdate: z.union([
        z.string().transform((value) => new Date(value)),
        z.null()
    ]).optional(),
    photo: z.string(),
    country: z.string().nullable(),
    status: userStatusSchema,
    role: userRoleSchema,
    password: z.string()
})

export const userFilterSchema = z.object({
    role: z.string().optional(),
    status: z.string().optional(),
    search: z.string().optional(),
    page: z.number().optional().default(1)
})

export const profileSchema = userSchema.pick({
    email: true,
    name: true,
    lastname: true,
    photo: true,
    role: true,
    country: true,
    birthdate: true
})

export const socialNetworksSchema = z.object({
    _id: z.string(),
    type: socialNetworksTypeSchema.optional(),
    name: z.string(),
    url: z.string()
})

export const contactsSchema = z.object({
    _id: z.string(),
    type: contactsTypeSchema.optional(),
    name: z.string()
})

export const writerSchema = userSchema.pick({
    _id: true
}).extend({
    socialNetworks: z.array(socialNetworksSchema).optional().default([]),
    contacts: z.array(contactsSchema).optional().default([]),
    bio: z.string().nullable(),
    nickname: z.string().nullable()
})

export const socialProfileSchema = writerSchema.pick({
    socialNetworks: true,
    contacts: true
})

export const sesionSchema = userSchema.pick({
    _id: true,
    email: true,
    name: true,
    photo: true,
    role: true,
    status: true
})

export const authorSchema = userSchema.pick({
    _id: true,
    email: true,
    name: true,
    photo: true,
    role: true
})

export const authSchema = userSchema.pick({
    name: true,
    lastname: true,
    email: true,
    birthdate: true,
    country: true,
    password: true
}).extend({
    current_password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

export const writerInfoSchema = userSchema.pick({
    _id: true,
    email: true,
    name: true,
    lastname: true,
    photo: true,
    birthdate: true,
    country: true
}).merge(
    writerSchema.pick({
        socialNetworks: true,
        contacts: true,
        bio: true,
        nickname: true
    })
);

export const contactSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    subject: z.string(),
    message: z.string()
})

export type CountryType = {
    name: string;
    code: string;
}

export type User = z.infer<typeof userSchema>
export type Sesion = z.infer<typeof sesionSchema>
export type Author = z.infer<typeof authorSchema>
export type Profile = z.infer<typeof profileSchema>
export type Writer = z.infer<typeof writerSchema>
export type SocialNetwork = z.infer<typeof socialNetworksSchema>
export type Contact = z.infer<typeof contactsSchema>
export type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'lastname' | 'email' | 'birthdate' | 'country' | 'password' | 'password_confirmation'>
export type UserFilter = z.infer<typeof userFilterSchema>
export type ProfileForm = Omit<Pick<User, 'name' | 'email' | 'lastname' | 'country'>, 'birthdate'> & {
    birthdate: string;
};

export type ChangePasswordForm = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>
export type CheckPasswordForm = Pick<Auth, 'password'>
export type ConfirmToken = Pick<Auth, 'token'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export type EditRoleForm = Pick<User, 'role'>

export type WriterForm = Pick<Writer, 'bio' | 'nickname'>
export type SocialNetworkForm = Pick<SocialNetwork, 'name' | 'type' | 'url'>
export type ContactFormType = Pick<Contact, 'name' | 'type'>

export type WriterProfile = z.infer<typeof writerInfoSchema>
export type ContactForm = z.infer<typeof contactSchema>