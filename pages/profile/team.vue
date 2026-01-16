<template>
  <div class="px-2 my-4">
    <!-- <v-card elevation="3" rounded="xl" class="d-flex align-center">
            <v-card-title>
                 <v-img src="https://img.freepik.com/premium-photo/portrait-serious-african-guy-looking-camera_116547-37326.jpg?semt=ais_hybrid&w=740" height="150" width="120" cover></v-img>
            </v-card-title>
        <div>
            <v-card-text>
                <h2 class="text-primary d-flex align-center justify-space-between" style="width: 100%;"><div>ທ່ານ ລີຟອງ ວ່າງ</div> 
                </h2>
                <h4>ອີເມວ: <span class="text-primary">lisfoom@gmail.com</span></h4>
                <h4>ເບິໂທ: <span class="text-primary">085555555</span></h4>
                <h4>ສະຖານະ: <span class="text-primary">VIP</span></h4>
                <h4>ລູກທິມ: <span class="text-red">100</span> ຄົນ</h4>
            </v-card-text>
          
        </div>
        </v-card> -->

    <v-card elevation="3" rounded="xl" class="my-4" color="primary" dark>
      <v-card-title class="d-flex align-center justify-space-between">
        <h4>
          <v-icon size="30" @click="$router.back()">mdi-arrow-left</v-icon>
          ທິມງານທັງຫມົດ
        </h4>
      </v-card-title>
    </v-card>

    <v-row class="my-4" dense>
      <v-col cols="6" v-for="(item, i) in teams" :key="i">
        <v-card elevation="3" rounded="xl" :to="item.link">
          <v-sheet color="white" class="pt-2 text-center" rounded="t-xl">
            <v-avatar
              size="100"
              class="mb-4"
              :color="item.avatar ? undefined : 'primary'"
              elevation="3"
            >
              <v-img
                v-if="item.avatar"
                :src="'http://localhost:8000/' + item.avatar"
                cover
              />
              <span v-else class="text-h2 text-white font-weight-bold">
                {{ firstLetter[i] }}
              </span>
            </v-avatar>
          </v-sheet>

          <div>
            <v-card-title>
              <h4
                class="text-primary d-flex align-center justify-center text-uppercase"
              >
                <v-icon size="30" color="primary" class="mr-2"
                  >mdi-account</v-icon
                >
                {{ item.username }}
              </h4>
            </v-card-title>

            <v-card-text>
              <div class="mb-2 d-flex align-center justify-center">
                <v-chip color="red" text-color="white" class="font-weight-bold">
                  <v-icon size="16" class="mr-2">mdi-crown</v-icon>
                  {{ item.role }}
                </v-chip>
              </div>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useApiAuthStore } from "@/stores/apiAuth";

const apiAuthStore = useApiAuthStore();
const { teams } = storeToRefs(apiAuthStore);

onMounted(() => {
  apiAuthStore.getTeamByMycodeInvite();
});

const firstLetter = computed(
  () =>
    // teams array use map to get first letter
    teams.value?.map((item) => item.username.charAt(0).toUpperCase()) || []
);

const capitalizeUsername = (username) => {
  if (!username) return "";
  return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
};
</script>
