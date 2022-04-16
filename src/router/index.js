import Vue from "vue";
import VueRouter from "vue-router";
import hero from "../views/hero.vue";
import game from "../views/game.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "*",
        name: "hero",
        component: hero,
    },
    {
        path: "/game",
        name: "game",
        component: game,
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
