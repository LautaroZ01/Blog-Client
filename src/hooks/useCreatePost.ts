import { useMutation } from "@tanstack/react-query";
import { createPost, uploadPostImages } from "@/API/PostAPI";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import { PostFormType } from "@/types/postType";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type PostImage = { file: File; preview: string };

export function useCreatePost(reset: () => void, setCurrentStep: (n: number) => void, setPostImages: (imgs: PostImage[]) => void, postImages: PostImage[]) {
    const navigate = useNavigate();

    const uploadImagesMutation = useMutation({
        mutationFn: uploadPostImages,
        onError: (error) => {
            toast.error(`Post creado pero error al subir imágenes: ${error.message}`);
        },
        onSuccess: () => {
            toast.success("Articulo creado exitosamente");
            reset();
            navigate('/dashboard/post');
        }
    });

    const createPostMutation = useMutation({
        mutationFn: createPost,
        onError: () => {
            toast.error('Revisa que los campos obligatorios estén completados (Titulo, Contenido, Categoria)');
        },
        onSuccess: (data) => {
            if (postImages.length > 0) {
                uploadImagesMutation.mutate({
                    postId: data.postId,
                    images: postImages.map(img => img.file)
                });
            } else {
                toast.success("Articulo creado exitosamente");
                reset();
                setCurrentStep(1);
                setPostImages([]);
            }
        }
    });

    const handleSubmitPost = async (formData: PostFormType) => {
        try {
            const sectionsWithUrls = await Promise.all(
                formData.sections.map(async (section) => {
                    if (section.thumbnail && section.thumbnail instanceof File) {
                        const url = await uploadImageToCloudinary(section.thumbnail);
                        return { ...section, thumbnail: url };
                    }
                    return section;
                })
            );

            createPostMutation.mutate({
                ...formData,
                sections: sectionsWithUrls,
            });
        } catch (error) {
            console.error("Error al subir imágenes de secciones:", error);
            toast.error("Error al procesar imágenes de secciones");
        }
    };

    return {
        handleSubmitPost,
        createPostMutation,
        uploadImagesMutation
    };
}
