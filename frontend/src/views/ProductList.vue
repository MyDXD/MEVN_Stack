<template>
    <v-container>
        <div>
            <v-col cols="12">
                <v-btn color="success" @click="createItem()">create</v-btn>
            </v-col>
            <v-row>
                <v-col cols="4" v-for="(item, index) in apidata" :key="index">
                    <v-card>
                        <v-img src="/img/cat1.jpg" height="200px" contain></v-img>
                        <v-card-title>{{ item.name }}</v-card-title>
                        <v-card-subtitle>
                            {{ item.price }} บาท<br>
                            จำนวน : {{ item.quantity }} ชิ้น
                        </v-card-subtitle>
                        <v-card-actions>
                            <v-btn color="primary" @click="viewProduct(item._id)">ดูรายละเอียด</v-btn>
                            <v-btn color="info" @click="updateItem(item)">edit</v-btn>
                            <v-btn color="error" @click="delItem(item)">delete</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <v-dialog v-model="dialogedit" max-width="500px">
            <v-card>
                <v-card-title primary-title>
                    {{ savemode }}
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field name="name" label="name" id="name" v-model="postdata.name"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field name="price" label="price" id="price" type="number"
                                v-model="postdata.price"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field name="quantity" label="quantity" id="quantity" type="number"
                                v-model="postdata.quantity"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field name="detail" label="detail" id="detail"
                                v-model="postdata.detail"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="error" @click="closeItem()">cancel</v-btn>
                    <v-btn text color="info" @click="saveSelect()">save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            dialogedit: false,
            id: '',
            apidata: [],
            postdata: {  // ชุดที่เอาไว้ส่งข้อมูล
                name: '',
                price: '',
                quantity: '',
                detail: '',
            },
            postdefault: {  // ชุดที่เอาไว้ล้างข้อมูล
                name: '',
                price: '',
                quantity: '',
                detail: '',
            },
        }

    },
    computed: {
        savemode() {
            return this.id == '' ? 'New Item' : 'Edit Item'
        }
    },
    created() {
        this.getData()
    },
    methods: {
        createItem() {
            this.id = ''
            this.postdata = { ...this.postdefault }
            this.dialogedit = true
        },
        updateItem(item) {
            this.id = item._id
            this.postdata = { ...item }
            this.dialogedit = true
        },
        closeItem() {
            this.id = ''
            this.postdata = { ...this.postdefault }
            this.dialogedit = false
        },
        saveSelect() {
            if (this.id != '') {
                this.savePutData()
            } else this.savePostData()
        },
        async getData() {
            try {
                const response = await this.axios.get('http://localhost:3000/api/v1/products', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Token")}`
                    }
                })
                this.apidata = response.data.data
                console.log(this.apidata)


            } catch (error) {
                console.log(error)
            }
        },
        viewProduct(productId) {
            this.$router.push({ name: 'ProductDetails', params: { id: productId} });
    
            
        },
        async savePostData() {
            console.log(this.postdata);

            try {
                const { data } = await this.axios.post('http://localhost:3000/api/v1/products', this.postdata, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Token")}`
                    },
                })
                console.log(data)
                alert('create complete')
                this.getData()
                this.closeItem()
            } catch (error) {
                console.log(error)
                alert('เจ๊ง')
            }
        },
        async savePutData() {
            try {
                const { data } = await this.axios.put('http://localhost:3000/api/v1/products/' + this.id, this.postdata, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Token")}`
                    },
                })
                console.log(data)
                alert('update complete')
                this.getData()
                this.closeItem()
            } catch (error) {
                console.log(error)
                alert('เจ๊ง')
            }
        },
        async delItem(item) {
            if (confirm('delete ' + item.name)) {
                try {
                    const { data } = await this.axios.delete('http://localhost:3000/api/v1/products/' + item._id, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("Token")}`,
                        },
                    })
                    console.log(data)
                    alert('delete complete')
                    this.getData()
                    this.closeItem()
                } catch (error) {
                    console.log(error)
                    alert(error)
                }
            }
        }

    }
}
</script>

<style></style>