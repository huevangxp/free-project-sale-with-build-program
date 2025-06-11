import { defineStore } from 'pinia'

export const useApiAuthStore = defineStore('apiAuth', {
    state: () => ({
        authenticated: false
    }),
    actions: {
      async  register(user:any) {
            try {
                const { $axios } = useNuxtApp()
                console.log(user)
                  await $axios.post('/users/register', user)
                  .then((res) => {
                    navigateTo('/login')
                  })
            } catch (error) {
                console.log(error)
            }
        },
        async login(user:any) {
            try {
                const { $axios } = useNuxtApp()

                const token = useCookie('token');
                const userId = useCookie('id');
                const userRole = useCookie('role');
                const userPhone = useCookie('phone');
                const email = useCookie('email');


                  await $axios.post('/users/login', user)
                  .then((res) => {
                    token.value = res.data.token;
                    userId.value = res.data.user.id;
                    userRole.value = res.data.user.role;
                    userPhone.value = res.data.user.phone;
                    email.value = res.data.user.email;

                    console.log(res.data.user, res.data.token)
                    // check if have token in cookie
                    // if (token.value !== null) {
                        this.authenticated = true;
                        navigateTo('/profile')
                    // }
                    

                  })
            } catch (error) {
                console.log(error)
            }
        },
    },
})
