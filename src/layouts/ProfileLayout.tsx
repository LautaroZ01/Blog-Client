import Tabs from "@/components/profile/Tabs";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function ProfileLayout() {
    const { data, isLoading } = useAuth();

    if (isLoading) return 'Cargando...';

    if (!data) return <Navigate to={'/'} />

    return (
        <div className="min-h-screen">
            <Tabs />
            <Outlet />
        </div>
    )
}
