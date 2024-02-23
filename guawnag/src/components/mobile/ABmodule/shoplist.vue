<template>
  <div>
    <bigtitle :title="names"></bigtitle>
    <div class="bar">
      <van-tabs v-model:active="obj.active" @click-tab="onClickTab">
        <van-tab v-for="item in classtion" :key="item" :title="item.name">
          <shoplist :goodMallList="goodMallList"></shoplist>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script setup>
import bigtitle from "../title.vue";
import shoplist from "../shoplist.vue";
import {ref, reactive, onMounted} from "vue";
import axios from "axios";

const names = ref('商品')
const props = defineProps(["cmpData", "topNav"]);
const obj = reactive({
  dialogVisible: false,
  active: 0,
  idArr: [42, 95, 101, 43, 227,],
  other: [102, 105],
  literatureList: [],
  listOtherList: [],
});
const classtion = ref([
  {id: 1, name: "奥帆帆专栏"},
  {id: 2, name: "纪念品"},
  {id: 3, name: "国粹精品"},
  {id: 4, name: "青免国际"},
]);
const id = ref(2);
const goodMallList = ref([]);
const fivelist = ref([]);//存储[42, 95, 101, 43, 227]
const otherlist = ref([]);//存储[102, 105]
onMounted(() => {
  getshoping();
});
const getshoping = () => {
  axios
      .get(
          "https://merchant.qosmcareas.com/api/ecmall/shop_list_label?keyword=&label_id=" +
          id.value
      )
      .then((res) => {
        if (id.value == 2 && id.value != 4) {
          // 删除id为[42, 95, 101, 43, 227]的数据 赋值给goodMallList
          goodMallList.value = res.data.data.filter(
              (item) => !obj.idArr.includes(item.id)
          );
          //取出id为[42, 95, 101, 43, 227]的数据赋值给fivelist
          fivelist.value = res.data.data.filter((item) =>
              obj.idArr.includes(item.id)
          );
        } else if (id.value == 4) {
          goodMallList.value = res.data.data;
        } else if (id.value == 3) {
          // 删除id为[102, 105]的数据 赋值给goodMallList
          goodMallList.value = res.data.data.filter(
              (item) => !obj.other.includes(item.id)
          );
          //取出id为[102, 105]的数据赋值给fivelist
          otherlist.value = res.data.data.filter((item) =>
              obj.other.includes(item.id)
          );
        }
      });
};
const onClickTab = (res) => {
  if (res.name == 0) {
    id.value = 2;//文创
    getshoping();
  } else if (res.name == 1) {
    id.value = 4;//纪念品
    getshoping();
  } else if (res.name == 2) {
    // 定义要执行的两个 id
    const id1 = 1;//瓷器
    const id2 = 3//其他
    const id3 = 2;//文创
    // 定义一个异步函数，用于执行 getshoping() 并返回结果
    const executeGetShoping = async (id) => {
      const response = await axios.get(
          "https://merchant.qosmcareas.com/api/ecmall/shop_list_label?keyword=&label_id=" +
          id
      );
      return response.data.data;
    };
    // 使用 Promise.all 并行执行两个异步函数
    Promise.all([executeGetShoping(id1), executeGetShoping(id2), executeGetShoping(id3)])
        .then((results) => {
          // 在这里处理1;//瓷器
          const result1 = results[0];
          // 合并结果或执行其他逻辑
          goodMallList.value = result1.concat(fivelist.value).concat(otherlist.value);
        })
        .catch((error) => {
          // 处理错误
          console.error("Error:", error);
        });
  } else if (res.name == 3) {
    id.value = 3;//其他
    getshoping();
  }
};
</script>
<style lang="scss">
.van-tab {
  font-size: 14px;
}

.van-tabs--line .van-tabs__wrap {
  height: 45px !important;
}

.van-tab__text--ellipsis {
  overflow: visible !important;
}

.van-tab--active {
  color: #004898 !important;
  font-weight: 600;
}

.van-tabs__line {
  width: 60px;
  background: linear-gradient(
          90deg,
          #e60012,
          #ea5703,
          #f39800,
          #b0cb03,
          #6ab935,
          #01af7f,
          #0082cb,
          #0d6fb8,
          #2b328e
  ) !important;
}

.van-tabs__wrap {
  border-bottom: none !important;
}

.van-tabs__nav {
  white-space: nowrap !important;
  overflow-x: auto !important;
}

.bar {
  padding: 0 20px 20px 20px;
}
</style>
