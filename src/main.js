import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css"
import "normalize.css"
import "reset.css"

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
