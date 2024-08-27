<template>
    <v-container>
        <v-card v-if="product">
            <v-img :src="product.image || 'img/default-image.png'" class="mb-3" height="400px" contain></v-img>
            <v-card-title><p>{{ product.name }}</p></v-card-title>
            <v-card-subtitle>
                <p class="value">ราคา : {{ product.price }} บาท</p>
                <p class="value">จำนวน {{ product.quantity }} บาท</p>
            </v-card-subtitle>
        </v-card>
        <v-alert v-else type="error">
            Product not found!
        </v-alert>
    </v-container>
</template>

<script>
export default {
    name: "ProductDetails",
    data() {
        return {
            product: null,
            error: null,
        };
    },
    created() {
        this.fetchProductDetails();
    },
    methods: {
        async fetchProductDetails() {

            try {
                const productId = this.$route.params.id;
                console.log(productId);

                const response = await this.axios.get('http://localhost:3000/api/v1/products/' + productId, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Token")}`
                    }
                })

                this.product = response.data.data
                console.log(this.product);

            } catch (error) {
                console.log(error)
            }
        },
    },
};
</script>