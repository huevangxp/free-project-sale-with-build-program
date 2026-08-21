import { defineStore } from 'pinia'

interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    createdAt: string;
    updatedAt: string;
}

export const useApiProductStore = defineStore('apiProduct', {
    state: () => ({
        products: [] as Product[],
    }),
    actions: {
        async fetchProducts() {
          try {
            const { $axios } = useNuxtApp()
            const response = await $axios.get('/products')
            this.products = response.data.data
          } catch (error: any) {
            console.log(error)
          }
        },
    },
})
