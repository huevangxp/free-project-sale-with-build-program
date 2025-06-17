<template>
    <div class="px-2 my-4">
   
        <!-- <v-card elevation="3" rounded="xl" color="primary" dark>
            <v-card-title class="d-flex align-center justify-space-between">
                <h4>ທິມງານ VIP</h4>
                <v-avatar color="white" size="small" ><v-icon size="20">mdi-arrow-right</v-icon></v-avatar>
            </v-card-title>
           
        </v-card> -->
        <v-row class="my-4" dense >
            <v-col cols="12"   v-for="(item,i) in allTeams.slice(0, 1)" :key="i">
               <v-card elevation="3" rounded="xl" max-width="200" class="mx-auto">
                    <v-sheet color="white" class="pt-2 text-center" rounded="t-xl">
                        <v-avatar size="100" class="mb-4" :color="item.avatar ? undefined : 'primary'" elevation="3">
                            <v-img v-if="item.avatar" :src="'http://localhost:8000/' + item.avatar" cover />
                            <span v-else class="text-h2 text-white font-weight-bold">
                                {{ firstLetter[i] }}
                            </span>
                        </v-avatar>
                    </v-sheet>

                    <div>
                        <v-card-title>
                            <h4 class="text-primary d-flex align-center justify-center text-uppercase">
                                <v-icon size="30" color="primary" class="mr-2">mdi-account</v-icon>
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
        <v-row class="my-4" dense >
            <v-col cols="6"   v-for="(item,i) in allTeams.slice(1, 3)" :key="i">
                <v-card elevation="3" rounded="xl" :to="item.link">
                    <v-sheet color="white" class="pt-2 text-center" rounded="t-xl">
                        <v-avatar size="100" class="mb-4" :color="item.avatar ? undefined : 'primary'" elevation="3">
                            <v-img v-if="item.avatar" :src="'http://localhost:8000/' + item.avatar" cover />
                            <span v-else class="text-h2 text-white font-weight-bold">
                                {{ firstLetter[i+1] }}
                            </span>
                        </v-avatar>
                    </v-sheet>

                    <div>
                        <v-card-title>
                            <h4 class="text-primary d-flex align-center justify-center text-uppercase">
                                <v-icon size="30" color="primary" class="mr-2">mdi-account</v-icon>
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
   import { storeToRefs } from 'pinia'
import { useApiAuthStore } from '@/stores/apiAuth'

const { getAllTeam } = useApiAuthStore()
const { allTeams } = storeToRefs(useApiAuthStore())

onMounted(() => {
    getAllTeam()
})

const firstLetter = computed(() =>
    allTeams.value?.map((item) => item.username.charAt(0).toUpperCase()) || []
)
</script>

