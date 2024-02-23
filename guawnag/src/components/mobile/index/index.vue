<template>
  <div>
    <swipe></swipe>
    <informationCenter></informationCenter>
    <promotionalVideo></promotionalVideo>
    <themeActivity></themeActivity>
    <links></links>
    <mobilefooter></mobilefooter>
    <div class="rightbo">
      <div class="sticky" @click.stop="openshowPopup">
        <i class="iconfont" style="color: #fff;">&#xeaf1;</i>
      </div>
    </div>
    <van-popup v-model:show="showPopup" closeable round>
      <div class="divpopup">
        <div class="wtitle">全网推广服务平台</div>
        <div class="qrimage">
          <div v-for="item in platform" :key="item.id" class="boxbox">
            <div class="box">
              <van-image fit="cover" position="center" class="img" :src="item.img[0].url" alt=""/>
            </div>
            <!--  <div>{{ item.title }}</div>-->
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup name="contactUs">
import {Popup} from "vant";
import {ref, onMounted} from "vue";
import {gettree, get} from "@/utils/request.js";
import swipe from "./swipe.vue"; //轮播
import links from "./link.vue"; //链接
import mobilefooter from "../mobileFooter.vue"; //链接
import informationCenter from "./informationCenter.vue"; //资讯中心
import promotionalVideo from "./video.vue"; //宣传视频
import themeActivity from "./themeActivity.vue"; //主题活动
import {getTtrees, getClassification} from "@/utils/package.js";

const showPopup = ref(false);
const platform = ref([]);
onMounted(async () => {
  await getpromotion();
});
const getpromotion = async () => {
  try {
    await getTtrees();
    const result = getClassification("promotion"); // 替换 'yourFunc' 为需要的值
    let data = {
      categoryId: result,
      status: "publish",
    };
    get("/cms/article/list", data).then((res) => {
      console.log("推广平台数据", res);
      platform.value = res.rows;
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
const openshowPopup = () => {
  showPopup.value = true;
};
</script>

<style lang="scss">

.divpopup {
  height: 550px;
  width: 80vw;
  padding: 20px;

  .wtitle {
    border-bottom: 1px #999 solid;
    font-size: 16px;
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }

  .qrimage {
    height: 500px;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;

    .boxbox {
      text-align: center;
      font-size: 14px;

      .box {
        width: 100%;

        .img {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
}

.rightbo {
  z-index: 99999;
  position: fixed;
  bottom: 50px;
  right: 0;

  .sticky {
    background: #0c5cd6;
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;

    .iconfont {
      font-size: 40px;
      margin: 10px 0 10px 4px;
    }
  }
}

</style>

