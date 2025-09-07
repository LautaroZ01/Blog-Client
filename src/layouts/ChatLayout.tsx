import Header from "@/components/ui/Header";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function ChatLayout() {
    const { data, isLoading } = useAuth();

    if (isLoading) {
        return 'Cargando...';
    }

    if (!data) {
        return <Navigate to={'/'} />
    } else {
        return (
            <>
                <Header />
                <Outlet />
            </>
        )
    }
}
