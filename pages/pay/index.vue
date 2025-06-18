<template>
    <div class="px-2 my-4">
        <v-card  elevation="3" rounded="xl">
            <v-card-title class="bg-primary mb-2">
                <h4>ຈ່າຍເງິນ</h4>
            </v-card-title>
            <v-card-text class="d-flex align-center justify-center">
                 <div>
                    <v-img src="/static/qr.png" height="250" width="240" cover></v-img>
                 </div>
            </v-card-text>
            
        </v-card>

       <v-card elevation="3" rounded="xl" class="mt-4">
        <div>
                    <v-card-title>
                        <h4>ຈຳນວນ: <span class="text-primary">{{ formatNumber(cart.length) }}</span></h4>
                    </v-card-title>
                    <v-card-title>
                        <h4>ລາຄາ: <span class="text-primary">{{ formatMoneyLAK(cart.reduce((total, item) => total + item.product.price * item.all_quantity, 0)) }}</span> ກິບ</h4>
                    </v-card-title>
                </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" rounded="pill" size="large" variant="outlined" @click="navigateTo('/cart')">
            <v-icon size="30">mdi-close</v-icon> ຍົກເລີກ
        </v-btn>
        <v-btn color="primary" rounded="pill" size="large" variant="elevated" @click="openDialogSubmit">
            <v-icon size="30">mdi-check-decagram</v-icon> ອານຸຍາດ
        </v-btn>
      </v-card-actions>
       </v-card>
    </div>

    <v-dialog v-model="dialogSubmit" width="400">
        <v-card>
           <v-card-title class="bg-primary mb-2">
           <h3>ຂຽນຄຳອະທິບາຍ</h3>
           </v-card-title>
            <v-card-text>
                <v-textarea v-model="note" placeholder="ຄຳອະທິບາຍ" variant="filled"></v-textarea>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" rounded="pill" size="large" variant="outlined" @click="dialogSubmit = false">
                    <v-icon size="30">mdi-close</v-icon> ຍົກເລີກ
                </v-btn>
                <v-btn color="primary" :disabled="note.length === 0" rounded="pill" size="large" variant="elevated" @click="submitPayment">
                    <v-icon size="30">mdi-check-decagram</v-icon> ອານຸຍາດ
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { useFormat } from '@/composables/useFormat';
import { storeToRefs } from 'pinia'
import { useApiCartStore } from '@/stores/apiCart';

const { formatMoneyLAK, formatNumber } = useFormat();

const { checkout , fetchCart } = useApiCartStore()
const { cart } = storeToRefs(useApiCartStore())

const note = ref('')
const dialogSubmit = ref(false)

onMounted(() => {
    fetchCart()
})


const openDialogSubmit = () => {
    dialogSubmit.value = true
}

const submitPayment = () => {
     try {
        const data = {
            user_id: useCookie('id').value,
            notes: note.value   
        }
        checkout(data)
        dialogSubmit.value = false
        navigateTo('/pay/comfirm')
     } catch (error) {
        console.log(error)
     }
}

</script>