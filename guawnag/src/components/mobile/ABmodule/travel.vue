<template>
  <div class="meetingbox">
    <bigtitle :title="names"></bigtitle>
    <van-tabs v-if="seekNav.length>0" v-model:active="active" @click-tab="onClickTab">
      <van-tab v-for="item in seekNav" :key="item" :name="item.value" :title="item.text"></van-tab>
    </van-tabs>
    <div>
      <div class="backgroundbox" v-for="(item,index) in  productlist" :key="item">
        <van-image :src="item.img[0].url" class="meetingimg" fit="cover" position="center"/>
        <div class="bigtitle">{{ item.title }}</div>
        <div class="bigtitlebtn">
          <button plain type="primary" size="small" @click="navtopage(item,index)" class="buttonm">查看详情</button>
        </div>
      </div>
    </div>
    <bigtitle :title="name"></bigtitle>
    <div v-for="item in meetinglist" :key="item">
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
        <div class="address">
          <span>
            <i class="iconfont" style="font-size: 14px; margin-right: 6px; color:#666">&#xe85f;</i>
            联系电话：</span>{{ item.contact }}
        </div>
        <!--        <div class="time">-->
        <!--          <span>-->
        <!--            <i class="iconfont" style="font-size: 14px; margin-right: 6px; color:#666">&#xe834;</i>-->
        <!--            开放时间：-->
        <!--          </span> {{ item.pageDescription }}-->
        <!--        </div>-->
        <!--        <div class="buyline">-->
        <!--                <span><i class="iconfont" style="font-size: 14px; margin-right: 6px; color:#0c5cd6">&#xe61f;</i>-->
        <!--                  <span style="text-decoration: underline; cursor: pointer"-->
        <!--                        @click="buyShow = true">预约须知</span></span>-->
        <!--        </div>-->
        <!--        <div class="buttonbox">-->
        <!--          <van-button type="primary" @click="byShow = true">线上预约</van-button>-->
        <!--        </div>-->
        <van-popup v-model:show="buyShow" round closeable class="popup">
          <div class="popuptitle">购买须知</div>
          <div class="popupline-height">
            <br/> 1.购票规则：游船购票实行实名制，请持身份证购票、验票登船。<br/>
            2.检票时间：开航前20分钟开始检票，开航前5分钟停止检票。<br/>
            3.注意事项：游船班次以当日公示为准，如遇天气、风浪等不可抗力因素无法乘船，造成不便敬请谅解。详情请关注“奥帆海洋文化旅游区一票通”官方小程序。购买奥帆中心往返崂山风景区航线船票时，请提前拨打客服专线进行预约。
          </div>
        </van-popup>
        <van-popup v-model:show="byShow" round closeable class="phpopups">
          <div class="popuptitle">预约</div>
          <van-image src="/static/images/buywx.jpg" class="imgpo" fit="cover"
                     position="center"></van-image>
          <div class="popupline-height">
            您可以扫描二维码线上预约
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
import {Popup} from 'vant';

const names = ref("旅行");
const name = ref("旅行产品");
const meetinglist = ref([]);
const props = defineProps(["cmpData", "curNav"]);
const buyShow = ref(false)
const byShow = ref(false)
const seekNav = ref([])//tab列表
const active = ref('')
const productlist = ref([])
onMounted(() => {
  seekNav.value = props.cmpData.children.splice(0, 2).map(item => {
    return {
      value: item.id,
      text: item.name
    }
  })
  active.value = seekNav.value[0].value
  getDetail(seekNav.value[0].value);
  getbottom(props.cmpData.children[0].id)
});
//获取详情
const getDetail = (id) => {
  //文章模板---获取内容信息
  let data = {
    categoryId: id,
    status: "publish",
  };
  get("/cms/article/list", data).then((res) => {
    productlist.value = res.rows;
  });
};
//获取旅行产品详情
const getbottom = (id) => {
  let data = {
    categoryId: id,
    status: "publish",
  };
  get("/cms/article/list", data).then((res) => {
    meetinglist.value = res.rows;
  });
};
const onClickTab = (val) => {
  getDetail(val.name)
}
const navtopage = (item) => {
  window.location.href = "./newsSubpage.html?id=" + `${item.id}`;
};
</script>
<style scoped lang="scss">
:deep(.van-button ) {
  background: none;
}

.iconfont {
  font-size: 14px;
}

.meetingbox {
  margin: 0 20px 20px 20px;
}

.backgroundbox {
  margin: 20px 0;
  border-radius: 10px;
  background: #f7f7f7;
  padding-bottom: 10px;

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

  .bigtitlebtn {
    color: #333;
    margin-right: 10px;
    display: flex;
    justify-content: flex-end;
    text-align: right;

    .buttonm {
      font-size: 14px;
      border-radius: 5px;
      padding: 7px 15px;
      color: #0c5cd6;
      border: 1px solid #0c5cd6;
      background: #f7f7f7;
    }
  }

  .datatitle {
    overflow-wrap: break-word;
    text-align: justify;
    color: #666;
    margin: 10px;
    font-size: 14px;
    line-height: 28px;
  }

  .address {
    padding: 0 0 10px 10px;
    color: #666;
    font-size: 14px;

    .iconfont {
      font-size: 14px;
      color: #666;
    }
  }

  .buttonbox {
    margin: 0 auto;
    display: flex;
    justify-content: center;

    .text {
      font-size: 14px;
      padding: 5px 10px;
    }
  }
}

.popup {
  width: 80%;
  height: 400px;
  padding: 20px;

  .popuptitle {
    text-align: center;
    font-size: 16px;
  }

  .popupline-height {
    font-size: 14px;
    line-height: 28px;

  }

}

.phpopups {
  width: 80%;
  height: 300px;
  padding: 20px;

  .popuptitle {
    text-align: center;
    font-size: 16px;
  }

  .imgpo {
    width: 150px;
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

.van-image__img {
  border-radius: 10px 10px 0 0;
}
</style>
