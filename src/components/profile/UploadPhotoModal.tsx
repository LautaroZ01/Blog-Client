import Modal from "../ui/Modal";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useRef, ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfilePhoto } from "@/API/UserAPI";
import { toast } from "react-toastify";

import {
    IoCloudUploadOutline,
    IoDownloadOutline,
    IoDownload,
    IoImagesOutline,
    IoSwapHorizontal
} from 'react-icons/io5';
import { convertImageToBase64 } from "@/utils/formatUtil";

export default function UploadPhotoModal() {
    const navigate = useNavigate();
    const [dragging, setDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null);

    const toggleClose = () => {
        navigate(location.pathname, { replace: true });
    };

    const handleImageUpload = async (file: File) => {
        if (!file) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result as string;
            setPreview(base64Image);
        };
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            handleImageUpload(file);
        }
    };

    const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            handleImageUpload(file);
        }
    }, []);

    const handleClickUpload = () => {
        fileInputRef.current?.click();
    };

    const queryClient = useQueryClient()


    const { mutate } = useMutation({
        mutationFn: updateProfilePhoto,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            setIsLoading(false)
            queryClient.invalidateQueries({ queryKey: ['user'] })
            queryClient.invalidateQueries({ queryKey: ['profile'] })
            toggleClose()
        }
    })

    const handleSave = () => {
        setIsLoading(true)
        if (!selectedFile) return;

        convertImageToBase64(selectedFile)
            .then((base64Data) => {
                mutate(base64Data)
            })
    };

    return (
        <Modal title="Subir avatar">
            <section className="p-4">
                <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${dragging
                        ? 'border-blue-500 bg-blue-50/50'
                        : 'border-gray-300 hover:border-blue-400'
                        }`}
                    onClick={handleClickUpload}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    {preview ? (
                        <div className="flex flex-col items-center">
                            <div className="relative mb-4">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="max-h-48 max-w-full rounded-md shadow-sm"
                                />
                                <div className="absolute inset-0 bg-black/10 rounded-md flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <div className="bg-white/90 p-2 rounded-full">
                                        <IoCloudUploadOutline className="text-blue-500 text-2xl" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 flex items-center justify-center gap-1">
                                <IoSwapHorizontal className="text-gray-500" />
                                Haz clic o arrastra otra imagen para cambiar
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-center mb-3">
                                <div className="p-3 bg-blue-100 rounded-full text-blue-500">
                                    {dragging ? (
                                        <IoDownload className="text-2xl" />
                                    ) : (
                                        <IoCloudUploadOutline className="text-2xl" />
                                    )}
                                </div>
                            </div>
                            <p className="text-gray-600">
                                {dragging ? (
                                    <>
                                        <IoDownloadOutline className="inline mr-1" />
                                        Suelta la imagen aquí
                                    </>
                                ) : (
                                    'Arrastra y suelta una imagen aquí, o haz clic para seleccionar'
                                )}
                            </p>
                            <p className="text-sm text-gray-500 mt-2 flex items-center justify-center gap-1">
                                <IoImagesOutline />
                                Formatos soportados: JPG, PNG, GIF
                            </p>
                        </>
                    )}
                </div>
            </section>

            <footer className="flex gap-3 items-center justify-end p-4 border-t border-gray-200">
                <button
                    onClick={toggleClose}
                    className="btn-secundary"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleSave}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-400"
                    disabled={!selectedFile || isLoading}
                >
                    {isLoading ? 'Subiendo...' : 'Guardar'}
                </button>
            </footer>
        </Modal>
    );
}