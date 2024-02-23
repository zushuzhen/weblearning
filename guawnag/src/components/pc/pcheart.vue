<template>
  <div>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect">
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="3" disabled>Info</el-menu-item>
      <el-menu-item index="4">Orders</el-menu-item>
    </el-menu>
  </div>
</template>
<script setup>
import {ref, onMounted, defineProps, toRefs} from "vue";
import $bus from "@/utils/bus.js";

const {navList} = toRefs(props);
const activeIndex = ref('1')
onMounted(()=>{
  const tokenFromLocalStorage = localStorage.getItem('token');
  console.log(tokenFromLocalStorage)
  if(tokenFromLocalStorage){
    window.location.href = './login.html'
  }
})
const onClickTab = (res) => {

};
</script>
<style scoped lang="scss">

</style>