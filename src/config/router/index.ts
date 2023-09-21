import { createRouter, createWebHistory } from 'vue-router';
import getRoutes from '../../helpers/router.load';

const requireModule: any = import.meta.globEager('/src/pages/**/*.route.ts');
const routes = getRoutes(requireModule);
export const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
});
