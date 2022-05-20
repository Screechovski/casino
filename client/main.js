import router from "./router"
import store from "./store"
import { createApp } from 'vue'
import app from './app.vue'
import "normalize.css"
import "reset.css"

store.dispatch('auth/login').then(() => {
    createApp(app).use(router).use(store).mount("#app")
})