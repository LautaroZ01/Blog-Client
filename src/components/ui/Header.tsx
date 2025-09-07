import { logoutUser } from "@/API/AuthAPI";
import { useAuth } from "@/hooks/useAuth"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavNotAuth from "./NavNotAuth";
import NavAuth from "./NavAuth";
import socket from "@/lib/socket";

export default function Header() {
  const { data, isLoading } = useAuth();
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: logoutUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.invalidateQueries({ queryKey: ['conversationsList'] })
      socket.disconnect()
      navigate('/')
    }
  })

  const handleSession = () => {
    mutate()
  }

  if (isLoading) {
    return 'Cargando...';
  }

  return (
    <header className="container-blog flex items-center justify-between sticky top-0 backdrop-blur-xl pt-2 z-50 bg-white">
      <Link to={'/'} className="flex items-center gap-2 hover:text-primary-500">
        <div className="size-10">
          <img src="/Logo-blog.png" alt="Logo de blog" className="w-full" />
        </div>
        <strong className="text-2xl font-black text-primary-400">Blog</strong>
      </Link>

      {!data ? (
        <NavNotAuth />
      ) : (
        <NavAuth user={data} handleSession={handleSession} />
      )}
    </header>
  );
}
