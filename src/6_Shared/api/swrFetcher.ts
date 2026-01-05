import { $api } from './api';

export const swrFetcher = async (url: string) => {
    const response = await $api(url);
    
    if (!response.ok) {
        const error = new Error('An error occurred while fetching the data.');
        // Добавляем дополнительные сведения к объекту ошибки.
        (error as any).info = await response.json();
        (error as any).status = response.status;
        throw error;
    }

    return response.json();
};
