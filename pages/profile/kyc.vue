<template>
    <div class="px-2 my-4">
      <v-row dense>
        <v-col cols="12">
          <!-- Profile Image Card -->
          <v-card
            @click="openClickIdProfile"
            class="d-flex align-center justify-center mx-4"
            color="#f5f5f5"
            elevation="0"
            rounded="xl"
            height="200"
          >
            <div class="text-center">
              <template v-if="profile.avatar">
                <v-img :src="'http://localhost:8000/' + profile.avatar" height="150" width="120" cover></v-img>
              </template>
              <template v-else>
                <v-icon size="50" color="primary">mdi-image</v-icon>
                <p>ເລືອກຮູບ Profile</p>
              </template>
            </div>
          </v-card>
          <v-file-input
            v-model="imageProfile"
            id="imageProfileID"
            accept="image/*"
            class="d-none"
            @change="onImageProfileChange"
          />
        </v-col>
  
        <v-col cols="12">
          <v-text-field v-model="profile.username" variant="filled" color="primary" placeholder="ຊື່"
            prepend-inner-icon="mdi-account" class="mx-4" />
          <v-text-field v-model="profile.phone" variant="filled" placeholder="ເບິໂທ" color="primary"
            prepend-inner-icon="mdi-cellphone" class="mx-4" />
        </v-col>
  
        <v-col cols="12">
          <v-text-field v-model="profile.email" variant="filled" placeholder="ອີເມວ" color="primary"
            prepend-inner-icon="mdi-email" class="mx-4" />
          <v-textarea v-model="profile.address" variant="filled" placeholder="ທີຢູ່" color="primary"
            prepend-inner-icon="mdi-map-marker" class="mx-4" />
  
          <v-text-field v-model="profile.role" variant="filled" disabled placeholder="Beginner" color="primary"
            prepend-inner-icon="mdi-star" class="mx-4" />
          <v-text-field v-model="profile.id_card" variant="filled" placeholder="ບັດປະຈຳຕົວ" color="primary"
            prepend-inner-icon="mdi-card-account-details" class="mx-4" />
  
          <!-- ID Card Image -->
          <v-card
            @click="openClickIdIdCard"
            class="mx-4 mb-4 d-flex align-center justify-center"
            color="#f5f5f5"
            elevation="0"
            rounded="xl"
            height="200"
          >
            <div class="text-center">
              <template v-if="profile.id_card_image">
                <v-img :src="'http://localhost:8000/' + profile.id_card_image" height="150" width="120" cover></v-img>
              </template>
              <template v-else>
                <v-icon size="50" color="primary">mdi-image</v-icon>
                <p>ເລືອກບັດປະຈຳຕົວ</p>
              </template>
            </div>
          </v-card>
          <v-file-input
            v-model="imageIdCard"
            id="imageIdCardID"
            accept="image/*"
            class="d-none"
            @change="onImageIdCardChange"
          />
  
          <v-text-field v-model="profile.bank_account" variant="filled" placeholder="ບັດທະນາຄານ" color="primary"
            prepend-inner-icon="mdi-card-account-details" class="mx-4" />
  
          <!-- Bank Account Image -->
          <v-card
            @click="openClickIdBankAccount"
            class="mx-4 mb-4 d-flex align-center justify-center"
            color="#f5f5f5"
            elevation="0"
            rounded="xl"
            height="200"
          >
            <div class="text-center">
              <template v-if="profile.bank_image">
                <v-img :src=" 'http://localhost:8000/' + profile.bank_image" height="150" width="120" cover></v-img>
              </template>
              <template v-else>
                <v-icon size="50" color="primary">mdi-image</v-icon>
                <p>ເລືອກບັດທະນາຄານ</p>
              </template>
            </div>
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
  
      <div>
        <v-card-actions class="d-flex align-center justify-center">
          <v-btn color="red" variant="outlined" size="large" width="180" to="/login">
            <v-icon class="mr-2">mdi-cancel</v-icon> ຍົກເລິກ
          </v-btn>
          <v-btn color="primary" variant="elevated" size="large" width="180" elevation="0">
            <v-icon class="mr-2">mdi-content-save</v-icon> ບັນທຶກ
          </v-btn>
        </v-card-actions>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useApiAuthStore } from '@/stores/apiAuth'
  
  const {updateProfileAvatar, getProfile, updateProfileIdCard, updateProfileBankAccount} = useApiAuthStore()
  const { profile } = storeToRefs(useApiAuthStore())
  
  const imageProfile = ref(null)
  const imageIdCard = ref(null)
  const imageBankAccount = ref(null)
  
  const openClickIdProfile = () => {
    document.getElementById('imageProfileID')?.click()
  }
  const openClickIdIdCard = () => {
    document.getElementById('imageIdCardID')?.click()
  }
  const openClickIdBankAccount = () => {
    document.getElementById('imageBankAccountID')?.click()
  }
  
  const onImageProfileChange = async () => {
    try {
         await updateProfileAvatar(profile.value.id, imageProfile.value)
        await getProfile()
         alert('ປ່ຽນຮູບສຳເລັດ')
    } catch (error) {
        console.log(error)
    }
   
  }
  const onImageIdCardChange = async () => {
    try {

        await updateProfileIdCard(profile.value.id, imageIdCard.value)
        await getProfile()
        alert('ປ່ຽນບັດປະຈຳຕົວສຳເລັດ')
        
    } catch (error) {
        console.log(error)
    }
  }
  const onImageBankAccountChange = async () => {
    try {
        await updateProfileBankAccount(profile.value.id, imageBankAccount.value)
        await getProfile()
        alert('ປ່ຽນບັດທະນາຄານສຳເລັດ')
    } catch (error) {
        console.log(error)
    }
    // const file = e.target.files[0];
    // if (!file) return;

    // const image = URL.createObjectURL(file);
    // imageBankAccounts.value = image;
  }
  
  onMounted(() => {
   getProfile()
  })
  </script>
  