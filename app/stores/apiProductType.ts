import { defineStore } from 'pinia'

interface ProductType {
    id: number;
    name: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export const useApiProductTypeStore = defineStore('apiProductType', {
    state: () => ({
        types: [] as ProductType[],
    }),
    actions: {
        async fetchProductTypes() {
          try {
            const { $axios } = useNuxtApp()
            const response = await $axios.get('/categories')
            this.types = response.data.data
          } catch (error: any) {
            console.log(error)
          }
        },
    },
})
