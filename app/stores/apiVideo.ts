import { defineStore } from 'pinia'

interface Video {
    id: number;
    title: string;
    video_id: string;
    link: string;
    createdAt: string;
    updatedAt: string;
}

export const useApiVideoStore = defineStore('apiVideo', {
    state: () => ({
        videos: [] as Video[],
    }),
    actions: {
        async addVideo(data:any) {
            try {
                const { $axios } = useNuxtApp()
               await $axios.post('/video-links', data)
               .then((res) => {
                // console.log(res.data)
                alert('ເພີ່ມວິດີໂອສຳເລັດ')
                navigateTo('/profile/video')
               })
                
            } catch (error: any) {
                console.log(error)
            }
        },
        async fetchVideos() {
            try {
                const { $axios } = useNuxtApp()
                const response = await $axios.get('/video-links')
                this.videos = response.data.data
                // console.log(response.data)
            } catch (error: any) {
                console.log(error)
            }
        },
    },
})