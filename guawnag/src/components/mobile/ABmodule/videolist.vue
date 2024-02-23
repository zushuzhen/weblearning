<template>
  <div>
    <div class="video-box">
      <div class="videofield">
        <van-field v-model="fieldValue" is-link readonly placeholder="选择"
                   @click="showPicker = true"/>
      </div>
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker
            :columns="poptablist"
            @cancel="showPicker = false"
            @confirm="subClickTab"
        />
      </van-popup>
      <videolist :list="list"></videolist>
      <van-pagination
          v-if="list.length!=0"
          v-model="pageNum"
          :total-items="total"
          :items-per-page="pageSize"
          :show-page-size="4"
          force-ellipses
          @change="nexts"
      >
        <template #prev-text>
          <van-icon name="arrow-left" @click="nexts"/>
        </template>
        <template #next-text>
          <van-icon name="arrow" @click="nexts"/>
        </template>
      </van-pagination>
    </div>
  </div>
</template>

<script setup name="pressCenter">
import newlist from "../newslist.vue";
import videolist from '../videolist.vue'
import {get} from "@/utils/request.js";
import {ref, onMounted, defineProps, watchEffect, nextTick} from "vue";

const props = defineProps(["cmpData"]);
const list = ref("");
const pageNum = ref(1); //当前页码
const pageSize = ref(10); //分页大小
const total = ref(10);
const fieldValue = ref('')//选择框内容
const showPicker = ref(false)//弹窗
const poptablist = ref([])//弹窗列表
onMounted(() => {
  fieldValue.value = props.cmpData.children[0].name
  poptablist.value = props.cmpData.children.map(item => {
    return {
      value: item.id,
      text: item.name
    }
  })
  getlist(props.cmpData.children[0].id);
});
const getlist = async (id) => {
  let data = {
    categoryId: id,
    status: "publish",
    pageSize: pageSize.value,
    pageNum: pageNum.value,
  };
  await get(`/cms/videos/list`, data).then((res) => {
    list.value = res.rows;
    total.value = res.total;
  });
};
//跳转详情页
const nexts = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

// 弹窗点击事件
const subClickTab = (val) => {
  fieldValue.value = val.selectedOptions[0].text
  getlist(val.selectedOptions[0].value);
  showPicker.value = false
}
</script>

<style lang="scss">
.video-box {
  padding: 0 20px 20px 20px;

  .videofield {
    padding-bottom: 20px;

    .van-cell {
      color: hsla(0, 0%, 100%, 0.6) !important;
      background: #fff !important;
      border: 1px solid #eee !important;
      position: static !important;
    }

    .van-cell {
      display: flex;
      align-items: center;
    }
  }
}
</style>
