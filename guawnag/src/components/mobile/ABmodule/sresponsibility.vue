<template>
  <div class="brandBentity-box">
    <div class="background-box" v-for="item in datalist" key="item">
      <img :src="item.img[0].url" class="icon" />
      <div class="image-box">
        <div class="box-first">{{ item.title }}</div>
        <div
          v-if="!item.summary"
          v-html="item.content"
          class="box-second"
        ></div>
        <div v-else class="box-second">{{ item.summary }}</div>
      </div>
    </div>
  </div>
</template>

<script setup name="contactUs">
import { ref, onMounted, defineProps } from "vue";
import { gettree, get } from "@/utils/request.js";
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
    console.log(res);
    datalist.value = res.rows;
  });
});
</script>
<style lang="scss">
.brandBentity-box {
  padding: 0 20px 20px 20px;

  .background-box {
    border-radius: 2px;
    color: #fff;
    margin-bottom: 20px;

    .icon {
      width: 100%;
      height: 100%;
      border-radius: 5px 5px 0 0;
      font-size: 0;
    }
    .image-box {
      background: #f7f7f7;
      .box-first {
        font-family: Medium;
        font-size: 18px;
        padding: 5px 10px;
        color: #333;
      }

      .box-second {
        font-size: 14px;
        line-height: 28px;
        text-indent: 2em;
        padding-bottom: 10px;
        padding: 010px;
        line-height: 28px;
        color: #666;
        p {
          margin: 0;
          padding: 0;
        }
      }
    }
  }
}
</style>
