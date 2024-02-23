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
  title: "品牌和企业文化",
  wasp: "Brand And Culture",
  banner: "/static/images/pinpai.jpg", //banner图片
});
const Akey = ref('culture')
</script>
<style lang="scss"></style>
