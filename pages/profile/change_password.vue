<template>
    <div class="px-2 my-4">
        <v-card elevation="3" rounded="xl">
            <v-card-title class="bg-primary mb-4" dark>
                <h4>ປ່ຽນລະຫັດຜ່ານ</h4>
            </v-card-title>
            <v-card-text>
                <v-row dense>
                    <v-col cols="12">
                        <v-text-field v-model="password" placeholder="ລະຫັດຜ່ານເກົ່າ" variant="filled" color="primary" elevation="3"
                            :rules="[(v) => !!v || 'ກະລຸນາປ້ອນລະຫັດຜ່ານເກົ່າ']"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="new_password" placeholder="ລະຫັດຜ່ານໃໝ່" variant="filled" color="primary" elevation="3"
                            :rules="[(v) => !!v || 'ກະລຸນາປ້ອນລະຫັດຜ່ານໃໝ່']"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="confirm_password" placeholder="ຢືນຢັນລະຫັດຜ່ານໃໝ່" variant="filled" color="primary" elevation="3"
                            :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຢືນຢັນລະຫັດຜ່ານໃໝ່']"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="d-flex align-center justify-center pb-6">
                <v-btn color="red" variant="outlined" size="large" width="165" class="rounded-xl" @click="$router.back()">ຍົກເລິກ</v-btn>
                <v-btn color="primary" variant="elevated" size="large" width="165" class="rounded-xl"  @click="changePasswordBtn"> <v-icon size="20">mdi-reset</v-icon> ປ່ຽນລະຫັດຜ່ານ</v-btn>
            </v-card-actions>
          
        </v-card>
    </div>
</template>

<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { useApiAuthStore } from '@/stores/apiAuth'

const {changePassword} = useApiAuthStore()
// const { profile } = storeToRefs(apiAuthStore)

const password = ref('')
const new_password = ref('')
const confirm_password = ref('')

const changePasswordBtn = () => {
 try {

    if (!password.value || password.value.length < 6) {
      return alert('ກະລຸນາປ້ອນລະຫັດຜ່ານເກົ່າ (ຢ່າງນ້ອຍ 6 ຕົວອັກສອນ)')
    }
    
    // Validate new password
    if (!new_password.value || new_password.value.length < 6) {
      return alert('ກະລຸນາປ້ອນລະຫັດຜ່ານໃໝ່ (ຢ່າງນ້ອຍ 6 ຕົວອັກສອນ)')
    }
    
    // Validate confirm password
    if (!confirm_password.value || confirm_password.value.length < 6) {
      return alert('ກະລຸນາປ້ອນຢືນຢັນລະຫັດຜ່ານໃໝ່ (ຢ່າງນ້ອຍ 6 ຕົວອັກສອນ)')
    }
    
    // Check if new password matches confirm password
    if (new_password.value !== confirm_password.value) {
      return alert('ລະຫັດຜ່ານໃໝ່ແລະການຢືນຢັນບໍ່ກົງກັນ')
    }
    
    // Check if new password is different from old password
    if (password.value === new_password.value) {
      return alert('ລະຫັດຜ່ານໃໝ່ຕ້ອງແຕກຕ່າງຈາກລະຫັດຜ່ານເກົ່າ')
    }
    

    const data = {
        oldPassword: password.value,
        password: new_password.value,
    }
    console.log(data)
    const id = useCookie('id')
    changePassword(id.value,data)
 } catch (error) {
    console.log(error)
 }   
}

</script>
