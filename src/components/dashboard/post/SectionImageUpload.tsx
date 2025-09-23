import { Controller, Control, FieldPath } from "react-hook-form";
import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { PostFormType } from "@/types/postType";

type SectionImageUploadProps = {
  control: Control<PostFormType>;
  name: FieldPath<PostFormType>;
};

export default function SectionImageUpload({ control, name }: SectionImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className="mt-4">
          <label className="text-sm font-semibold text-gray-800">Imagen de sección</label>

          {!value ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onChange(file); // guardamos el File en RHF
                    setPreview(URL.createObjectURL(file));
                  }
                }}
                className="hidden"
                accept="image/*"
              />
              <p className="text-gray-500">Haz clic para seleccionar una imagen</p>
            </div>
          ) : (
            <div className="relative mt-4">
              <img
                src={preview || (value instanceof File ? URL.createObjectURL(value) : value as string)}
                alt="Preview sección"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  onChange(undefined);
                  setPreview(null);
                }}
                className="absolute cursor-pointer top-2 right-2 bg-red-100 text-red-800 rounded-full w-8 h-8 flex items-center justify-center"
              >
                <IoClose />
              </button>
            </div>
          )}
        </div>
      )}
    />
  );
}
