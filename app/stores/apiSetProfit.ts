import { defineStore } from 'pinia'

export const useApiSetProfitStore = defineStore('apiSetProfit', {
    state: () => ({
        profit: [] as any[]
    }),
    actions: {
        async setProfit() {
            try {

                const { $axios } = useNuxtApp()

                await $axios.get('/set-profit')
                .then((res) => {
                    // console.log(res.data)
                    this.profit = res.data.data
                })
                .catch((error) => {
                    console.log(error)
                })
                
            } catch (error) {
                console.log(error)
            }
        }
    }
})
