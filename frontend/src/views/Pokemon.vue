<template>
    <div>
      <div v-if="errorMessage">
        Error: {{ errorMessage }}
      </div>
      <div v-else-if="dataFromApi">
        <pre>{{ dataFromApi }}</pre>
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
  </template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            dataFromApi: null,
            errorMessage: null,
        };
    },
    methods: {
        fetchData() {
            axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
                .then(response => {
                    this.dataFromApi = response.data;
                })
                .catch(error => {
                    this.errorMessage = error.message;
                });
        }
    },
    mounted() {
        this.fetchData();
    }
};
</script>

<style></style>