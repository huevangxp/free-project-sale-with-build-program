<template>
    <div class="px-2 my-4">
        <v-card elevation="3" rounded="xl" >
            <v-card-title class="bg-primary mb-4" dark>
                <h4>ລາຍງານ</h4>
            </v-card-title>
            <v-card-text>
                <v-row dense>
                    <v-col cols="8">
                        <v-text-field placeholder="ລາຄາ" variant="solo" color="primary" elevation="3"
                            rounded="xl"></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <!-- v-btn search -->
                        <v-btn color="primary" block variant="elevated" size="large"  height="55" class="rounded-xl">ຄົ້ນຫາ</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-card elevation="3" rounded="xl" class="mt-4">
            <v-card-title>
                <h4>ລາຍງານ</h4>
            </v-card-title>
            <v-card-text>
                <v-row dense>
                    <v-col v-for="(item,i) in 6" :key="i" cols="12">
                        <v-card elevation="3" class="d-flex">
                            <div>
                                <v-card-title class="d-flex align-center justify-center">
                                    <v-icon size="100" color="primary">mdi-calendar</v-icon>
                                </v-card-title>
                            </div>
                            <div>
                                <v-card-title class="pb-0 mb-0">
                                <h4 class="text-primary">ລາຍໄດ້</h4>
                            </v-card-title>
                            <v-card-title class="py-0 my-0">
                                <h5 class="text-red">{{ formatMoneyLAK(100000) }}</h5>
                            </v-card-title>
                            <v-card-title class="pt-0 mt-0">
                                <h6 class="text-primary">{{ formatDate(new Date()) }}</h6>
                            </v-card-title>
                            
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
import { useFormat } from '@/composables/useFormat';
const { formatMoneyLAK, formatDate } = useFormat();
</script>
