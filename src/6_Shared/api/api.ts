export const $api = async (endpoint: string, options: RequestInit = {}) => {
    // Токен теперь передается автоматически через куки (HttpOnly),
    // поэтому нам не нужно доставать его из localStorage и добавлять в хедер.

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    } as Record<string, string>;

    const response = await fetch(`${__API__}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include', // это заставляет браузер отправлять куки
    });

    if (response.status === 401 || response.status === 403) {
        // если сервер вернул 401, значит кука протухла или невалидна
        localStorage.removeItem('user_logged_in');
        // Опционально: редирект
        // window.location.href = '/auth';
    }

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response;
};
