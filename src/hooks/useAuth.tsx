import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/API/AuthAPI";

export const useAuth = () => {

    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false,
        refetchOnWindowFocus: false
    })
    return {
        data: data || null
        , isError, isLoading
    }
}