<template>
  <div class="otherfunbox">
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
          <span>
            <i class="iconfont" style="  margin-right: 6px; color:#666">&#xe834;</i>开放时间：</span>
          {{ item.pageDescription }}
        </div>
        <div class="address">
          <span><i class="iconfont" style="  margin-right: 6px; color:#666">&#xe76f;</i>景点位置：</span>
          {{ item.pageTitle }}
        </div>
        <!--        <div class="buyline">-->
        <!--                <span><i class="iconfont" style="  margin-right: 6px; color:#0c5cd6">&#xe61f;</i>-->
        <!--                  <span style="text-decoration: underline; cursor: pointer"-->
        <!--                        @click="traShow = true">预约须知</span></span>-->
        <!--        </div>-->
        <div class="buttonbox">
          <van-button type="primary" class="text" @click=" goPurchase(item, index)">立即购买</van-button>
        </div>
        <van-popup v-model:show="traShow" round closeable class="popups">
          <div class="popustitle">预约须知</div>
          <div class="popupsline-height">
            <br/>1.购票规则：游船购票实行实名制，请持身份证购票、验票登船。<br/>
            2.检票时间：开航前20分钟开始检票，开航前5分钟停止检票。<br/>
            3.注意事项：游船班次以当日公示为准，如遇天气、风浪等不可抗力因素无法乘船，造成不便敬请谅解。详情请关注“奥帆海洋文化旅游区一票通”官方小程序。购买奥帆中心往返崂山风景区航线船票时，请提前拨打客服专线进行预约。
          </div>
        </van-popup>
        <van-popup v-model:show="byShow" round closeable class="phpopups">
          <div class="popuptitle">购买</div>
          <van-image :src="byShowphoto" class="imgpo" fit="cover"
                     position="center"></van-image>
          <div class="popupline-height">
            您可以扫描二维码线上购买
          </div>
        </van-popup>
      </div>
    </div>
  </div>
</template>
<script setup>
import bigtitle from "../title.vue";
import {reactive, ref, onMounted, toRefs, watchEffect, defineProps,} from "vue";
import {get, gettree} from "@/utils/request.js";
import {formatDate} from "@/utils/time.js";

const name = ref("购票");
const meetinglist = ref([]);
const props = defineProps(["cmpData", "curNav"]);
const traShow = ref(false)
const byShow = ref(false)
const byShowphoto = ref('')
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
const goPurchase = (item, index) => {
  byShow.value = true
  byShowphoto.value = item.img[1].url
  console.log(item.img[1].url)
}
</script>
<style scoped lang="scss">
.iconfont {
  font-size: 14px;
}

.otherfunbox {
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

    .buttonbox {
      margin-top: 10px;
      display: flex;
      justify-content: center;

      :deep(.van-button--primary) {
        background: #0c5cd6;
        border: none !important;
      }

      .text {
        width: 50%;
        font-size: 14px;
        padding: 5px 10px;
      }
    }
  }
}


.popups {
  width: 80%;
  height: 400px;
  padding: 20px;

  .popustitle {
    text-align: center;
    font-size: 16px;
  }

  .popupsline-height {
    font-size: 14px;
    line-height: 28px;
  }

  .popupsline {
    font-size: 14px;
    line-height: 28px;
    text-align: center;
  }
}

.phpopups {
  width: 90%;
  padding: 20px;

  .popuptitle {
    text-align: center;
    font-size: 16px;
  }

  .imgpo {
    width: 70%;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    justify-content: center;
  }

  .popupline-height {
    font-size: 14px;
    line-height: 28px;
    text-align: center;
  }
}
</style>
