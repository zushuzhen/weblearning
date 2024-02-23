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
  title: "党建工作",
  wasp: "Party Construction",
  banner: "/static/images/dj.jpg", //banner图片
});
const Akey = ref('partybuilding')
</script>
<style lang="scss"></style>
