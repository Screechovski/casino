import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import hero from "../views/hero.vue";
import game from "../views/game.vue";

const routes = [
    {
        path: "/hero",
        name: "hero",
        component: hero,
    },
    {
        path: "/game",
        name: "game",
        component: game,
    }
]

const router = createRouter({
    history: createWebHistory(),//createWebHashHistory(),
    routes,
});

export default router;
