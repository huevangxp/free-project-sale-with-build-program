<template>
  <div class="bg-grey-lighten-5 fill-height">
    <!-- Header Section -->
    <div
      class="bg-primary rounded-b-xl pb-10 pt-4 px-4 shadow-lg position-relative overflow-hidden"
    >
      <!-- Decorative circles -->
      <div
        class="position-absolute top-0 right-0 mt-n4 mr-n4 rounded-circle bg-white opacity-10"
        style="width: 150px; height: 150px"
      ></div>
      <div
        class="position-absolute bottom-0 left-0 mb-n4 ml-n4 rounded-circle bg-white opacity-10"
        style="width: 100px; height: 100px"
      ></div>

      <div
        class="d-flex align-center mb-6 position-relative"
        style="z-index: 1"
      >
        <v-btn
          icon
          variant="text"
          color="white"
          class="mr-2"
          @click="$router.back()"
        >
          <v-icon size="28">mdi-arrow-left</v-icon>
        </v-btn>
        <div class="flex-grow-1 text-center pr-10">
          <h1 class="text-h6 font-weight-bold text-white">ຢືນຢັນການຊຳລະ</h1>
        </div>
      </div>

      <div
        class="text-center text-white mb-4 position-relative"
        style="z-index: 1"
      >
        <div class="text-h5 font-weight-bold mb-1">ອັບໂຫຼດຫຼັກຖານ</div>
        <p class="text-body-2 text-white text-opacity-80">
          ກະລຸນາອັບໂຫຼດຮູບພາບສະລິບການໂອນເງິນ
        </p>
      </div>
    </div>

    <v-container class="mt-n12 px-4 pb-8 position-relative" style="z-index: 2">
      <v-card class="rounded-xl shadow-sm overflow-visible" elevation="0">
        <v-card-text class="pa-6">
          <div
            class="text-subtitle-1 font-weight-bold mb-4 d-flex align-center"
          >
            <v-icon color="primary" class="mr-2">mdi-image-outline</v-icon>
            <span>ຮູບພາບຫຼັກຖານ</span>
          </div>

          <!-- Upload Area -->
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              @click="uploadImage"
              class="upload-card d-flex flex-column align-center justify-center rounded-xl mb-6 position-relative cursor-pointer transition-swing"
              :color="isHovering ? 'primary-lighten-5' : 'grey-lighten-5'"
              :class="{ 'on-hover': isHovering }"
              elevation="0"
              height="320"
              v-ripple
            >
              <div
                class="text-center w-100 h-100 d-flex flex-column align-center justify-center"
                v-if="!imageUrl"
              >
                <div
                  class="upload-icon-wrapper mb-4 bg-white rounded-circle pa-4 shadow-sm"
                >
                  <v-icon size="40" color="primary"
                    >mdi-cloud-upload-outline</v-icon
                  >
                </div>
                <div
                  class="text-subtitle-1 font-weight-bold text-grey-darken-2 mb-1"
                >
                  ກົດເພື່ອອັບໂຫຼດຮູບ
                </div>
                <div class="text-caption text-grey">
                  <span>ຮອງຮັບໄຟລ໌: JPG, PNG</span>
                </div>
              </div>

              <v-img
                v-else
                :src="imageUrl"
                cover
                height="100%"
                width="100%"
                class="rounded-xl"
              >
                <div
                  class="fill-height d-flex flex-column justify-end pa-4 bg-gradient-overlay"
                >
                  <v-btn
                    color="white"
                    variant="flat"
                    class="align-self-center mb-2 text-none"
                    rounded="pill"
                    prepend-icon="mdi-camera-retake-outline"
                    @click.stop="uploadImage"
                  >
                    <span>ເລືອກຮູບໃໝ່</span>
                  </v-btn>
                </div>
              </v-img>
            </v-card>
          </v-hover>

          <v-file-input
            ref="fileInput"
            v-model="imageFile"
            id="picture"
            class="d-none"
            accept="image/*"
            @change="handleUploadImage"
          ></v-file-input>

          <!-- Action Buttons -->
          <div class="d-flex flex-column gap-3">
            <v-btn
              block
              color="primary"
              size="x-large"
              rounded="xl"
              elevation="4"
              class="text-none font-weight-bold mb-3"
              height="56"
              :disabled="!imageFile"
              :loading="isSubmitting"
              @click="submitPayment"
            >
              <v-icon start class="mr-2">mdi-check-circle</v-icon>
              ຢືນຢັນການຊຳລະ
            </v-btn>

            <v-btn
              block
              variant="text"
              color="grey-darken-1"
              size="large"
              rounded="xl"
              class="text-none"
              @click="navigateTo('/pay')"
            >
              ຍົກເລີກ
            </v-btn>
          </div>
        </v-card-text>
      </v-card>

      <!-- Success Dialog -->
      <v-dialog v-model="showSuccessDialog" max-width="340" persistent>
        <v-card class="rounded-xl pa-6 text-center shadow-lg">
          <div class="mb-4">
            <div
              class="success-icon-wrapper rounded-circle bg-green-lighten-5 d-inline-flex pa-4 mb-2"
            >
              <v-icon color="success" size="48">mdi-check-circle</v-icon>
            </div>
          </div>
          <div class="text-h6 font-weight-bold mb-2">ຊຳລະເງິນສຳເລັດ!</div>
          <div class="text-body-1 text-medium-emphasis mb-6">
            ຂອບໃຈທີ່ໃຊ້ບໍລິການ ລະບົບໄດ້ບັນທຶກຂໍ້ມູນຂອງທ່ານແລ້ວ
          </div>
          <v-btn
            color="success"
            variant="flat"
            block
            rounded="xl"
            size="large"
            elevation="2"
            @click="handleSuccessConfirm"
          >
            ຕົກລົງ
          </v-btn>
        </v-card>
      </v-dialog>

      <!-- Error Dialog -->
      <v-dialog v-model="showErrorDialog" max-width="340">
        <v-card class="rounded-xl pa-6 text-center shadow-lg">
          <div class="mb-4">
            <div
              class="error-icon-wrapper rounded-circle bg-red-lighten-5 d-inline-flex pa-4 mb-2"
            >
              <v-icon color="error" size="48">mdi-alert-circle</v-icon>
            </div>
          </div>
          <div class="text-h6 font-weight-bold mb-2">ເກີດຂໍ້ຜິດພາດ</div>
          <div class="text-body-1 text-medium-emphasis mb-6">
            ບໍ່ສາມາດຊຳລະເງິນໄດ້ ກະລຸນາກວດສອບແລ້ວລອງໃໝ່ອີກຄັ້ງ
          </div>
          <v-btn
            color="error"
            variant="flat"
            block
            rounded="xl"
            size="large"
            elevation="2"
            @click="showErrorDialog = false"
          >
            ລອງໃໝ່
          </v-btn>
        </v-card>
      </v-dialog>
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
const isSubmitting = ref(false);

const uploadImage = () => {
  fileInput.value?.click();
};

const handleUploadImage = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    imageFile.value = input.files[0];
    imageUrl.value = URL.createObjectURL(input.files[0]);
  }
};

const showSuccessDialog = ref(false);
const showErrorDialog = ref(false);

const handleSuccessConfirm = () => {
  showSuccessDialog.value = false;
  navigateTo("/profile");
};

const submitPayment = async () => {
  if (!imageFile.value) return;

  isSubmitting.value = true;
  try {
    const orderId = useCookie("order_id");
    const data = {
      image: imageFile.value,
      id: orderId.value,
    };
    await orderPayment(data);

    orderId.value = null;
    showSuccessDialog.value = true;
  } catch (error) {
    console.log(error);
    showErrorDialog.value = true;
  } finally {
    isSubmitting.value = false;
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
.upload-card {
  border: 2px dashed #e0e0e0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.upload-card.on-hover {
  border-color: var(--v-primary-base);
  border-style: solid; /* Optional: change to solid on hover */
  transform: translateY(-4px);
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.bg-gradient-overlay {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}

.shadow-lg {
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
}

.gap-3 {
  gap: 12px;
}
</style>
