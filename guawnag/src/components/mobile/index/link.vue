<template>
  <div class="seek">
    <div>FRIENDLY LINK</div>
    <div><span class="line">友情链接</span></div>
  </div>
  <div class="link" >
    <div style="padding: 0 20px; max-width: 100%; height: 200px">
      <swiper
      v-if="linkshow"
        :loop="true"
        :modules="modules"
        :autoplay="{ delay: 3000, pauseOnMouseEnter: true }"
        :slidesPerView="2"
        :spaceBetween="10"
      >
        <swiper-slide v-for="item in links" :key="item" class="swiper-slidebox">
          <van-image
            fit="cover"
            position="center"
            :src="item.imgurl"
            class="img"
          />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script setup name="link">
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref, onMounted, reactive, watch } from "vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const modules = [Autoplay];

import { get } from "@/utils/request.js";
const props = defineProps(["scroll", "modelValue", "navList"]);
const linkshow = ref(false);
const links = ref([]);
onMounted(() => {
  get(`/cms/link/list`).then((res) => {
    links.value = res.rows;
    setTimeout(() => {
      linkshow.value = true;
    });
  });
});
</script>

<style scoped lang="scss">
.seek {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  background-size: 100% 100%;
  padding: 50px 0px 0px 0px;
  box-sizing: border-box;

  > div:nth-child(1) {
    text-align: center;
    line-height: 40px;
    color: #d2d5da;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  > div:nth-child(2) {
    line-height: 26px;
    text-align: center;
    color: #333;
    font-size: 24px;
    font-weight: bold;
  }

  .line {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -30px;
      width: 14px;
      height: 1px;
      background-color: #d2d5da;
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      right: -30px;
      width: 14px;
      height: 1px;
      background-color: #d2d5da;
    }
  }
}

.link {
  padding-top: 25px;
  box-sizing: border-box;
  width: 100%;
  height: 207px;
  background: url("@/assets/images/link.png");
  background-size: cover;

  > div:nth-child(1) {
    text-align: center;
    line-height: 40px;
    color: #d2d5da;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  > div:nth-child(2) {
    line-height: 60px;
    text-align: center;
    color: #333;
    font-size: 32px;
    font-weight: bold;
  }

  .line {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -50px;
      width: 30px;
      height: 1px;
      background-color: #d2d5da;
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      right: -50px;
      width: 30px;
      height: 1px;
      background-color: #d2d5da;
    }
  }

  .swiper-slidebox {
    height: 100px;
    box-sizing: border-box;
    border: 1px solid #f2f2f2;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    .img {
      width: 150px;
    }
  }
}
</style>
