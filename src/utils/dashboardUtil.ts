import { DashboardOption } from "@/types/type";
import CategoryView from "@/views/dashboard/CategoryView";
import PostView from "@/views/dashboard/PostView";
import TagView from "@/views/dashboard/TagView";
import UserView from "@/views/dashboard/UserView";

export const postOptions: DashboardOption[] = [
    {
        name: 'Categorías',
        component: CategoryView,
        path: 'category'
    },
    {
        name: 'Tags',
        component: TagView,
        path: 'tag'
    },
    {
        name: 'Articulos',
        component: PostView,
        path: 'post'
    }
]

export const userOptions: DashboardOption[] = [
    {
        name: 'Usuarios',
        component: UserView,
        path: 'user'
    }
]

export const ITEMS_PER_PAGE = 5;

export const roleColor = {
    user: 'bg-orange-100 text-orange-800',
    writer: 'bg-blue-100 text-blue-800',
    admin: 'bg-red-100 text-red-800'
}

export const statusColor = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    suspended: 'bg-yellow-100 text-yellow-800'
}