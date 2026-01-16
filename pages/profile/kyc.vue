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
            <span>ຢືນຢັນຕົວຕົນ (KYC)</span>
          </h2>
        </div>
      </div>

      <!-- Content -->
      <v-card class="rounded-xl pa-4 mb-4" elevation="0" color="white">
        <v-card-text class="pa-0">
          <div class="d-flex align-center mb-6">
            <v-avatar color="primary-lighten-5" size="48" class="mr-3">
              <v-icon color="primary" size="24">mdi-account-check</v-icon>
            </v-avatar>
            <div>
              <div class="text-subtitle-1 font-weight-bold">ຂໍ້ມູນສ່ວນຕົວ</div>
              <div class="text-caption text-medium-emphasis">
                ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ
              </div>
            </div>
          </div>

          <!-- Profile Image -->
          <div class="d-flex justify-center mb-6">
            <div class="position-relative">
              <v-avatar
                size="100"
                color="grey-lighten-4"
                class="border-2 border-dashed"
              >
                <v-img
                  v-if="profile.avatar"
                  :src="'http://localhost:8000/' + profile.avatar"
                  cover
                ></v-img>
                <v-icon v-else size="40" color="grey">mdi-camera-plus</v-icon>
              </v-avatar>
              <v-btn
                icon
                size="small"
                color="primary"
                class="position-absolute bottom-0 right-0"
                elevation="2"
                @click="openClickIdProfile"
              >
                <v-icon size="18">mdi-pencil</v-icon>
              </v-btn>
            </div>
            <v-file-input
              v-model="imageProfile"
              id="imageProfileID"
              accept="image/*"
              class="d-none"
              @change="onImageProfileChange"
            />
          </div>

          <v-row dense>
            <v-col cols="12">
              <div class="text-caption font-weight-bold mb-1 ml-1">
                ຊື່ ແລະ ນາມສະກຸນ
              </div>
              <v-text-field
                v-model="profile.username"
                placeholder="ປ້ອນຊື່ຂອງທ່ານ"
                variant="outlined"
                density="comfortable"
                color="primary"
                rounded="lg"
                prepend-inner-icon="mdi-account"
                bg-color="grey-lighten-5"
                hide-details="auto"
                class="mb-3"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <div class="text-caption font-weight-bold mb-1 ml-1">
                ເບີໂທລະສັບ
              </div>
              <v-text-field
                v-model="profile.phone"
                placeholder="ປ້ອນເບີໂທ"
                variant="outlined"
                density="comfortable"
                color="primary"
                rounded="lg"
                prepend-inner-icon="mdi-phone"
                bg-color="grey-lighten-5"
                hide-details="auto"
                class="mb-3"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <div class="text-caption font-weight-bold mb-1 ml-1">ອີເມວ</div>
              <v-text-field
                v-model="profile.email"
                placeholder="ປ້ອນອີເມວ"
                variant="outlined"
                density="comfortable"
                color="primary"
                rounded="lg"
                prepend-inner-icon="mdi-email"
                bg-color="grey-lighten-5"
                hide-details="auto"
                class="mb-3"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <div class="text-caption font-weight-bold mb-1 ml-1">
                ທີ່ຢູ່ປັດຈຸບັນ
              </div>
              <v-textarea
                v-model="profile.address"
                placeholder="ປ້ອນທີ່ຢູ່"
                variant="outlined"
                density="comfortable"
                color="primary"
                rounded="lg"
                prepend-inner-icon="mdi-map-marker"
                bg-color="grey-lighten-5"
                hide-details="auto"
                rows="2"
                class="mb-3"
              ></v-textarea>
            </v-col>

            <v-col cols="12">
              <div class="text-caption font-weight-bold mb-1 ml-1">ສະຖານະ</div>
              <v-text-field
                v-model="profile.role"
                variant="outlined"
                density="comfortable"
                color="primary"
                rounded="lg"
                prepend-inner-icon="mdi-star"
                bg-color="grey-lighten-5"
                hide-details="auto"
                disabled
                class="mb-3"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Documents Card -->
      <v-card class="rounded-xl pa-4 mb-4" elevation="0" color="white">
        <v-card-text class="pa-0">
          <div class="d-flex align-center mb-6">
            <v-avatar color="primary-lighten-5" size="48" class="mr-3">
              <v-icon color="primary" size="24"
                >mdi-file-document-multiple</v-icon
              >
            </v-avatar>
            <div>
              <div class="text-subtitle-1 font-weight-bold">ເອກະສານຢືນຢັນ</div>
              <div class="text-caption text-medium-emphasis">
                ອັບໂຫຼດເອກະສານສຳຄັນ
              </div>
            </div>
          </div>

          <v-row dense>
            <v-col cols="12">
              <div class="text-caption font-weight-bold mb-1 ml-1">
                ເລກບັດປະຈຳຕົວ
              </div>
              <v-text-field
                v-model="profile.id_card"
                placeholder="ປ້ອນເລກບັດ"
                variant="outlined"
                density="comfortable"
                color="primary"
                rounded="lg"
                prepend-inner-icon="mdi-card-account-details"
                bg-color="grey-lighten-5"
                hide-details="auto"
                class="mb-3"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <div class="text-caption font-weight-bold mb-1 ml-1">
                ຮູບຖ່າຍບັດປະຈຳຕົວ
              </div>
              <v-card
                @click="openClickIdIdCard"
                class="d-flex align-center justify-center border-dashed rounded-lg mb-4"
                color="grey-lighten-5"
                elevation="0"
                height="160"
                style="border: 2px dashed #e0e0e0"
              >
                <div class="text-center" v-if="!profile.id_card_image">
                  <v-icon size="40" color="grey-lighten-1" class="mb-2"
                    >mdi-cloud-upload</v-icon
                  >
                  <div class="text-caption text-grey">ກົດເພື່ອອັບໂຫຼດຮູບ</div>
                </div>
                <v-img
                  v-else
                  :src="'http://localhost:8000/' + profile.id_card_image"
                  height="100%"
                  width="100%"
                  cover
                  class="rounded-lg"
                ></v-img>
              </v-card>
              <v-file-input
                v-model="imageIdCard"
                id="imageIdCardID"
                accept="image/*"
                class="d-none"
                @change="onImageIdCardChange"
              />
            </v-col>

            <v-col cols="12">
              <div class="text-caption font-weight-bold mb-1 ml-1">
                ເລກບັນຊີທະນາຄານ
              </div>
              <v-text-field
                v-model="profile.bank_account"
                placeholder="ປ້ອນເລກບັນຊີ"
                variant="outlined"
                density="comfortable"
                color="primary"
                rounded="lg"
                prepend-inner-icon="mdi-bank"
                bg-color="grey-lighten-5"
                hide-details="auto"
                class="mb-3"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <div class="text-caption font-weight-bold mb-1 ml-1">
                ຮູບຖ່າຍບັນຊີທະນາຄານ
              </div>
              <v-card
                @click="openClickIdBankAccount"
                class="d-flex align-center justify-center border-dashed rounded-lg"
                color="grey-lighten-5"
                elevation="0"
                height="160"
                style="border: 2px dashed #e0e0e0"
              >
                <div class="text-center" v-if="!profile.bank_image">
                  <v-icon size="40" color="grey-lighten-1" class="mb-2"
                    >mdi-cloud-upload</v-icon
                  >
                  <div class="text-caption text-grey">ກົດເພື່ອອັບໂຫຼດຮູບ</div>
                </div>
                <v-img
                  v-else
                  :src="'http://localhost:8000/' + profile.bank_image"
                  height="100%"
                  width="100%"
                  cover
                  class="rounded-lg"
                ></v-img>
              </v-card>
              <v-file-input
                v-model="imageBankAccount"
                id="imageBankAccountID"
                accept="image/*"
                class="d-none"
                @change="onImageBankAccountChange"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Actions -->
      <v-card-actions class="pa-0 mt-4 mb-6">
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
              @click="updateUserInfoBtn"
              height="48"
            >
              ບັນທຶກ
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApiAuthStore } from "@/stores/apiAuth";

