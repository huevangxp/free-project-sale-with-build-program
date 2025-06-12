import { defineStore } from 'pinia'

export const useApiCartStore = defineStore('apiCart', {
    state: () => ({
        cart: [] as any[],
    }),
    actions: {
        async addCart(data:any) {
            try {
                const { $axios } = useNuxtApp()
               await $axios.post('/cart', data)
               .then((res) => {
                // console.log(res.data)
               })
                
            } catch (error: any) {
                console.log(error)
            }
        },
        async fetchCart() {
            try {
                const { $axios } = useNuxtApp()
                const id = useCookie('id')
                // console.log(first)
                const response = await $axios.get(`/carts/${id.value}`)
                this.cart = response.data
                // console.log(this.cart)
                // console.log(response.data)
            } catch (error: any) {
                console.log(error)
            }
        },
    },
})