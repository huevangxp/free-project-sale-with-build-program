<template>
    <div class="  d-flex align-center justify-center"  style="height: 80vh; ">
        <v-card elevation="0" rounded="xl"  dark width="400">
            <v-card-title class="d-flex align-center justify-center">
                <v-avatar size="200" elevation="3">
                    <v-img src="https://brandmark.io/logo-rank/random/pepsi.png"></v-img>
                </v-avatar>
            </v-card-title>
            <v-card-title class="d-flex align-center justify-center">
                <h4>ເຂົ້າສູ່ລະບົບ</h4>
            </v-card-title>
            <v-card-title>
               <v-text-field
               v-model="phone"
                placeholder="ເບິໂທ"
                variant="filled"
                color="primary"
                elevation="3"
                prepend-inner-icon="mdi-cellphone"
               
              ></v-text-field>
            </v-card-title>
            <v-card-title>
               <v-text-field
               v-model="password"
                placeholder="ລະຫັດຜ່ານ"
                variant="filled"
                color="primary"
                elevation="3"
                prepend-inner-icon="mdi-lock"
                type="password"
              ></v-text-field>
            </v-card-title>
            <v-card-actions class="d-flex align-center justify-center">
                <!-- <v-btn color="red" variant="outlined" size="large" width="160" class="rounded-xl" to="/login">ຍົກເລິກ</v-btn> -->
                <v-btn color="primary" variant="elevated" size="large" block class="rounded" @click="handleLogin">ເຂົ້າສູ່ລະບົບ</v-btn>
            </v-card-actions>
           
          <v-card-actions>
            <v-spacer></v-spacer>
            <div class="d-flex align-center justify-center" color="primary"  >
                <h4>ຖ້າທ່ານຍັງບໍໄດ້ລົງທະບຽນ <v-btn color="red" variant="text" to="/register">ໄປທີ່ນີ້</v-btn></h4>
            </div>
          </v-card-actions>
         </v-card>
    </div>
</template>


<script setup>
import { useApiAuthStore } from '@/stores/apiAuth';
const apiAuthStore = useApiAuthStore()
const { login } = apiAuthStore

const phone = ref('02078849378')
const password = ref('123456')

const handleLogin = async () => {
     try {
          const data = {
               phone: phone.value,
               password: password.value
          }
          await login(data)
     } catch (error) {
        console.log(error)
     }
}
</script>