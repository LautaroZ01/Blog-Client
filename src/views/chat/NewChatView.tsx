import { createConversation, usersWithoutConversation } from "@/API/ChatAPI";
import { useAuth } from "@/hooks/useAuth";
import { Participants } from "@/types/chatType";
import { User } from "@/types/userType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";
import AuthPhoto from "@/components/auth/AuthPhoto";
import { useState, useEffect } from "react";

export default function NewChatView() {
  const { data: authData, isLoading: loadingUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['withoutconversations'],
    queryFn: usersWithoutConversation,
    retry: 1
  });

  const { mutate } = useMutation({
    mutationFn: createConversation,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success('Conversación creada');
      queryClient.invalidateQueries({ queryKey: ['withoutconversations'] });
      queryClient.invalidateQueries({ queryKey: ['conversationsList'] });
      navigate(`/chat/conversation/${data}`);
    }
  });

  useEffect(() => {
    if (data && data.length === 0) {
      toast.error('No hay usuarios para chatear');
    }
  }, [data]);

  const handleNewChat = (userId: User['_id']) => {
    if (!authData || !userId) {
      toast.error('Usuario no autenticado o ID de usuario inválido');
      return;
    }
    const participants: Participants = [userId.toString(), authData._id.toString()];
    mutate(participants);
  };

  const filteredUsers = data?.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading || loadingUser) return 'Cargando...';

  if (!authData) {
    return <Navigate to="/login" />;
  }

  if (!data || data.length === 0) {
    return <Navigate to="/chat/conversation" />;
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <header className="my-4 text-center space-y-2">
        <h1 className="text-4xl font-semibold text-gray-700">Elige una persona 🙌</h1>
        <p className="text-gray-500">
          ¡Inicia una conversación y {''}
          <strong>habla con nuestra comunidad!</strong>
        </p>
      </header>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center justify-center gap-4 w-full max-w-96 border border-gray-300 rounded-md"
      >
        <input
          type="text"
          placeholder="Busca a una persona aqui..."
          className="w-full p-2 focus:outline-none autofill:bg-white autofill:text-gray-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="text-gray-500 py-2 px-4 border-l border-gray-300 cursor-pointer">
          <FiSearch />
        </button>
      </form>
      {filteredUsers.length > 0 ? (
        filteredUsers.map(user => (
          <div
            key={user._id}
            className="w-full max-w-lg flex flex-wrap items-center justify-between mt-4 px-4 sm:px-0"
          >
            <div className="flex items-center gap-2">
              <AuthPhoto photo={user.photo} name={user.name} size="normal" />
              <div className="flex flex-col">
                <strong className="text-gray-700">
                  {user.name} {user.lastname}
                </strong>
                <small className="text-gray-400">{user.email}</small>
              </div>
            </div>
            <button
              onClick={() => handleNewChat(user._id)}
              className="btn-secundary cursor-pointer mt-4 sm:mt-0 w-full sm:w-auto"
            >
              Enviar mensaje
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No se encontraron resultados para "{searchTerm}".</p>
      )}
    </div>
  );
}