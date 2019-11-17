import client from './api-client'

const localStorageKey = 'token';

function handleUserResponse(obj: any) {
    window.localStorage.setItem(localStorageKey, obj.access_token);
    return obj;
}

function getUser() {
    const token = getToken();
    if (!token) {
        return Promise.resolve(null)
    }
    return client('me').catch(error => {
        logout();
        return Promise.reject(error)
    })
}

function login({email, password}: any) {
    return client('login', {body: {email, password}}).then(handleUserResponse)
}

function register({playerName, email, password}: any) {
    return client('register', {body: {email, password, playerName}}).then(
        handleUserResponse,
    )
}

function logout() {
    window.localStorage.removeItem(localStorageKey);
    return Promise.resolve()
}

function getToken() {
    return window.localStorage.getItem(localStorageKey)
}

export {login, register, logout, getToken, getUser}
