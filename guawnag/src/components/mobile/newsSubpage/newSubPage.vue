<template>
  <div>
    <div class="content">
      <h1 class="biggtitle">{{ list.title }}</h1>
      <div class="flex-start">
        <div class="iconbox">
          <i class="iconfont" style="color: #000;font-size: 14px ;margin-right: 3px">&#xe837;</i>
          <span>{{ list.author ? list.author : "青岛旅游集团" }}</span>
        </div>
        <div class="iconbox" v-if="list.publishtime">
          <i class="iconfont" style="color: #000;font-size: 14px ;margin-right: 3px">&#xe64d;</i>
          <span>{{ formatDate(list.publishtime, "all") }}</span>
        </div>
        <div class="iconbox">
          <i class="iconfont" style="color: #000;font-size: 14px ;margin-right: 3px">&#xe847;</i>
          <span>{{ list.viewCount ? list.viewCount : mathNum }}</span>
        </div>
      </div>
      <van-divider><i  @click="goWeb(list.title)" class="iconfont" style="color: black; font-size: 30px">&#xe62f;</i></van-divider>
      <div class="subbox">
        <div v-html="list.content" class="nr"></div>
      </div>
    </div>
  </div>
</template>

<script setup name="newSubPage">
import {reactive, ref, defineProps, onMounted, watch} from "vue";
import {get} from "@/utils/request.js";
import {formatDate} from "@/utils/time.js";
import {gettages} from "@/utils/tags.js";

const id = ref(0);
const list = ref({});
const mathNum = ref('')
onMounted(() => {
  // 获取当前页面的 URL
  let currentURL = window.location.href;
  // 通过 URL 对象获取查询字符串
  let url = new URL(currentURL);
  id.value = url.searchParams.get("id");
  console.log(id.value);
  getlist();
  floor();
  mathNum.value = Math.floor(Math.random() * 100) + 1;
});
const floor = () => {
  get("/cms/article/readCount?articleId=" + id.value)
      .then((res) => {
        console.log(list.value)
        console.log('成功');
      })
      .catch((err) => {
        console.log('失败');
      });
};
const getlist = () => {
  get(`/cms/article/${id.value}`).then((res) => {
    list.value = res.data;
    console.log(res.data);
  });
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
<style scoped lang="scss">
.content {
  padding: 0 20px 20px 20px;

  .biggtitle {
    font-size: 20px;
  }

  h1 {
    font-size: 28px;
    font-family: Medium;
  }

  .flex-start {
    padding: 10px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;

    .iconbox {
      margin-right: 10px;
    }
  }
}

.subbox {
  margin-top: 10px;
  font-size: 14px;
  line-height: 28px;

  p {
    padding: 0;
    margin: 0;
    font-size: 14px;
    line-height: 28px;

    span {
      text-indent: 2em !important;

      img {
        height: 300px !important;
        width: calc(95vw - 40px) !important;
        object-fit: cover;
      }
    }

  }

  img {
    padding: 0;
    margin: 0;
    width: calc(100vw - 40px);
  }

}
</style>
