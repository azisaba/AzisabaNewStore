<script setup lang="ts">
import {Ref, ref} from "vue";
import {API_ROOT} from "../util.ts";

const minecraftId = localStorage.getItem('minecraftId')
const products: Ref<Array<Product>> = ref([])
const saraProducts: Ref<Array<SaraProduct>> = ref([])
const highestSara = ref(0)
const allTags = ref<string[]>([])
const selectedTags = ref<string[]>([])

fetch(API_ROOT + '/store/products').then(res => res.json()).then(response => {
  products.value = response['products']
  saraProducts.value = response['sara_products']
  allTags.value = Array.from(new Set(response['products'].map(e => e.tags).join(' ').split(' ')))
})

fetch(`${API_ROOT}/store/players/${minecraftId}/highest_sara`)
    .then(res => res.json())
    .then(res => highestSara.value = res['highest_sara'] ?? 0)
</script>

<template>
  <div style="text-align: left">
    <p>購入する際には以下の規約が適用されます。よくお読みした上で購入をお願い致します。</p>
    <ul>
      <li><a href="https://www.azisaba.net/terms/">利用規約</a></li>
      <li><a href="https://www.azisaba.net/privacy-policy/">プライバシーポリシー</a></li>
      <li><a href="https://www.azisaba.net/act-of-specified-commercial-transactions/">特定商取引法に基づく表記</a></li>
      <li><a href="https://www.azisaba.net/notes-on-donations/">寄付(購入)に関する注意</a></li>
    </ul>
  </div>
  <v-combobox
      v-model="selectedTags"
      :items="allTags"
      label="タグで絞り込む"
      prepend-icon="mdi-filter-variant"
      variant="solo"
      chips
      clearable
      multiple
  >
    <template v-slot:selection="{ attrs, item, select, selected }">
      <v-chip
          v-bind="attrs"
          :model-value="selected"
          closable
          @click="select"
      >
        <strong>{{ item }}</strong>
      </v-chip>
    </template>
  </v-combobox>
  <div class="d-flex flex-wrap justify-center">
    <template v-for="product in products" :key="product.id">
      <v-card class="margin-10px" v-if="selectedTags.length === 0 || product.tags.split(' ').find(tag => selectedTags.indexOf(tag) !== -1)">
        <router-link style="color: inherit;" :to="'/products/' + product.id">
          <v-img :src="product.image_url" height="300px" width="300px" style="align-self: center;"></v-img>
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-subtitle>タグ: <v-chip v-for="tag in product.tags.split(' ')" :key="tag">{{ tag }}</v-chip></v-card-subtitle>
          <v-card-text>{{ product.price }}円</v-card-text>
        </router-link>
      </v-card>
    </template>
    <v-card v-if="selectedTags.length === 0 || selectedTags.indexOf('ランク') !== -1" v-for="product in saraProducts" :key="product.id" class="margin-10px">
      <router-link style="color: inherit;" :to="'/sara_products/' + product.id">
        <v-img :src="product.image_url" height="300px" width="300px" style="align-self: center;"></v-img>
        <v-card-title>{{ product.name }}</v-card-title>
        <v-card-subtitle>タグ: <v-chip>ランク</v-chip></v-card-subtitle>
        <v-card-text v-if="product.price - highestSara > 0">{{ product.price - highestSara }}円</v-card-text>
        <v-card-text v-else>購入できません</v-card-text>
      </router-link>
    </v-card>
  </div>
</template>

<style scoped>
.margin-10px {
  margin: 10px;
}
</style>
