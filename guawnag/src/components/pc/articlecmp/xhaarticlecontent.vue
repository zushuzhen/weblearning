<template>
  <div style="margin-top: 90px">
    <div class="article">
      <div class="article-top">
        <div>
          <div class="wed" @click="goWeb(handlercontent.title)">
            <i class="iconfont" style="color: black; font-size: 40px"
              >&#xe62f;</i
            >
          </div>
          <h2>{{ handlercontent?.title }}</h2>

          <div class="link">
            <div>
              <i class="iconfont icon"> &#xe837;</i>
              <span>{{
                handlercontent.author ? handlercontent.author : "青岛旅游集团"
              }}</span>
            </div>
            <div v-if="handlercontent.publishtime">
              <i class="iconfont icon">&#xe835;</i>
              <span>{{ formatDate(handlercontent.publishtime, "cont") }}</span>
            </div>
            <div>
              <i class="iconfont icon"> &#xe847;</i>
              <span>{{ handlercontent.viewCount?handlercontent.viewCount:mathNum}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="article-bottom">
        <p v-html="handlercontent?.content"></p>
        <!-- <img
            v-for="item in handlercontent?.img"
            :src="item.url"
            alt=""
            :key="item.id"
        /> -->

        <!-- <div class="back" @click="goback">
          <i class="iconfont">&#xe619;</i>
          返回
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, toRefs, reactive } from "vue";
import $bus from "@/utils/bus.js";
import { formatDate } from "@/utils/time.js";
import { getContentById } from "../../utils/request";
import { get, gettree } from "../../utils/request";

const props = defineProps(["articleId"]);
const handlerObj = reactive({
  handlercontent: {},
  mathNum:''
});
const { handlercontent,mathNum } = toRefs(handlerObj);

onMounted(() => {
  getContentById("/cms/article", props.articleId).then((res) => {
    console.log(res, 134);
    handlercontent.value = res.data;
  });
  floor()
  // 生成1到10之间的随机整数
 mathNum.value = Math.floor(Math.random() * 100) + 1;
});
const goback = () => {
  window.history.back();
};
const floor = () => {
  get("/cms/article/readCount?articleId=" + props.articleId)
    .then((res) => {console.log('陈工');})
    .catch((err) => {console.log('失败');});
};
const goWeb = (title) => {
  let locallink = encodeURIComponent(document.location.href);
  // location.href=`https://service.weibo.com/share/share.php?url=${locallink}&title=${title}`;
  window.open(
    `https://service.weibo.com/share/share.php?url=${locallink}&title=${title}`,
    "_blank"
  );
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";

.article {
  padding-top: 70px;
  background: #f1f7fd;
  box-sizing: border-box;

  .article-top {
    > div {
      padding: 90px 0 70px;
      box-sizing: border-box;
      text-align: center;
      width: 1200px;
      background: #fff;
      margin: 0 auto;
      border-bottom: 1px solid #e8e8e8;
      position: relative;

      h2 {
        font-family: Medium;
        font-size: 26px;
        color: black;
        font-weight: 600;
      }

      .link {
        width: 400px;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        margin-top: 35px;

        > div {
          display: flex;
          align-items: center;

          > i {
            margin-right: 10px;
          }
        }

        .icon {
          font-size: 18px;
        }
      }

      .wed {
        cursor: pointer;
        position: absolute;
        width: 90px;
        bottom: -23px;
        left: calc(50% - 45px);
        background: #fff;
      }
    }
  }

  .article-bottom {
    padding: 50px 5%;
    background: #fff;
    width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;

    img {
      width: 100%;
      object-fit: cover;
    }

    .back {
      width: 188px;
      height: 68px;
      border: 2px solid #b7b7b7;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 42px auto;
      cursor: pointer;
    }
  }
}
:deep(p) {
  font-size: 16px !important;
  line-height: 30px !important;
  color: #666 !important;
}
</style>
