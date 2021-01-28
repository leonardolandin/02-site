import { http } from '@/services/config'

export default {
    getAssignments: () => {
        return http.get('/');
    },
    sendAssignment: (assignment, userToken) => {
        return http.post('uploadAssignments', assignment, { headers: { 'Authorization': userToken } });
    },
    getAssignmentById: (idAssignment, token) => {
        return http.get(`/getAssignment/${idAssignment}`, { headers: { 'Authorization': token } });
    },
    downloadImage: (url) => {
        return http.get(url, {responseType: 'arraybuffer'});
    },
    likeAssignment: (assignment) => {
        return http.post('/likeAssignment', assignment)
    },
    favoriteAssignment: (assignment) => {
        return http.post('/favoriteAssignment', assignment)
    }
}