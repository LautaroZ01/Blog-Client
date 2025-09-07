import { getCategories } from "@/API/CategoryAPI"
import InputContainer from "@/components/auth/InputContainer"
import ErrorMessage from "@/components/ui/ErrorMessage"
import { Post, PostFormType, Tag, Tags } from "@/types/postType"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form"
import TagList from "./TagList"
import { useNavigate } from "react-router-dom"
import { MdModeEdit } from "react-icons/md"
import { postStatus } from "@/locales/es"

type StepThreePostProps = {
    register: UseFormRegister<PostFormType>
    errors: FieldErrors<PostFormType>
    setValue: (name: keyof PostFormType, value: string[]) => void
    watch: UseFormWatch<PostFormType>;
    defaultTags?: Tags;
    defaultCategory?: string;
}

export default function StepThreePost({
    register,
    errors,
    setValue,
    watch,
    defaultTags = [],
    defaultCategory = ""
}: StepThreePostProps) {
    const [selectedTags, setSelectedTags] = useState<Tags>(defaultTags)
    const navigate = useNavigate()

    const { data: categories, isLoading: loadingCategories } = useQuery({
        queryKey: ['categoriesCreatePost'],
        queryFn: getCategories
    })

    const handleTagSelection = (tag: Tag) => {
        const isSelected = selectedTags.some(t => t._id === tag._id);

        let updatedTags: Tags;
        if (isSelected) {
            updatedTags = selectedTags.filter(t => t._id !== tag._id);
        } else {
            updatedTags = [...selectedTags, tag];
        }

        setSelectedTags(updatedTags);
        setValue("tags", updatedTags.map(t => t._id));
    }

    const status: Post['status'][] = ['draft', 'published', 'archived']
    const currentStatus = watch("status");

    if (loadingCategories) return 'Cargando...'

    return (
        <>
            <section className="flex flex-col gap-4">

                <InputContainer>
                    <div>
                        <label htmlFor="category" className="text-sm font-semibold text-gray-800">Categoria</label>
                    </div>
                    <div className="form-data">
                        {categories && (
                            <select
                                id="category"
                                className="input-data capitalize"
                                {...register("category", {
                                    required: "El tipo es obligatorio",
                                })}
                                defaultValue={defaultCategory}
                            >
                                <option value="">Selecciona la categoria</option>
                                {categories.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category._id}
                                        className='capitalize'
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    {errors.title && (
                        <ErrorMessage>{errors.title.message}</ErrorMessage>
                    )}
                </InputContainer>

                <InputContainer>
                    <div>
                        <label htmlFor="tags" className="text-sm font-semibold text-gray-800">Etiquetas</label>
                    </div>
                    <div className="form-data">
                        <div className="flex w-full px-2 items-start justify-between">
                            {selectedTags.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-4 gap-2 min-w-xl p-4">
                                        {selectedTags.map(tag => (
                                            <span key={tag._id} className="bg-blue-100 text-primary-800 px-2 w-full text-center rounded-md">
                                                #{tag.name}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => navigate(`${location.pathname}?addTags=true`)}
                                        type="button"
                                        className="btn-rounded"
                                    >
                                        <MdModeEdit />
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => navigate(`${location.pathname}?addTags=true`)}
                                    type="button"
                                    className="input-data cursor-pointer hover:text-gray-800 text-left capitalize"
                                >
                                    Selecciona las etiquetas
                                </button>
                            )}
                        </div>
                    </div>
                </InputContainer>

                <InputContainer >
                    <div>
                        <label htmlFor="status" className="text-sm font-semibold text-gray-800">Estado</label>
                    </div>
                    <div className="flex gap-4 p-2 rounded-md items-center justify-between">
                        {status.map((state) => (
                            <div key={state} className="flex items-center grow">
                                <input
                                    type="radio"
                                    id={`status-${state}`}
                                    value={state}
                                    className="hidden peer"
                                    {...register("status")}
                                    defaultChecked={state === currentStatus}
                                />
                                <label
                                    htmlFor={`status-${state}`}
                                    className={`px-4 w-full text-center py-1 border rounded-md cursor-pointer transition-colors duration-pro peer-checked:bg-primary-50 peer-checked:text-primary-800 peer-checked:border-blue-500
                                            ${currentStatus === state ? "bg-primary-50 text-primary-800 border-blue-500" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                                >
                                    {postStatus[state]}
                                </label>
                            </div>
                        ))}
                    </div>
                </InputContainer>
            </section>
            <TagList
                selectedTags={selectedTags}
                onTagSelect={handleTagSelection}
            />
        </>
    )
}