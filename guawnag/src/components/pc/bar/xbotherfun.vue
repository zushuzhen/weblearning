<script setup>
import titileBus from "@/components/title.vue";
import { reactive, ref, onMounted, toRefs, watchEffect, watch } from "vue";
import { get, gettree } from "../../utils/request";
import { ElDialog } from "element-plus";
import { formatDate } from "@/utils/time.js";
const navList = ref([]);
const name = ref("");
const props = defineProps(["cmpData", "curNav"]);

const pageData = reactive({
  articles: [],
  active: 0,
  content: {},
  briefArr: {},
  articleArr: [],
  imgages: "",
  dialogVisible: false,
  buyShow: false,
  dilaogImg:'',//购票二维码
});
const { articleArr, briefArr, imgages,dilaogImg } = toRefs(pageData);
let urlHash = location.hash.replace("#", "");
onMounted(() => {
  imgages.value = props.cmpData.imgurls.split(",");
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
    articleArr.value = res.rows;
  });
};
//购买
const buyClick=(item)=>{
  console.log(item);
  dilaogImg.value = item.img[1].url
  pageData.dialogVisible = true

}

watch(
  () => props.curNav,
  (value) => {
    console.log("监听到了nav切换");
  }
);
</script>

<template>
  <div class="city">
    <titileBus :title="cmpData.name"></titileBus>
    <div class="describe list" v-for="item in articleArr" :key="item.id">
      <div class="d-left" style="width: 70%">
        <div class="leftBox">
          <div class="title">{{ item.title }}</div>
          <div class="content">{{ item.summary }}</div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <div style="min-width: 10px;max-width: 80%;">
              <div class="time">
                <span>
                  <i class="iconfont" style="font-size: 14px; margin-right: 6px"
                    >&#xe834;</i
                  >开放时间：</span
                >{{ item.pageDescription }}
              </div>
              <div class="address">
                <span
                  ><i
                    class="iconfont"
                    style="font-size: 14px; margin-right: 6px"
                    >&#xe76f;</i
                  >景点位置：</span
                >{{ item.pageTitle }}
              </div>
  <!--              <div class="buyline">-->
  <!--                <span-->
  <!--                  ><i-->
  <!--                    class="iconfont"-->
  <!--                    style="font-size: 14px; margin-right: 6px"-->
  <!--                    >&#xe61f;</i-->
  <!--                  >-->
  <!--                  <span-->
  <!--                    style="text-decoration: underline; cursor: pointer"-->
  <!--                    @click="pageData.buyShow = true"-->
  <!--                    >购买须知</span-->
  <!--                  ></span-->
  <!--                >-->
  <!--              </div>-->
            </div>
            <div class="buy" @click="buyClick(item)">
              立即购买
            </div>
          </div>
        </div>
      </div>
      <div class="d-right" style="width: 30%">
        <img
          v-if="item.img && item.img.length > 0"
          :src="item.img[0].url"
          alt=""
        />
      </div>
    </div>
    <!-- overflow: hidden; text-overflow: ellipsis; -webkit-line-clamp: 5; /*
    显示行数，这里2行 */ -webkit-box-orient: vertical; display: -webkit-box;
    text-align: justify; -->
    <el-dialog v-model="pageData.dialogVisible" title="购买" width="30%" center>
      <div style="text-align: center;margin: 0 auto;">
        <img :src="dilaogImg?dilaogImg:'/static/images/buywx.jpg'" alt="" style="width: 70%;" />
      </div>
      <div style="text-align: center; margin-top: 20px">
        您可以扫描二维码线上购买
      </div>
    </el-dialog>
    <el-dialog v-model="pageData.buyShow" title="购买须知" width="60%" center>

      <div style="line-height: 30px">
        游客须知:<br />1.购票规则：游船购票实行实名制，请持身份证购票、验票登船。<br />
        2.检票时间：开航前20分钟开始检票，开航前5分钟停止检票。<br />
        3.注意事项：游船班次以当日公示为准，如遇天气、风浪等不可抗力因素无法乘船，造成不便敬请谅解。详情请关注“奥帆海洋文化旅游区一票通”官方小程序。购买奥帆中心往返崂山风景区航线船票时，请提前拨打客服专线进行预约。
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
  padding-bottom: 50px;
  box-sizing: border-box;
  .list {
    border-radius: 5px;
    margin-bottom: 30px;
    &:hover {
      border: 1px solid #0c5cd6;
      .d-right {
        img {
          transform: scale(1.2);
        }
      }
      .d-left {
        .leftBox {
          .title {
            color: #0c5cd6;
          }
        }
      }
    }
  }
  .describe {
    width: 100%;
    height: 300px;
    border: 1px solid #eeeded;
    display: flex;
    overflow: hidden;

    .d-left {
      width: 60%;
      display: flex;
      align-items: center;
      padding: 0 40px;
      box-sizing: border-box;
      background: #fafafa;
      .leftBox {
        width: 100%;
        .title {
          font-size: 20px;
          color: #333;
          margin-bottom: 10px;
          font-weight: 600;
          font-family: Medium;
        }
        .content {
          line-height: 25px;
          margin-bottom: 20px;
          font-size: 16px;
          text-align: justify;
        }
        .address {
          margin-top: 10px;
        }
        .buyline {
          color: #0c5cd6;
          margin-top: 10px;
        }
        .buy {
          padding: 14px 30px;
          background: #0c5cd6;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .d-right {
      width: 40%;
      height: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: 0.3s;
      }
    }
  }
  .de-top {
    border: none;
    height: 350px;
  }
}
@media (max-width: 1440px) {
  .city {
    width: 1200px;
    .describe {
      .d-left {
        /* width: 70%; */
      }
      .d-right {
        /* width: 30%; */
      }
    }
  }
}
</style>
