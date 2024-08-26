<template>
  <v-container>
    <!-- <v-row>
      <v-col v-for="pokemon in pokemon" :key="pokemon.id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ pokemon.name }}</v-card-title>
          <v-card-subtitle>${{ pokemon.price.toFixed(2) }}</v-card-subtitle>
          <v-card-actions>
            <v-btn text @click="viewDetails(pokemon.id)">View Details</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>


export default {
  name: "Home",
  data() {
    return {
      // pokemon: [],
    };
  },
  created() {
    this.getData()
  },

  methods: {

    getData() {
      this.axios.get(`https://pokeapi.co/api/v2/pokemon/1`).then((response) => {
        console.log(response.data.id)
        console.log(response.data.name)
      })
    },

    created() {
      this.getData();
    }
  }
}
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style>
