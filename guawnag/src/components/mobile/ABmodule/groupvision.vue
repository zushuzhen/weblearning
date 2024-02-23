<template>
  <div class="groupVision-box">
    <div v-for="item in datalist" :key="item">
      <van-image
          v-if="item.img[0]?.url"
          :src="item.img[0]?.url"
          class="groupVisionicon"
          fit="cover"
          position="center"
      />
      <!--      <img src="static/images/groupVision.jpg" class="icon" />-->
      <div class="flex-start">
        <div class="square"></div>
        <div class="titles">{{ item.title }}</div>
      </div>
      <div class="data">{{ item.summary }}</div>
      <div class="flex-start">
        <div class="square"></div>
        <div class="titles">{{ item.title }}</div>
      </div>
      <div class="data" v-html="item.content"></div>
    </div>
  </div>
</template>

<script setup name="groupVision">
import {ref, onMounted, defineProps} from "vue";
import {get} from "@/utils/request.js";

const props = defineProps(["cmpData"]);
const datalist = ref("");
onMounted(() => {
  let data = {
    categoryId: props.cmpData.id,
    status: "publish",
    params: {
      containSub: true,
    },
  };
  get(`/cms/article/list`, data).then((res) => {
    console.log(res.rows);
    datalist.value = res.rows;
  });
});
</script>
<style lang="scss">
.groupVision-box {
  padding: 0 20px 20px 20px;

  .icon {
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
  }

  .flex-start {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-family: Medium;
    font-weight: 500;
    margin-bottom: 5px;


    .square {
      background: #0c5cd6;
      width: 3px;
      height: 13px;
      margin-right: 5px;
      font-size: 16px;
    }

    .titles {
      font-size: 17px;
      font-weight: bold;
      line-height: 28px;
      color: #0c5cd6;
      font-family: Medium;
    }
  }

  .data {
    font-size: 14px;
    font-weight: 500;
    color: #000;
    padding-bottom: 10px;
    font-family: Medium;
  }
}

.groupVisionicon {
  height: 50vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
