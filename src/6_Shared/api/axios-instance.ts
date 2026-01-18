import axios from 'axios';
import { RoutePath } from '6_Shared/config/routerConfig/routerConfig';

// @ts-ignore
const baseURL = __API__;

export const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403) &&
            error.config &&
            !error.config._isRetry &&
            originalRequest.url !== '/auth/login'
        ) {
            originalRequest._isRetry = true;
            try {
                await axiosInstance.post('/auth/refresh');
                return axiosInstance.request(originalRequest);
            } catch (e) {
                console.error('Refresh token expired or invalid');
                localStorage.removeItem('user_logged_in');
                localStorage.setItem('auth_error', 'session_expired');
                window.location.href = RoutePath.auth;
                return new Promise(() => {});
            }
        }
        throw error;
    }
);
