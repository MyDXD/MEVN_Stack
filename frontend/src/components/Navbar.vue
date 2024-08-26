<template>
    <v-app>
        <v-app-bar app color="dark" dark>

            <v-btn text to="/"><v-toolbar-title text to="/">My Application</v-toolbar-title></v-btn>
            
            <v-spacer></v-spacer>

            <v-btn text to="/me">Me</v-btn>
            <v-btn text to="/grade">Grade</v-btn>
            <v-btn text to="/simple">simple</v-btn>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>
<script>
export default {

};
</script>

<style scoped></style>