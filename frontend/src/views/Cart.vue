<template>
    <v-container>
      <v-card v-if="cartItems.length > 0">
        <v-card-title>
          <h2>ตะกร้าสินค้า</h2>
        </v-card-title>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="item in cartItems" :key="item.id">
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  ราคา: {{ item.price }} บาท | จำนวน: {{ item.quantity }} ชิ้น
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-card-actions>
          <v-btn color="error" @click="clearCart">ล้างตะกร้า</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-card-title>
          <h2>ตะกร้าว่างเปล่า</h2>
        </v-card-title>
        <v-card-subtitle>กรุณาเพิ่มสินค้าในตะกร้าเพื่อเริ่มต้นการช้อปปิ้ง</v-card-subtitle>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "Cart",
    data() {
      return {
        cartItems: [],
      };
    },
    created() {
      this.loadCartItems();
    },
    methods: {
      loadCartItems() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        this.cartItems = cart;
      },
      clearCart() {
        localStorage.removeItem("cart");
        this.cartItems = [];
        alert('ตะกร้าสินค้าได้ถูกล้างเรียบร้อยแล้ว!');
      },
    },
  };
  </script>
  