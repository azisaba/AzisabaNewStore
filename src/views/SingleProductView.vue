<script setup lang="ts">
import {Ref, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {addToCart, API_ROOT} from "../util.ts";

const route = useRoute()

const products: Ref<Array<SaraProduct>> = ref([])
const id = ref(parseInt(route.params.id))

watch(
    () => route.params.id,
    (newId) => {
      id.value = parseInt(newId)
    }
)

fetch(API_ROOT + '/store/products').then(res => res.json()).then(response => {
  products.value = response['sara_products']
})
</script>

<template>
  <v-container v-if="products.length === 0">
    <p>読み込み中...</p>
  </v-container>
  <v-container v-else-if="!products.find(e => e.id === id)">
    <p>商品が見つかりません。</p>
  </v-container>
  <v-container v-else>
    <v-card>
      <v-img :src="products.find(e => e.id === id).image_url" height="300px" width="300px"></v-img>
      <v-card-title>{{ products.find(e => e.id === id).name }}</v-card-title>
      <v-card-text>{{ products.find(e => e.id === id).description }}</v-card-text>
      <v-card-actions>
        <v-btn @click="addToCart(products.find(e => e.id === id))" color="orange">カートに入れる</v-btn>
        <b>{{ products.find(e => e.id === id).price }}円</b>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
