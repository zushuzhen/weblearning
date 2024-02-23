<template>
  <div style="margin: 1px 15px 10px 15px">
    <div class="tabicon">
      <van-tabs v-model:active="subactive" @click-tab="onClickTab" style="border: none !important;">
        <van-tab v-for="(item,index) in navList" :key="item" style="border: none !important;height: 100px !important">
          <template #title>
            <div class="felx" @click="onClickTab(item)">
              <i class="iconfont" :style="{color:`${index==subactive?'#0c5cd6':'#333'} !important` }"
                 v-html="item.icon"></i>
              <div class="text-center" :style="{color:`${index==subactive?'#0c5cd6':'#333'} !important`}">{{item.name}}</div>
            </div>
          </template>
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
  height: 75px !important;
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
}

:deep(.van-tabs__line) {
  background: none !important;
}

:deep(.van-tab__text--ellipsis) {
  font-weight: bold;
  overflow: visible !important;
}

.tabicon {
  padding: 20px 2px 10px 2px;
}

.felx {
  height: 100%;
  text-align: center;
  font-size: 14px;
  padding-top: 8px;
}

.iconfont {
  font-weight: 400;
  font-size: 30px;
  text-align: center;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.text-center {
  text-align: center;
  font-size: 14px;
  padding-top: 8px;
}
</style>
