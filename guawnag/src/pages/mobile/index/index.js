import "swiper/css";
import "animate.css";
import "vant/lib/index.css";
import { createApp, ref, onMounted, reactive } from "vue";
import mobileFooter from "../components/mobileFooter.vue";
import mobileHeader from "../components/mobileHeader.vue";
import dataIndex from '../components/index/index.vue'

import Vant from "vant";
const app = createApp({
  components: {
    mobileHeader,
    dataIndex,
    mobileFooter,
  },
  setup() {
    return {
    };
  },

});

app.component(mobileHeader, dataIndex, mobileFooter);
// 使用 Vant 插件
app.use(Vant);
// 挂载应用程序
app.mount("#app");
