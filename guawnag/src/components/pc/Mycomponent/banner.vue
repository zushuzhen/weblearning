<template>
  <div style="margin-bottom: 20px">
    <div style="width: 100%">
      <div style="width: 100%">
        <swiper
          class="swiperBox"
          :modules="modules"
          :pagination="{ clickable: true }"
          :effect="'fade'"
          @slideChange="SlideChanges"
          :autoplay="{ delay: 5000, pauseOnMouseEnter: true }"
        >
          <!--  -->
          <!-- -->

          <swiper-slide
            class="swierpSlide"
            style="height: 800px"
            v-for="(item, index) in bannerList"
            :key="item.id"
          >
            <el-image class="img images" :src="item.imgarr[0]" fit="cover" />
            <div
              class="moreTe"
              :class="index == swiperActive ? 'animtian' : ''"
              ref="moreTe"
            >
              <el-image
                class="img images"
                v-if="item.imgarr && item.imgarr.length > 1"
                :src="item.imgarr[1]"
                fit="cover"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <IndexBanner style="margin-top: -150px"></IndexBanner>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElImage } from "element-plus";

import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "normalize.css";
import "element-plus/dist/index.css";
import "swiper/css";
import "animate.css";
import "swiper/css/effect-fade";
import { gettree, get } from "@/utils/request.js";
import IndexBanner from "@/components/Mycomponent/chong.vue";

