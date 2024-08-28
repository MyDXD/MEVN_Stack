<template>
    <v-container>
        <v-card v-if="product">
            <v-img src="/img/cat1.jpg" class="mb-3" height="300px" contain></v-img>
            <v-card-title>
                <p>{{ product.name }}</p>
            </v-card-title>
            <v-card-subtitle>
                <p class="value">ราคา: {{ product.price }} บาท</p>
                <p class="value">จำนวนคงเหลือ: {{ product.quantity }} ชิ้น</p>
                <p class="value">รายละเอียด: {{ product.detail }}</p>
            </v-card-subtitle>
            <v-card-actions>
                <v-text-field v-model.number="selectedQuantity" label="จำนวน" type="number" :min="1"
                    :max="product.quantity" required></v-text-field>
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
            cart: [],
            selectedQuantity: 1
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
        async addToCart() {
            try {
                const response = await this.axios.post(
                    `http://localhost:3000/api/v1/products/${this.product._id}/orders`,
                    {
                        quantity: this.selectedQuantity,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("Token")}`
                        }
                    }
                );
                alert(`เพิ่ม : ${this.product.name} จำนวน ${this.selectedQuantity} ชิ้น สำเร็จ`)
                console.log(response.data.order);
                
                this.fetchProductDetails();    
            } catch (error) {
                console.error(error);
                // คุณสามารถเพิ่มการแจ้งเตือนข้อผิดพลาดให้ผู้ใช้เห็นได้ที่นี่
            }
        }
    },
};
</script>