import { useCallback, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface StepTwoPostProps {
    images: Array<{ file: File; preview: string }>;
    setImages: (images: Array<{ file: File; preview: string }>) => void;
    existingImages?: string[];
    onDeleteExistingImage?: (url: string) => void;
}

export default function StepTwoPost({
    images,
    setImages,
    existingImages = [],
    onDeleteExistingImage
}: StepTwoPostProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Maneja la selección de archivos
    const handleFileChange = useCallback((files: FileList | null) => {
        if (files && files.length > 0) {
            const newImages = Array.from(files)
                .filter(file => file.type.startsWith('image/'))
                .slice(0, 5 - (images.length + existingImages.length))
                .map(file => ({
                    file,
                    preview: URL.createObjectURL(file)
                }));

            setImages([...images, ...newImages]);
        }
    }, [images, setImages, existingImages.length]);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if ((images.length + existingImages.length) >= 5) return;

        const files = e.dataTransfer.files;
        handleFileChange(files);
    };

    // Eliminar imagen nueva
    const removeImage = (index: number) => {
        const newImages = [...images];
        URL.revokeObjectURL(newImages[index].preview);
        newImages.splice(index, 1);
        setImages(newImages);
    };

    // Eliminar imagen existente
    const removeExistingImage = (url: string) => {
        if (onDeleteExistingImage) {
            onDeleteExistingImage(url);
        }
    };

    // Click en el área de drop
    const handleClick = () => {
        if ((images.length + existingImages.length) < 5 && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const totalImages = images.length + existingImages.length;

    return (
        <div className="container mx-auto p-4">
            <div
                onClick={handleClick}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    } ${totalImages >= 5 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e.target.files)}
                    className="hidden"
                    accept="image/*"
                    multiple
                    disabled={totalImages >= 5}
                />

                {totalImages >= 5 ? (
                    <p>Has alcanzado el límite de 5 imágenes</p>
                ) : isDragging ? (
                    <p>Suelta las imágenes aquí...</p>
                ) : (
                    <div>
                        <p>Arrastra y suelta imágenes aquí, o haz clic para seleccionar</p>
                        <p className="text-sm text-gray-500">Máximo 5 imágenes (actual: {totalImages})</p>
                    </div>
                )}
            </div>

            {(totalImages > 0) && (
                <div className="mt-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-medium mb-2">Imagen principal</h3>
                        <div className="relative">
                            {existingImages.length > 0 ? (
                                <>
                                    <img
                                        src={existingImages[0]}
                                        alt="Preview principal existente"
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <button
                                        onClick={() => removeExistingImage(existingImages[0])}
                                        type='button'
                                        className="absolute cursor-pointer top-2 right-2 bg-red-100 text-red-800 rounded-full w-8 h-8 flex items-center justify-center"
                                    >
                                        <IoClose />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <img
                                        src={images[0].preview}
                                        alt="Preview principal nueva"
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <button
                                        onClick={() => removeImage(0)}
                                        type='button'
                                        className="absolute cursor-pointer top-2 right-2 bg-red-100 text-red-800 rounded-full w-8 h-8 flex items-center justify-center"
                                    >
                                        <IoClose />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {(existingImages.length > 1 || images.length > (existingImages.length === 0 ? 1 : 0)) && (
                        <div>
                            <h3 className="text-lg font-medium mb-2">
                                Imágenes secundarias (
                                {(existingImages.length > 1 ? existingImages.length - 1 : 0) +
                                    (images.length > (existingImages.length === 0 ? 1 : 0) ? images.length - (existingImages.length === 0 ? 1 : 0) : 0)}
                                )
                            </h3>
                            <div className="grid grid-cols-4 gap-2">
                                {existingImages.slice(1).map((image, index) => (
                                    <div key={`existing-${index}`} className="relative">
                                        <img
                                            src={image}
                                            alt={`Preview existente ${index + 1}`}
                                            className="w-full h-24 object-cover rounded-lg"
                                        />
                                        <button
                                            onClick={() => removeExistingImage(image)}
                                            type='button'
                                            className="absolute cursor-pointer top-1 right-1 bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                        >
                                            <IoClose />
                                        </button>
                                    </div>
                                ))}

                                {/* Mostrar imágenes nuevas secundarias */}
                                {images.slice(existingImages.length === 0 ? 1 : 0).map((image, index) => (
                                    <div key={`new-${index}`} className="relative">
                                        <img
                                            src={image.preview}
                                            alt={`Preview nueva ${index + 1}`}
                                            className="w-full h-24 object-cover rounded-lg"
                                        />
                                        <button
                                            onClick={() => removeImage(index + (existingImages.length === 0 ? 1 : 0))}
                                            type='button'
                                            className="absolute cursor-pointer top-1 right-1 bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                        >
                                            <IoClose />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}