import { Token } from '@/utils/types';

export const setAccessAndRefreshToken = (token: Token) => {
    if (token.accessToken && token.refreshToken) {
        localStorage.setItem('accessToken', token.accessToken)
        localStorage.setItem('refreshToken', token.refreshToken)
    }
}

export const getAccessAndRefreshToken = () => {

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    return { accessToken, refreshToken }
}

export const removeAccessAndRefreshToken = () => {
    localStorage.clear()
}

