import { axiosInstance } from './axios-instance';

export const $api = async (endpoint: string, options: RequestInit = {}) => {
    const { method = 'GET', body, headers } = options;

    const configHeaders: Record<string, string> = {};
    if (headers) {
        Object.assign(configHeaders, headers);
    }

    try {
        const response = await axiosInstance({
            url: endpoint,
            method,
            data: body,
            headers: configHeaders,
        });

        return {
            ok: true,
            status: response.status,
            statusText: response.statusText,
            json: async () => response.data,
            text: async () => JSON.stringify(response.data),
            headers: response.headers,
        };
    } catch (error: any) {
        if (error.response) {
            return {
                ok: false,
                status: error.response.status,
                statusText: error.response.statusText,
                json: async () => error.response.data,
                text: async () => JSON.stringify(error.response.data),
                headers: error.response.headers,
            };
        }
        throw error;
    }
};