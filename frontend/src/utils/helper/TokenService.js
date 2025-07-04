
export const CurrentToken = {
    get : () => localStorage.getItem('auth_token'),
    set : (token) => localStorage.setItem('auth_token', token),
    remove : () => localStorage.removeItem('auth_token')
}
