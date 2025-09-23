import { useState } from "react";
import { createPost, uploadPostImages } from "@/API/PostAPI";
import StepOnePost from "@/components/dashboard/post/StepOnePost";
import { PostFormType } from "@/types/postType";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FiChevronLeft, FiChevronRight, FiTag, FiFileText, FiImage } from "react-icons/fi";
import StepThreePost from "@/components/dashboard/post/StepThreePost";
import StepTwoPost from "@/components/dashboard/post/StepTwoPost";
import { useNavigate } from "react-router-dom";
import StepFourPost from "@/components/dashboard/post/StepFourPost";
import { MdBookmarkAdd } from "react-icons/md";
import { uploadImageToCloudinary } from "@/utils/cloudinary";

export default function CreatePostView() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate()
  const [postImages, setPostImages] = useState<Array<{ file: File; preview: string }>>([]);

  const defaultValues: PostFormType = {
    title: "",
    content: "",
    category: "",
    tags: [],
    status: "draft",
    sections: []
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
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
      component: <StepTwoPost images={postImages} setImages={setPostImages} />
    },
    {
      step: 3,
      title: "Detalles",
      icon: <FiTag size={16} />,
      component: <StepThreePost register={register} errors={errors} setValue={setValue} watch={watch} />
    },
    {
      step: 4,
      title: "Secciones",
      icon: <MdBookmarkAdd size={16} />,
      component: <StepFourPost control={control} register={register} errors={errors} />
    }
  ];

  const totalSteps = steps.length;

  // Mutación para crear el post
  const { mutate: createPostMutation, isPending: isCreatingPost } = useMutation({
    mutationFn: createPost,
    onError: () => {
      toast.error('Revisa que los campos obligatorios esten completados (Titulo, Contenido, Categoria)');
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

  // Mutación para subir imágenes
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

  const onSubmit = async (formData: PostFormType) => {
    try {
      // 1. Subir imágenes de las secciones
      const sectionsWithUrls = await Promise.all(
        formData.sections.map(async (section) => {
          if (section.thumbnail && section.thumbnail instanceof File) {
            const url = await uploadImageToCloudinary(section.thumbnail);
            return { ...section, thumbnail: url };
          }
          return section;
        })
      );
  
      const finalData = {
        ...formData,
        sections: sectionsWithUrls,
      };
  
      // 2. Crear el post en el backend
      createPostMutation(finalData);
  
    } catch (error) {
      console.error("Error al subir imágenes de secciones:", error);
      toast.error("Error al procesar imágenes de secciones");
    }
  };
  const nextStep = async () => {
    if (currentStep === 1) {
      const isValid = await trigger(["title", "content", "category"]);
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
          <h1 className="h1-style grow">Creación de un artículo</h1>
        </div>
        <p className="text-balance text-gray-500 font-light mt-2">
          Completa todos los pasos {''}
          <span className="font-bold">y el artículo será creado.</span>
        </p>
      </header>

      <div className="flex gap-2 w-full max-w-2xl mx-auto my-4">
        {steps.map(step => (
          <div className="grow h-1 relative" key={step.step}>
            <div
              className={`h-full rounded-full transition-all duration-500 ${step.step <= currentStep ? 'w-full bg-green-500' : 'bg-gray-300'}`}
            ></div>
            <div className={`flex flex-col items-center justify-center transition-all duration-600 absolute -top-4 right-0 rounded-full p-2 ${step.step <= currentStep ? 'bg-green-500 text-green-50' : 'bg-gray-200 text-gray-500'}`}>
              {step.icon}
            </div>
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
            <div></div>
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
              disabled={isCreatingPost || uploadImagesMutation.isPending}
              value={
                isCreatingPost ? "Publicando..." :
                  uploadImagesMutation.isPending ? "Subiendo imágenes..." :
                    "Confirmar"
              }
              className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
            />
          )}
        </div>
      </form>
    </>
  );
}