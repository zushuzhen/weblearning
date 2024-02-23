<template>
  <div>
    <div class="corevalues">
      <div
        class="corevalues-box"
        style="width: 100%"
        v-for="item in datalist"
        :key="item.id"
      >
        <div class="box-image">
          <img class="img" :src="item.img[0].url" alt="" />
        </div>
        <div class="box-content contentBox">
          <div class="tag-box">
            {{ item.title }}
          </div>
          <div v-if="!item.summary" v-html="item.content" class="content"></div>
          <div v-else class="content">{{ item.summary }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="contactUs">
import { ref, onMounted, defineProps } from "vue";
import { get } from "@/utils/request.js";
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
.corevalues {
  padding: 0 20px 20px 20px;
  .corevalues-box {
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 10px;

    .box-image {
      display: flex;
      justify-content: center;

      .img {
        width: 95vw;
      }
    }
    .box-content {
      box-sizing: border-box;
      background: #fff;
      padding: 10px;
      .tag-box {
        text-align: center;
        font-size: 16px;
        border-radius: 2px;
        font-weight: bold;
        font-family: Medium;
        transition: 0.3s;
        color: #333;
      }
      .title {
        color: #333;
        text-align: justify;
        margin: 20px 0;
        cursor: pointer;
        font-size: 18px;
      }
      .content {
        cursor: pointer;
        width: 100%;
        margin-top: 5px;
        line-height:20px;
        font-size: 14px;
        text-indent: 2em;

        p{
          margin: 0;
          padding: 0;
        }
      }
    }
    .contentBox {
      background: #fafafa;
    }
  }
}
</style>
