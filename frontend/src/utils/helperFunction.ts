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

export function titleize(slug:string) {
    var words = slug.split("-");
    return words.map(function(word) {
      return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    }).join(' ');
  }

