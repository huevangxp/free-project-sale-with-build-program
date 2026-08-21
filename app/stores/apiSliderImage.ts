import { defineStore } from 'pinia'

interface Image {
    id: number;
    image: string;
}

export const useApiSliderImageStore = defineStore('apiSliderImage', {
    state: () => ({
        image: [] as Image[],
    }),
    actions: {
        async fetchSliderImages() {
          try {
            const { $axios } = useNuxtApp()
            const response = await $axios.get('/slider-image')
            this.image = response.data.data
          } catch (error: any) {
            console.log(error)
          }
        },
    },
})
