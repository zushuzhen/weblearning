<template>
  <div>
    <banners :bannerQuery="bannerQuery"></banners>
    <ABmodule :nav-key="Akey" :show-title="false" :model-style="true"></ABmodule>
  </div>
</template>
<script setup name="contactUs">
import {ref, onMounted, reactive, watch} from "vue";
import banners from "../subpageHeader.vue";
import ABmodule from "../ABmodule/Amodule.vue"
const bannerQuery = ref({
  title: "岛城印象",
  wasp: "Island City Impression",
  banner: "/static/images/cityHome.jpg", //banner图片
});
const Akey = ref('Islandcity')
</script>
<style lang="scss"></style>
