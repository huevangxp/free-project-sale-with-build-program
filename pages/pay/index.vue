<template>
    <div class="px-2 my-4">
      

        <v-card 
    class="cart-summary-card rounded-xl overflow-hidden"
    elevation="4"
    :class="{ 'cart-summary-card--animated': isVisible }"
  >
    <!-- Header Section -->
    <div class="cart-header">
      <div class="header-background"></div>
      <div class="header-content">
        <v-icon class="header-icon" size="24" color="white">mdi-cart</v-icon>
        <h3 class="header-title">ສິນຄ້າທັງໝົດ</h3>
      </div>
    </div>

    <div class="d-flex align-center justify-center">
   <div>
    <v-img src="/static/qr.png" height="250" width="240" cover></v-img>
   </div>
  </div>

    <!-- Content Section -->
    <div class="cart-content">
      <div class="info-grid">
        <!-- Quantity Card -->
        <div class="info-item">
          <div class="info-icon-wrapper quantity">
            <v-icon size="20" color="primary">mdi-package</v-icon>
          </div>
          <div class="info-content">
            <span class="info-label">ຈຳນວນ</span>
            <span class="info-value primary--text">
              {{ formatNumber(cart.length) }} <span class="info-unit">ອັນ</span>
            </span>
          </div>
        </div>

        <!-- Total Amount Card -->
        <div class="info-item">
          <div class="info-icon-wrapper total">
            <v-icon size="20" color="blue">mdi-calculator</v-icon>
          </div>
          <div class="info-content">
            <span class="info-label">ທັງໝົດ</span>
            <span class="info-value blue--text">
              {{ formatMoneyLAK(totalAmount) }}
            </span>
          </div>
        </div>

        <!-- Payment Due Card -->
        <div class="info-item">
          <div class="info-icon-wrapper payment">
            <v-icon size="20" color="warning">mdi-cash</v-icon>
          </div>
          <div class="info-content">
            <span class="info-label">ຕ້ອງຈ່າຍ</span>
            <span class="info-value warning--text">
              {{ formatMoneyLAK(paymentDue) }}
            </span>
          </div>
        </div>

        <!-- Profit Card -->
        <div class="info-item">
          <div class="info-icon-wrapper profit">
            <v-icon size="20" color="success">mdi-trending-up</v-icon>
          </div>
          <div class="info-content">
            <span class="info-label">ກຳໄລ</span>
            <span class="info-value success--text">
              {{ formatMoneyLAK(totalProfit) }}
            </span>
          </div>
        </div>

       
      </div> 

      <!-- Action Button -->
      <div class="action-section">
        <v-btn
          class="scan-btn"
          color="primary"
          size="x-large"
          rounded
          elevation="2"
          @click="openDialogSubmit"
        >
          <v-icon class="scan-icon" size="28">mdi-qrcode-scan</v-icon>
          <span class="scan-text">ສະແກນເພື່ອຈ່າຍ</span>
        </v-btn>
      </div>
    </div>
  </v-card>
 
    </div>

    <v-dialog v-model="dialogSubmit" width="400">
        <v-card>
           <v-card-title class="bg-primary mb-2">
           <h3>ລາຍລະອຽດ</h3>
           </v-card-title>
            <v-card-text>
                <v-textarea v-model="note" placeholder="ແຈ້ງ: ເບີຜູ້ຝາກ,ເບີຜູ້ຮັບ,ສາຂາບໍລິສັດຂົນສົ່ງ" variant="filled"></v-textarea>
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

const { formatMoneyLAK, formatNumber, formatDate } = useFormat();

const { checkout , fetchCart } = useApiCartStore()
const { cart } = storeToRefs(useApiCartStore())

const note = ref('')
const dialogSubmit = ref(false)
const isVisible = ref(false)
onMounted(() => {
    fetchCart()
    nextTick(() => {
    isVisible.value = true
  })
})

const totalAmount = computed(() => 
  cart.value.reduce((total, item) => total + item.product.price * item.all_quantity, 0)
)

const paymentDue = computed(() => 
  cart.value.reduce((total, item) => total + Number(item.all_price), 0)
)

const totalProfit = computed(() => 
  cart.value.reduce((total, item) => total + Number(item.profit) * item.all_quantity, 0)
)


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

<style scoped>
.cart-summary-card {
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border: 1px solid rgba(var(--v-border-color), 0.12);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(20px);
}

.cart-summary-card--animated {
  transform: translateY(0);
  opacity: 1;
}

.cart-header {
  position: relative;
  height: 60px;
  overflow: hidden;
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 100%);
}

.header-background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.3;
}

.header-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  z-index: 1;
}

.header-icon {
  margin-right: 12px;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.cart-content {
  padding: 24px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background: rgba(var(--v-theme-surface), 0.8);
  border-radius: 12px;
  border: 1px solid rgba(var(--v-border-color), 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.info-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: rgb(var(--v-theme-primary));
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.info-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info-item:hover::before {
  transform: scaleY(1);
}

.date-item {
  grid-column: 1 / -1;
}

.info-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
}

.info-icon-wrapper.quantity {
  background: rgba(var(--v-theme-primary), 0.1);
}

.info-icon-wrapper.total {
  background: rgba(33, 150, 243, 0.1);
}

.info-icon-wrapper.payment {
  background: rgba(var(--v-theme-warning), 0.1);
}

.info-icon-wrapper.profit {
  background: rgba(var(--v-theme-success), 0.1);
}

.info-icon-wrapper.date {
  background: rgba(97, 97, 97, 0.1);
}

.info-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.info-label {
  font-size: 0.875rem;
  color: rgba(var(--v-theme-on-surface), 0.7);
  margin-bottom: 4px;
  font-weight: 500;
}

.info-value {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.2;
}

.info-unit {
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.8;
}

.action-section {
  display: flex;
  justify-content: center;
  padding-top: 8px;
  border-top: 1px solid rgba(var(--v-border-color), 0.12);
}

.scan-btn {
  position: relative;
  padding: 12px 32px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 100%);
}

.scan-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(var(--v-theme-primary), 0.3);
}

.scan-icon {
  margin-right: 8px;
  animation: pulse 2s infinite;
}

.scan-text {
  font-size: 1rem;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .cart-content {
    padding: 16px;
  }
  
  .info-item {
    padding: 12px;
  }
  
  .scan-btn {
    width: 100%;
    padding: 16px;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .cart-summary-card {
    background: linear-gradient(135deg, rgb(var(--v-theme-surface)) 0%, rgba(var(--v-theme-surface-variant), 0.3) 100%);
  }
  
  .info-item {
    background: rgba(var(--v-theme-surface-variant), 0.3);
    border-color: rgba(var(--v-border-color), 0.2);
  }
}
</style>