<template>
    <div class="px-2 my-4">
         <v-row dense >
            <v-col cols="12" md="6">
                <v-text-field
                    v-model="username"
                    variant="filled"
                    color="primary"
                    placeholder="ຊື່"
                    elevation="3"
                    prepend-inner-icon="mdi-account"
                    class="mx-4"
                ></v-text-field>
              
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field
                    v-model="phone"
                    variant="filled"
                    placeholder="ເບິໂທ"
                    color="primary"
                    elevation="3"
                    prepend-inner-icon="mdi-cellphone"
                    class="mx-4"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field
                    v-model="email"
                    variant="filled"
                    placeholder="ອີເມວ"
                    color="primary"
                    elevation="3"
                    prepend-inner-icon="mdi-email"
                    class="mx-4"
                ></v-text-field>
                <v-text-field
                    v-model="invit_code"
                    variant="filled"
                    placeholder="ລະຫັດຜູ້ແນະນຳ"
                    color="primary"
                    elevation="3"
                    prepend-inner-icon="mdi-star"
                    class="mx-4"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    variant="filled"
                    placeholder="ລະຫັດຜ່ານ"
                    color="primary"
                    elevation="3"
                    prepend-inner-icon="mdi-lock"
                    class="mx-4"
                ></v-text-field>
                <v-text-field
                    v-model="confirm_password"
                    variant="filled"
                    placeholder="ຢືນຢັນລະຫັດຜ່ານ"
                    color="primary"
                    elevation="3"
                    prepend-inner-icon="mdi-lock"
                    class="mx-4"
                ></v-text-field>
            </v-col>
            <v-textarea
                    v-model="address"
                    variant="filled"
                    placeholder="ທີຢູ່"
                    color="primary"
                    elevation="3"
                    prepend-inner-icon="mdi-map-marker"
                    class="mx-4"
                ></v-textarea>
         </v-row>
         <div>
            <v-card-actions class="d-flex align-center justify-center">
                <v-btn color="red" variant="outlined" size="large" width="185" class="rounded" to="/login">ຍົກເລິກ</v-btn>
                <v-btn color="primary" variant="elevated" size="large" width="185" class="rounded" elevation="0" @click="handleRegister">ລົງທະບຽນ</v-btn>
            </v-card-actions>
         </div>
         <v-dialog v-model="dialog" width="400">
            <v-card>
                <v-card-title class="d-flex align-center justify-center">
                    <h4>ເຂົ້າສູ່ລະບົບ</h4>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <p>ລະຫັດຜ່ານບໍ່ຖິກຕ້ອງ</p>
                </v-card-text>
                <v-card-actions class="d-flex align-center justify-center">
                    <v-btn color="primary" variant="text" size="small" width="185"   class="rounded" elevation="0" @click="dialog = false">ເຂົ້າສູ່ລະບົບ</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
 import { storeToRefs } from 'pinia'
import { useApiAuthStore } from '@/stores/apiAuth';
import { useApiRoleStore } from '@/stores/apiRole';

const apiRoleStore = useApiRoleStore()
const { roles } = storeToRefs(apiRoleStore)

const { register } = useApiAuthStore()
const { getRoles } = apiRoleStore

const dialog = ref(false)

const username = ref('huevang')
const phone = ref('02078849378')
const email = ref('huevang@gmail.com')
const invit_code = ref('')
const password = ref('huevang')
const confirm_password = ref('huevang')
const address = ref('')

onMounted(() => {
    getRoles()
})

const handleRegister = async () => {
    try {

        // check password not match return dialog error
        if (password.value !== confirm_password.value) {
            dialog.value = true
            return
        }

        const role_id = roles.value.find((role) => role.title === 'Beginner').id

        const data = {
            username: username.value,
            phone: phone.value,
            email: email.value,
            invit_code: invit_code.value,
            password: password.value,
            role_id: role_id,
            confirm_password: confirm_password.value,
            address: address.value
        }
        // console.log(data)
       await register(data)
    } catch (error) {
        console.log(error)
    }
}


</script>
