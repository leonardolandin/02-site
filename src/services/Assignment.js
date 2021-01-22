import { http } from '@/services/config'

export default {
    getAssignments: () => {
        return http.get('/');
    },
    sendAssignment: (assignment, userToken) => {
        return http.post('uploadAssignments', assignment, { headers: { 'Authorization': userToken } });
    },
    getAssignmentById: (idAssignment) => {
        return http.get(`/getAssignment/${idAssignment}`);
    },
    downloadImage: (url) => {
        return http.get(url, {responseType: 'arraybuffer'});
    }
}