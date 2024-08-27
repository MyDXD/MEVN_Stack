<template>
    <v-container>
        <v-card v-if="product">
            <v-img class="mb-3" height="300px" contain></v-img>
            <v-card-title>
                <p>{{ product.name }}</p>
            </v-card-title>
            <v-card-subtitle>
                <p class="value">ราคา: {{ product.price }} บาท</p>
                <p class="value">จำนวนคงเหลือ: {{ product.quantity }} ชิ้น</p>
                <p class="value">รายละเอียด: {{ product.detail }}</p>
            </v-card-subtitle>
            <v-card-actions>
                <v-btn color="success" @click="addToCart">เพิ่มในตะกร้า</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: "ProductDetails",
    data() {
        return {
            product: null,
            cart: []
        };
    },
    created() {
        this.fetchProductDetails();
    },
    methods: {
        async fetchProductDetails() {
            try {
                const productId = this.$route.params.id;
                const response = await this.axios.get(`http://localhost:3000/api/v1/products/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Token")}`
                    }
                });

                this.product = response.data.data;
            } catch (error) {
                console.error(error);
            }
        },
        addToCart() {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];

            // ตรวจสอบว่าสินค้าอยู่ในตะกร้าหรือไม่
            const productInCart = cart.find(item => item.id === this.product.id);

            if (productInCart) {
                alert("คุณได้เพิ่มสินค้านี้ไปแล้ว")
            } else {
                // หากไม่มีสินค้าในตะกร้า ให้เพิ่มสินค้า
                cart.push(this.product);
                localStorage.setItem("cart", JSON.stringify(cart)); // บันทึกตะกร้าลงใน localStorage
                alert("เพิ่มสินค้านี้ลงในตะกร้าเรียบร้อยแล้ว")
            }
        }
    },
};
</script>