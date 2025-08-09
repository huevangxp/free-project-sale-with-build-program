<template>
    <div class="px-2 my-4">
        <v-card class="cart-summary-card rounded-xl overflow-hidden" elevation="4"
            :class="{ 'cart-summary-card--animated': isVisible }">
            <!-- Header Section -->
            <div class="cart-header">
                <div class="header-background"></div>
                <div class="header-content">
                    <v-icon class="header-icon" size="24" color="white">mdi-cart</v-icon>
                    <h3 class="header-title">ສິນຄ້າທັງໝົດ</h3>
                </div>
            </div>
            <div class="cart-content">
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-icon-wrapper quantity">
                            <v-icon size="20" color="primary">mdi-package</v-icon>
                        </div>
                        <div class="info-content">
                            <span class="info-label">ຈຳນວນທັງຫມົດ ( ກົດເຂົ້າເບິ່ງທັງໝົດ )</span>
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

                    <!-- Date Card -->
                    <div class="info-item date-item">
                        <div class="info-icon-wrapper date">
                            <v-icon size="20" color="grey-darken-1">mdi-calendar</v-icon>
                        </div>
                        <div class="info-content">
                            <span class="info-label">ວັນທີ</span>
                            <span class="info-value grey--text text--darken-1">
                                {{ formatDate(cart[0]?.createdAt || new Date()) }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Action Button -->
                <div class="action-section">
                    <v-btn block color="primary" size="x-large" rounded elevation="2" @click="navigateTo('/pay')">
                        <v-icon class="scan-icon" size="28">mdi-qrcode-scan</v-icon>
                        <span class="scan-text">ສະແກນເພື່ອຈ່າຍ</span>
                    </v-btn>
                </div>
            </div>
        </v-card>
       <v-card>
       </v-card>
        <div class="mt-6">
        <v-row class="my-4" dense >
            <v-col cols="12" v-for="(item, i) in cart" :key="i">
                <v-card 
    class="modern-product-card rounded-xl overflow-hidden"
    elevation="2"
    :class="{ 'card-hover': isHovered }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Product Image Section -->
    <div class="image-container">
      <div class="image-wrapper">
        <v-img 
          :src="'http://localhost:8000/' + item.product.image" 
          width="120" 
          height="120" 
          cover
          class="product-image"
        >
          <template v-slot:placeholder>
            <div class="image-placeholder">
              <v-progress-circular 
                indeterminate 
                color="primary" 
                size="24"
              ></v-progress-circular>
            </div>
          </template>
        </v-img>
        
        <!-- Floating quantity badge -->
        <div class="quantity-badge">
          <span class="quantity-text">{{ item.all_quantity }}</span>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="content-section">
      <!-- Product Info -->
      <div class="product-info">
        <h3 class="product-title">
          {{ item.product.title }}
        </h3>
        
        <!-- Price Grid -->
        <div class="price-grid">
          <div class="price-item unit-price">
            <div class="price-label">
              <v-icon size="14" color="primary">mdi-tag</v-icon>
              <span>ລາຄາ/ໜ່ວຍ</span>
            </div>
            <div class="price-value text-primary" v-if="item.price_by_init === item.product.price">
             {{ formatMoneyLAK(item.price_by_init) }}
            </div>
            <div class="price-value text-primary" v-else>
             <span v-if="item.price_by_init >= 0"> {{ formatMoneyLAK(item.price_by_init) }}</span> <span v-if="item.price_by_init > 0" class="text-decoration-line-through text-red">{{ formatMoneyLAK(item.product.price) }}</span>
            </div>
          </div>
          
          <div class="price-item total-price">
            <div class="price-label">
              <v-icon size="14" color="grey-darken-1">mdi-calculator</v-icon>
              <span>ລວມ</span>
            </div>
            <div class="price-value text-grey-darken-1">
              {{ formatMoneyLAK(item.all_price) }}
            </div>
          </div>
          
          <div class="price-item profit">
            <div class="price-label">
              <v-icon size="14" color="success">mdi-trending-up</v-icon>
              <span>ກຳໄລ</span>
            </div>
            <div class="price-value text-success">
           {{ formatMoneyLAK(item.profit * item.all_quantity) }} ( <span class="text-secondary">{{ formatMoneyLAK(item.profit) }} / ອັນ</span> )
            </div>
          </div>
        </div>
      </div>

      <!-- Quantity Controls -->
      <div class="quantity-controls">
        <div class="control-wrapper">
          <v-btn
            class="quantity-btn minus-btn"
            icon
            size="small"
            variant="tonal"
            color="primary"
            :disabled="item.all_quantity <= 1"
            @click="minusQuantity(item.id)"
          >
            <v-icon size="16">mdi-minus</v-icon>
          </v-btn>
          
          <div class="quantity-display">
            <span class="quantity-number">{{ item.all_quantity }}</span>
            <span class="quantity-unit">ໜ່ວຍ</span>
          </div>
          
          <v-btn
            class="quantity-btn plus-btn"
            icon
            size="small"
            variant="tonal"
            color="primary"
            @click="plusQuantity(item.id)"
          >
            <v-icon size="16">mdi-plus</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Animated Background Elements -->
    <div class="bg-decoration">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
    </div>
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

const plusQuantity = (id) => {
    apiCartStore.plusQuantity(id)
}
const totalAmount = computed(() =>
    cart.value.reduce((total, item) => total + item.product.price * item.all_quantity, 0)
)

const paymentDue = computed(() =>
    cart.value.reduce((total, item) => total + Number(item.all_price), 0)
)
const isHovered = ref(false)
const totalProfit = computed(() =>
    cart.value.reduce((total, item) => total + Number(item.profit) * item.all_quantity, 0)
)
const minusQuantity = (id) => {
    apiCartStore.minusQuantity(id)
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
}

.cart-header {
    position: relative;
    height: 80px;
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

    0%,
    100% {
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

.modern-product-card {
  display: flex;
  position: relative;
  padding: 20px;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%);
  border: 1px solid rgba(var(--v-border-color), 0.08);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: visible;
}

.card-hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
}

.card-hover .product-image {
  transform: scale(1.1) rotate(2deg);
}

.card-hover .quantity-badge {
  transform: scale(1.1);
}

.image-container {
  flex-shrink: 0;
  margin-right: 20px;
  position: relative;
}

.image-wrapper {
  position: relative;
  padding: 8px;
  background: linear-gradient(135deg, rgba(var(--v-theme-primary), 0.05) 0%, rgba(var(--v-theme-secondary), 0.05) 100%);
  border-radius: 16px;
  border: 2px solid rgba(var(--v-theme-primary), 0.1);
}

.product-image {
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: rgba(var(--v-theme-surface-variant), 0.3);
}

.quantity-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 100%);
  color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.3);
  transition: all 0.3s ease;
  border: 2px solid white;
}

