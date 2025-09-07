import ConversationsList from "@/components/chat/ConversationsList";
import MessagesView from "./MessagesView";
import { getConversationsByUser } from "@/API/ChatAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function ConversationView() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['conversationsList'],
    queryFn: getConversationsByUser,
    retry: 1
  })

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    }
  }, [queryClient])

  if (isLoading) return 'Cargando...'

  if (data && data.length > 0) {
    return (
      <section className="">
        <div className="container-blog lg:flex gap-4 min-h-[calc(100vh-48px)] max-h-[calc(100vh-48px)] pt-4">
          <ConversationsList conversations={data} />
          <MessagesView />
        </div>
      </section>
    )
  } else {
    return <Navigate to={'/chat/new-chat'} />
  }
}
