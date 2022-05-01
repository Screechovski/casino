import {createRouter,createWebHashHistory} from "vue-router";
import hero from "../views/hero.vue";
import game from "../views/game.vue";

const routes = [
    {
        path: "/",
        name: "hero",
        component: hero,
    },
    {
        path: "/game",
        name: "game",
        component: game,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
