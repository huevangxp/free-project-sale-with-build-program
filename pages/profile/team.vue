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
            <span>ທິມງານທັງຫມົດ</span>
          </h2>
        </div>
      </div>

      <!-- Summary card -->
      <v-card class="rounded-xl mb-4 mx-2" flat color="primary">
        <v-card-text class="d-flex align-center pa-4">
          <v-avatar size="52" color="white" class="mr-4">
            <v-icon color="primary" size="28">mdi-account-group</v-icon>
          </v-avatar>
          <div>
            <div class="text-white text-h5 font-weight-bold">
              {{ teams?.length || 0 }}
            </div>
            <div class="text-caption text-white" style="opacity: 0.85">
              <span>ສະມາຊິກໃນທິມ</span>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <!-- Team Grid -->
      <v-container fluid class="pa-0">
        <!-- Loading skeletons -->
        <v-row v-if="loading && (!teams || teams.length === 0)" dense>
          <v-col cols="6" sm="4" md="3" v-for="n in 8" :key="n">
            <v-card class="rounded-xl" border flat color="white">
              <div class="pt-6 pb-4 d-flex flex-column align-center">
                <v-skeleton-loader
                  type="avatar"
                  class="mb-2"
                ></v-skeleton-loader>
                <v-skeleton-loader
                  type="text"
                  width="80"
                ></v-skeleton-loader>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Members -->
        <v-row v-else dense>
          <v-col cols="6" sm="4" md="3" v-for="(item, i) in teams" :key="i">
            <v-card
              class="team-card rounded-xl fill-height"
              border
              flat
              color="white"
            >
              <div
                class="pt-6 pb-4 d-flex flex-column align-center text-center"
              >
                <v-avatar
                  size="80"
                  class="mb-3"
                  :color="item.avatar ? undefined : 'primary'"
                >
                  <v-img
                    v-if="item.avatar"
                    :src="'http://localhost:8000/' + item.avatar"
                    cover
                  />
                  <span v-else class="text-h4 text-white font-weight-bold">
                    {{ firstLetter[i] }}
                  </span>
                </v-avatar>

                <div
                  class="text-subtitle-1 font-weight-bold text-primary mb-1 text-uppercase"
                >
                  {{ item.username }}
                </div>

                <v-chip
                  color="error"
                  variant="tonal"
                  size="x-small"
                  class="font-weight-bold px-3"
                >
                  <v-icon start size="14">mdi-crown</v-icon>
                  {{ item.role }}
                </v-chip>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Empty state -->
        <div
          v-if="!loading && (!teams || teams.length === 0)"
          class="text-center py-16 text-medium-emphasis"
        >
          <v-icon size="64" color="grey-lighten-1"
            >mdi-account-group-outline</v-icon
          >
          <p class="text-body-2 mt-2">ຍັງບໍ່ມີສະມາຊິກໃນທິມ</p>
        </div>
      </v-container>
    </div>
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
  () => teams.value?.map((item) => item.username.charAt(0).toUpperCase()) || []
);
</script>

<style scoped>
.product-container {
  background-color: #f8f9fa;
}
.team-card {
  transition: all 0.3s ease;
}
.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05) !important;
}
</style>
