import Sidebar from "@/components/dashboard/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function DashBoardLayout() {
    const { data, isLoading } = useAuth();

    if (isLoading) return 'Cargando...';

    if (!data) return <Navigate to={'/'} />
    if (data.role === 'user') return <Navigate to={'/'} />

    return (
        <div className="flex flex-row h-screen w-full">
            <Sidebar user={data} />

            <main className="w-full h-screen overflow-y-auto p-10">
                <Outlet />
            </main>
        </div>
    )
}
