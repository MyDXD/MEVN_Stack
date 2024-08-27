<template>
    <v-container>
        <v-row>
            <v-col v-for="product in productData" :key="product._id" cols="12" md="4">
                <v-card>
                    <v-img :src="product.image || 'img/default-image.png'" height="200px" contain></v-img>
                    <v-card-title>{{ product.name }}</v-card-title>
                    <v-card-subtitle>
                        {{ product.price }} บาท<br>
                        จำนวน : {{ product.quantity }} ชิ้น
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-btn color="primary" @click="viewProduct(product._id)">ดูรายละเอียด</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            dialogedit: false,
            id: '',
            productData: [],
        }

    },
    created() {
        this.getData()
    },
    methods: {
        async getData() {
            try {
                const response = await this.axios.get('http://localhost:3000/api/v1/products', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Token")}`
                    }
                })
                this.productData = response.data.data

            } catch (error) {
                console.log(error)
            }
        },
        viewProduct(productId) {
            this.$router.push({ name: 'ProductDetails', params: { id: productId } });
        },
        
    }
}
</script>

<style></style>