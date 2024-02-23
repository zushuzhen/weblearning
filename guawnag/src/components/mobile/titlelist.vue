<template>
  <div>
    <div class="new-box">
      <div v-for="(item, index) in list" :key="index">
        <div @click="navto(item, index)" class="flex">
          <van-image fit="cover" :src="item.img[0].url" class="new-img" />
          <div class="box">
            <div class="titlee">{{ item.title }}</div>
            <div class="texts">{{ item.summary }}</div>
            <div class="flex-center">
              <van-tag size="large" class="tag-news">{{ "热点新闻" }}</van-tag>
              <div style="text-align: left">
                {{ formatDate(item.publishtime, "all") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup name="pressCenter">
import { reactive, ref, defineProps, onMounted, watch } from "vue";
import { formatDate } from "@/utils/time.js";
const list = ref([]);

const props = defineProps(["list"]);
onMounted(async () => {});
watch(() => {
  if (props?.list) {
    list.value = props.list;
  }
});
</script>
<style lang="scss">
.new-box {
  padding: 0 20px 20px 20px;
}
.flex {
  display: flex;
  margin-bottom: 15px;
  .new-img {
    border-radius: 5%;
    height: 80px;
    width: 30%;
    margin-right: 10px;
  }
  .box {
    width: 60vw;
    .titlee {
      text-align: left;
      font-family: Medium;
      color: black;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .texts {
      margin: 5px 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 2;
    }
    .flex-center {
      display: flex;
      align-items: center;
      .tag-news {
        background: #f3f3f3;
        color: #0c5cd6;
        font-weight: 400;
        font-size: 12px;
        padding: 5px;
        margin-right: 15px;
      }
    }
  }
}
</style>
