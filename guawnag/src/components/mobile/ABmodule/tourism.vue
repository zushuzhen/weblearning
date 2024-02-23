<template>
  <div class="tourismbox">
    <bigtitle :title="name"></bigtitle>
    <div v-for="(item, index) in meetinglist" :key="item">
      <div class="backgroundbox">
        <van-image
            v-if="item.img[0]?.url"
            :src="item.img[0]?.url"
            class="meetingimg"
            fit="cover"
            position="center"
        />
        <van-image
            v-else
            src="/static/images/defalut.png"
            class="meetingimg"
            fit="cover"
            position="center"
        />
        <div class="bigtitle">
          {{ item.title }}
        </div>
        <div class="datatitle">
          {{ item.summary }}
        </div>
        <div class="time">
          <span><i class="iconfont" style="font-size: 14px; margin-right: 6px; color:#666">&#xe85f;</i>联系电话：</span>
          {{ item.contact }}
        </div>
        <div class="address" v-if="item.contact" style="margin-top: 3px">
          <span><i class="iconfont" style="font-size: 14px; margin-right: 6px; color:#666">&#xe76f;</i>位置：</span>
          {{ item.pageTitle }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import bigtitle from "../title.vue";
import {
  reactive,
  ref,
  onMounted,
  toRefs,
  watchEffect,
  defineProps,
} from "vue";
import {get, gettree} from "@/utils/request.js";
import {formatDate} from "@/utils/time.js";

const name = ref("文旅");
const meetinglist = ref([]);
const props = defineProps(["cmpData", "curNav"]);
onMounted(() => {
  getDetail(props.cmpData.id);
});
//获取详情
const getDetail = (id) => {
  //文章模板---获取内容信息
  let data = {
    categoryId: id,
    status: "publish",
  };
  get("/cms/article/list", data).then((res) => {
    meetinglist.value = res.rows;
  });
};
</script>
<style scoped lang="scss">
.tourismbox {
  margin: 0 20px 20px 20px;

  .backgroundbox {
    padding-bottom: 15px;
    border-radius: 10px;
    background: #f7f7f7;
    margin-bottom: 20px;

    .meetingimg {
      width: 100%;
      height: 200px;
    }

    .bigtitle {
      color: #333;
      padding: 10px 0 0 10px;
      font-weight: bolder;
      font-size: 16px;
      line-height: 28px;
    }

    .datatitle {
      overflow-wrap: break-word;
      text-align: justify;
      color: #666;
      padding: 10px;
      font-size: 14px;
      line-height: 28px;
    }

    .time {
      color: #666;
      padding: 5px 0 0 10px;
      font-size: 14px;
      .iconfont {
        color: #666;
        font-size: 14px;
      }
    }
    .address {
      color: #666;
      padding: 0 0 0 10px;
      font-size: 14px;
      .iconfont {
        color: #666;
        font-size: 14px;
      }
    }

    .buttonbox {
      margin: 0 auto;
      display: flex;
      justify-content: center;
    }
  }
}


</style>
