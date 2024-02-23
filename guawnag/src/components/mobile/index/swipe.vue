<template>
  <div class="background">
    <div class="swipe-container">
      <van-swipe :autoplay="10000" :touchable="true" indicator-color="white" @change="onChange">
        <van-swipe-item v-for="(ite, index) in banners" :key="ite.id">
          <div class="bannerphoto" :style="{
            backgroundImage: 'url(' + ite.imgurl1 + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
          }">
            <div class="imgurl1" v-if="index == 0">
              <van-image :src="ite.imgurl2" fit="cover" position="center"
                         :class="index == swiperActive? 'animate__animated animate__slideInUp' : ''"/>
            </div>
            <div class="imgurl2" v-if="index == 1">
              <van-image :src="ite.imgurl2" fit="cover" position="center"
                         :class="index == swiperActive? 'animate__animated animate__slideInUp' : ''"/>
            </div>
            <div class="imgurl3" v-if="index == 2">
              <van-image :src="ite.imgurl2" fit="cover" position="center"
                         :class="index == swiperActive? 'animate__animated animate__slideInUp' : ''"/>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="swipe-icon">
        <swiper :slidesPerView="6.5" :spaceBetween="5" :pagination="true">
          <swiper-slide v-for="item in icons" :key="item" class="swiper-slidebox">
            <div class="felx" @click="navtobar(item)">
              <i class="iconfont" @click="toggleSearchInput" v-html="item.icon"></i>
              <div class="text-center">{{ item.name }}</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script setup name="auout">
import "animate.css";
import {Swiper, SwiperSlide} from "swiper/vue";
import {ref, onMounted} from "vue";
import {gettree, get} from "@/utils/request.js";
import {getTtrees, getClassification} from "@/utils/package.js";

const swiperActive = ref(0);
const banners = ref([]);
const icons = ref([]);
onMounted(async () => {
  get("/cms/banner/list").then((res) => {

    banners.value = res?.rows?.map(item => {
      return {
        ...item,
        imgurl1: item.imgurl.split(',')[0],
        imgurl2: item.imgurl.split(',')[1],
      }
    })
    console.log(banners.value);
  });
  //根据参数键名获取id
  await getTtrees();
  const result = getClassification("funcBar"); // 替换 'yourFunc' 为需要的值
  gettree(result, false).then((res) => {
    console.log(res);
    icons.value = res.data;
  });
});
//点击icon跳转
const navtobar = (item) => {
  window.location.href = "./bar.html" + item.url;
};
//轮播监听
const onChange = (index) => {
  swiperActive.value = index
  console.log(index);
}
</script>
<style scoped lang="scss">
.background {
  padding-bottom: 40px;

  .swipe-container {
    position: relative;
    margin-bottom: 40px;
  }
}

.bannerphoto {
  height: 55vw;
  width: auto;

  .imgurl1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-20%, -90%);

    .animtian {
      animation: topfill 1s forwards;
    }
  }

  .imgurl2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -150%);
  }

  .imgurl3 {
    position: absolute;
    width: 80vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
  }
}


.swipe-image {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
}

.swipe-icon {
  padding: 20px 20px;
  box-sizing: border-box;
  width: 90%;
  border-radius: 10px;
  background: #fff;
  z-index: 9;
  position: absolute;
  bottom: -60px;
  left: calc(100vw - 95%);
  box-shadow: 1px 1px #d9d9d9;

  .swiper-slidebox {
    background: #fff;
    height: 100%;

    .felx {
      height: 100%;

      .text-center {
        text-align: center;
        font-size: 14px;
        padding-top: 8px;
        color: #666;
      }

      .iconfont {
        font-size: 30px;
        text-align: center;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        color: #333;
      }
    }
  }
}
</style>
