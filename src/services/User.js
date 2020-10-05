import { http } from '@/services/config'

let config = {
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:8080'
    }
}

export default {
    getUserLogged: (token) => {
        return http.post(`userLogged`, {token});
    },
    getUserByEmail: (objCredentials) => { 
        return http.post('login', objCredentials, config);
    },
    signUser: (userCredentials) => {
        return http.post('register', userCredentials);
    }
}