<template>
  <div class="article">
    <div class="article-content" v-html="content?.content"></div>
    <van-image :src="url" class="article-icon"/>
  </div>
</template>
<script setup name="article">
import {ref, onMounted, defineProps} from "vue";
import {get} from "@/utils/request.js";

const props = defineProps(["cmpData"]);
const content = ref({});
const url = ref("");
onMounted(() => {
  let data = {
    categoryId: props.cmpData.id,
    status: "publish",
    params: {
      containSub: true,
    },
  };
  get(`/cms/article/list`, data).then((res) => {
    content.value = res?.rows[0]
    url.value = res?.rows[0]?.img[0]?.url;
  });
});
</script>
<style scoped lang="scss">
.article {
  padding: 0 20px;
  padding-bottom: 20px;
}

p {
  margin: 0;
  padding: 0;
}

:deep(.ql-size-large) {
  text-indent: 2em;
  font-size: 14px;
  overflow: hidden;
  display: block;
  line-height: 28px;
}
</style>
