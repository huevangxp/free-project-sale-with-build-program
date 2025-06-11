<template>
  <v-app-bar color="primary" dark>
    <v-app-bar-title class="font-weight-bold">Lisfoom</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="count > 0" class="text-none" stacked to="/cart">
      <v-badge color="error" :content="count" variant="elevated">
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>
    <v-btn v-else class="text-none" stacked>
      <v-icon>mdi-cart</v-icon>
    </v-btn>
    <!-- Show power icon only when user is logged in -->
    <v-btn v-if="isLoggedIn" class="text-none" stacked @click="dialogOpen">
      <v-icon>mdi-power</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="400">
      <v-card>
        <v-card-title class="d-flex align-center justify-center bg-primary text-white">
          <h4>ອອກຈາກລະບົບ</h4>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p>ທ່ານຕ້ອງການອອກຈາກລະບົບບໍ?</p>
        </v-card-text>
        <v-card-actions class="d-flex align-center justify-end">
          <v-btn color="red" variant="outlined" class="rounded" @click="dialog = false">
            <v-icon class="mr-2">mdi-close</v-icon> ຍົກເລິກ
          </v-btn>
          <v-btn color="primary" variant="elevated" class="rounded" elevation="0" @click="logout">
            <v-icon class="mr-2">mdi-power</v-icon>ອອກຈາກລະບົບ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script setup>
const dialog = ref(false)
const count = ref(3)

// Get token cookie and make it reactive
const tokenCookie = useCookie('token')

// Computed property to check if user is logged in
const isLoggedIn = computed(() => {
  return tokenCookie.value !== null && tokenCookie.value !== undefined && tokenCookie.value !== ''
})

const dialogOpen = () => {
  dialog.value = true
}

const logout = async () => {
  try {
    // Clear all cookies
    const tokenCookie = useCookie('token')
    const idCookie = useCookie('id')
    const phoneCookie = useCookie('phone')
    const emailCookie = useCookie('email')
    const roleCookie = useCookie('role')
    const usernameCookie = useCookie('username')
    
    tokenCookie.value = null
    idCookie.value = null
    phoneCookie.value = null
    emailCookie.value = null
    roleCookie.value = null
    usernameCookie.value = null
    
    dialog.value = false
    
    // Navigate to login page
    await navigateTo('/login')
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>