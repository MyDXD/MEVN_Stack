<template>
  <v-container>
    <v-card v-if="orders.length > 0">
      <v-card-title>
        <h2>ตะกร้าสินค้า</h2>
      </v-card-title>
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="item in orders" :key="item.id">
            <v-list-item-content>
              <v-list-item-title>Oder ID : {{ item._id }}</v-list-item-title>
              <v-list-item-title>{{ item.productName }}</v-list-item-title>
              <v-list-item-subtitle>
                ราคา: {{ item.price }} บาท | จำนวน: {{ item.quantity }} ชิ้น | ราคารวม: {{ item.total }} บาท
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
      orders:[]
    };
  },
  created() {
    this.loadCartItems();
  },
  methods: {

    clearCart() {
      alert('ตะกร้าสินค้าได้ถูกล้างเรียบร้อยแล้ว!');
    },
    async loadCartItems() {
      try {
        const response = await this.axios.get(
          `http://localhost:3000/api/v1/orders`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`
            }
          }
        );

        console.log(response.data.orders);
          this.orders = response.data.orders
      } catch (error) {
        console.error(error);
        // คุณสามารถเพิ่มการแจ้งเตือนข้อผิดพลาดให้ผู้ใช้เห็นได้ที่นี่
      }
    }
  },
};
</script>