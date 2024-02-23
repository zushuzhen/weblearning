<template>
  <div class="link wow animate__animated animate__fadeInUp">
    <div>Friendship link</div>
    <div><span class="line">友情链接</span></div>
    <div v-if="SwiperShow" style="" class="swiperShow">
      <swiper
        class="mySwiper"
        :modules="modules"
        :loop="true"
        :autoplay="{ delay: 3000, pauseOnMouseEnter: true }"
        :slidesPerView="4"
        :spaceBetween="25"
      >
        <swiper-slide
          v-for="item in SwiperList"
          :key="item.id"
          class="swiper-slidebox"
        >
          <img :src="item.imgurl" alt="" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script setup name="Link">
import { ref, reactive, onMounted } from "vue";
import { get } from "@/utils/request.js";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const modules = [Autoplay];
const SwiperShow = ref(false);
const SwiperList = ref([]);
onMounted(() => {
  get("/cms/link/list").then((res) => {
    SwiperShow.value = true;
    SwiperList.value = res.rows;
  });
});
</script>
<style scoped lang="scss">
.link {
  padding-top: 25px;
  box-sizing: border-box;
  width: 100%;
  height: 557px;
  background: url("@/assets/images/link.png") no-repeat;
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
    margin-bottom:50px;
    line-height: 60px;
    text-align: center;
    color: #333;
    font-size: 32px;
    font-weight: bold;
  }
  .swiperShow {
    max-width: 1600px;
    margin-top: 80px;
    margin: 0 auto;
  }
  .line {
    font-family: Medium;
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
    box-sizing: border-box;
    height: 208px;
    border: 1px solid #f2f2f2;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
@media screen and (max-width: 1440px) {
  .link{
    .swiperShow{
      width: 1200px;
    }
  }
}
@media (min-width: 1440px) and (max-width: 1600px) {
  .link{
    .swiperShow{
      padding: 0 5%;

    }
  }
}
</style>
