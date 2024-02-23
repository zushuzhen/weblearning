<template>
  <div class="articlepagelistbox">
    <bigtitle :title="articlepagelist.title"></bigtitle>
    <div v-html="articlepagelist.content" class="rticlepagelist"></div>
  </div>
</template>
<script setup>
import bigtitle from "../title.vue";
import {
  reactive,
  ref,
  onMounted,
  toRefs,
  watchEffect,
  defineProps,
} from "vue";
import {get, gettree} from "@/utils/request.js";
import {formatDate} from "@/utils/time.js";

const name = ref("文旅");
const articlepagelist = ref({});
const props = defineProps(["cmpData", "curNav"]);
onMounted(() => {
  getDetail(props.cmpData.id);
});
//获取详情
const getDetail = (id) => {
  //文章模板---获取内容信息
  let data = {
    categoryId: id,
    status: "publish",
  };
  get("/cms/article/list", data).then((res) => {
    articlepagelist.value = res.rows[0];
  });
};
</script>
<style scoped lang="scss">
.articlepagelistbox {
  margin: 0 20px 20px 20px;
}

* {
  font-family: Regular;
  margin: 0;
  padding: 0;
  font-size: 14px;
}

.rticlepagelist {
  .MsoNormal {
    line-height: 28px;
    font-size: 14px;

    span {
      font-size: 14px;
    }
  }

  p {
    margin: 0;
    padding: 0;
    line-height: 28px;

    span {
      color: red;
    }
  }
}
</style>
