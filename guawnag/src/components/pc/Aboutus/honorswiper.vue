<template>
  <div>
    <titileBus title="荣誉资质"></titileBus>
    <div class="nav">
      <div
        class="navbox"
        :class="item == curNav ? 'active' : ''"
        v-for="(item, index) in navList"
        :key="item.id"
        @click="navClick(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="Myswiper">
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <swiper
        class="swiperBox"
        :modules="modules"
        watch-slides-progress
        :slides-per-view="5"
        :space-between="20"
        :navigation="navigation"

      >
        <!--:autoplay="{ delay: 5000, pauseOnMouseEnter: true }"  -->
        <swiper-slide
          class="swiperSlide"
          v-for="(item, index) in honor"
          :key="index"
        >
          <div class="boxEnd">
            <div v-for="(p, index) in item.children" :key="index">
              <div class="title" :class="p.yarn == '' ? 'on' : ''">
                {{ p.title }}
              </div>
              <div class="cont">
                <div class="icon">
                  <i class="iconfont" style="font-size: 14px">&#xe84b;</i>
                </div>
                <div class="text">
                  {{ p.summary }}
                </div>
              </div>
              <div class="images">
              <img :src="p.img.length>0?p.img[0].url:''" alt="">
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { FreeMode, Navigation, Thumbs, Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { gettree, get } from "@/utils/request.js";
import titileBus from "@/components/title.vue";

import "swiper/scss";
import "swiper/css/pagination";

const modules = [FreeMode, Navigation, Thumbs, Autoplay, A11y];
const navigation = reactive({
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
});
let prop = defineProps({ contentId: String, cmpData: Object });
const navList = ref([]);
let data = {
  categoryId: prop.cmpData.id,
  status: "publish",
  params: {
    containSub: true,
  },
};
const pageData = reactive({
  articles: [],
});
const curNav = ref({});
const honor = ref([]);
get("/cms/article/list", data).then((res) => {
  if (res.rows && res.rows.length > 0) {
    pageData.articles = res.rows;
  }
  gettree(prop.cmpData.id, false).then((res) => {
    console.log(res.data, "三级菜单");
    navList.value = res.data;
    pageData.articles.forEach((article) => {
      navList.value.forEach((nav) => {
        if (article.categoryId && article.categoryId.includes(nav.id)) {
          if (nav.article) {
            nav.article.push(article);
          } else {
            nav.article = [article];
          }
        }
      });
    });
    curNav.value = navList.value[0];
    conHonor();
  });
});

const navClick = (item) => {
  curNav.value = item;
  conHonor();
};

function conHonor() {
  if (curNav.value.article) {
    honor.value = curNav.value.article.reduce((result, current, index) => {
      if (index % 2 === 0) {
        result.push({ children: [current] });
      } else {
        result[Math.floor(index / 2)].children.push(current);
      }
      return result;
    }, []);
  } else {
    honor.value = [];
  }
}
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  display: flex;
  justify-content: center;

  .navbox {
    margin: 0 25px;
    cursor: pointer;

    &:hover {
      color: #0c5cd6;
    }

    &.active {
      color: #0c5cd6;
    }
  }
}

.Myswiper {
  width: 100%;
  position: relative;
  margin-top: 20px;

  .swiper-button-prev {
    position: absolute;
    z-index: 10;
    right: 50px;
    top: -45px;
    background: #0c5cd6;
    width: 40px;
    height: 40px;
    background: url("@/assets/images/left.png") no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }

  .swiper-button-next {
    cursor: pointer;
    position: absolute;
    top: -45px;
    right: 0px;
    z-index: 10;
    width: 40px;
    height: 40px;
    background: url("@/assets/images/rights.png") no-repeat;
    background-size: 100% 100%;
  }

  .swiperBox {
    width: 100%;
    /* height: 600px; */

    .swiperSlide {
      width: 100%;
      height: 100%;
      .boxEnd {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        .images{
          width: calc(100% - 30px);
          margin-left: 30px;
          margin-top: 10px;
          img{
          width: 100%;
          max-height: 140px;
          object-fit: cover;
        }
        }
        
        .title {
          text-align: center;
          font-size: 26px;
          color: #0c5cd6;
          margin: 20px 0;

          &.on {
            height: 30px;
          }
        }

        .cont {
          display: flex;
          width: 100%;

          .icon {
            width: 30px;
            text-align: center;
          }

          .text {
            width: calc(100% - 30px);
            max-height: 100px;
            font-size: 14px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 5; /* 显示行数，这里2行 */
            -webkit-box-orient: vertical;
            display: -webkit-box;
            text-align: justify;
          }
        }
      }
    }
  }
}

.bg {
  width: 100%;
  min-height: 250px;
  background: url("@/assets/images/abouts.png");
  background-size: 100% 100%;
}
:deep(.swiper-wrapper){
  display: flex;
  align-items: flex-end;
}
</style>
