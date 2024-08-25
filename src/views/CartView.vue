<script setup lang="ts">
import {ref} from "vue";
import {API_ROOT, getCart} from "../util.ts";

const cart = ref(getCart())

const removeItem = (index: number) => {
  cart.value = cart.value.filter((_, i) => i !== index)
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const loading = ref(false)

const purchase = async () => {
  if (!localStorage.getItem('minecraftId')) {
    alert('ログインしてください。')
    return
  }
  loading.value = true
  const response = await fetch(API_ROOT + '/store/pay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: localStorage.getItem('minecraftId'),
      sara_products: cart.value.filter(e => typeof e.tags === 'undefined').map(e => e.id),
      products: cart.value.filter(e => typeof e.tags !== 'undefined').map(e => e.id),
    })
  }).then(res => res.json())
  if (response.error) {
    alert(`エラーが発生しました: ${response.error}`)
    return
  }
  cart.value = []
  localStorage.setItem('cart', '[]')
  location.href = response.url
}
</script>

<template>
  <v-container>
    <v-list>
        <v-list-item
            v-for="(item, index) in cart"
            :key="item.id"
            :title="item.name"
            :subtitle="item.price + '円'"
        >
          <router-link
              :to="(typeof item.tags === 'undefined' ? '/sara_products/' : '/products/') + item.id"
              style="color: inherit;"
          >
            <v-btn color="green">商品ページへ</v-btn>
          </router-link>
          <v-btn @click="removeItem(index)" color="red">削除</v-btn>
        </v-list-item>
    </v-list>
    <v-btn :disabled="cart.length === 0" @click="purchase" color="orange">購入に進む</v-btn>
  </v-container>
</template>
