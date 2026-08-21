<template>
    <div class="px-2 my-4">
        <TeamAll/>
        <!-- <v-tabs v-model="tab" grow bg-color="primary" slider-color="orange" dark>
            <v-tab>ທິມງານທັງຫມົດ</v-tab>
            <v-tab>ທິມງານປີນີ້</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <TeamAll />
            </v-tab-item>
            <v-tab-item>
                <TeamThisYear />
            </v-tab-item>
        </v-tabs-items> -->
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useApiAuthStore } from '@/stores/apiAuth'

const { getAllTeam } = useApiAuthStore()
const { allTeams } = storeToRefs(useApiAuthStore())

const tab = ref(0)

onMounted(() => {
    getAllTeam()
})


</script>
