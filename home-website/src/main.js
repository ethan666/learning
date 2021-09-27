import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { Button, Image } from "ant-design-vue";

createApp(App).use(store).use(router).use(Button).use(Image).mount("#app");
