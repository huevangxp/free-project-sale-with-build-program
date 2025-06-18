import { defineStore } from 'pinia'

export const useApiOrderStore = defineStore('apiOrder', {
    state: () => ({
        orders: [] as any[],
        order: {} as any,
    }),
    actions: {
        async getOrders() {
            try {
                const { $axios } = useNuxtApp()
                const id = useCookie('id')
                // console.log(first)
                const response = await $axios.get(`/orders/${id.value}`)
                this.orders = response.data.orders
                // console.log(this.order)
                console.log(response.data.orders)
            } catch (error: any) {
                console.log(error)
            }
        },
        async getOrderId() {
            try {
                const { $axios } = useNuxtApp()
                const id = useCookie('order_id')
                // console.log(first)
                const response = await $axios.get(`/order/${id.value}`)
                this.order = response.data.data
                // console.log(this.order)
            } catch (error: any) {
                console.log(error)
            }
        },
        async orderPayment(data:any) {
            try {
                const { $axios } = useNuxtApp()
                
                const formData = new FormData()
                formData.append('file', data.image)

                await $axios.post('/orders/payment/' + data.id, formData).
                then((res) => {
                   navigateTo('/')
                })
            } catch (error: any) {
                console.log(error)
            }
        }
    },
})
