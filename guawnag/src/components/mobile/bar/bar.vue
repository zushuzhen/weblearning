<template>
  <div>
    <banners :bannerQuery="bannerQuery"></banners>
    <ABmodule :nav-key="Akey" :show-title="true" :model-style="true"></ABmodule>
  </div>
</template>
<script setup name="bar">
import {ref} from "vue";
import banners from "../subpageHeader.vue";
import ABmodule from "../ABmodule/Amodule.vue"
const bannerQuery = ref({
  title: "核心主业",
  wasp: "Core Business",
  banner: "/static/images/principal.jpg", //banner图片
});
const Akey = ref('funcBar')
</script>
