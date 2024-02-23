<script setup>
import titileBus from "@/components/title.vue";
import {onMounted, reactive, ref} from "vue";
import {get, gettree} from "../../utils/request";
import {formatDate} from "@/utils/time.js";
import pages from "@/components/xhapage.vue";
import {ElDialog} from "element-plus";

const props = defineProps(["cmpData"]);

const articleList = ref([]);
const navList = ref([]);
const curNav = ref({});
const videoShow = ref(false);
const videoURL = ref("");
const myVideo = ref(null);

// const defPageSize = 4;
const pageObj = reactive({
  // pageNum: 1,
  // pageSize: defPageSize,
  total: 0,
});
let data = {
  categoryId: props.cmpData.id,
  status: "publish",
};
gettree(props.cmpData.id, false).then((res) => {
  navList.value = res.data;
  curNav.value = navList.value[0];
  data.categoryId = curNav.value.id;
  query();
});

function query() {
  get("/cms/videos/list", data).then((res) => {
    articleList.value = res.rows;
    pageObj.total = res.total;
  });
}

function pageChange(pageObj) {
  console.log(pageObj);
  data.pageNum = parseInt(pageObj.pageNum);
  pageObj.pageNum = data.pageNum;
  query();
}

function navClick(item) {
  curNav.value = item;
  data.categoryId = item.id;
  data.pageNum = 1;
  pageObj.pageNum = 1;
  // pageObj.total = 0;

  query();
}

const closeDialog = () => {
  myVideo.value.pause();
};
const clickVideo = (item) => {
  videoURL.value = item.locationUrls?item.locationUrls:item.url;
  videoShow.value = true;
  setTimeout(() => {
    myVideo.value.currentTime = 0;
    myVideo.value.play();
  }, 300);
};

</script>

<template>
  <div class="hotcontent">
    <div class="contentf">
      <titileBus :title="cmpData.name"></titileBus>
      <div class="consulting">
        <div class="con-left">
          <div
              class="nav-box"
              @click="navClick(item)"
              :class="curNav == item ? 'actives' : ''"
              v-for="(item, index) in navList"
              :key="item.id"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="con-right">
          <div
            class="conbox"
            v-for="item in articleList"
            :key="item.id"
            @click="clickVideo(item)"
          >
            <div>
              <img :src="item.imgUrls" alt=""/>
              <div class="mark">
                <i class="iconfont iconsize">&#xe83e;</i>
              </div>
            </div>
            <p>{{ item.title }}</p>
          </div>
        </div>
      </div>
      <!-- <pages v-model:page-num="pageObj.pageNum" :page-size="pageObj.pageSize" v-model:total="pageObj.total" @change="pageChange"></pages> -->

    </div>
    <!-- 视频中心弹窗视频 -->
    <el-dialog v-model="videoShow" width="80%" center @close="closeDialog">
      <div class="videBox">
        <video ref="myVideo" controls :src="videoURL"></video>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";

