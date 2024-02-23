<template>
  <div class="theme">
    <div>THEME ACTIVITY</div>
    <div class="margin-bottom"><span class="line">主题活动</span></div>
    <newlist :list="list"></newlist>
    <div class="more" @click="navto"><span>查看更多</span></div>
  </div>
</template>
<script setup name="informationCenter">
import {Swiper, SwiperSlide} from "swiper/vue";
import {reactive, ref, onMounted} from "vue";
import {gettree, get} from "@/utils/request.js";
import newlist from "../newslist.vue";

const activitys = ref();
const active = ref(0);
const list = ref([]);
onMounted(async () => {
  //根据参数键名获取id
  const res = await get(`/system/config/list?configKey=${"theme"}`);
  console.log(res);
  let id = res?.rows[1]?.configValue;
  let data = {
    categoryId: id,
    status: "publish",
    pageSize: 4,
    pageNum: 1,
  };
  get("/cms/article/list", data).then((res) => {
    list.value = res.rows;
    console.log(res);
  });
});
const navto = () => {
  window.location.href = './hotnews.html#articlelist-hd'
}
</script>
<style scoped lang="scss">
.margin-bottom {
  margin-bottom: 30px;
}

.theme {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  background-size: 100% 100%;
  padding: 40px 0 0px 0;
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

  .more {
    margin: 0 20px;
    font-size: 14px;
    padding: 15px;
    text-align: center;
    border: 1px solid #bfbfbf;
  }
}

.layout {
  background: url("@/assets/images/link.png");
}
</style>
