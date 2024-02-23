<script setup>
import titileBus from "@/components/title.vue";
import { reactive, ref, onMounted, toRefs, watchEffect, watch } from "vue";
import { get, gettree } from "../../utils/request";
import { ElDialog } from "element-plus";
import { getContentById } from "../../utils/request";

const navList = ref([]);
const contList = ref([]);
const content = ref({});
const imgcontarr = ref([]);
const props = defineProps(["cmpData", "curNav"]);
// const curNav = ref({});
const lShow = ref(false);
const pageData = reactive({
  articles: [],
  active: 0,
  dialogVisible: false,
  name: "",
  img: [],
  shipShow: false,
  handlercontent: {},
});
const { active, name, img, handlercontent } = toRefs(pageData);
let urlHash = location.hash.replace("#", "");
//获取三级菜单
const getthree1 = (result) => {
  gettree(result, false).then((res) => {
    console.log(res.data);
    let mapArr = res.data.map((item) => {
      // 使用//分割字符串成数组
      const array1 = item.description.split("//\n");
      // 使用||分割每个数组元素成 key 和 value 形式
      const result = array1.reduce((acc, element) => {
        const [key, value] = element.split("\\");
        acc[key] = value;

        // 如果值中包含 +，则将其转换为数组
        if (value && value.indexOf("+") != -1) {
          acc[key] = value.split("+");
        }
        return acc;
      }, {});
      return result;
    });
    navList.value = res.data;
    name.value = res.data[0].name;
    img.value = res.data[0].imgurls.split(",");
    contList.value = mapArr;
    getDetail(res.data[0].id);
  });
};
onMounted(() => {
  getthree1(props.cmpData.id);
});

const getsplit = (text) => {
  return text.split("---");
};

//获取详情
const getDetail = (id) => {
  //文章模板---获取内容信息
  let data = {
    categoryId: id,
    status: "publish",
  };
  content.value = contList.value[active.value];
  get("/cms/article/list", data).then((res) => {
    imgcontarr.value = res.rows;
  });
};
//点击导航切换内容
function navClick(index, id) {
  active.value = index;
  imgcontarr.value = [];
  img.value = navList.value[active.value].imgurls?.split(",");

  name.value = navList.value[active.value].name;
  console.log(id);
  if (id == 1739894853614129153) {
    console.log("崂山");
    lShow.value = true;
  } else {
    lShow.value = false;
  }
  getDetail(id);
}
function goContent(item) {
  getContentById("/cms/article", item.id).then((res) => {
    console.log(res, 134);
    handlercontent.value = res.data;
    if(res.data.content){
      pageData.shipShow = true;

    }
  });
}
</script>

<template>
  <div class="city">
    <div class="consulting">
      <div class="con-left">
        <div
          class="nav-box"
          @click="navClick(index, item.id)"
          :class="index == active ? 'actives' : ''"
          v-for="(item, index) in navList"
          :key="item.id"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="con-right">
        <div class="boxtitle">
          <div class="box-top">{{ name }}</div>
          <div class="box-bottom"></div>
        </div>
        <div class="overview">{{ content.产品概况 }}</div>
        <div class="imageroute">
          <img v-if="img.length > 0" :src="img[0]" alt="" />
        </div>
        <div class="line">航行路线</div>

        <div
          class="routeBox"
          v-if="content.航行路线 && content.航行路线.length > 0"
        >
          <div
            class="route"
            v-for="(item, index) in content.航行路线"
            :key="index"
          >
            <div
              style="margin: 10px 0; color: #0c5cd6"
              v-if="index == 0 && content.路线一"
            >
              {{ content.路线一 }}
            </div>
            <div
              style="margin: 10px 0; color: #0c5cd6"
              v-if="index == 1 && content.路线二"
            >
              {{ content.路线二 }}
            </div>
            <div v-if="item">
              <div class="textcon">
                <div class="textbox" v-for="(p, i) in getsplit(item)">
                  <div class="text">{{ p }}</div>
                  <div v-if="getsplit(item).length - 1 != i">
                    <i class="iconfont" style="font-size: 18px"> &#xe621;</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="content.特色航线" class="line">特色航线</div>
        <div
          style="line-height: 30px"
          v-html="content.特色航线 ? content.特色航线 : ''"
        ></div>
        <div v-if="content.特色航线">
          <div class="imageroute" v-if="img.length > 0 && img[1]">
            <img :src="img[1]" alt="" />
          </div>
        </div>

        <!-- <div
          class="routeBox"
          v-if="content.特色航线 && content.特色航线.length > 0"
        >
          <div
            class="route"
            v-for="(item, index) in content.特色航线"
            :key="index"
          >
            <div v-if="item">
              <div class="index">路线{{ index + 1 }}</div>
              <div class="textcon">
                <div class="textbox" v-for="(p, i) in getsplit(item)">
                  <div class="text">{{ p }}</div>
                  <div v-if="getsplit(item).length - 1 != i">
                    <i class="iconfont" style="font-size: 14px"> &#xe621;</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <div class="line">使用船舶</div>

        <div class="imagebox">
          <div class="image" v-for="item in imgcontarr">
            <img v-if="item.img.length>0&&item.img" :src="item.img[0].url" @click="goContent(item)" alt="" />
            <div class="title">{{ item.title }}</div>
          </div>
        </div>
        <div class="line" v-if="content.航行时间">航行时间</div>
        <div style="font-size: 18px">
          {{ content.航行时间 ? content.航行时间 : "" }}
        </div>
        <div class="line" v-if="content.航次时间">航次时间</div>
        <div style="font-size: 18px">
          {{ content.航次时间 ? content.航次时间 : "" }}
        </div>
        <div class="line" v-if="content.运营时间">运营时间</div>

        <div style="font-size: 18px">
          {{ content.运营时间 ? content.运营时间 : "" }}
        </div>
        <div class="line">游客须知</div>

        <div style="line-height: 30px">
          游客须知:<br />1.购票规则：游船购票实行实名制，请持身份证购票、验票登船。<br />
          2.检票时间：开航前20分钟开始检票，开航前5分钟停止检票。<br />
          3.注意事项：游船班次以当日公示为准，如遇天气、风浪等不可抗力因素无法乘船，造成不便敬请谅解，详情请关注“奥帆海洋文化旅游区一票通”官方小程序。
          <p v-if="lShow">
            购买奥帆中心往返崂山风景区航线船票时，建议提前拨打客服电话咨询相关乘船事宜。
          </p>
          <p>客服专线：0532-58617801</p>
        </div>
        <div class="reservation" @click="pageData.dialogVisible = true">
          立即预约
        </div>
      </div>
    </div>
    <el-dialog v-model="pageData.dialogVisible" title="预约" width="30%" center>
      <div style="width: 50%; margin: 0 auto">
        <img src="@/assets/images/pictures.jpg" alt="" style="width: 100%" />
      </div>
      <div style="text-align: center; margin-top: 20px">
        您可以扫描二维码线上预约
      </div>
    </el-dialog>
    <el-dialog
      v-model="pageData.shipShow"
      :title="handlercontent.title"
      width="60%"
      center
    >
      <div style="padding: 0 20px">
        <p
          style="line-height: 26px; text-indent: 2em"
          v-html="handlercontent?.content"
        ></p>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
