<template>
  <v-container>
    <v-row>
      <v-col v-for="pokemon in pokemon" :key="pokemon.id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ pokemon.name }}</v-card-title>
          <v-card-subtitle>${{ pokemon.price.toFixed(2) }}</v-card-subtitle>
          <v-card-actions>
            <v-btn text @click="viewDetails(pokemon.id)">View Details</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: "Home",
  data() {
    return {
      pokemon: []
    }
  },
  created() {
    this.fetchPokemon(); // เรียกใช้ฟังก์ชัน fetchProducts
  },
  methods: {
    async fetchPokemon() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon'); // ใช้ URL ของ API ที่ถูกต้อง
        this.pokemon = response.data.results
        console.log(this.pokemon);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  }
}
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style>
