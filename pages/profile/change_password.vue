<template>
  <div
    class="product-container pb-16 bg-grey-lighten-5"
    style="min-height: 100vh"
  >
    <div class="pt-4 px-2">
      <!-- Header -->
      <div class="d-flex align-center justify-space-between mb-4 px-2">
        <div class="d-flex align-center">
          <v-btn
            icon
            variant="text"
            color="primary"
            class="mr-2"
            @click="$router.back()"
          >
            <v-icon size="28">mdi-arrow-left</v-icon>
          </v-btn>
          <h2 class="text-h6 font-weight-bold text-primary">
            <span>ປ່ຽນລະຫັດຜ່ານ</span>
          </h2>
        </div>
      </div>

      <!-- Form Card -->
      <v-card class="rounded-xl pa-4" elevation="0" color="white">
        <v-card-text class="pa-0">
          <div class="d-flex align-center mb-6">
            <v-avatar color="primary-lighten-5" size="48" class="mr-3">
              <v-icon color="primary" size="24">mdi-lock-reset</v-icon>
            </v-avatar>
            <div>
              <div class="text-subtitle-1 font-weight-bold">
                <span>ຄວາມປອດໄພ</span>
              </div>
              <div class="text-caption text-medium-emphasis">
                <span>ກະລຸນາປ້ອນລະຫັດຜ່ານໃໝ່ຂອງທ່ານ</span>
              </div>
            </div>
          </div>

          <v-row dense>
            <v-col cols="12">
              <div class="text-caption font-weight-bold mb-1 ml-1">
                <span>ລະຫັດຜ່ານເກົ່າ</span>
              </div>
              <v-text-field
                v-model="password"
                placeholder="ປ້ອນລະຫັດຜ່ານເກົ່າ"
                variant="outlined"
                density="comfortable"
                color="primary"
                rounded="lg"
                prepend-inner-icon="mdi-lock-outline"
                type="password"
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນລະຫັດຜ່ານເກົ່າ']"
                bg-color="grey-lighten-5"
                hide-details="auto"
                class="mb-3"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <div class="text-caption font-weight-bold mb-1 ml-1">
                <span>ລະຫັດຜ່ານໃໝ່</span>
              </div>
              <v-text-field
                v-model="new_password"
                placeholder="ປ້ອນລະຫັດຜ່ານໃໝ່"
                variant="outlined"
                density="comfortable"
                color="primary"
                rounded="lg"
                prepend-inner-icon="mdi-lock-plus-outline"
                type="password"
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນລະຫັດຜ່ານໃໝ່']"
                bg-color="grey-lighten-5"
                hide-details="auto"
                class="mb-3"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <div class="text-caption font-weight-bold mb-1 ml-1">
                <span>ຢືນຢັນລະຫັດຜ່ານໃໝ່</span>
              </div>
              <v-text-field
                v-model="confirm_password"
                placeholder="ປ້ອນຢືນຢັນລະຫັດຜ່ານໃໝ່"
                variant="outlined"
                density="comfortable"
                color="primary"
                rounded="lg"
                prepend-inner-icon="mdi-lock-check-outline"
                type="password"
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຢືນຢັນລະຫັດຜ່ານໃໝ່']"
                bg-color="grey-lighten-5"
                hide-details="auto"
                class="mb-4"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pa-0 mt-4">
          <v-row dense>
            <v-col cols="6">
              <v-btn
                block
                color="grey-darken-1"
                variant="tonal"
                size="large"
                rounded="xl"
                @click="$router.back()"
                height="48"
              >
                ຍົກເລິກ
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                block
                color="primary"
                variant="flat"
                size="large"
                rounded="xl"
                elevation="0"
                @click="changePasswordBtn"
                height="48"
              >
                ປ່ຽນລະຫັດຜ່ານ
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApiAuthStore } from "@/stores/apiAuth";

const { changePassword } = useApiAuthStore();

const password = ref("");
const new_password = ref("");
const confirm_password = ref("");

const changePasswordBtn = () => {
  try {
    if (!password.value || password.value.length < 6) {
      return alert("ກະລຸນາປ້ອນລະຫັດຜ່ານເກົ່າ (ຢ່າງນ້ອຍ 6 ຕົວອັກສອນ)");
    }

    // Validate new password
    if (!new_password.value || new_password.value.length < 6) {
      return alert("ກະລຸນາປ້ອນລະຫັດຜ່ານໃໝ່ (ຢ່າງນ້ອຍ 6 ຕົວອັກສອນ)");
    }

    // Validate confirm password
    if (!confirm_password.value || confirm_password.value.length < 6) {
      return alert("ກະລຸນາປ້ອນຢືນຢັນລະຫັດຜ່ານໃໝ່ (ຢ່າງນ້ອຍ 6 ຕົວອັກສອນ)");
    }

    // Check if new password matches confirm password
    if (new_password.value !== confirm_password.value) {
      return alert("ລະຫັດຜ່ານໃໝ່ແລະການຢືນຢັນບໍ່ກົງກັນ");
    }

    // Check if new password is different from old password
    if (password.value === new_password.value) {
      return alert("ລະຫັດຜ່ານໃໝ່ຕ້ອງແຕກຕ່າງຈາກລະຫັດຜ່ານເກົ່າ");
    }

    const data = {
      oldPassword: password.value,
      password: new_password.value,
    };
    console.log(data);
    const id = useCookie("id");
    changePassword(id.value, data);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.product-container {
  background-color: #f8f9fa;
}
</style>