let accordion = ref([]);
const moreTe = ref();
const SwiperShow = ref(false);
const accordionLenght = ref();
const bannerList = ref([]);
const swiperActive = ref(0);
const bannerSize = ref("165px");
const curColor = ref([
  "#e60012", // 红色
  "#ea5703", // 绿色
  "#f39800", // 蓝色
  "#b0cb03", // 黄色
  "#6ab935", // 品红
  "#01af7f", // 青色
  "#0082cb", // 紫色
  "#0d6fb8", // 橙色
  "#2b328e", // 深绿色
]);
//切换轮播
const SlideChanges = (swiper, index) => {
  swiperActive.value = swiper.activeIndex;
};
const modules = [Autoplay, Pagination, EffectFade];
const curFunc = ref("cur-0");
onMounted(() => {
  getBanner();
});
//功能栏内页
const goBarUrl = (url) => {
  location.href = `/bar.html${url}`;
};
const getBanner = () => {
  get("/cms/banner/list").then((res) => {
    console.log(res);
    let Arr = res.rows.map((item) => {
      return {
        ...item,
        imgarr: item.imgurl.split(","),
      };
    });
    bannerList.value = Arr;
    SwiperShow.value = true;
  });
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
.animationVide {
  animation: myfirst 1s;
  animation-delay: 2s;
}
@keyframes myfirst {
  from {
    margin-top: 0;
    opacity: 0;
  }
  to {
    opacity: 1;
    margin-top: -150px;
  }
}
.swiperBox {
  min-height: 800px;
}
.swierpSlide {
  position: relative;
  &:nth-child(1) {
    .moreTe {
      position: absolute;
      top: 28%;
      right: 10%;
      .el-image {
        width: 90%;
      }
    }
    .animtian {
      animation: topfill 3s forwards;
    }
  }
  &:nth-child(2) {
    .moreTe {
      position: absolute;
      top: 23%;
      right: calc(50% - 300px);
      .el-image {
        width: 600px;
      }
    }
    .animtian {
      animation: towfill 3s forwards;
    }
  }
  &:nth-child(3) {
    .moreTe {
      position: absolute;
      top: 23%;
      right: calc(50% - 500px);
      .el-image {
        width: 1000px;
      }
    }
    .animtian {
      animation: towfill 2s forwards;
    }
  }
}

@keyframes topfill {
  from {
    opacity: 0;
    top: 35%;
  }
  to {
    opacity: 1;
    top: 28%;
  }
}
@keyframes towfill {
  from {
    opacity: 0;
    top: 30%;
  }
  to {
    opacity: 1;
    top: 23%;
  }
}

.mask-box {
  position: relative;
}

.mask-box::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(50, 95, 166, 0.7); /*半透明黑色*/
}
.gift {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  /* 直接设置底部颜色为透明 */

  /* 居中显示 */
  z-index: 9;
  .icon {
    margin: 30px 0 10px 0;
    display: flex;
    justify-content: center;
  }
  .tetx {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #fff;
    p {
      writing-mode: vertical-rl;
      letter-spacing: 4px;
      font-size: 22px;
      //font-family: Medium;
      font-weight: 600;
    }
  }
  > div {
    width: 100%;
  }
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

/* @media (min-width: 1440px) and (max-width: 1600px) {
  .function-list {
    width: 100%;
    margin-top: -150px;
    > div {
      margin: 0 auto;
      max-width: v-bind(accordionLenght);
      overflow: hidden;
      width: 100%;
      background: red;

      ul {
        margin: 0;
        padding: 0;
        position: relative;
        height: 400px;
        background-color: #fff;

        li {
          list-style: none;
          position: absolute;
          overflow: hidden;
          top: 0;
          height: 100%;
          -webkit-transition: left 0.2s ease-out 0s;
          transition: left 0.2s ease-out 0s;
          cursor: pointer;
          overflow: hidden;

          > div:nth-child(1) {
            width: 110px;
            height: 100%;
          }
          > div:nth-child(2) {
            margin-left: 110px;
            width: 520px;
            height: 100%;
            background-color: #fff;
          }
        }
        .cur-0 {
          left: 0px;
          z-index: 1;
        }
        .cur-1 {
          left: 560px;
          z-index: 2;
        }
        .cur-2 {
          left: 670px;
          z-index: 3;
        }
        .cur-3 {
          left: 780px;
          z-index: 4;
        }
        .cur-4 {
          left: 890px;
          z-index: 5;
        }
        .cur-5 {
          left: 1000px;
          z-index: 6;
        }
        .cur-6 {
          left: 1110px;
          z-index: 7;
        }
        .cur-7 {
          left: 1220px;
          z-index: 8;
        }
        .cur-8 {
          left: 1330px;
          z-index: 8;
        }
      }

      .cur-0 .cur-0,
      .cur-1 .cur-0,
      .cur-2 .cur-0,
      .cur-3 .cur-0,
      .cur-4 .cur-0,
      .cur-5 .cur-0,
      .cur-6 .cur-0,
      .cur-7 .cur-0,
      .cur-8 .cur-0 {
        left: 0;
      }
      .cur-1 .cur-1,
      .cur-2 .cur-1,
      .cur-3 .cur-1,
      .cur-4 .cur-1,
      .cur-5 .cur-1,
      .cur-6 .cur-1,
      .cur-7 .cur-1,
      .cur-8 .cur-1 {
        left: 100px !important;
      }
      .cur-2 .cur-2,
      .cur-3 .cur-2,
      .cur-4 .cur-2,
      .cur-5 .cur-2,
      .cur-6 .cur-2,
      .cur-7 .cur-2,
      .cur-8 .cur-2 {
        left: 200px;
      }
      .cur-3 .cur-3,
      .cur-4 .cur-3,
      .cur-5 .cur-3,
      .cur-6 .cur-3,
      .cur-7 .cur-3,
      .cur-8 .cur-3 {
        left: 300px;
      }
      .cur-4 .cur-4,
      .cur-5 .cur-4,
      .cur-6 .cur-4,
      .cur-7 .cur-4,
      .cur-8 .cur-4 {
        left: 400px;
      }
      .cur-5 .cur-5,
      .cur-6 .cur-5,
      .cur-7 .cur-5,
      .cur-8 .cur-5 {
        left: 500px;
      }
      .cur-6 .cur-6,
      .cur-7 .cur-6,
      .cur-8 .cur-6 {
        left: 600px;
      }
      .cur-7 .cur-7,
      .cur-8 .cur-7 {
        left: 710px;
      }
      .cur-8 .cur-8 {
        left: 820px;
      }
    }
  }
} */
:deep(.swiper-pagination) {
  bottom: 180px;
  .swiper-pagination-bullet {
    width: 50px;
    height: 5px;
    border-radius: 0;
  }
  /* 高亮状态 */
  .swiper-pagination-bullet-active {
    position: relative;
    background: rgba($color: #000, $alpha: 0.2);
  }

  /* 高亮状态的伪元素 */
  .swiper-pagination-bullet-active::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0; /* 初始宽度为0 */
    background-color: rgba(255, 255, 255, 0.9); /* 高亮颜色 */
    animation: fill 5.5s forwards;
  }

  /* 定义动画效果 */
  @keyframes fill {
    to {
      width: 100%; /* 最终宽度为100% */
    }
  }
}
@media screen and (max-width: 1440px) {
  .swiperBox {
    min-height: 750px;
  }
  .swierpSlide {
  position: relative;
  height: 100vh !important;
}
}

/* .swierpSlide {
  &:nth-child(3){
    .moreTe {
      .el-image{
        width: 800px;
      }
    }
  }
} */
</style>
