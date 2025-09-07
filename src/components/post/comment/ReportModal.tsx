import { reportComment } from "@/API/CommentAPI"
import Modal from "@/components/ui/Modal"
import type { Post } from "@/types/postType"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

type ReportModalProps = {
    postId: Post['_id']
}

const repotOptions = [
    'Contenido sexual',
    'Contenido violento o repulsivo',
    'Contenido abusivo o que incita al odio',
    'Acoso o bullying',
    'Actividades peligrosas o dañinas',
    'Suicidio, autolesiones o trastornos alimentarios',
    'Información errónea',
    'Abuso de menores',
    'Fomenta el terrorismo',
    'Contenido engañoso o spam'
]

export default function ReportModal({ postId }: ReportModalProps) {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const commentRepostId = queryParams.get('commentRepostId')!
    const navigate = useNavigate()

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: reportComment,
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })
            queryClient.invalidateQueries({ queryKey: ['commentsPost', postId] })
            navigate(-1)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    if (commentRepostId) return (
        <Modal title="Denunciar comentario">
            <div className="flex flex-col gap-2 py-4 px-2">
                <p>Por favor, selecciona una de las siguientes opciones:</p>
                {repotOptions.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input type="radio" name="report" id={option} />
                        <label htmlFor={option}>{option}</label>
                    </div>
                ))}

                <div className="flex items-center gap-2 py-4 mt-4 w-full">
                    <button className="btn-secundary w-full" onClick={() => navigate(-1)}>Cancelar</button>
                    <button className="btn-primary w-full" onClick={() => mutate({ commentId: commentRepostId })}>Denunciar</button>
                </div>
            </div>
        </Modal>
    )
}