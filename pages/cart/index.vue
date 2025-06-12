<template>
    <div class="px-2 my-4">
        <v-card>
            <v-card-title class="bg-primary">
                <h4>ສິນຄ້າທັງໝົດ</h4>
            </v-card-title>
            <div class="d-flex align-center justify-space-between px-2">
                <div>
                    <v-card-title>
                        <h4>ຈຳນວນ: <span class="text-primary">{{ formatNumber(cart.length) }}</span></h4>
                    </v-card-title>
                    <v-card-title>
                        <h4>ລາຄາ: <span class="text-primary">{{ formatMoneyLAK(cart.reduce((total, item) => total + item.product.price * item.all_quantity, 0)) }}</span> ກິບ</h4>
                    </v-card-title>
                </div>
                <div>
                    <v-btn color="primary" rounded="pill" size="large" variant="text" @click="navigateTo('/pay')">
                        <v-icon size="40">mdi-qrcode-scan</v-icon>
                    </v-btn>
                </div>
            </div>
        </v-card>

      <div>
        <v-row class="my-4" dense>
            <v-col cols="12" v-for="(item, i) in cart" :key="i">
                <v-card class="rounded-xl d-flex align-center" elevation="3">
                    <div>
                        <v-img :src=" 'http://localhost:8000/' + item.product.image" width="150" height="130" contain></v-img>
                    </div>

                    <v-card-title>
                        <h3 class="text-primary">
                            {{ item.product.title }}
                        </h3>
                        <lazy-prose-h5 class="text-red">
                            {{ formatMoneyLAK(item.product.price) }}
                        </lazy-prose-h5>
                        <p class="fontsize text-primary">
                            {{ formatDate(item.createdAt) }}
                        </p>

                    </v-card-title>
                    <v-card-title>
                        <h4>

                            <v-btn color="primary" elevation="0" rounded="xl" variant="text"><v-icon
                                    size="20">mdi-plus</v-icon></v-btn>
                        </h4>
                        <h4 class="text-center">
                             {{ item.all_quantity }}
                        </h4>
                        <v-btn color="primary" elevation="0" rounded="xl" variant="text"><v-icon
                                size="20">mdi-minus</v-icon></v-btn>
                    </v-card-title>

                </v-card>
            </v-col>
        </v-row>
      </div>

    </div>
</template>

<script setup>
// import { formatMoneyLAK, formatNumber } from '@/composables/useFormat';
import { useFormat } from '@/composables/useFormat';
import { storeToRefs } from 'pinia'
import { useApiCartStore } from '@/stores/apiCart';

const { formatMoneyLAK, formatNumber, formatDate } = useFormat();

const apiCartStore = useApiCartStore()
const { cart } = storeToRefs(apiCartStore)

onMounted(() => {
    apiCartStore.fetchCart()
})

</script>

<style scoped>
.fontsize {
    font-size: 15px;
}
</style>
