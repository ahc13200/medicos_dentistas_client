import 'uno.css';
import 'virtual:unocss-devtools';

import App from './App.vue';
import { router } from './config/router';
import { createPinia } from 'pinia';
import '@regiondev/vue-components/lib/style.css';
import '@regiondev/vue-components/lib/antd.css';
import {categoriesStore} from "./config/stores/categories.store";
import 'vue3-carousel/dist/carousel.css'



const app = createApp(App);
app.use(router);
app.use(createPinia());

const categories = categoriesStore()
categories.construct()



app.mount('#app');
