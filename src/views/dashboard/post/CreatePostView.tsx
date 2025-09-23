import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreatePost } from "@/hooks/useCreatePost";
import { PostFormType } from "@/types/postType";
import { FiChevronLeft, FiChevronRight, FiFileText, FiImage, FiTag } from "react-icons/fi";
import { MdBookmarkAdd } from "react-icons/md";
import StepOnePost from "@/components/dashboard/post/StepOnePost";
import StepTwoPost from "@/components/dashboard/post/StepTwoPost";
import StepThreePost from "@/components/dashboard/post/StepThreePost";
import StepFourPost from "@/components/dashboard/post/StepFourPost";
import { useNavigate } from "react-router-dom";

export default function CreatePostView() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
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

  const { handleSubmitPost, createPostMutation, uploadImagesMutation } =
    useCreatePost(reset, setCurrentStep, setPostImages, postImages);

  const steps = [
    { step: 1, title: "Contenido", icon: <FiFileText size={16} />, component: <StepOnePost control={control} register={register} errors={errors} /> },
    { step: 2, title: "Multimedia", icon: <FiImage size={16} />, component: <StepTwoPost images={postImages} setImages={setPostImages} /> },
    { step: 3, title: "Detalles", icon: <FiTag size={16} />, component: <StepThreePost register={register} errors={errors} setValue={setValue} watch={watch} /> },
    { step: 4, title: "Secciones", icon: <MdBookmarkAdd size={16} />, component: <StepFourPost control={control} register={register} errors={errors} /> }
  ];

  const nextStep = async () => {
    if (currentStep === 1) {
      const isValid = await trigger(["title", "content", "category"]);
      if (!isValid) return;
    }
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <header className="text-center py-4 mb-4">
        <h1 className="h1-style">Creación de un artículo</h1>
        <p className="text-gray-500 mt-2">Completa todos los pasos <span className="font-bold">y el artículo será creado.</span></p>
      </header>

      {/* Barra de progreso */}
      <div className="flex gap-2 w-full max-w-2xl mx-auto my-4">
        {steps.map(step => (
          <div className="grow h-1 relative" key={step.step}>
            <div className={`h-full rounded-full transition-all duration-500 ${step.step <= currentStep ? 'w-full bg-green-500' : 'bg-gray-300'}`}></div>
            <div className={`absolute -top-4 right-0 p-2 rounded-full ${step.step <= currentStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {step.icon}
            </div>
          </div>
        ))}
      </div>

      <form className="w-full max-w-2xl mx-auto" onSubmit={handleSubmit(handleSubmitPost)}>
        {steps[currentStep - 1].component}

        <div className="flex items-center justify-between mt-8">
          {currentStep > 1 ? (
            <button type="button" onClick={prevStep} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer">
              <FiChevronLeft /> Anterior
            </button>
          ) : (
            <button type="button" onClick={() => navigate('/dashboard/post')} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer">Cancelar</button>
          )}

          {currentStep < steps.length ? (
            <button type="button" onClick={nextStep} className="btn-primary flex items-center gap-2">
              Siguiente <FiChevronRight />
            </button>
          ) : (
            <input
              type="submit"
              disabled={createPostMutation.isPending || uploadImagesMutation.isPending}
              value={
                createPostMutation.isPending ? "Publicando..." :
                  uploadImagesMutation.isPending ? "Subiendo imágenes..." : "Confirmar"
              }
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50 cursor-pointer"
            />
          )}
        </div>
      </form>
    </>
  );
}
