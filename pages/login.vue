<template>
  <div
    class="product-container d-flex align-center justify-center bg-grey-lighten-5"
    style="min-height: 100vh"
  >
    <v-card
      class="rounded-xl pa-6"
      elevation="0"
      width="100%"
      max-width="400"
      color="white"
    >
      <div class="text-center mb-8">
        <v-avatar size="120" class="mb-4 elevation-2 bg-white pa-2">
          <v-img
            src="https://brandmark.io/logo-rank/random/pepsi.png"
            contain
          ></v-img>
        </v-avatar>
        <h2 class="text-h5 font-weight-bold text-primary mb-1">
          <span>ຍິນດີຕ້ອນຮັບ</span>
        </h2>
        <p class="text-body-2 text-medium-emphasis">
          <span>ເຂົ້າສູ່ລະບົບເພື່ອສັ່ງຊື້ສິນຄ້າ</span>
        </p>
      </div>

      <v-form @submit.prevent="handleLogin">
        <div class="text-subtitle-2 font-weight-bold mb-1 ml-1">ເບີໂທລະສັບ</div>
        <v-text-field
          v-model="phone"
          placeholder="ປ້ອນເບີໂທລະສັບ"
          variant="outlined"
          density="comfortable"
          color="primary"
          rounded="lg"
          prepend-inner-icon="mdi-phone-outline"
          bg-color="grey-lighten-5"
          class="mb-4"
          hide-details="auto"
        ></v-text-field>

        <div class="text-subtitle-2 font-weight-bold mb-1 ml-1">ລະຫັດຜ່ານ</div>
        <v-text-field
          v-model="password"
          placeholder="ປ້ອນລະຫັດຜ່ານ"
          variant="outlined"
          density="comfortable"
          color="primary"
          rounded="lg"
          prepend-inner-icon="mdi-lock-outline"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          bg-color="grey-lighten-5"
          class="mb-6"
          hide-details="auto"
        ></v-text-field>

        <v-btn
          block
          color="primary"
          size="large"
          rounded="xl"
          elevation="0"
          height="56"
          type="submit"
          :loading="loading"
          class="text-body-1 font-weight-bold mb-6"
        >
          ເຂົ້າສູ່ລະບົບ
        </v-btn>
      </v-form>

      <div class="text-center">
        <span class="text-body-2 text-medium-emphasis">ຍັງບໍ່ມີບັນຊີ? </span>
        <v-btn
          variant="text"
          color="primary"
          class="px-1 font-weight-bold"
          to="/register"
          :ripple="false"
        >
          ລົງທະບຽນ
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { useApiAuthStore } from "@/stores/apiAuth";

const apiAuthStore = useApiAuthStore();
const { login } = apiAuthStore;

const phone = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);

const handleLogin = async () => {
  if (!phone.value || !password.value) return;

  loading.value = true;
  try {
    const data = {
      phone: phone.value,
      password: password.value,
    };
    await login(data);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.product-container {
  background-color: #f8f9fa;
}
</style>
