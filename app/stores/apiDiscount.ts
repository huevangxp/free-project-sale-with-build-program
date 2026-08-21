import { defineStore } from 'pinia'

export const useApiDiscountStore = defineStore('apiDiscount', {
    state: () => ({
        discount: []
    }),
    actions: {
        async getDiscount(id: string) {
            try {
                const { $axios } = useNuxtApp()
                const response = await $axios.get('/set-profit/' + id)
                this.discount = response.data.data
            } catch (error) {
                console.log(error)
            }
        }
    }
})
