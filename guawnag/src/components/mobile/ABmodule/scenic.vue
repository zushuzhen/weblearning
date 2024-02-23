<template>
  <div>
    <div class="scenic-box">
      <div class="scenicfield">
        <van-field v-model="fieldValue" is-link readonly placeholder="选择" @click="showPicker = true"/>
      </div>
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker :columns="poptablist" @cancel="showPicker = false" @confirm="subClickTab"/>
      </van-popup>
      <bigtitle :title="fieldValue"></bigtitle>
      <div>
        <div class="backgroundbox">
          <van-image :src="Scenery.imgurls" class="meetingimg" fit="cover" position="center"/>
          <div class="description" v-html="Scenery.description"></div>
          <div class="flexev" v-if="fieldValue=='青岛奥林匹克帆船中心'">
            <div class="buttonbox">
              <van-button type="primary" class="text" @click="phoneBtn">
                <i class="iconfont iconSize">&#xe6c1;</i>游客中心讲解预约
              </van-button>
            </div>
            <div class="buttonbox">
              <van-button type="primary" class="text" @click="phoneBtn">
                <i class="iconfont iconSize">&#xe76a;</i>景区观光车预约
              </van-button>
            </div>
          </div>
        </div>
      </div>
      <bigtitle :title="'景点介绍'"></bigtitle>
      <div v-for="(item, index) in list" :key="item">
        <div class="backgroundbox">
          <van-image v-if="item.img[0]?.url" :src="item.img[0]?.url" class="meetingimg" fit="cover" position="center"/>
          <van-image v-else src="/static/images/defalut.png" class="meetingimg" fit="cover" position="center"/>
          <div class="bigtitle">
            {{ item.title }}
          </div>
          <div class="datatitle">
            {{ item.summary }}
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model:show="byShowscenic" round closeable class="phpopups">
      <div class="popuptitle">预约</div>
      <div class="popupline-height">预约电话：<span style="color: #0c5cd6">（0532）5861 7777</span></div>
    </van-popup>
  </div>
</template>
<script setup name="scenic">
import bigtitle from "../title.vue"
import {get} from "@/utils/request.js";
import {ref, onMounted, defineProps, watchEffect, nextTick} from "vue";

const children = ref([])
const Scenery = ref({})
const byShowscenic = ref(false)
const props = defineProps(["cmpData"]);
const list = ref("");
const fieldValue = ref('')//选择框内容
const showPicker = ref(false)//弹窗
const poptablist = ref([])//弹窗列表
onMounted(() => {
  children.value = props.cmpData.children
  Scenery.value = props.cmpData.children[0]
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
  };
  get("/cms/article/list", data).then((res) => {
    console.log(res)
    list.value = res.rows;
  });
};
// 弹窗点击事件
const subClickTab = (val) => {
  console.log(val.selectedOptions[0].value)
  fieldValue.value = val.selectedOptions[0].text
  children.value.map(item => {
    if (val.selectedOptions[0].value == item.id) {
      Scenery.value = item
    }
  })
  getlist(val.selectedOptions[0].value);
  showPicker.value = false
}
//
const phoneBtn = () => {
  byShowscenic.value = true
}
</script>

<style scoped lang="scss">
.scenic-box {
  padding: 0 20px 20px 20px;

  .scenicfield {
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

.backgroundbox {
  padding-bottom: 15px;
  border-radius: 10px;
  background: #f7f7f7;
  margin-bottom: 20px;

  .description {
    padding: 10px;
    color: #666 !important;
    font-size: 14px !important;
    line-height: 28px !important;
    overflow-wrap: break-word !important;
    text-align: justify !important;

    :deep(p) {
      padding: 0 !important;
      margin: 0 !important;
      color: #666 !important;
      font-size: 14px !important;
      line-height: 28px !important;
      overflow-wrap: break-word !important;
      text-align: justify !important;
    }
  }

  .meetingimg {
    width: 100%;
    height: 200px;
  }

  .bigtitle {
    padding: 10px 0 0 10px;
    font-weight: bolder;
    font-size: 16px;
    line-height: 28px;
    color: #333;
  }

  .datatitle {
    color: #666;
    padding: 10px;
    font-size: 14px;
    line-height: 28px;
    overflow-wrap: break-word;
    text-align: justify;
  }

  .time {
    color: #666;
    font-size: 14px;
    padding-left: 10px;

    .iconfont {
      font-size: 14px;
    }
  }

  .address {
    color: #666;
    font-size: 14px;
    padding: 5px 10px;

    .iconfont {
      font-size: 14px;
      color: #666;
    }
  }

  .buyline {
    font-size: 14px;
    color: #0c5cd6;
    padding-left: 10px;
    margin-top: 10px;
  }

  .flexev {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .buttonbox {
      margin-top: 10px;
      display: flex;
      justify-content: center;

      :deep(.van-button--primary) {
        background: #0c5cd6;
        border: none !important;
      }

      .text {
        white-space: nowrap;
        font-size: 14px;
        padding: 5px 10px;
        display: flex;
        .iconSize{
          font-size: 14px;
          margin-right: 5px;
        }
      }
    }
  }
}

.phpopups {
  width: 80%;
  padding: 20px;

  .popuptitle {
    text-align: center;
    font-size: 16px;
  }

  .popupline-height {
    margin-top: 20px;
    font-size: 16px;
    line-height: 28px;
    text-align: center;
  }
}
</style>
