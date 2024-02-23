<template>
  <div class="introduction">
    <div>
      <div v-html="dataA.content" class="pp"></div>
      <div class="bb-icon">
        <van-button type="primary" class="b-icon" @click="videoClick">
          <i class="iconfont" style="color: #fff">&#xe666;</i>
          <span> 企业宣传片</span>
        </van-button>
      </div>
      <van-image-preview v-model:show="videoShow" :images="videos" closeable @close="onclose">
        <template #image="{ src }">
          <video style="width: 100%" controls id="media">
            <source :src="src" ref="myVideo"/>
          </video>
        </template>
      </van-image-preview>
      <van-image v-for="item in dataA.img" :key="item" :src="item.url"/>
    </div>
  </div>
</template>
<script setup name="introduction">
import {ref, onMounted, defineProps} from "vue";
import {gettree, get} from "@/utils/request.js";
import {showToast, showImagePreview} from 'vant';

const props = defineProps(["cmpData"]);
const dataA = ref("");
const videoShow = ref(false);
const videos = ref([])
const myVideo = ref(null);
onMounted(() => {
  let data = {
    categoryId: props.cmpData.id,
    status: "publish",
    params: {
      containSub: true,
    },
  };
  get(`/cms/article/list`, data).then((res) => {
    dataA.value = res.rows[0];
  });
});
const videoClick = () => {
  videos.value = [dataA.value.jumpurl]
  videoShow.value = true;
};
const onclose = (newIndex) => {
  console.log(newIndex)
  videoShow.value = false;
  videos.value = []

};
</script>
<style lang="scss">
* {
  font-family: Regular;
}

.introduction {
  padding: 0 20px 15px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.pp {
  text-indent: 2em;
  font-size: 14px;
  line-height: 28px;

  p {
    margin: 0;
    padding: 0;
  }
}

.bb-icon {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  .b-icon {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin: 0 auto;
    margin-top: 10px;
    border-radius: 5px;
    color: #fff;
    background: #0c5cd6;
    margin-bottom: 10px;
  }

  i {
    font-size: 14px;
  }
}
</style>
