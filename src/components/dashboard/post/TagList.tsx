import { getTags } from "@/API/TagAPI";
import Modal from "@/components/ui/Modal";
import { Tag, Tags } from "@/types/postType";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

type TagListProps = {
    selectedTags: Tags
    onTagSelect: (tag: Tag) => void
}

export default function TagList({ selectedTags, onTagSelect }: TagListProps) {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const isOpen = queryParams.get('addTags')

    const { data, isLoading } = useQuery({
        queryKey: ['tagsCreatePost'],
        queryFn: getTags
    })

    const toggleClose = () => navigate(location.pathname, { replace: true })

    if (!isOpen) return null
    if (isLoading) return 'Cargando...'

    if (data) return (
        <Modal title="Selecciona las etiquetas">

            <div className="grid grid-cols-4 gap-4 mt-4 min-w-xl py-4 px-2">
                {data?.map(tag => (
                    <button
                        key={tag._id}
                        type="button"
                        className={`px-2 cursor-pointer w-full text-center rounded-md ${selectedTags.some(t => t._id === tag._id)
                            ? 'bg-blue-100 text-primary-800'
                            : 'bg-gray-200'
                            }`}
                        onClick={() => onTagSelect(tag)}
                    >
                        #{tag.name}
                    </button>
                ))}
            </div>
            <div className="flex items-center justify-end gap-2 mt-4">
                <button
                    onClick={toggleClose}
                    type="button"
                    className="btn-primary"
                >
                    Guardar
                </button>
            </div>
        </Modal>
    )
}
