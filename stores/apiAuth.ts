import { defineStore } from 'pinia'

interface Profile {
    id: number;
    username: string;
    email: string;
    phone: string;
    status: string;
    avatar: string;
    role: string;
    code: string;
}

export const useApiAuthStore = defineStore('apiAuth', {
    state: () => ({
        authenticated: false,
        profile: {} as Profile,
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
        async logout() {
            try {
                const { $axios } = useNuxtApp()
                const token = useCookie('token')
                const userId = useCookie('id')
                const userRole = useCookie('role')
                const userPhone = useCookie('phone')
                const email = useCookie('email')

                token.value = null
                userId.value = null
                userRole.value = null
                userPhone.value = null
                email.value = null

                this.authenticated = false
                navigateTo('/login')
            } catch (error) {
                console.log(error)
            }
        },
        async  getProfile() {
            try {
                const { $axios } = useNuxtApp()
                const id = useCookie('id')
                const response = await $axios.get('/profile/' + id.value)
                this.profile = response.data.data
                console.log(this.profile)
            } catch (error) {
                console.log(error)
            }
        },
        async changePassword(id:any,data:any) {
            try {
                const { $axios } = useNuxtApp()
                await $axios.put('/update-password/' + id, data)
                alert('ປ່ຽນລະຫັດຜ່ານສຳເລັດ')
                navigateTo('/profile')
            } catch (error) {
                console.log(error)
            }
        }
    },
})
