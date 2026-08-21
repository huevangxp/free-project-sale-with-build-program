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
        async plusQuantity(id:any) {
            try {
                const { $axios } = useNuxtApp()
                console.log(id)
                await $axios.put('/cart/plus-quantity/' + id)
                this.fetchCart()
            } catch (error: any) {
                console.log(error)
            }
        },
        async minusQuantity(id:any) {
            try {
                const { $axios } = useNuxtApp()
                await $axios.put('/cart/minus-quantity/' + id)
                this.fetchCart()
            } catch (error: any) {
                console.log(error)
            }
        },
        async deleteCart(id:any) {
            try {
                const { $axios } = useNuxtApp()
                await $axios.delete('/cart/' + id).
                then((res) => {
                    // console.log(res.data.order)
                   
                    this.fetchCart()
                })
            } catch (error: any) {
                console.log(error)
            }
        },
        async checkout(data: any) {
            try {

                const { $axios } = useNuxtApp()
                const orderId= useCookie('order_id')

              const res = await $axios.post('/cart/checkout', data)
                orderId.value = res.data.data.id;
                this.fetchCart()
            } catch (error: any) {
                console.log(error)
            }
        },
    },
})