import { useEffect, useState } from "react";
import { updatePost, uploadPostImages, deletePostImage } from "@/API/PostAPI";
import StepOnePost from "@/components/dashboard/post/StepOnePost";
import { PostEdit, PostFormType } from "@/types/postType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FiChevronLeft, FiChevronRight, FiTag, FiFileText, FiImage } from "react-icons/fi";
import StepThreePost from "@/components/dashboard/post/StepThreePost";
import StepTwoPost from "@/components/dashboard/post/StepTwoPost";
import { Link, useNavigate } from "react-router-dom";
import StepFourPost from "./StepFourPost";
import { processSections } from "@/utils/processSections";
import { MdBookmarkAdd } from "react-icons/md";

type EditPostFormProps = {
    post: PostEdit;
};

export default function EditPostForm({ post }: EditPostFormProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    // Estado para almacenar las imágenes existentes y nuevas
    const [existingImages, setExistingImages] = useState(post.images);
    const [postImages, setPostImages] = useState<Array<{ file: File; preview: string }>>([]);
    const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

    useEffect(() => {
        return () => {
            // Limpiar las URLs de objetos creadas para las imágenes nuevas
            postImages.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, [postImages]);

    const defaultValues: PostFormType = {
        title: post.title,
        content: post.content,
        category: post.category._id,
        tags: post.tags.map(tag => tag._id),
        status: post.status,
        sections: post.sections.map(section => ({
            title: section.title,
            content: section.content,
            thumbnail: section.thumbnail,
            _id: section._id
        }))
    };

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        trigger
    } = useForm({ defaultValues });

    const steps = [
        {
            step: 1,
            title: "Contenido",
            icon: <FiFileText size={16} />,
            component: <StepOnePost control={control} register={register} errors={errors} />
        },
        {
            step: 2,
            title: "Multimedia",
            icon: <FiImage size={16} />,
            component: (
                <StepTwoPost
                    images={postImages}
                    setImages={setPostImages}
                    existingImages={existingImages}
                    onDeleteExistingImage={(url: string) => {
                        setImagesToDelete([...imagesToDelete, url]);
                        setExistingImages(existingImages.filter(img => img !== url));
                    }}
                />
            )
        },
        {
            step: 3,
            title: "Detalles",
            icon: <FiTag size={16} />,
            component: <StepThreePost
                register={register}
                errors={errors}
                setValue={setValue}
                watch={watch}
                defaultTags={post.tags}
                defaultCategory={post.category._id}
            />
        },
        {
            step: 4,
            title: "Secciones",
            icon: <MdBookmarkAdd size={16} />,
            component: <StepFourPost
                control={control}
                register={register}
                errors={errors}
            />
        }
    ];

    const totalSteps = steps.length;

    // Mutación para actualizar el post
    const queryClient = useQueryClient();
    const { mutate: updatePostMutation, isPending: isUpdatingPost } = useMutation({
        mutationFn: updatePost,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            if (imagesToDelete.length > 0) {
                // Eliminar imágenes marcadas para borrar
                Promise.all(imagesToDelete.map(url => deletePostImage({ imageUrl: url, postId: post._id })));
            }

            if (postImages.length > 0) {
                uploadImagesMutation.mutate({
                    postId: post._id,
                    images: postImages.map(img => img.file)
                });
            } else {
                toast.success("Artículo actualizado exitosamente");
                navigate('/dashboard/post');
                queryClient.invalidateQueries({ queryKey: ['postEdit', post._id] });
            }
        }
    });

    // Mutación para subir imágenes nuevas
    const uploadImagesMutation = useMutation({
        mutationFn: uploadPostImages,
        onError: (error) => {
            toast.error(`Post actualizado pero error al subir imágenes: ${error.message}`);
        },
        onSuccess: () => {
            toast.success("Artículo actualizado exitosamente");
            queryClient.invalidateQueries({ queryKey: ['postEdit', post._id] });
            navigate('/dashboard/post');
        }
    });

    const onSubmit = async (formData: PostFormType) => {
        try {
            const sectionsWithUrls = await processSections(formData.sections);

            updatePostMutation({
                postId: post._id,
                ...formData,
                sections: sectionsWithUrls,
            });
        } catch (error) {
            console.error("Error al subir imágenes de secciones:", error);
            toast.error("Error al procesar imágenes de secciones");
        }
    };

    const nextStep = async () => {
        if (currentStep === 1) {
            const isValid = await trigger(["title", "content"]);
            if (!isValid) return;
        }

        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <>
            <header className="flex flex-col items-center justify-center py-4 min-w-full md:min-w-xl max-w-full mx-auto text-center mb-4">
                <div className="flex items-center w-full">
                    <h1 className="h1-style grow">Edición de un artículo</h1>
                </div>
                <p className="text-balance text-gray-500 font-light mt-2">
                    Puedes editar el artículo paso a paso. {''}
                    <span className="font-bold">Cambiando la información en cada sección.</span>
                </p>
            </header>

            <div className="flex gap-2 w-full max-w-2xl mx-auto my-4">
                {steps.map(step => (
                    <div className="grow h-1 relative" key={step.step}>
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${step.step <= currentStep ? 'w-full bg-green-500' : 'bg-gray-300'}`}
                        ></div>
                        <button
                            onClick={() => setCurrentStep(step.step)}
                            className={`flex cursor-pointer flex-col items-center justify-center transition-all duration-600 absolute -top-4 right-0 rounded-full p-2 ${step.step <= currentStep ? 'bg-green-500 text-green-50' : 'bg-gray-200 text-gray-500'} hover:scale-110`}
                        >
                            {step.icon}
                        </button>
                    </div>
                ))}
            </div>

            <form className="w-full max-w-2xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
                {steps[currentStep - 1].component}

                <div className="flex items-center justify-between mt-8">
                    {currentStep > 1 ? (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                        >
                            <FiChevronLeft /> Anterior
                        </button>
                    ) : (
                        <Link to={'/dashboard/post'}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"

                        >
                            Cancelar
                        </Link>
                    )}

                    {currentStep < totalSteps ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="btn-primary flex items-center justify-center gap-2"
                        >
                            Siguiente <FiChevronRight />
                        </button>
                    ) : (
                        <input
                            type="submit"
                            disabled={isUpdatingPost || uploadImagesMutation.isPending}
                            value={
                                isUpdatingPost ? "Actualizando..." :
                                    uploadImagesMutation.isPending ? "Subiendo imágenes..." :
                                        "Confirmar cambios"
                            }
                            className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
                        />
                    )}
                </div>
            </form>
        </>
    );
}