<script setup lang="ts">
import {Ref, ref} from "vue";
import {API_ROOT} from "../util.ts";

const minecraftId = localStorage.getItem('minecraftId')
const products: Ref<Array<Product>> = ref([])
const saraProducts: Ref<Array<SaraProduct>> = ref([])
const highestSara = ref(0)

fetch(API_ROOT + '/store/products').then(res => res.json()).then(response => {
  products.value = response['products']
  saraProducts.value = response['sara_products']
})

fetch(`${API_ROOT}/store/players/${minecraftId}/highest_sara`)
    .then(res => res.json())
    .then(res => highestSara.value = res['highest_sara'] ?? 0)
</script>

<template>
  <div class="d-flex flex-wrap justify-center">
    <v-card v-for="product in products" :key="product.id" class="margin-10px">
      <router-link style="color: inherit;" :to="'/products/' + product.id">
        <v-img :src="product.image_url" height="300px" width="300px" style="align-self: center;"></v-img>
        <v-card-title>{{ product.name }} [{{ product.price }}円]</v-card-title>
        <v-card-subtitle>タグ: {{ product.tags }}</v-card-subtitle>
      </router-link>
    </v-card>
    <v-card v-for="product in saraProducts" :key="product.id" class="margin-10px">
      <router-link style="color: inherit;" :to="'/sara_products/' + product.id">
        <v-img :src="product.image_url" height="300px" width="300px" style="align-self: center;"></v-img>
        <v-card-title>{{ product.name }}</v-card-title>
        <v-card-subtitle v-if="product.price - highestSara > 0">{{ product.price - highestSara }}円</v-card-subtitle>
        <v-card-subtitle v-else>購入できません</v-card-subtitle>
      </router-link>
    </v-card>
  </div>
</template>

<style scoped>
.margin-10px {
  margin: 10px;
}
</style>
