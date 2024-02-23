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

const bannerQuery = ref({
  active: 1, //一级导航高亮
  title: "热点新闻",
  wasp: "Hot News",
  banner: "/static/images/childbanner.jpg", //banner图片
});const Akey=ref('hotnew')
</script>
<style lang="scss"></style>
