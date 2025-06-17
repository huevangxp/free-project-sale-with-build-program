<template>
    <div class="px-2 my-4">
        <v-card
    elevation="3"
    rounded="xl"
    class="mx-auto"
    max-width="500"
  >
    <!-- Header Section with Background -->
    <v-card-text class="pa-0">
      <v-sheet
        color="primary"
        class="pa-6 text-center"
        rounded="t-xl"
      >
        <v-avatar
          size="100"
          class="mb-4"
          :color="profile.avatar ? undefined : 'surface'"
          elevation="3"
        >
          <v-img
            v-if="profile.avatar"
            :src=" 'http://localhost:8000/' + profile.avatar"
            cover
          />
          <span
            v-else
            class="text-h2 text-primary font-weight-bold"
          >
            {{ firstLetter }}
          </span>
        </v-avatar>
        
        <h2 class="text-white text-h4 font-weight-bold mb-2">
          {{ profile.username }}
        </h2>
        
        <v-chip
          color="white"
          variant="flat"
          size="small"
          class="text-primary"
        >
          <span>{{ profile.code }}</span>
        </v-chip>
      </v-sheet>
    </v-card-text>

    <!-- Content Section -->
    <v-card-text class="pa-6">
      <v-list class="pa-0" lines="one">
        <v-list-item class="px-0 mb-2">
          <template #prepend>
            <v-icon color="primary" class="me-4">
              mdi-email-outline
            </v-icon>
          </template>
          <v-list-item-title class="text-body-1">
            <span>ອີເມວ</span>
          </v-list-item-title>
          <v-list-item-subtitle class="text-primary font-weight-medium">
            <span>{{ profile.email }}</span>
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item class="px-0 mb-2">
          <template #prepend>
            <v-icon color="primary" class="me-4">
              mdi-phone-outline
            </v-icon>
          </template>
          <v-list-item-title class="text-body-1">
            <span>ເບິໂທ</span>
          </v-list-item-title>
          <v-list-item-subtitle class="text-primary font-weight-medium">
            <span>{{ profile.phone }}</span>
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item class="px-0">
          <template #prepend>
            <v-icon color="red" class="me-4">
              mdi-account-group-outline
            </v-icon>
          </template>
          <v-list-item-title class="text-body-1">
            <span>ລູກທິມ</span>
          </v-list-item-title>
          <v-list-item-subtitle class="text-red font-weight-bold">
            <span>{{ team }} ຄົນ</span>
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>

    <!-- Action Section -->
    <v-card-actions class="pa-6 pt-0">
      <v-btn
        color="primary"
        variant="flat"
        block
        size="large"
        rounded="xl"
        prepend-icon="mdi-pencil"
      >
        <span>ແກ້ໄຂໂປຣໄຟລ໌</span>
      </v-btn>
    </v-card-actions>
  </v-card>
        <v-card elevation="3" rounded="xl" color="primary" dark class="my-4">
            <v-card-title >
                <h4 class="d-flex align-center"> <v-icon class="mr-2">mdi-cog</v-icon> ຈັດການ</h4>
            </v-card-title>
        </v-card>
        <v-row dense>
            <v-col cols="6" md="6" v-for="(item,i) in items" :key="i">
                <v-card elevation="3" rounded="xl" :to="item.link">
                    <v-card-title  class="d-flex justify-center  align-center "  >
                      <v-avatar size="80" :color="item.color" tile class="rounded-lg">
                            <v-icon size="60" color="white">{{ item.icon }}</v-icon>
                      </v-avatar>
                    </v-card-title>
                    <v-card-title class="d-flex justify-center  align-center ">
                        <h4  >{{ item.title }}</h4>
                    </v-card-title>
                    <v-card-text class="text-center">
                        <h4 >{{ item.description }}</h4>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { useApiAuthStore } from '@/stores/apiAuth'

const apiAuthStore = useApiAuthStore()
const { profile, team } = storeToRefs(apiAuthStore)


const firstLetter = computed(() => 
  profile.value?.username?.charAt(0).toUpperCase() || ''
)


onMounted(() => {
    apiAuthStore.getProfile()
    apiAuthStore.getTeamByMycodeInvite()
    // username.value = profile.username.value.charAt(0).toUpperCase()
})

const items = [
    {
        icon: 'mdi-account',
        title: 'ທິມງານ',
        color: 'blue',
        description: 'ທິມງານທັງຫມົດ',
        link: '/profile/team'
    },
    {
        icon: 'mdi-history',
        title: 'ປະຫວັດການຊື້ເຄື່ອງ',
        color: 'green',
        description: 'ປະຫວັດການຊື້ເຄື່ອງທັງຫມົດ',
        link: '/profile/history'
    },
    {
        icon: 'mdi-information',
        title: 'KYC',
        color: 'orange',
        description: 'KYC ຂໍ້ມູນຂອງທ່ານໃຫ້ຄົບ',
        link: '/profile/kyc'
    },
    {
        icon: 'mdi-video',
        title: 'ບັນທິກວິດີໂອ',
        color: 'purple',
        description: 'ບັນທິກວິດີໂອແຕ່ລະມື້',
        link: '/profile/video'
    },
    {
        icon: 'mdi-currency-usd',
        title: 'ລາຍໄດ້ຈາກການຂາຍ',
        color: 'teal',
        description: 'ລາຍໄດ້ຈາກການຂາຍທັງຫມົດ',
        link: '/profile/income'
    },
    {
        icon: 'mdi-form-textbox-password',
        title: 'ປ່ຽນລະຫັດຜ່ານ',
        color: 'red',
        description: 'ປ່ຽນລະຫັດຜ່ານຂອງທ່ານ',
        link: '/profile/change_password'
    },
]

</script>