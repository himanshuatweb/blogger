let baseURL = import.meta.env.VITE_APP_DEV_URL;

if (import.meta.env.NODE_ENV === 'production') {
    baseURL = import.meta.env.VITE_APP_PROD_URL;
}

export { baseURL };