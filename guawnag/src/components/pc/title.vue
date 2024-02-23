<template>
  <div>
    <div class="boxtitle">
      <div class="box-top">{{ prop.title }}</div>
      <div class="box-bottom"></div>
    </div>
  </div>
</template>

<script setup>
let prop = defineProps({ title: String });
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
.boxtitle {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 60px 0px 80px;
  .box-top {
    font-size: 28px;
    padding-bottom: 16px;
    font-weight: bold;
    font-family: Medium;
    color: #333;
  }

  .box-bottom {
    width: 52px;
    height: 0;
    border-top-color: #0c5cd6;
    border-top-width: 8px;
    border-top-style: solid;
    border-right: 6px solid rgba(0, 0, 0, 0);
  }
}
</style>
