<template>
  <div class="industryTrends-box">
    <timelist :list="list"></timelist>
    <van-pagination
      v-if="list.length != 0"
      v-model="pageNum"
      :total-items="total"
      :items-per-page="pageSize"
      :show-page-size="4"
      force-ellipses
      @change="nexts"
    >
      <template #prev-text>
        <van-icon name="arrow-left" @click="nexts" />
      </template>
      <template #next-text>
        <van-icon name="arrow" @click="nexts" />
      </template>
    </van-pagination>
  </div>
</template>
<script setup name="pressCenter">
import timelist from "../timelist.vue";
import { gettree, get } from "@/utils/request.js";
import { ref, onMounted, defineProps, watch, nextTick } from "vue";

const props = defineProps(["cmpData"]);
const list = ref("");
const pageNum = ref(1); //当前页码
const pageSize = ref(10); //分页大小
const total = ref(10);
onMounted(() => {
  getlist();
});
const getlist = async () => {
  let data = {
    categoryId: props.cmpData.id,
    status: "publish",
    pageSize: pageSize.value,
    pageNum: pageNum.value,
  };
  await get(`/cms/article/list`, data).then((res) => {
    list.value = res.rows;
    total.value = res.total;
  });
};
const nexts = () => {
  console.log(pageNum.value);
  getlist();
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
</script>
<style lang="scss">
.industryTrends-box {
  margin-bottom: 20px;
}
</style>
