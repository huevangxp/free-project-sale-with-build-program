import { defineStore } from 'pinia'

interface Roles {
    id: number;
    name: string;
}

export const useApiRoleStore = defineStore('apiRole', {
    state: () => ({
       roles: [] as Roles[]
    }),
    actions: {
      async  getRoles() {
            try {
                const { $axios } = useNuxtApp()
                  await $axios.get('/roles')
                  .then((res) => {
                    this.roles = res.data.roles
                  })
            } catch (error) {
                console.log(error)
            }
        },
    },
})
