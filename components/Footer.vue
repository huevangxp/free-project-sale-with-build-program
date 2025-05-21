<template>
    <v-layout class="overflow-visible" style="min-height: 56px;" fixed app>
      <v-bottom-navigation
        bg-color="primary"
        mode="shift"
        fixed
        app
      >
        <v-btn value="0" to="/">
          <v-icon>mdi-home</v-icon>
          <span>ໜ້າຫຼັກ</span>
        </v-btn>
  
        <v-btn value="1" to="/promotion">
          <v-icon>mdi-image</v-icon>
          <span>ຮູບ</span>
        </v-btn>
  
        <v-btn value="2" to="/team">
          <v-icon>mdi-account-group</v-icon>
          <span>ທິມງານ</span>
        </v-btn>
  
        <v-btn value="3" to="/login">
          <v-icon>mdi-login-variant</v-icon>
          <span>ເຂົ້າສູ່ລະບົບ</span>
        </v-btn>
        <v-btn value="4" to="/profile">
          <v-icon>mdi-account</v-icon>
          <span>ໜ້າປີ້ນປີ້ນ</span>
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </template>
  
  <script setup>
 
   
  </script>
  