<template>
    <div v-if="show">
        <h1>Simple Page</h1>
        <h1 v-if="numberofshow < 2">{{ name }}</h1>
        <v-btn color="success" @click="alertname">text</v-btn>
        <v-row>
            <v-col width="100%" cols="4" v-for="item, index in melist" :key="index">
                <v-card class="pa-3">
                    <img width="100%" :src="item.imglink" alt="Profile Image">
                </v-card>
                <v-card-title primary="title">
                    {{ item.name }}
                </v-card-title>
                <v-btn color="success" @click="alertParm(item.name)">text</v-btn>

            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: 'Hassadin Sasoh',
            show: true,
            numberofshow: 3,
            melist: [{ name: 'ดิส', imglink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg' },
            { name: 'ดิสสสสส', imglink: require('../assets/logo.png') }]

        }
    },
    methods: {
        alertname() {
            alert('แมวววววว')
        },
        alertParm(item) {
            alert(item)
        }
    }
}
</script>

<style></style>