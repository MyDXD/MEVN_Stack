<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Login form</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field name="email" label="email" type="email"
                                        v-model="userData.email"></v-text-field>
                                    <v-text-field id="password" name="password" label="Password" type="password"
                                        v-model="userData.password"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="postData()">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            userData: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        postData() {
            console.log(this.userData);

            this.axios.post('http://localhost:3000/api/v1/login', this.userData,)
                .then((response) => {
                    const token = response.data.token
                    if (token) {
                        localStorage.setItem("Token", token);
                    }
                    this.$router.push('/');
                }).catch((error) => {
                    console.error("Error:", error.response ? error.response.data : error.message);
                });
        }
    }
}
</script>

<style></style>