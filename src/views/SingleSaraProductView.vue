<script setup lang="ts">
import {Ref, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {addToCart, API_ROOT} from "../util.ts";

const route = useRoute()

const saraProducts: Ref<Array<SaraProduct>> = ref([])
const id = ref(parseInt(route.params.id as string))
const highestSara = ref(0)

watch(
    () => route.params.id,
    (newId) => {
        id.value = parseInt(newId as string)
    }
)

fetch(API_ROOT + '/store/products').then(res => res.json()).then(response => {
  saraProducts.value = response['sara_products']
})

fetch(`${API_ROOT}/store/players/${localStorage.getItem('minecraftId')}/highest_sara`)
    .then(res => res.json())
    .then(res => highestSara.value = res['highest_sara'] ?? 0)

const addItemToCart = (product: SaraProduct) => {
  addToCart({...product, price: product.price - highestSara.value})
}
</script>

<template>
  <v-container v-if="saraProducts.length === 0">
    <p>読み込み中...</p>
  </v-container>
  <v-container v-else-if="!saraProducts.find(e => e.id === id)">
    <p>商品が見つかりません。</p>
  </v-container>
  <v-container v-else>
    <v-card width="480px" class="d-flex flex-column">
      <v-img :src="saraProducts.find(e => e.id === id)!.image_url" height="300px" width="300px" style="align-self: center;"></v-img>
      <v-card-title>{{ saraProducts.find(e => e.id === id)!.name }}</v-card-title>
      <v-card-text style="text-align: left;" v-html="saraProducts.find(e => e.id === id)!.description"></v-card-text>
      <v-card-actions v-if="saraProducts.find(e => e.id === id)!.price - highestSara > 0">
        <v-btn @click="addItemToCart(saraProducts.find(e => e.id === id)!)" color="orange">カートに入れる</v-btn>
        <b>{{ saraProducts.find(e => e.id === id)!.price - highestSara }}円</b>
      </v-card-actions>
      <b v-else>購入できません</b>
    </v-card>
  </v-container>
</template>
