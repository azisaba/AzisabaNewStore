<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title class="text-align-left">アジ鯖ストア</v-app-bar-title>
      <router-link class="link" to="/">商品一覧</router-link>
      <router-link class="link" to="/login">ログイン</router-link>
      <router-link class="link" to="/cart">カート</router-link>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.text-align-left {
  text-align: left;
}
.link {
  color: inherit;
  text-decoration: none;
  transition: linear 0.1s;
  padding: 30px;
}
.link:hover {
  color: inherit;
  filter: invert(0.5);
}
</style>
