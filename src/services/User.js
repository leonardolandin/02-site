import { http } from '@/services/config'

export default {
    getUserLogged: (token) => {
        return http.post(`userLogged`, {token});
    },
    getUserByEmail: (objCredentials) => { 
        return http.post('login', objCredentials);
    },
    signUser: (userCredentials) => {
        return http.post('register', userCredentials);
    },
    sendEmailRemember: (email) => {
        return http.post('processNewTokenRemember', { email });
    },
    verifyTokenRemember: (token) => {
        return http.get(`verifyTokenRemember/${token}`);
    }
}