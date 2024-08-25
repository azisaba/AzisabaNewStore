import {createRouter, createWebHistory} from "vue-router";
import ProductsView from "./views/ProductsView.vue";
import LoginView from "./views/LoginView.vue";
import SingleSaraProductView from "./views/SingleSaraProductView.vue";
import SingleProductView from "./views/SingleProductView.vue";
import CartView from "./views/CartView.vue";

const routes = [
    { path: '/', component: ProductsView },
    { path: '/login', component: LoginView },
    { path: '/cart', component: CartView },
    { path: '/products/:id', component: SingleProductView },
    { path: '/sara_products/:id', component: SingleSaraProductView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
