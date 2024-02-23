import "normalize.css";
import "element-plus/dist/index.css";
import "swiper/css";
import "animate.css";
import "./index.scss";

import {WOW} from "wowjs";
import ElementPlus from 'element-plus'


import 'element-plus/dist/index.css'
import {createApp, onMounted, ref} from "vue";
import dataIndex from "@/components/pc/login.vue";

const app = createApp({
		components: {dataIndex},
		setup() {
				onMounted(async () => {
				});
		},
});
new WOW().init();
app.use(ElementPlus)
app.mount('#app')