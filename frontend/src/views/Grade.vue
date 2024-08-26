<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" md="6" offset-md="3">
                    <v-card class="pa-5">
                        <v-card-title class="text-h4 text-center">Grade Calculator</v-card-title>
                        <v-form @submit.prevent="calculateGrade">
                            <v-text-field v-model="score" label="Enter your score" required
                                @input="handleInput"></v-text-field>
                            <v-btn type="submit" color="primary" block>Calculate Grade</v-btn>
                        </v-form>
                        <v-alert v-if="errorMessage" type="error    " class="mt-4" border="left" colored-border>
                            Your Grade: <strong>{{ errorMessage }}</strong>
                        </v-alert>
                        <v-alert v-if="grade" type="success" class="mt-4" border="left" colored-border>
                            Your Grade: <strong>{{ grade }}</strong>
                        </v-alert>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
<script>
export default {
    data() {
        return {
            score: null,
            grade: '',
            errorMessage: ''
        };
    },
    methods: {
        handleInput() {
            if (this.score === null || this.score === '') {
                this.errorMessage = '';
                this.grade = '';
            }
        },
        calculateGrade() {
            const value = this.score
            if (isNaN(value) || value < 0 || value > 100 || value == null || value == ""){
                this.errorMessage = 'Please enter a valid number between 0 and 100';
                this.grade = '';
            } else {
                this.errorMessage = '';
                if (value >= 80) {
                    this.grade = 'A';
                } else if (value >= 70) {
                    this.grade = 'B';
                } else if (value >= 60) {
                    this.grade = 'C';
                } else if (value >= 50) {
                    this.grade = 'D';
                } else {
                    this.grade = 'F';
                }
            }
        }
    }
};
</script>

<style scoped>
.v-card {
    max-width: 400px;
    margin: 50px auto;
}
</style>