.hotcontent {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  .content {
    width: 100%;
    padding-bottom: 50px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    .box {
      width: 100%;
      margin-bottom: 30px;
      cursor: pointer;
      &:hover img {
        transform: scale(1.2);
      }
      .image {
        width: 100%;
        height: 245px;
        overflow: hidden;
      }
      img {
        width: 100%;
        height: 245px;
        transition: 0.3s;
      }
      .text {
        padding: 24px 50px 0 0;
        box-sizing: border-box;
        .title {
          font-family: Medium;
          line-height: 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2; /* 显示行数，这里2行 */
          -webkit-box-orient: vertical;
          display: -webkit-box;
          text-align: justify;
          font-size: 18px;
          font-weight: 600;
          color: #000;
        }
        .boxcontent {
          margin: 10px 0;
          line-height: 20px;
          text-align: justify;
          color: #666;
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 3; /* 显示行数，这里2行 */
          -webkit-box-orient: vertical;
          display: -webkit-box;
        }
      }
    }
  }
  .contentt {
    width: 100%;
    padding-bottom: 50px;
    .ttbox {
      width: 100%;
      margin-bottom: 30px;
      background: #f7f7f7;
      cursor: pointer;
      display: flex;
      .box-l {
        color: #fff;
        background: #d7dbe7;
        width: 180px;
        height: 180px;
        text-align: center;
        line-height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        transition: 0.3s;
        > p:nth-child(1) {
          font-size: 44px;
          margin-top: 20px;
        }
        > p:nth-child(2) {
          font-size: 18px;
          margin-top: 30px;
        }
      }
      .box-r {
        width: calc(100% - 180px);
        padding: 60px 50px;
        box-sizing: border-box;
        position: relative;
        > div {
          width: 80%;
          height: 65px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          > p:nth-child(1) {
            color: #000;
            font-family: Medium;
            font-size: 18px;
            font-weight: 600;
          }
          > p:nth-child(2) {
            color: #666;
          }
        }
        &::before {
          display: block;
          content: "";
          width: 35px;
          height: 16px;
          background: url("@/assets/images/arrow.jpg") no-repeat;
          position: absolute;
          top: calc(50% - 8px);
          right: 50px;
        }
      }
      &:hover .box-l {
        background: #0c5cd6;
      }
      &:hover .box-r p {
        color: #0c5cd6 !important;
      }
      &:hover .box-r::before {
        background: url("@/assets/images/arrow-list.jpg") no-repeat;
      }
    }
  }
  .consulting {
    display: flex;
    justify-content: space-between;
    padding-bottom: 50px;
    box-sizing: border-box;
    .con-left {
      width: 225px;
      height: 100%;
      margin-right: 30px;
      .nav-box {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 18px;
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
      margin-right: 10px;
      width: 88%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 20px;
      .conbox {
        width: 100%;
        text-align: center;
        margin-bottom: 35px;
        > div {
          border-radius: 5px;
          overflow: hidden;
          width: 100%;
          height: 210px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          > .mark {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            img {
              width: 60px !important;
              height: 60px !important;
            }
          }
        }
        > p {
          margin-top: 25px;
        }
      }
    }
  }
  .contents {
    padding-bottom: 50px;
    .consix {
      display: flex;
      border-bottom: 1px solid #f0f0f0;
      padding: 28px 0;
      cursor: pointer;
      transition: 0.3s;
      overflow: hidden;
      position: relative;
      &::before {
        display: block;
        content: "";
        width: 35px;
        height: 16px;
        background: url("@/assets/images/arrow.jpg") no-repeat;
        position: absolute;
        top: calc(50% - 8px);
        right: 50px;
      }
      &:hover .zoomImg {
        transform: scale(1.2);
      }
      .zoom-l {
        width: 205px;
        height: 140px;
        overflow: hidden;
        .zoomImg {
          width: 100%;
          height: 100%;
          transition: 0.3s;
          object-fit: cover;

          img {
            object-fit: cover;
          }
        }
      }
      .zoom-r {
        width: calc(100% - 285px);
        padding: 5px 24px;
        box-sizing: border-box;
        > div:nth-child(1) {
          width: 100%;
          /* display: flex;
          flex-direction: column;
          justify-content: space-between; */
          line-height: 40px;
          position: relative;
          > p:nth-child(1) {
            font-family: Medium;
            color: #000;
            font-size: 18px;
            font-weight: 600;
          }
          > p:nth-child(2) {
            color: #666;
          }
        }
        > div:nth-child(2) {
          margin-top: 20px;
        }
      }
    }
  }
}
.videBox {
  width: 100%;
  height: 600px;
  video {
    width: 100%;
    height: 100%;
  }
}
.time {
  color: #aaa;
  font-size: 12px;
  display: flex;
  align-items: center;
  > span {
    display: block;
    width: 70px;
    height: 25px;
    background: #f3f3f3;
    color: #0c5cd6;
    text-align: center;
    line-height: 25px;
    margin-right: 20px;
    border-radius: 5px;
  }
}
@media (max-width: 1440px) {
  .hotcontent {
    width: 1200px;
    .content {
      .box {
        .image {
          width: 100%;
          height: 210px;
          overflow: hidden;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.3s;
        }
      }
    }
    .consulting {
      .con-right {
        .conbox {
          > div {
            height: 170px;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
  }
  .videBox {
    width: 100%;
    height: 400px;
  }
}
</style>

