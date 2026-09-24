export const apiClient = {
    get: async (url: string, options?: RequestInit) => {
        const response = await fetch(url, { ...options, method: 'GET' });
        return response.json();
    }

    ,

    post: async (url: string, body: any, options?: RequestInit) => {

        const response = await fetch(url, { ...options, method: 'POST', body: JSON.stringify(body) });
        return response.json();

    }
}