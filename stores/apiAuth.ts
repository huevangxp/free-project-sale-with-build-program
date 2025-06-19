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
    id_card: string;
    bank_account: string;
    address: string;
    bank_image: string;
    id_card_image: string;
}

export const useApiAuthStore = defineStore('apiAuth', {
    state: () => ({
        authenticated: false,
        profile: {} as Profile,
        team: 0,
        teams: [] as Profile[],
        allTeams: [] as Profile[],
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
                const userCode = useCookie('code');
                const userPhone = useCookie('phone');
                const email = useCookie('email');


                  await $axios.post('/users/login', user)
                  .then((res) => {
                    token.value = res.data.token;
                    userId.value = res.data.user.id;
                    userRole.value = res.data.user.role;
                    userCode.value = res.data.user.code;
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
        },
        async getTeamByMycodeInvite() {
            try {
                const { $axios } = useNuxtApp()
                const code = useCookie('code')
                const response = await $axios.get(`/users-team?invit_code=${code.value}`)
                // console.log(response.data.data.length)
                this.team = response.data.data.length
                this.teams = response.data.data
            } catch (error) {
                console.log(error)
            }
        },
        async updateProfileAvatar(id:any,data:any) {
            try {
                const { $axios } = useNuxtApp()

                const formData = new FormData()
                formData.append('file', data)

                await $axios.put('/users/add-avatar/' + id, formData)
                alert('ປ່ຽນຮູບສຳເລັດ')
                // navigateTo('/profile')
            } catch (error) {
                console.log(error)
            }
        },
        async updateProfileBankAccount(id:any,data:any) {
            try {
                const { $axios } = useNuxtApp()

                const formData = new FormData()
                formData.append('file', data)

                await $axios.put('/users/add-bank-image/' + id, formData)
                alert('ປ່ຽນຮູບສຳເລັດ')
            } catch (error) {
                console.log(error)
            }
        },
        async updateProfileIdCard(id:any,data:any) {
            try {
                const { $axios } = useNuxtApp()

                const formData = new FormData()
                formData.append('file', data)

                await $axios.put('/users/add-id-card-image/' + id, formData)
                alert('ປ່ຽນຮູບສຳເລັດ')
            } catch (error) {
                console.log(error)
            }
        },
        async getAllTeam() {
            try {
                const { $axios } = useNuxtApp()
                const response = await $axios.get('/users')
                //  console.log(response.data.data)
                 this.allTeams = response.data.data
            } catch (error) {
                console.log(error)
            }
        },
        async updateUserInfo(id:any,data:any) {
            try {
                const { $axios } = useNuxtApp()
                await $axios.put('/users/update-info/' + id, data)
                .then((res) => {
                    console.log(res.data)
                    alert('ປ່ຽນຂໍ້ມູນສຳເລັດ')
                }).catch((error) => {
                  alert('ປ່ຽນຂໍ້ມູນບໍ່ສຳເລັດ')
                })
                 
                // navigateTo('/profile')
            } catch (error) {
                console.log(error)
            }
        }
        
    },
})
