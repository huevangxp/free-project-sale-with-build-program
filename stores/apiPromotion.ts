import { defineStore } from 'pinia'

interface Promotion {
    id: number;
    image: string;
}

export const useApiPromotionStore = defineStore('apiPromotion', {
    state: () => ({
        promotions: [] as Promotion[],
    }),
    actions: {
        async fetchPromotions() {
          try {
            const { $axios } = useNuxtApp()
            const response = await $axios.get('/promotions')
            this.promotions = response.data.data
          } catch (error: any) {
            console.log(error)
          }
        },
    },
})
