import "swiper/css";
import "animate.css";
import "vant/lib/index.css";
import { createApp, ref, onMounted, reactive } from "vue";

import dataIndex from   "../../../components/mobile/index/index.vue";

import Vant from "vant";
const app = createApp({
  components: {
    dataIndex,
  },
  setup() {
    return {
    };
  },

});

app.component( dataIndex);
// 使用 Vant 插件
app.use(Vant);
// 挂载应用程序
app.mount("#app");
