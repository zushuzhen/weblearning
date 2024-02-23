<template>
  <div style="margin: 1px 15px 10px 15px">
    <div v-if="props.modelStyle">
      <van-tabs v-model:active="subactive" @click-tab="onClickTab">
        <van-tab v-for="subitem in navList" :key="subitem" :title="subitem.name">
          <bigtitle v-if="props.showTitle" :title="subitem.name"></bigtitle>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script setup>
import {ref, onMounted, defineProps, toRefs} from "vue";
import $bus from "@/utils/bus.js";
import bigtitle from "./title.vue";
const subactive = ref("0");
const props = defineProps(["modelValue", "navList", "modelStyle", "showTitle"]);
const emit = defineEmits(["update:modelValue"]);
const {navList} = toRefs(props);
const urlHash = ref("");
onMounted(() => {
  urlHash.value = window.location.hash.replace("#", "");
  $bus.on("subactive", (val) => {
    subactive.value = val.subactive;
  });
});
const onClickTab = (res) => {
  if (res.title == "招采信息") {
    window.location.href = 'https://app.51qqt.com/qingdaotourism/portal/#/login'
  } else {
    navList.value.map((item, index) => {
      if (index == subactive.value) {
        emit("update:modelValue", item);
        if (item.url) {
          window.location.href = `${item?.url}`;
        }
      }
    });
  }
};
</script>

<style scoped lang="scss">
:deep(.van-tabs__nav) {
  white-space: nowrap !important;
  overflow-x: auto !important;
}

:deep(.van-tabs--line .van-tabs__wrap) {
  height: 45px !important;
}

:deep(.van-tab--shrink) {
  padding: 0 10px !important;
}

:deep(.van-tab--active) {
  font-weight: 600;
  color: #0c5cd6;
}

:deep(.van-tab) {
  font-size: 14px;
  border-bottom: 1px solid #e8e8e8 !important;
}

:deep(.van-tabs__line) {
  background: none !important;
}

:deep(.van-tab__text--ellipsis) {
  font-weight: bold;
  overflow: visible !important;
}
.swipe-icon {
  padding: 20px 20px;
  box-sizing: border-box;
  border-radius: 10px;
  background: #fff;
  z-index: 9;
  left: calc(100vw - 95%);

  .swiper-slidebox {
    display: flex;
    background: #fff;
    height: 100%;

    .felx {
      height: 100%;

      .text-center {
        text-align: center;
        font-size: 14px;
        padding-top: 8px;
      }

      .iconfont {
        font-size: 30px;
        text-align: center;
        margin: 0 auto;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
