import { http } from '@/services/config'

export default {
    getAssignments: () => {
        return http.get('/')
    }
}