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
  title: "关于我们",
  wasp: "About Us",
  banner: "/static/images/abotu.jpg", //banner图片
})
const Akey = ref('about')
</script>
<style lang="scss"></style>
