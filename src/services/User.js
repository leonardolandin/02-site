import { http } from '@/services/config'

export default {
    getUser: () => {
        return http.get('user');
    }
}