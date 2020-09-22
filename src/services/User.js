import { http } from '@/services/config'

export default {
    getUserLogged: (token) => {
        return http.get(`userLogged/${token}`);
    },
    getUserByEmail: (objCredentials) => { 
        return http.post('login', objCredentials)
    }
}