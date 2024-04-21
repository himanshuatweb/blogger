import axios, { AxiosRequestConfig } from 'axios';
import { redirect } from "react-router-dom";
import { baseURL } from './config';
import { Token } from '@/utils/types';
import { removeAccessAndRefreshToken, setAccessAndRefreshToken } from '@/utils/helperFunction';


// Function to create a custom Axios instance
function createCustomAxios() {
    let tokens: Token = {
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
    };

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json'
        }
    });

    // Function to update tokens
    function updateTokens(newTokens: Token) {
        tokens = newTokens;
        setAccessAndRefreshToken(newTokens)
    }

    // Request interceptor - added accessToken in request
    axiosInstance.interceptors.request.use(
        (config) => {
            // Add access token to headers if available
            if (tokens?.accessToken) {
                config.headers.Authorization = `Bearer ${tokens.accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            // Check for access token expiration error
            if (error.response && error.response.status === 401) {
                //Check if refreshToken present in state and send 
                if (tokens.refreshToken) {
                    try {
                        // Attempt to refresh tokens and get new accessToken and refreshToken
                        const newAccessToken = await refreshTokensAPI();

                        //Now set new accessToken in Headers
                        error.config.headers.Authorization = `Bearer ${newAccessToken}`
                        return axiosInstance(error.config)
                    } catch (error) {
                        //Means refreshToken Error (refresh Token Expired)
                        console.log("Refresh Token Exprired ", error);
                        removeAccessAndRefreshToken();
                        redirect('/login')
                    }
                } else {
                    removeAccessAndRefreshToken();
                    redirect('/login')
                }

                // Retry the failed request- Not needed this functionality
                // return axiosInstance(error.config);
            }
            return Promise.reject(error);
        }
    );

    // Method to refresh tokens
    async function refreshTokensAPI() {
        try {
            // Make a request to refresh tokens using refresh token

            const response = await axios.post('/refreshToken', {
                refreshToken: tokens?.refreshToken,
            });
            // Update tokens
            if (response.data) {
                //Set accessToken and refreshToken in ls as well as reducer state.
                // tokens = response.data;

            }
            return response.data;
        } catch (error) {
            console.error('Failed to refresh tokens', error);
            // Handle token refresh failure
            removeAccessAndRefreshToken();
            redirect('/login')
        }
    }

    // Generic method for GET requests
    async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await axiosInstance.get<T>(url, config);
        return response.data;
    }

    // Generic method for POST requests
    async function post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await axiosInstance.post<T>(url, data, config);
        return response.data;
    }

    // Generic method for PUT requests
    async function put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await axiosInstance.put<T>(url, data, config);
        return response.data;
    }

    // Generic method for DELETE requests
    async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await axiosInstance.delete<T>(url, config);
        return response.data;
    }

    return {
        refreshTokensAPI,
        updateTokens,
        get,
        post,
        put,
        del,
    };
}

// Create a singleton instance of the custom Axios client
const api = createCustomAxios();

export default api;
