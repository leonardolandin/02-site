import { http } from '@/services/config'

export default {
    getUserLogged: (token) => {
        return http.post(`auth/userLogged`, {token});
    },
    getUserByEmail: (objCredentials) => { 
        return http.post('auth/login', objCredentials);
    },
    signUser: (userCredentials) => {
        return http.post('auth/register', userCredentials);
    },
    sendEmailRemember: (email) => {
        return http.post('processNewTokenRemember', { email });
    },
    verifyTokenRemember: (token) => {
        return http.get(`verifyTokenRemember/${token}`);
    },
    resetPassword: (passwordObj, token) => {
        return http.post(`resetPassword/${token}`, passwordObj)
    }
}