<template>
  <div>
    <titileBus :title="cmpData.name"></titileBus>
    <div style="padding: 0 200px 100px;" v-html="articleList?articleList.content:''"></div>
  </div>
</template>

<script setup>
import {ref,reactive ,watch,onMounted} from "vue"
import titileBus from "@/components/title.vue";
import {get} from "../../utils/request";

const props = defineProps(["cmpData", "curNav"]);
const articleList=ref({})
watch(
  () => props.curNav,
  (value) => {
        console.log(1);
  }
);
let data = {
  categoryId: props.cmpData.id,
  status: "publish",
};
function query() {
  get("/cms/article/list",data).then((res) => {
    articleList.value = res.rows[0]
  })
}

onMounted(() => {
  query();
})
</script>

<style lang="scss" scoped></style>
