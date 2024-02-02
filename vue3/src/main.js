import {createApp} from "vue";
import App from "./App.vue";
import "vant/lib/index.css";
import Vant from "vant";
const app = createApp(App);
// 使用 Vant 插件
app.use(Vant);
// 挂载应用程序
app.mount("#app");