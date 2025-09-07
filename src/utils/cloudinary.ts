export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'blog_upload'); // Nombre EXACTO de tu preset
  
  // Solo necesitas el cloud_name para uploads unsigned
  formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Detalles del error:', {
        status: response.status,
        error: data
      });
      throw new Error(data.error.message || 'Error al subir la imagen');
    }

    return data.secure_url;
  } catch (error) {
    console.error('Error completo:', error);
    throw new Error('No se pudo subir la imagen. Por favor verifica la configuración.');
  }
};