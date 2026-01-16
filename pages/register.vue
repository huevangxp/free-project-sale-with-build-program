<template>
  <div
    class="product-container d-flex align-center justify-center bg-grey-lighten-5"
    style="min-height: 100vh"
  >
    <v-card
      class="rounded-xl pa-6 my-4"
      elevation="0"
      width="100%"
      max-width="500"
      color="white"
    >
      <div class="text-center mb-6">
        <v-avatar size="80" class="mb-4 elevation-2 bg-white pa-2">
          <v-img
            src="https://brandmark.io/logo-rank/random/pepsi.png"
            contain
          ></v-img>
        </v-avatar>
        <h2 class="text-h5 font-weight-bold text-primary mb-1">
          <span>ລົງທະບຽນ</span>
        </h2>
        <p class="text-body-2 text-medium-emphasis">
          <span>ສ້າງບັນຊີໃໝ່ເພື່ອເລີ່ມຕົ້ນໃຊ້ງານ</span>
        </p>
      </div>

      <v-form @submit.prevent="handleRegister">
        <v-row dense>
          <v-col cols="12">
            <div class="text-subtitle-2 font-weight-bold mb-1 ml-1">
              <span>ຊື່ ແລະ ນາມສະກຸນ</span>
            </div>
            <v-text-field
              v-model="username"
              placeholder="ປ້ອນຊື່ຂອງທ່ານ"
              variant="outlined"
              density="comfortable"
              color="primary"
              rounded="lg"
              prepend-inner-icon="mdi-account-outline"
              bg-color="grey-lighten-5"
              hide-details="auto"
              class="mb-3"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <div class="text-subtitle-2 font-weight-bold mb-1 ml-1">
              <span>ເບີໂທລະສັບ</span>
            </div>
            <v-text-field
              v-model="phone"
              placeholder="ປ້ອນເບີໂທລະສັບ"
              variant="outlined"
              density="comfortable"
              color="primary"
              rounded="lg"
              prepend-inner-icon="mdi-phone-outline"
              bg-color="grey-lighten-5"
              hide-details="auto"
              class="mb-3"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <div class="text-subtitle-2 font-weight-bold mb-1 ml-1">
              <span>ອີເມວ</span>
            </div>
            <v-text-field
              v-model="email"
              placeholder="ປ້ອນອີເມວ"
              variant="outlined"
              density="comfortable"
              color="primary"
              rounded="lg"
              prepend-inner-icon="mdi-email-outline"
              bg-color="grey-lighten-5"
              hide-details="auto"
              class="mb-3"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <div class="text-subtitle-2 font-weight-bold mb-1 ml-1">
              <span>ລະຫັດຜູ້ແນະນຳ (ຖ້າມີ)</span>
            </div>
            <v-text-field
              v-model="invit_code"
              placeholder="ປ້ອນລະຫັດຜູ້ແນະນຳ"
              variant="outlined"
              density="comfortable"
              color="primary"
              rounded="lg"
              prepend-inner-icon="mdi-ticket-confirmation-outline"
              bg-color="grey-lighten-5"
              hide-details="auto"
              class="mb-3"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <div class="text-subtitle-2 font-weight-bold mb-1 ml-1">
              <span>ລະຫັດຜ່ານ</span>
            </div>
            <v-text-field
              v-model="password"
              placeholder="ກຳນົດລະຫັດຜ່ານ"
              variant="outlined"
              density="comfortable"
              color="primary"
              rounded="lg"
              prepend-inner-icon="mdi-lock-outline"
              type="password"
              bg-color="grey-lighten-5"
              hide-details="auto"
              class="mb-3"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <div class="text-subtitle-2 font-weight-bold mb-1 ml-1">
              <span>ຢືນຢັນລະຫັດຜ່ານ</span>
            </div>
            <v-text-field
              v-model="confirm_password"
              placeholder="ຢືນຢັນລະຫັດຜ່ານ"
              variant="outlined"
              density="comfortable"
              color="primary"
              rounded="lg"
              prepend-inner-icon="mdi-lock-check-outline"
              type="password"
              bg-color="grey-lighten-5"
              hide-details="auto"
              class="mb-3"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <div class="text-subtitle-2 font-weight-bold mb-1 ml-1">
              <span>ທີ່ຢູ່ປັດຈຸບັນ</span>
            </div>
            <v-textarea
              v-model="address"
              placeholder="ປ້ອນທີ່ຢູ່ຂອງທ່ານ"
              variant="outlined"
              density="comfortable"
              color="primary"
              rounded="lg"
              prepend-inner-icon="mdi-map-marker-outline"
              bg-color="grey-lighten-5"
              hide-details="auto"
              rows="2"
              class="mb-4"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-btn
          block
          color="primary"
          size="large"
          rounded="xl"
          elevation="0"
          height="56"
          type="submit"
          :loading="loading"
          class="text-body-1 font-weight-bold mb-4"
        >
          <span>ລົງທະບຽນ</span>
        </v-btn>

        <div class="text-center">
          <span class="text-body-2 text-medium-emphasis"
            ><span>ມີບັນຊີຢູ່ແລ້ວ? </span></span
          >
          <v-btn
            variant="text"
            color="primary"
            class="px-1 font-weight-bold"
            to="/login"
            :ripple="false"
          >
            <span>ເຂົ້າສູ່ລະບົບ</span>
          </v-btn>
        </div>
      </v-form>

      <!-- Error Dialog -->
      <v-dialog v-model="dialog" width="400">
        <v-card rounded="xl">
          <v-card-title
            class="bg-error text-white py-3 px-4 d-flex align-center"
          >
            <v-icon color="white" class="mr-2">mdi-alert-circle-outline</v-icon>
            <span class="text-h6 font-weight-bold">ແຈ້ງເຕືອນ</span>
          </v-card-title>
          <v-card-text class="pa-4 text-center">
            <p class="text-body-1">ລະຫັດຜ່ານບໍ່ກົງກັນ ກະລຸນາກວດສອບຄືນໃໝ່</p>
          </v-card-text>
          <v-card-actions class="pa-4 pt-0 justify-center">
            <v-btn
              color="primary"
              variant="flat"
              rounded="xl"
              width="120"
              @click="dialog = false"
            >
              <span>ຕົກລົງ</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useApiAuthStore } from "@/stores/apiAuth";
import { useApiRoleStore } from "@/stores/apiRole";

const apiRoleStore = useApiRoleStore();
const { roles } = storeToRefs(apiRoleStore);

const { register } = useApiAuthStore();
const { getRoles } = apiRoleStore;

const dialog = ref(false);
const loading = ref(false);

const username = ref("");
const phone = ref("");
const email = ref("");
const invit_code = ref("");
const password = ref("");
const confirm_password = ref("");
const address = ref("");

onMounted(() => {
  getRoles();
});

const handleRegister = async () => {
  if (password.value !== confirm_password.value) {
    dialog.value = true;
    return;
  }

  loading.value = true;
  try {
    const role_id =
      roles.value.find((role) => role.title === "Beginner")?.id || 1;

    const data = {
      username: username.value,
      phone: phone.value,
      email: email.value,
      invit_code: invit_code.value,
      password: password.value,
      role_id: role_id,
      confirm_password: confirm_password.value,
      address: address.value,
    };
    await register(data);
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