.quantity-text {
  font-size: 0.8rem;
  font-weight: 700;
}

.content-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.product-info {
  margin-bottom: 16px;
}

.product-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 16px;
  line-height: 1.3;
  display: -webkit-box;
  /* -webkit-line-clamp: 2; */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.price-grid {
  display: grid;
  gap: 8px;
}

.price-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: rgba(var(--v-theme-surface-variant), 0.3);
  border-radius: 8px;
  border-left: 3px solid transparent;
  transition: all 0.3s ease;
}

.price-item:hover {
  transform: translateX(4px);
}

.price-item.unit-price {
  border-left-color: rgb(var(--v-theme-primary));
}

.price-item.total-price {
  border-left-color: rgb(var(--v-theme-warning));
}

.price-item.profit {
  border-left-color: rgb(var(--v-theme-success));
}

.price-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(var(--v-theme-on-surface), 0.7);
}

.price-value {
  font-weight: 700;
  font-size: 0.9rem;
}

.price-value.primary {
  color: rgb(var(--v-theme-primary));
}

.price-value.warning {
  color: rgb(var(--v-theme-warning));
}

.price-value.success {
  color: rgb(var(--v-theme-success));
}

.quantity-controls {
  margin-top: auto;
}

.control-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 12px;
  background: linear-gradient(135deg, rgba(var(--v-theme-primary), 0.05) 0%, rgba(var(--v-theme-secondary), 0.05) 100%);
  border-radius: 12px;
  border: 1px solid rgba(var(--v-theme-primary), 0.1);
}

.quantity-btn {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.quantity-btn:hover {
  transform: scale(1.15);
}

.quantity-btn:active {
  transform: scale(0.95);
}

.quantity-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
  padding: 8px 16px;
  background: rgba(var(--v-theme-primary), 0.1);
  border-radius: 8px;
  border: 1px solid rgba(var(--v-theme-primary), 0.2);
}

.quantity-number {
  font-size: 1.25rem;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
  line-height: 1;
}

.quantity-unit {
  font-size: 0.7rem;
  color: rgba(var(--v-theme-on-surface), 0.6);
  font-weight: 500;
  margin-top: 2px;
}

.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: -1;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(var(--v-theme-primary), 0.03) 0%, rgba(var(--v-theme-secondary), 0.03) 100%);
  transition: all 0.4s ease;
}

.circle-1 {
  width: 100px;
  height: 100px;
  top: -20px;
  right: -20px;
  animation: float 6s ease-in-out infinite;
}

.circle-2 {
  width: 60px;
  height: 60px;
  bottom: -10px;
  left: -10px;
  animation: float 4s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(180deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .modern-product-card {
    flex-direction: column;
    text-align: center;
    padding: 16px;
  }
  
  .image-container {
    margin-right: 0;
    margin-bottom: 16px;
    align-self: center;
  }
  
  .price-grid {
    grid-template-columns: 1fr;
  }
  
  .control-wrapper {
    justify-content: center;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .modern-product-card {
    background: linear-gradient(145deg, rgb(var(--v-theme-surface)) 0%, rgba(var(--v-theme-surface-variant), 0.3) 100%);
  }
  
  .price-item {
    background: rgba(var(--v-theme-surface-variant), 0.2);
  }
  
  .quantity-badge {
    border-color: rgb(var(--v-theme-surface));
  }
}
</style>
