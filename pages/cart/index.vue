<template>
    <div class="px-2 my-4">
        <v-card>
            <v-card-title class="bg-primary">
                <h4>ສິນຄ້າທັງໝົດ</h4>
            </v-card-title>
            <div class="d-flex align-center justify-space-between px-2">
                <div>
                    <v-card-title>
                        <h4>ຈຳນວນ: <span class="text-primary">{{ formatNumber(1000) }}</span></h4>
                    </v-card-title>
                    <v-card-title>
                        <h4>ລາຄາ: <span class="text-primary">{{ formatMoneyLAK(1000000) }}</span> ກິບ</h4>
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
        <Cart />
      </div>

    </div>
</template>

<script setup>
// import { formatMoneyLAK, formatNumber } from '@/composables/useFormat';
import { useFormat } from '@/composables/useFormat';
const { formatMoneyLAK, formatNumber, formatDate } = useFormat();


</script>

<style scoped>
.fontsize {
    font-size: 15px;
}
</style>
