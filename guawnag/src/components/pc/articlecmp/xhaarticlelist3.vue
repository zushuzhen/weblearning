<script setup>
import titileBus from "@/components/title.vue";
import { reactive, ref, onMounted, toRefs, watchEffect, watch } from "vue";
import { get, gettree } from "../../utils/request";
import { gettages } from "@/utils/tags.js";
import pages from "@/components/xhapage.vue";

const navList = ref([]);
const name = ref("");
const props = defineProps(["cmpData", "curNav"]);
// const curNav = ref({});

const pageData = reactive({
  articles: [],
  active: 0,
  articleList: [],
  contID: "",
  defpageNum: "1",
});
const pageObj = reactive({
  pageNum: 1,
  pageSize: defPageSize,
  total: 0,
});
const { active, articleList, contID, defpageNum } = toRefs(pageData);
let urlHash = location.hash.replace("#", "");
//获取三级菜单
const getthree1 = (result) => {
  gettree(result, false).then((res) => {
    navList.value = res.data;
    name.value = res.data[0].name;
    contID.value = res.data[0].id;

    getDetail();
  });
};
onMounted(() => {
  console.log(props.cmpData.url);
  getthree1(props.cmpData.id);
});
const defPageSize = 6;

//获取详情
const getDetail = () => {
  //文章模板---获取内容信息

  let data = {
    categoryId: contID.value,
    status: "publish",
    pageNum: defpageNum.value,
    pageSize: defPageSize,
  };
  get("/cms/article/list", data).then((res) => {
    articleList.value = res.rows;
    console.log(res.rows, "数据");
    pageObj.total = res.total;
  });
};
function pageChange(pageObj) {
  console.log(pageObj);
  defpageNum.value = parseInt(pageObj.pageNum);
  pageObj.pageNum = defpageNum.value;
  getDetail();
}

function navClick(index, id) {
  active.value = index;
  name.value = navList.value[index].name;
  contID.value = id;
  getDetail(id);
}
function goContent(item) {
  if (item.jumpurl) {
    window.open(item.jumpurl);
  } else {
    window.open(
      `/articlepage.html?query=${item.id}` + `&topNav=${props.topNav}`
    );
  }
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
        <div style="height: 410px;">
        <div class="recruit">
          <div
            v-if="articleList.length > 0"
            class="recrubox"
            @click="goContent(item)"
            v-for="item in articleList"
            :key="item.id"
          >
            <div class="contbox">
              <div class="cont-top">
                <div class="positions">{{ item.title }}</div>
                <div class="contag" v-if="item.tags && item.tags.length > 0">
                  {{ gettages(item.tags[0]) }}
                </div>
              </div>
              <div class="cont-bottom">青岛旅游集团 | 市南区</div>
            </div>
          </div>
          <div class="imgBox" v-else>
            <img src="/static/images/none.png" alt="" />
            <p>暂无数据</p>
          </div>
        </div>
      </div>
        <pages
          v-model:page-num="pageObj.pageNum"
          :page-size="pageObj.pageSize"
          v-model:total="pageObj.total"
          @change="pageChange"
        ></pages>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
.city {
  width: 100%;
  width: 1600px;
  margin: 0 auto;
  .consulting {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    height: auto;
    .con-left {
      width: 300px;

      margin-right: 30px;
      border-right: 1px solid #f3f3f3;
      padding-bottom: 100px;

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
      .recruit {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .recrubox {
          width: 49%;
          height: 110px;
          background: #f7f7f7;
          border-radius: 5px;
          margin-bottom: 25px;
          position: relative;
          cursor: pointer;
          padding: 20px 30px;
          box-sizing: border-box;
          &::before {
            display: block;
            content: "";
            width: 20px;
            height: 8px;
            background: url("@/assets/images/arrow.jpg") no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: calc(50% - 4px);
            right: 48px;
          }
          .contbox {
            height: 100%;
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            .cont-top {
              display: flex;
              .positions {
                color: #333;
                font-size: 20px;
                font-weight: bold;
                font-family: Medium;
                margin-right: 20px;
              }
              .contag {
                width: 75px;
                height: 25px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #e7ecf9;
                color: #0c5cd6;
                font-size: 13px;
              }
            }
            .cont-bottom {
              font-size: 14px;
              color: #666;
            }
          }
        }
        .imgBox {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          color: #999;
          img {
            width: 300px;
            object-fit: cover;
          }
        }
      }
    }
    .conVr {
      display: grid;
    }
  }
}
@media (max-width: 1440px) {
  .city {
    width: 1200px;
  }
}
</style>
