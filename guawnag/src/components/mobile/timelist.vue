<template>
  <div v-if="list.length != 0">
    <div v-for="(item, index) in list" :key="index" class="timelist-box" @click="navtopage(item, index)">
      <div class="flex-start">
        <div class="background">
          <div class="daytitle">{{ formatDate(item.publishtime, "date") }}</div>
          <div class="datatitle">
            {{ formatDate(item.publishtime, "yarn") }}
          </div>
        </div>
        <div class="rightbox">
          <div class="title">{{ item.title }}</div>
          <div class="data">{{ (item.summary != "\t\t\t\t\t\r\n\t\t\t\t") && item.summary?item.summary:'筑梦想，赢未来' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup name="pressCenter">
import { reactive, ref, defineProps, onMounted, watchEffect } from "vue";
import { formatDate } from "@/utils/time.js";

const list = ref([]);
const props = defineProps(["list"]);
onMounted(async () => {
});
watchEffect(() => {
  if (props?.list) {
    list.value = props.list;
  }
});
const navtopage = (item) => {
  window.location.href = './newsSubpage.html?id=' + `${item.id}`
}
</script>
<style lang="scss">
.timelist-box {
  margin: 0 20px 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7f7f7;

  .flex-start {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f7f7f7;

    .background {
      background: #d8dae6;
      height: 70px;
      width: 70px;
      text-align: center;
      line-height: 28px;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-right: 10px;
      padding: 0 10px;

      .daytitle {
        font-size: 20px;
        font-weight: 500;
        font-family: Medium;
        font-weight: bold;
      }

      .datatitle {
        font-size: 14px;
      }
    }

    .rightbox {
      padding-bottom: 10px;

      .title {
        padding-top: 10px;
        width: 60vw;
        line-height: 20px;
        font-size: 16px;
        font-weight: 700;
        font-family: Medium;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color:#333;
      }

      .data {
        color:#666;
        width: 60vw;
        margin-top: 10px;
        font-size: 14px;
        color: #6c6c6c;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 1;
      }
    }
  }

  .righticon {
    width: 13px;
    margin-right: 10px;
  }

  .more {
    margin: 0 20px;
    padding: 15px;
    font-size: 14px;
    text-align: center;
    border: 1px solid #bfbfbf;
  }
}
</style>