const {
  updateProfileAvatar,
  getProfile,
  updateProfileIdCard,
  updateProfileBankAccount,
  updateUserInfo,
} = useApiAuthStore();
const { profile } = storeToRefs(useApiAuthStore());

const imageProfile = ref(null);
const imageIdCard = ref(null);
const imageBankAccount = ref(null);

const openClickIdProfile = () => {
  document.getElementById("imageProfileID")?.click();
};
const openClickIdIdCard = () => {
  document.getElementById("imageIdCardID")?.click();
};
const openClickIdBankAccount = () => {
  document.getElementById("imageBankAccountID")?.click();
};

const onImageProfileChange = async () => {
  try {
    await updateProfileAvatar(profile.value.id, imageProfile.value);
    await getProfile();
    alert("ປ່ຽນຮູບສຳເລັດ");
  } catch (error) {
    console.log(error);
  }
};
const onImageIdCardChange = async () => {
  try {
    await updateProfileIdCard(profile.value.id, imageIdCard.value);
    await getProfile();
    alert("ປ່ຽນບັດປະຈຳຕົວສຳເລັດ");
  } catch (error) {
    console.log(error);
  }
};
const onImageBankAccountChange = async () => {
  try {
    await updateProfileBankAccount(profile.value.id, imageBankAccount.value);
    await getProfile();
    alert("ປ່ຽນບັດທະນາຄານສຳເລັດ");
  } catch (error) {
    console.log(error);
  }
};

const updateUserInfoBtn = async () => {
  try {
    const data = {
      username: profile.value.username,
      phone: profile.value.phone,
      email: profile.value.email,
      address: profile.value.address,
      id_card: profile.value.id_card,
      bank_account: profile.value.bank_account,
    };
    await updateUserInfo(profile.value.id, data);
    alert("ປ່ຽນຂໍ້ມູນສຳເລັດ");
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  getProfile();
});
</script>

<style scoped>
.product-container {
  background-color: #f8f9fa;
}
.border-dashed {
  border-style: dashed !important;
}
</style>
