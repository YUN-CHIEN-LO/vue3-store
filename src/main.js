import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import VueRouter from 'vue-router';
import App from "./App.vue";

createApp(App).use(ElementPlus).use(VueRouter).mount("#app");
