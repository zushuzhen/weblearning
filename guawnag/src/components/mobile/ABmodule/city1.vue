<template>
  <div class="introduction">
    <div class="subtabs">
      <!--      <van-tabs v-model:active="subactive" type="card">-->
      <!--        <van-tab v-for="item in tabs" :key="item" :title="item.title">-->
      <!--        </van-tab>-->
      <!--      </van-tabs>-->
      <div class="cityy">
        <van-field v-model="fieldValue" is-link readonly placeholder="选择" @click="showPicker = true"/>
      </div>
      <div class="videolisttop">
        <bititle :title="content.title"/>
        <div v-html="content.content" class="datacontent"></div>
        <van-image v-if="content?.img?.length!=0" v-for="ite in content.img" :key="ite" :src="ite.url"
                   style="margin-bottom: 20px"/>
        <div class="vr" v-if="content.jumpurl" @click="vrbtn(content.jumpurl)">
          <i class="iconfont" style="color: #0c5cd6;margin-right:7px">&#xe64a;</i><span
            style="text-decoration: underline;">查看VR</span></div>
      </div>
    </div>
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker :columns="corporationlist" @cancel="showPicker = false" @confirm="vantabs"/>
    </van-popup>
  </div>
</template>

<script setup name="introduction">
import bititle from '../title.vue'
import {ref, onMounted, defineProps} from "vue";
import {get} from "@/utils/request.js";

const props = defineProps(["cmpData"]);
const tabs = ref([]);
// const subactive = ref(0)
const showPicker = ref(false)//展示弹窗
const corporationlist = ref([])//弹窗pick列表
const content = ref({})//内容
const fieldValue = ref('')
onMounted(() => {
  let data = {
    categoryId: props.cmpData.id,
    status: "publish",
    params: {
      containSub: true,
    },
  };
  get(`/cms/article/list`, data).then((res) => {
    tabs.value = res.rows.slice().reverse();
    content.value = tabs.value[0]
    fieldValue.value = tabs.value[0].title
    corporationlist.value = tabs.value.map(item => {
      return {
        text: item.title,
        value: item.id
      }
    })
  });
});
const vantabs = (res) => {
  tabs.value.map((item, index) => {
    if (res.selectedOptions[0].value == item.id) {
      content.value = item
      fieldValue.value = item.title
    }
  })
  showPicker.value = false
}
const vrbtn = (res) => {
  window.location.href = res
}
</script>
<style scoped lang="scss">
.vr {
  color: #0c5cd6;
  text-align: center;
  font-size: 14px;
}

.subtabs {


  .van-tabs__nav {
    white-space: nowrap !important;
    overflow-x: auto !important;
  }

  .van-tabs--line .van-tabs__wrap {
    height: 45px !important;
  }

  .van-tab--shrink {
    padding: 0 10px !important;
  }

  .van-tabs__wrap {
    border: none !important;
  }

  .van-tab--card .van-tab--active {
    max-width: 30vw;
    font-weight: 600;
    color: #0c5cd6;
    border: none !important;
  }

  .van-tab {
    font-size: 14px;
  }

  .van-tabs__line {
    background: none !important;
  }
}

.datacontent {
  font-size: 14px;
  line-height: 28px;
  text-indent: 2em;

  p {
    padding: 0;
    margin: 0;
  }
}

.cityy {
  margin-bottom: 20px;

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

</style>
