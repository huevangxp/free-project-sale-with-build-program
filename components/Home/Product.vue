<template>
    <div class=" my-4">
        <div>
            <v-row dense>
                <v-col v-for="i in types" cols="4" md="4">
                    <v-card class="d-flex align-center justify-center" elevation="3" rounded="xl">
                        <div>
                            <v-img :src="'http://localhost:8000/' + i.image" cover height="40" width="40"></v-img>

                        </div>
                        <v-card-title class="text-center">{{ i.title }}</v-card-title>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <v-card class="my-4 " color="primary" dark elevation="3" rounded="xl">
            <v-card-title class="d-flex align-center justify-space-between">
                <h4>ສິນຄ້າ</h4>
                <v-avatar color="white" size="small" @click="navigateTo('/product')"><v-icon
                        size="20">mdi-arrow-right</v-icon></v-avatar>
            </v-card-title>

        </v-card>
        <v-row dense>
            <v-col cols="6" md="4" v-for="(item, i) in products" :key="i">
                <v-card class="rounded-xl" elevation="3">
                    <v-img :src="'http://localhost:8000/' + item.image" height="200" contain></v-img>

                    <div class="d-flex align-center justify-space-between">
                        <div>
                            <v-card-title>
                                <h4 class="text-primary">
                                    {{ item.title }}
                                </h4>
                            </v-card-title>
                            <v-card-text>
                                <h3 class="text-secondary">
                                    {{ formatMoneyLAK(item.price) }}
                                </h3>
                            </v-card-text>
                        </div>
                        <div>
                            <v-btn color="primary" elevation="0" rounded="pill" variant="text"
                                @click="openDialogAddCart(item)"><v-icon size="30">mdi-cart</v-icon></v-btn>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="dialogAddCart" width="400">
            <v-card>
                <v-card-text class="d-flex justify-end">
                    <v-icon color="red" size="30" @click="closeDialog">mdi-close</v-icon>
                </v-card-text>
                <v-card-title>
                    <v-img :src="'http://localhost:8000/' + itemDialog.image" height="200" contain></v-img>
                </v-card-title>
                <v-card-text>
                    <v-card-title class="px-0">
                        <h4 class="text-primary">
                            {{ itemDialog.title }}
                        </h4>
                    </v-card-title>
                    <v-card-text class="px-0">
                        <h3 class="text-secondary">
                            {{ formatMoneyLAK(itemDialog.price) }}
                        </h3>
                    </v-card-text>
                    <v-card-text class="py-0 px-0">
                        <p>{{ itemDialog.description }}</p>
                    </v-card-text>
                    <v-card-text class="py-0 px-0 mt-4">
                        <!-- {{ profit }} -->
                          <h3 class="text-primary mb-2">ກຳໄລ່ຈາກການຊື້ສິນຄ້າ</h3>
                          <p>* ຈຳນວນ: 10 ລົງມາ, ກຳໄລ່: {{ formatMoneyLAK(0) }} ກິບ / ອັນ</p>
                        <p v-for="(i, index) in profit" :key="index">
                          * ຈຳນວນ: {{ i.product_amount }} ຂື້ນໄປ, ກຳໄລ່: {{ formatMoneyLAK(i.profit) }} ກິບ / ອັນ
                        </p>
                    </v-card-text>
                </v-card-text>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="quantity" type="number" variant="outlined"
                                density="compact"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-btn color="primary" :disabled="quantity === 0" rounded="pill" size="large" block
                                variant="elevated" @click="addProductToCart">
                                <v-icon size="30">mdi-check-decagram</v-icon> ອານຸຍາດ
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>


            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { useFormat } from '@/composables/useFormat';
import { storeToRefs } from 'pinia'
import { useApiProductTypeStore } from '@/stores/apiProductType';
import { useApiProductStore } from '@/stores/apiProduct';
import { useApiCartStore } from '@/stores/apiCart';
import { useApiSetProfitStore } from '@/stores/apiSetProfit';

const apiSetProfitStore = useApiSetProfitStore()
const { setProfit } = apiSetProfitStore
const { profit } = storeToRefs(apiSetProfitStore)

const apiProductTypeStore = useApiProductTypeStore()
const { types } = storeToRefs(apiProductTypeStore)

const apiProductStore = useApiProductStore()
const { products } = storeToRefs(apiProductStore)

const apiCartStore = useApiCartStore()
const { addCart } = apiCartStore
const { fetchCart } = apiCartStore
const { fetchProductTypes } = apiProductTypeStore
const { fetchProducts } = apiProductStore

onMounted(() => {
    fetchProductTypes()
    fetchProducts()
    fetchCart()
    setProfit()
})

const { formatMoneyLAK } = useFormat();

const dialogAddCart = ref(false)
const itemDialog = ref({})
const note = ref('')
const quantity = ref(1)

const openDialogAddCart = (item) => {
    dialogAddCart.value = true
    itemDialog.value = item
}

const closeDialog = () => {
    dialogAddCart.value = false
}

const addProductToCart = async () => {
    try {
        const token = useCookie('token');
        const userId = useCookie('id');

        if (!token.value || !userId.value) {
            return navigateTo('/login')
        }

        const data = {
            user_id: userId.value,
            product_id: itemDialog.value.id,
            quantity: quantity.value,
            // note: note.value
        }

        await addCart(data)
        await fetchCart(userId.value)
        dialogAddCart.value = false
    } catch (error) {
        console.log(error)
    }
}

</script>