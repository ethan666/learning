import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { Button, Image } from "ant-design-vue";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Button).use(Image);

app.mount("#app");
