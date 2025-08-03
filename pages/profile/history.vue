<template>
    <div class="px-2 my-4">
        <v-card>
            <v-card-title class="bg-primary mb-2" dark>
                <h4> <v-icon size="30" @click="$router.back()">mdi-arrow-left</v-icon> ປະຫວັດການຊື້ເຄື່ອງ</h4>
            </v-card-title>
            <v-card-title>
                <v-row dense>
                    <v-col cols="12">
                        <v-card elevation="3" rounded="xl">
                            <v-card-title class=" ">
                                <h6 class="text-center"> ຈຳນວນເງິນ</h6>
                                <h4 class="text-center text-primary">{{ formatMoneyLAK(getAllTotalPrice) }}</h4>
                                <h6 class="text-center">ກິບ</h6>
                            </v-card-title>
                        </v-card>
                    </v-col>
                    <v-col cols="6">
                        <v-card elevation="3" rounded="xl" class="bg-info">
                            <v-card-title class=" ">
                                <h6 class="text-center text-white"> ຈຳນວນເຄື່ອງ</h6>
                                <h5 class="text-center text-white">{{ formatNumber(getAllQuantity) }}</h5>
                                <h6 class="text-center text-white">ອັນ</h6>
                            </v-card-title>
                        </v-card>
                    </v-col>
                    <v-col cols="6">
                        <v-card elevation="3" rounded="xl" class="bg-primary">
                            <v-card-title>
                                <h6 class="text-center text-white"> ເງິນກຳໄລ</h6>
                                <h5 class="text-center text-white">{{ formatMoneyLAK(getAllProfit) }}</h5>
                                <h6 class="text-center text-white">ກິບ</h6>
                            </v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-title>

        </v-card>
        <v-card class="mt-5">
            <v-card-title class="bg-primary mb-4" dark>
                <h4> <v-icon size="30" @click="$router.back()">mdi-arrow-left</v-icon> ປະຫວັດການຊື້ເຄື່ອງ</h4>
            </v-card-title>
            <v-card-text>
