<template>
  <div
    class="product-container pb-16 bg-grey-lighten-5"
    style="min-height: 100vh"
  >
    <!-- Header Section -->
    <div class="bg-primary pt-4 pb-6 px-4 rounded-b-xl">
      <div class="d-flex align-center justify-space-between mb-4">
        <div>
          <h1 class="text-h5 font-weight-bold text-white mb-1">
            <span>ຢືນຢັນການຊຳລະ</span>
          </h1>
          <p class="text-body-2 text-white text-opacity-80">
            <span>ອັບໂຫຼດຫຼັກຖານການໂອນເງິນ</span>
          </p>
        </div>
        <div class="d-flex align-center">
          <v-btn icon variant="text" color="white" @click="$router.back()">
            <v-icon size="28">mdi-arrow-left</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <v-container fluid class="px-4 mt-n8">
      <!-- Upload Card -->
      <v-card class="rounded-xl mb-4" elevation="4" color="white">
        <v-card-text class="pa-4">
          <div class="text-center mb-4">
            <div class="text-subtitle-1 font-weight-bold text-primary mb-1">
              <span>ຫຼັກຖານການໂອນເງິນ</span>
            </div>
            <div class="text-caption text-medium-emphasis">
              <span>ກະລຸນາອັບໂຫຼດຮູບພາບສະລິບການໂອນເງິນ</span>
            </div>
          </div>

          <v-card
            @click="uploadImage"
            class="d-flex align-center justify-center border-dashed rounded-xl mb-6 position-relative overflow-hidden"
            color="grey-lighten-5"
            elevation="0"
            height="400"
            style="border: 2px dashed #e0e0e0; cursor: pointer"
            v-ripple
          >
            <div class="text-center" v-if="!imageUrl">
              <v-avatar color="primary-lighten-5" size="80" class="mb-4">
                <v-icon size="40" color="primary">mdi-cloud-upload</v-icon>
              </v-avatar>
              <div class="text-subtitle-1 font-weight-bold text-grey-darken-1">
                ກົດເພື່ອອັບໂຫຼດຮູບ
              </div>
              <div class="text-caption text-grey">
                ຮອງຮັບໄຟລ໌ຮູບພາບເທົ່ານັ້ນ
              </div>
            </div>
            <v-img v-else :src="imageUrl" cover height="100%" width="100%">
              <div class="d-flex justify-end pa-2">
                <v-btn
                  icon
                  color="white"
                  variant="flat"
                  size="small"
                  @click.stop="uploadImage"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </div>
            </v-img>
          </v-card>

          <v-file-input
            ref="fileInput"
            v-model="imageFile"
            id="picture"
            class="d-none"
            accept="image/*"
            @change="handleUploadImage"
          ></v-file-input>

          <v-row dense>
            <v-col cols="6">
              <v-btn
                block
                color="grey-darken-1"
                variant="tonal"
                size="large"
                rounded="xl"
                @click="navigateTo('/pay')"
                height="56"
              >
                ຍົກເລີກ
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
                :disabled="!imageFile"
                @click="submitPayment"
                height="56"
              >
                <v-icon start>mdi-check-circle-outline</v-icon>
                ຢືນຢັນ
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApiOrderStore } from "@/stores/apiOrder";
const { getOrderId, orderPayment } = useApiOrderStore();
const { order } = storeToRefs(useApiOrderStore());

const fileInput = ref<HTMLInputElement | null>(null);
const imageFile = ref<File | null>(null);
const imageUrl = ref<string>("");

const uploadImage = () => {
  fileInput.value?.click();
};

const handleUploadImage = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    // imageFile.value = input.files[0];
    imageUrl.value = URL.createObjectURL(input.files[0]);
  }
};

const submitPayment = () => {
  try {
    const orderId = useCookie("order_id");
    const data = {
      image: imageFile.value,
      id: orderId.value,
    };
    orderPayment(data);

    orderId.value = null;

    alert("ຈ່າຍເງິນສຳເລັດ");
    navigateTo("/profile");
  } catch (error) {
    console.log(error);
  }
};

// Clean up the object URL when component unmounts
onUnmounted(() => {
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value);
  }
  getOrderId();
});
</script>

<style scoped>
.product-container {
  background-color: #f8f9fa;
}
</style>
