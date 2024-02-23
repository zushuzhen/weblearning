<template>
  <div class="brand-box">
    <van-image
        v-if="datalist[0]?.img[0]?.url"
        :src="datalist[0]?.img[0]?.url"
        fit="cover"
        position="center"
        class="iconn"
    />
    <div v-for="item in datalist" :key="item" class="nr">
      <!-- <van-image v-if=" item.img" v-for="ite in item.img" :src="ite.url" class="iconn" /> -->
      <div class="background">
        <div class="bigtitle">{{ item.title }}</div>
        <div class="body" v-html="item.content"></div>
      </div>
    </div>
  </div>
</template>
<script setup name="brand">
import {ref, onMounted, defineProps} from "vue";
import {gettree, get} from "@/utils/request.js";

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
.brand-box {
  padding-bottom: 20px;

  .nr {
    .background {
      background: #fafafa;
      padding: 0 20px;

      .bigtitle {
        color: #0c5cd6;
        font-size: 16px;
        font-weight: 700;
        padding: 15px;
        font-family: Medium;
        text-align: center;
      }

      .body {
        padding-bottom: 20px;
        text-indent: 2rem;
        font-size: 14px;
        line-height: 28px;

        p {
          margin: 0 auto;
        }
      }
    }
  }
}

.iconn {
  margin: 0 auto;
  width: 80%;
  display: flex;
  justify-content: center;
}
</style>
