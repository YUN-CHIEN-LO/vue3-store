import { createApp } from "vue";
import store from "@/store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";

import router from "./router";

createApp(App).use(router).use(ElementPlus).use(store).mount("#app");
