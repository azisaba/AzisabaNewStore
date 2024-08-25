<script setup lang="ts">
import {ref} from "vue";
import {API_ROOT} from "../util.ts";
import {useRouter} from "vue-router";

const router = useRouter()

const minecraftId = ref(localStorage.getItem('minecraftId') ?? '')
const overlay = ref(false)
const loading = ref(false)

const confirm = () => {
  overlay.value = true
}

const logout = () => {
  localStorage.removeItem('minecraftId')
  localStorage.setItem('cart', '[]')
  minecraftId.value = ''
  // redirect
  router.push('/')
}

const yes = async () => {
  loading.value = true
  const highestSara = await fetch(`${API_ROOT}/store/players/${minecraftId.value}/highest_sara`).then(res => res.json())
  if (highestSara['highest_sara'] === null) {
    alert('そのMinecraft IDは存在しません。')
    overlay.value = false
    loading.value = false
    return
  }
  // save to local storage
  localStorage.setItem('minecraftId', minecraftId.value)
  localStorage.setItem('cart', '[]')
  overlay.value = false
  await router.push('/')
}
</script>

<template>
  <v-text-field width="480px" label="Minecraft ID" v-model="minecraftId"></v-text-field>
  <v-btn @click="confirm">確定</v-btn>
  <v-btn @click="logout">ログアウト</v-btn>
  <v-overlay v-model="overlay" :persistent="true" :close-on-back="false" class="align-center justify-center">
    <v-container class="flex flex-column">
      <v-card>
        <v-card-title>確認</v-card-title>
        <v-card-text>
          <p>以下のMinecraft IDでよろしいですか？</p>
          <p><b>Minecraft IDの間違いによる補填は原則できません。</b></p>
          <p>{{ minecraftId }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn :loading="loading" @click="yes">はい</v-btn>
          <v-btn :disabled="loading" @click="overlay = false">いいえ</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-overlay>
</template>
