<template>
  <div
    class="product-container pb-16 bg-grey-lighten-5"
    style="min-height: 100vh"
  >
    <div class="pt-4 px-2">
      <!-- Header -->
      <div class="d-flex align-center mb-4 px-2">
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

      <!-- Personal info -->
      <v-card class="rounded-xl pa-4 mb-4" border flat color="white">
        <!-- Section title -->
        <div class="d-flex align-center mb-6">
          <v-avatar color="primary-lighten-5" size="48" class="mr-3">
            <v-icon color="primary" size="24">mdi-account-check</v-icon>
          </v-avatar>
          <div>
            <div class="text-subtitle-1 font-weight-bold">
              <span>ຂໍ້ມູນສ່ວນຕົວ</span>
            </div>
            <div class="text-caption text-medium-emphasis">
              <span>ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ</span>
            </div>
          </div>
        </div>

        <!-- Avatar -->
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

        <!-- Text fields (config-driven) -->
        <div v-for="f in personalFields" :key="f.key" class="mb-3">
          <div class="text-caption font-weight-bold mb-1 ml-1">
            <span>{{ f.label }}</span>
          </div>
          <v-textarea
            v-if="f.type === 'textarea'"
            v-model="profile[f.key as keyof typeof profile]"
            :placeholder="f.placeholder"
            :prepend-inner-icon="f.icon"
            variant="outlined"
            density="comfortable"
            color="primary"
            rounded="lg"
            bg-color="grey-lighten-5"
            hide-details="auto"
            rows="2"
          ></v-textarea>
          <v-text-field
            v-else
            v-model="profile[f.key as keyof typeof profile]"
            :placeholder="f.placeholder"
            :prepend-inner-icon="f.icon"
            :disabled="f.disabled"
            variant="outlined"
            density="comfortable"
            color="primary"
            rounded="lg"
            bg-color="grey-lighten-5"
            hide-details="auto"
          ></v-text-field>
        </div>
      </v-card>

      <!-- Documents -->
      <v-card class="rounded-xl pa-4 mb-4" border flat color="white">
        <!-- Section title -->
        <div class="d-flex align-center mb-6">
          <v-avatar color="primary-lighten-5" size="48" class="mr-3">
            <v-icon color="primary" size="24"
              >mdi-file-document-multiple</v-icon
            >
          </v-avatar>
          <div>
            <div class="text-subtitle-1 font-weight-bold">
              <span>ເອກະສານຢືນຢັນ</span>
            </div>
            <div class="text-caption text-medium-emphasis">
              <span>ອັບໂຫຼດເອກະສານສຳຄັນ</span>
            </div>
          </div>
        </div>

        <!-- ID card number + image -->
        <div class="mb-3">
          <div class="text-caption font-weight-bold mb-1 ml-1">
            <span>ເລກບັດປະຈຳຕົວ</span>
          </div>
          <v-text-field
            v-model="profile.id_card"
            placeholder="ປ້ອນເລກບັດ"
            prepend-inner-icon="mdi-card-account-details"
            variant="outlined"
            density="comfortable"
            color="primary"
            rounded="lg"
            bg-color="grey-lighten-5"
            hide-details="auto"
          ></v-text-field>
        </div>

        <div class="mb-4">
          <div class="text-caption font-weight-bold mb-1 ml-1">
            <span>ຮູບຖ່າຍບັດປະຈຳຕົວ</span>
          </div>
          <div class="upload-box" @click="openClickIdIdCard">
            <div v-if="!profile.id_card_image" class="text-center">
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
          </div>
          <v-file-input
            v-model="imageIdCard"
            id="imageIdCardID"
            accept="image/*"
            class="d-none"
            @change="onImageIdCardChange"
          />
        </div>

        <!-- Bank account number + image -->
        <div class="mb-3">
          <div class="text-caption font-weight-bold mb-1 ml-1">
            <span>ເລກບັນຊີທະນາຄານ</span>
          </div>
          <v-text-field
            v-model="profile.bank_account"
            placeholder="ປ້ອນເລກບັນຊີ"
            prepend-inner-icon="mdi-bank"
            variant="outlined"
            density="comfortable"
            color="primary"
            rounded="lg"
            bg-color="grey-lighten-5"
            hide-details="auto"
          ></v-text-field>
        </div>

        <div>
          <div class="text-caption font-weight-bold mb-1 ml-1">
            <span>ຮູບຖ່າຍບັນຊີທະນາຄານ</span>
          </div>
          <div class="upload-box" @click="openClickIdBankAccount">
            <div v-if="!profile.bank_image" class="text-center">
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
          </div>
          <v-file-input
            v-model="imageBankAccount"
            id="imageBankAccountID"
            accept="image/*"
            class="d-none"
            @change="onImageBankAccountChange"
          />
        </div>
      </v-card>

      <!-- Actions -->
      <v-row dense class="mt-4 mb-6">
        <v-col cols="6">
          <v-btn
            block
            color="grey-darken-1"
            variant="tonal"
            size="large"
            rounded="xl"
            height="48"
            @click="$router.back()"
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
            height="48"
            @click="updateUserInfoBtn"
          >
            ບັນທຶກ
          </v-btn>
        </v-col>
      </v-row>
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

// Personal-info fields — edit / add / reorder here (no template changes needed)
const personalFields = [
  {
    key: "username",
    label: "ຊື່ ແລະ ນາມສະກຸນ",
    placeholder: "ປ້ອນຊື່ຂອງທ່ານ",
    icon: "mdi-account",
  },
  {
    key: "phone",
    label: "ເບີໂທລະສັບ",
    placeholder: "ປ້ອນເບີໂທ",
    icon: "mdi-phone",
  },
  {
    key: "email",
    label: "ອີເມວ",
    placeholder: "ປ້ອນອີເມວ",
    icon: "mdi-email",
  },
  {
    key: "address",
    label: "ທີ່ຢູ່ປັດຈຸບັນ",
    placeholder: "ປ້ອນທີ່ຢູ່",
    icon: "mdi-map-marker",
    type: "textarea",
  },
  {
    key: "role",
    label: "ສະຖານະ",
    icon: "mdi-star",
    disabled: true,
  },
];

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
/* Reusable upload drop-zone */
.upload-box {
  height: 160px;
  border: 2px dashed #e0e0e0;
  border-radius: 12px;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}
.upload-box:hover {
  border-color: rgba(var(--v-theme-primary), 0.5);
  background-color: rgba(var(--v-theme-primary), 0.03);
}
</style>
