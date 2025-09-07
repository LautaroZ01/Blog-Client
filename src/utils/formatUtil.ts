export function formatDate(isoString: string): string {
    const date = new Date(isoString);
    const now = new Date();

    // Verificar si la fecha es hoy
    const isToday = now.toDateString() === date.toDateString();

    // Formatear la hora en formato de 12 horas
    const timeFormatter = new Intl.DateTimeFormat('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    // Formatear la fecha si no es hoy
    const dateFormatter = new Intl.DateTimeFormat('es-ES', {
        year: '2-digit',
        month: 'short',
        day: 'numeric'
    });

    if (isToday) {
        // Si es hoy, solo mostrar la hora
        return timeFormatter.format(date);
    } else {
        // Si no es hoy, mostrar la fecha y la hora
        return `${dateFormatter.format(date)} a las ${timeFormatter.format(date)}`;
    }
}

export function formatBirthdate(dateInput: Date): string {

    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
    });
}

export function formatAge(dateInput: Date): string {
    const today = new Date();
    const birthDate = new Date(dateInput);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age.toString();
}

export const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64Image = reader.result;
            if (typeof base64Image === 'string') {
                // Extraemos solo la parte después de la coma
                const base64Data = base64Image.split(',')[1];
                resolve(base64Data);
            } else {
                reject(new Error('No se pudo convertir la imagen a base64'));
            }
        };

        reader.onerror = () => {
            reject(new Error('Error al leer el archivo'));
        };

        reader.readAsDataURL(file);
    });
};