.city {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  .consulting {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    height: auto;
    .con-left {
      width: 300px;

      padding-top: 50px;
      margin-right: 30px;
      border-right: 1px solid #f3f3f3;

      .nav-box {
        height: 80px;
        line-height: 80px;
        cursor: pointer;
        font-size: 16px;
        text-align: center;
        &:hover {
          background: #0c5cd6 url("@/assets/images/bgack.png") no-repeat;
          background-size: 200px;
          background-position: center;
          color: #fff;
        }
      }
      .actives {
        background: #0c5cd6 url("@/assets/images/bgack.png") no-repeat;
        background-size: 200px;
        background-position: center;
        color: #fff;
      }
    }
    .con-right {
      margin-left: 30px;
      width: 85%;
      padding: 50px 0;
      .boxtitle {
        margin-bottom: 30px;
        .box-top {
          font-size: 28px;
          padding-bottom: 16px;
          font-weight: bold;
          font-family: Medium;
          color: #333;
        }

        .box-bottom {
          width: 52px;
          height: 0;
          border-top-color: #0c5cd6;
          border-top-width: 8px;
          border-top-style: solid;
          border-right: 6px solid rgba(0, 0, 0, 0);
        }
      }
      .overview {
        text-align: justify;
        text-indent: 2em;
        line-height: 30px;
        margin-bottom: 20px;
      }
      .imageroute {
        width: 100%;
        height: 480px;
        margin: 20px 0;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .line {
        padding-left: 16px;
        position: relative;
        font-size: 20px;
        font-family: Medium;
        margin: 30px 0;
        height: 24px;
        color: #333;
        font-weight: 600;
        &::after {
          position: absolute;
          top: 2px;
          left: 0;
          content: "";
          display: block;
          width: 5px;
          height: 20px;
          background: #0c5cd6;
        }
      }
      .reservation {
        color: #fff;
        width: 30%;
        padding: 20px 30px;
        background: #0c5cd6;
        margin: 0 auto;
        text-align: center;
        margin-top: 30px;
        cursor: pointer;
      }
      .routeBox {
        .route {
          .index {
            font-weight: 600;
            font-size: 18px;
            margin-bottom: 10px;
          }
          .textcon {
            display: flex;
            flex-wrap: wrap;
            .textbox {
              display: flex;
              justify-content: center;
              align-items: center;
              .text {
                padding: 8px 10px;
                background: #f1f1f1;
                font-size: 14px;
                color: #555;
                margin: 8px 4px;
              }
            }
          }
        }
      }
      .imagebox {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 20px;
        .image {
          .title {
            width: 100%;
            text-align: center;
            margin-top: 10px;
          }
          img {
            width: 100%;
            cursor: pointer;
            height: 160px;
            object-fit: cover;
          }
        }
      }
    }
  }
}
@media (max-width: 1440px) {
  .city {
    width: 1200px;
  }
}
</style>