<!-- {{ orders[0] }} -->
                <v-row>
                    <v-col cols="12" v-for="(order, i) in orders" :key="i">
                        <v-card class=" pa-2">
                            <v-row class="mb-4">
                                <v-col cols="12" md="6">
                                    <div class="order-info">
                                        <h3 class=" mb-3 text-center text-primary">ຂໍ້ມູນການສັ່ງ</h3>
                                        <div class="info-item">
                                            <span class="label">ເລກທີສັ່ງ: </span>
                                            <span class="value">{{ order.order_number }}</span>
                                        </div>
                                        <div class="info-item">
                                            <span class="label">ວັນທີ: </span>
                                            <span class="value">{{ formatDate(order.created_at) }}</span>
                                        </div>
                                        <div class="info-item">
                                            <span class="label">ເວລາ: </span>
                                            <span class="value">{{ formatTime(order.created_at) }}</span>
                                        </div>
                                      
                                    </div>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <h3 class=" mb-3 text-center text-primary">ສິນຄ້າ</h3>
                                    <v-divider></v-divider>
                                    <v-data-table :headers="headers" :items="order.items" :items-per-page="5"
                                        hide-default-header :hide-default-footer="true" class="elevation-0 pa-0 mt-2"
                                        mobile-breakpoint="0">
                                        <template #item.image="{ item }">
                                            <div class="py-2">
                                                <v-img :src="'http://localhost:8000/' + item.product.image" height="40"
                                                    width="40"></v-img>
                                            </div>
                                        </template>
                                        <template #item.title="{ item }">
                                            <div class="py-2" style="font-size: 12px;">
                                                {{ item.product.title }}
                                            </div>
                                        </template>
                                        <template #item.quantity="{ item }">
                                            <div class="py-2" style="font-size: 12px;">
                                                {{ item.quantity }}
                                            </div>
                                        </template>
                                      <template #item.unitPrice="{ item }">
                                            <div style="font-size: 12px;">
                                                {{ formatMoneyLAK(item.product.price) }}
                                            </div>
                                        </template>
                                        <template #item.totalPrice="{ item }">
                                            <div class="py-2" style="font-size: 12px;">
                                                {{ formatMoneyLAK(Number(item.product.price) * Number(item.quantity)) }}
                                            </div>
                                        </template>
                                    </v-data-table>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <div class="order-info">
                                        <h3 class=" mb-3 text-center text-primary">ສະຖານະ</h3>
                                       
                                        <div class="info-item">
                                            <span class="label">ສະຖານະ: </span>
                                            <v-chip  dark small style="font-size: 12px;" :color="getStatusColor(order.status)" v-if="order.status === 'PAID'" @click="openBill(order)">
                                                {{ getStatusText(order.status) }}
                                            </v-chip>
                                            <v-chip v-else  dark small style="font-size: 12px;" :color="getStatusColor(order.status)">
                                                {{ getStatusText(order.status) }}
                                            </v-chip>
                                        </div>
                                      
                                        <div class="info-item">
                                            <span class="label">ລາຄາລວມ: </span>
                                            <span class="value">{{ formatMoneyLAK(order.total_price) }}</span>
                                        </div>
                                        <div class="info-item">
                                            <span class="label">ກຳໄລ: </span>
                                            <span class="value">{{ formatMoneyLAK(order.all_profit) }}</span>
                                        </div>
                                        <div class="info-item">
                                            <span class="label">ຈຳນວນ: </span>
                                            <span class="value">{{ formatNumber(order.total_quantity) }}</span>
                                        </div>
                                        <div class="info-item" v-if="order.notes">
                                            <span class="label">ໝາຍເຫດ: </span>
                                            <span class="value">{{ order.notes }}</span>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card>
                 
                    </v-col>
                </v-row>

            </v-card-text>
        </v-card>
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title class="bg-primary mb-2">
                    <h4>ການຈ່າຍເງິນ</h4>
                </v-card-title>
                <v-card-text>
                    <v-img :src=" 'http://localhost:8000/' + bill.image" cover height="100%"></v-img>
                </v-card-text>
                <v-card-actions class="px-4">
                    <v-spacer></v-spacer>
                    <v-btn color="red" rounded="pill" size="large" variant="outlined" @click="dialog = false">
                        <v-icon size="30">mdi-close</v-icon> ຍົກເລິກ
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { useFormat } from '@/composables/useFormat';
import { storeToRefs } from 'pinia'
import { useApiOrderStore } from '@/stores/apiOrder';
const { formatMoneyLAK, formatDate, formatNumber, formatTime } = useFormat();

const { getOrders } = useApiOrderStore()

const { orders } = storeToRefs(useApiOrderStore())

const bill = ref({});
const dialog = ref(false);

const openBill = (order) => {
    bill.value = order;
    dialog.value = true;
}

const getStatusColor = (status) => {
        const colors = {
          PENDING: 'orange',
            PAID: 'green',
          CANCELLED: 'error',
        };
        return colors[status] || 'grey';
      };

      const getStatusText = (status) => {
        const texts = {
          PENDING: 'ລໍຖ້າ',
          PAID: 'ຈ່າຍເງິນແລ້ວ',
          CANCELLED: 'ຍົກເລີກ',
        };
        return texts[status] || status; // Fallback to raw status if text not found
      }

const headers = [
    { title: 'ຮູບ', key: 'image' },
    { title: 'ຊື່ສິນຄ້າ', key: 'title' },
    { title: 'ຈຳນວນ', key: 'quantity' },
    { title: 'ລາຄາ', key: 'unitPrice' },
    { title: 'ລາຄາລວມ', key: 'totalPrice' },
]

const getAllQuantity = computed(() => orders.value.reduce((total, order) => total + order.total_quantity, 0));

const getAllTotalPrice = computed(() => orders.value.reduce((total, order) => total + order.total_price, 0));



const getAllProfit = computed(() => 
  orders.value.reduce((total, order) => total + Number(order.all_profit), 0)
);

onMounted(() => {
    getOrders()
    getAllQuantity
    getAllTotalPrice
})

</script>
