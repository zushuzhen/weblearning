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
});
const { articleArr, briefArr, imgages } = toRefs(pageData);
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
            <div style=" min-width: 10px;">
              <div class="address">
                <span
                  ><i
                    class="iconfont"
                    style="font-size: 14px; margin-right: 6px"
                    >&#xe85f;</i
                  >联系电话：</span
                >{{ item.contact }}
              </div>
              <!-- <div class="time">
                <span>
                  <i class="iconfont" style="font-size: 14px; margin-right: 6px"
                    >&#xe834;</i
                  >营业时间：</span
                >{{ item.pageDescription }}
              </div> -->
            </div>
            <!-- <div class="buy" @click="pageData.dialogVisible = true">
              线上预约
            </div> -->
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
    <el-dialog v-model="pageData.dialogVisible" title="预约" width="30%" center>
      <div style="text-align: center">
        <img src="@/assets/images/buywx.jpg" alt="" />
      </div>
      <div style="text-align: center; margin-top: 20px">
        您可以扫描二维码线上预约
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
          margin-bottom: 10px;
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
