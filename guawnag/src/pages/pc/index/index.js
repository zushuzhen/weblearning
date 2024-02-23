import "normalize.css";
import "element-plus/dist/index.css";
import "swiper/css";
import "animate.css";
import "./index.scss";

import { Swiper, SwiperSlide } from "swiper/vue";
import { WOW } from "wowjs";
import { ElImage } from "element-plus";

import MyHeader from "@/components/header.vue";
import MyLink from "@/components/link.vue";
import MyFooter from "@/components/footer.vue";
import IndexSeek from "@/components/Mycomponent/seeks.vue";
import IndexTheme from "@/components/Mycomponent/theme.vue";
import IndexVideos from "@/components/Mycomponent/videorotation.vue";
import IndexBanner from "@/components/Mycomponent/banner.vue";
import { createApp, onMounted ,ref} from "vue";
import { getTtrees, getClassification } from "@/utils/package.js";
import { get } from "@/utils/request.js";


const app = createApp({
  components: {
    MyHeader,
    MyLink,
    MyFooter,
    IndexSeek,
    IndexTheme,
    IndexVideos,
    IndexBanner,
    Swiper,
    SwiperSlide,
    ElImage,
  },
  setup() {
    const platform = ref([])
    onMounted(async() => {
      await getpromotion()
    });
    const getpromotion=async()=>{
        try {
          await getTtrees();
          const result = getClassification("promotion"); // 替换 'yourFunc' 为需要的值
          let data = {
            categoryId: result,
            status: "publish",
          };
          get("/cms/article/list", data).then((res) => {
            console.log('推广平台数据',res);
            platform.value=res.rows
          });
        } catch (error) {
          console.error("An error occurred:", error);
      }
    }
    //js文档
    window.addEventListener("load", function () {
      var big = document.querySelector(".big");
      var backtop = document.querySelector(".back-top");
      var promotion = document.querySelector(".promotion");
      var fixedTop = big.offsetTop - 100;
      document.addEventListener("scroll", function () {
        //1.滚动到一定位置时固定不动
        if (window.scrollY > 300) {
          big.style.position = "fixed";
          big.style.top = fixedTop + "px";
        } else {
          big.style.position = "absolute";
          big.style.top = "400px";
        }
        //2.滚动到一定位置时显示返回顶部
        if (window.scrollY > 800) {
          backtop.style.display = "block";
          promotion.style.display = "block";
        } else {
          backtop.style.display = "none";
          promotion.style.display = "none";
        }
      });
      backtop.addEventListener("click", function () {
        animate(window, 0);
      });
      function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(fn, 13);
        function fn() {
          var step = (target - window.scrollY) / 10;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          if (window.scrollY == target) {
            clearInterval(obj.timer);
            if (callback) {
              callback();
            }
          }
          window.scroll(0, window.scrollY + step);
        }
      }
    });

    return {
      platform
    };
  },
});
app.mount("#app");
console.log(app, "挂载app");
new WOW().init();
