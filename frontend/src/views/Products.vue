<template>
    <v-container>
        <v-row>
            <v-col width="100%" cols="4" v-for="(item, index) in productData" :key="index">
                <v-card class="pa-3">
                    <!-- รูปภาพสินค้า -->
                    <v-img class="mb-2" height="150px"></v-img>

                    <!-- รายละเอียดสินค้า -->
                    <v-card-title>
                        <span class="title"><p>ชื่อสินค้า:</p></span>
                        <span class="value"><p>{{ item.name }}</p></span>
                    </v-card-title>
                    <v-card-subtitle>
                        <p class="value">ราคา : {{ item.price }} บาท</p>
                        <p class="value">จำนวน {{ item.quantity }} บาท</p>
                    </v-card-subtitle>


                    <!-- ปุ่มหรือการกระทำอื่น ๆ -->
                    <v-card-actions>
                        <v-btn color="primary" @click="buyProduct(item)">ซื้อสินค้า</v-btn>
                        <v-btn color="secondary" @click="viewDetails(item)">ดูรายละเอียด</v-btn>
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
        viewDetails(productData) {
            // Redirect to the product details page
            this.$router.push({ name: "productDetails", params: { id: productData._id } });
        },
    }
}
</script>

<style></style>