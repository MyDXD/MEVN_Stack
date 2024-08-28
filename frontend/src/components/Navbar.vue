<template>
    <v-app>
        <v-app-bar app color="dark" dark>

            <v-btn text to="/"><v-toolbar-title text to="/">HOME PAGE</v-toolbar-title></v-btn>

            <v-spacer></v-spacer>

            <v-btn text to="/me">Me</v-btn>
            <v-btn text to="/products">Products</v-btn>
            <v-btn text to="/cart">Cart</v-btn>
            <v-btn text to="/grade">Grade</v-btn>
            <v-btn text to="/simple">simple</v-btn>
            <v-btn @click="logout()">Logout</v-btn>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>
<script>
export default {
    methods: {
        logout() {
            if (confirm("คุณต้องการออกจากระบบหรือไม่")) {
                localStorage.removeItem("Token"); // ลบ token ออกจาก localStorage
                this.$router.push('/login');
            }

        },
    }
};
</script>

<style scoped></style>