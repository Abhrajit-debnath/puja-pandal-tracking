
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

export const apiClient = {
    get: async (url: string, options?: RequestInit) => {
        const response = await fetch(`${BASE_URL}${url}`, { ...options, method: 'GET' });
        return await response.json();
    }

    ,

    post: async (url: string, body: any, options?: RequestInit) => {
        const response = await fetch(url, {
            ...options,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(options?.headers || {}),
            },
            body: JSON.stringify(body),
        });
        return response.json();
    }
}