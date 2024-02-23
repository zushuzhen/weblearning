<template>
  <div>
    <banners :bannerQuery="bannerQuery"></banners>
    <ABmodule :nav-key="Akey" :show-title="true" :model-style="true"></ABmodule>
  </div>
</template>
<script setup name="contactUs">
import {ref, onMounted, reactive, watch} from "vue";
import banners from "../subpageHeader.vue";
import ABmodule from "../ABmodule/Amodule.vue"

const bannerQuery = reactive({
  title: "人力资源",
  wasp: "Human Resources",
  banner: "/static/images/people.jpg", //banner图片
});
const Akey = ref('people')
</script>
<style lang="scss"></style>
