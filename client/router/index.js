import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import hero from '../views/hero.vue';
import game from '../views/game.vue';
const {isProd} = require('../../config');

const heroPath = isProd ? '/casino/hero' : '/hero';
const gamePath = isProd ? '/casino/game' : '/game';

const routes = [
  {
    path: heroPath,
    name: 'hero',
    component: hero
  },
  {
    path: gamePath,
    name: 'game',
    component: game
  }
];

const router = createRouter({
  history: createWebHistory(), //createWebHashHistory(),
  routes
});

export default router;
