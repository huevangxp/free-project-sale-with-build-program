import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    const api = axios.create({
        baseURL: 'http://localhost:8000/api/v1',
        // headers: {
        //     'Content-Type': 'application/json',
        // },

        headers: {
            'Authorization': `LFV ${useCookie('token').value}`,
        },
 
    })

    return {
        provide: {
            axios: api,
        }
    }

})