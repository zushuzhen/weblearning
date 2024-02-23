<script setup>
import titileBus from "@/components/title.vue";
import { get } from "../../utils/request";
import { reactive, ref } from "vue";
import { ElDialog } from "element-plus";

const props = defineProps(["cmpData"]);
const videoShow = ref(false);
const videoURL = ref("");
const myVideo = ref(null);

const pageData = reactive({
  article: {
    content: "",
  },
});
let data = {
  categoryId: props.cmpData.id,
  status: "publish",
};

get("/cms/article/list", data).then((res) => {
  console.log(res);
  if (res.rows && res.rows.length > 0) {
    pageData.article = res.rows[0];
  }
});
const closeDialog = () => {
  myVideo.value.pause();
};
const videoClick = () => {
  videoShow.value = true;
  setTimeout(() => {
    myVideo.value.currentTime = 0;
    myVideo.value.play();
  }, 300);
};
let datahome = {
  tags: "home",
};
get("/cms/videos/list", datahome).then((res) => {
  console.log(res, "视频");
  videoURL.value = res.rows[0].locationUrls
    ? res.rows[0].locationUrls
    : res.rows[0].url;
});
</script>

<template>
  <div class="content">
    <titileBus title="集团简介"></titileBus>
    <div class="group">
      <div class="top">
        <img src="@/assets/images/logo-mini.png" alt="" />
        青岛旅游集团
      </div>
      <div class="bottom">
        <div class="b-left">
          <div class="b-pBox" v-html="pageData.article.content"></div>
          <div class="b-icon" @click="videoClick">
            <i class="iconfont" style="color: #fff">&#xe666;</i>
            企业宣传片
          </div>
        </div>
        <div class="b-right">
          <img
            v-if="
              pageData.article &&
              pageData.article.img &&
              pageData.article.img.length > 0
            "
            :src="pageData.article.img[0].url"
            alt=""
          />
        </div>
      </div>
      <!-- <div class="right">
      </div> -->
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

.title-box {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 80px;

  .title {
    font-size: 28px;
    padding-bottom: 16px;
    font-weight: bold;
    font-family: Medium;
    color: #333;
  }

  .rectangle {
    width: 52px;
    height: 0;
    border-top-color: #0c5cd6;
    border-top-width: 8px;
    border-top-style: solid;
    border-right: 6px solid rgba(0, 0, 0, 0);
  }
}

.hotcontent {
  width: 100%;
  width: 1600px;
  margin: 0 auto;

  .content {
    width: 100%;
    padding: 0px 0 50px;

    .group {
      .top {
        padding-left: 80px;
        box-sizing: border-box;
        line-height: 80px;
        font-size: 24px;
        color: #fff;
        width: 100%;
        background: #0c5cd6;
        display: flex;
        align-items: center;

        img {
          margin-right: 10px;
          width: 48px;
        }
      }

      .bottom {
        background: #fafafa;
        height: 725px;
        padding: 30px 40px 40px 66px;
        display: flex;
        box-sizing: border-box;

        .b-left {
          width: 60%;
          height: 100%;
          font-size: 18px;
          margin-right: 70px;
          line-height: 30px;
          padding-top: 35px;
          box-sizing: border-box;

          .b-pBox {
            width: 100%;
            text-indent: 2em;
            :deep(p) {
                text-align: justify;
              }
          }

          .b-icon {
            width: 260px;
            height: 70px;
            margin: 0 auto;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 100px;
            color: #fff;
            background: #0c5cd6;
            font-size: 18px;
            cursor: pointer;

            i {
              margin-right: 20px;
            }
          }
        }

        .b-right {
          width: 40%;
          height: 100%;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }

  .contentt {
    width: 100%;
    padding: 0px 0 50px;

    .team {
      font-size: 32px;
      font-family: Medium;
      font-weight: 700;
      color: rgb(51, 51, 51);
    }

    .team-box {
      /*
      background-color: rgb(12, 92, 214);
      width: 50px;
      height: 8px;
      border-bottom-right-radius: 20px; */
      width: 52px;
      margin-top: 20px;
      height: 0;
      border-top-color: #0c5cd6;
      border-top-width: 8px;
      border-top-style: solid;
      border-right: 6px solid rgba(0, 0, 0, 0);
    }

    .contentt-list {
      margin-top: 50px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 20px;

      .box {
        width: 80%;
        margin-bottom: 30px;
        cursor: pointer;
        color: #333333;
        padding: 50px 30px;
        background-color: #f6f7f8;

        &:hover {
          background-color: #0c5cd6;
          color: #fff;
        }

        .text {
          box-sizing: border-box;

          .title {
            font-family: Medium;
            font-size: 26px;
            font-weight: 700;
            line-height: 1.154;
            letter-spacing: 2px;
          }

          .boxcontent {
            font-family: Medium;
            margin-top: 20px;
            line-height: 1.875;
            font-size: 16px;
          }
        }
      }
    }
  }

  .contents {
    width: 100%;
    padding: 0px 0 50px;

    .team {
      font-size: 32px;
      font-family: Medium;
      font-weight: 700;
      color: #333;
    }

    .team-box {
      width: 52px;
      margin-top: 20px;
      height: 0;
      border-top-color: #0c5cd6;
      border-top-width: 8px;
      border-top-style: solid;
      border-right: 6px solid rgba(0, 0, 0, 0);
    }

    .organization {
      margin-top: 40px;
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .consulting {
    display: flex;
    justify-content: space-between;
    padding: 0px 0 50px;
    box-sizing: border-box;

    .con-left {
      width: 300px;

      margin-right: 30px;
      border-right: 1px solid #f3f3f3;

      .nav-box {
        height: 80px;
        line-height: 80px;
        cursor: pointer;
        font-size: 16px;
        text-align: center;
        border-radius: 5px;

        &:hover {
          background: #0c5cd6 url("@/assets/images/bgack.png") no-repeat;
          background-size: 320px;
          background-position: -20px -40px;
          color: #fff;
        }
      }

      .actives {
        background: #0c5cd6 url("@/assets/images/bgack.png") no-repeat;
        background-size: 320px;
        background-position: -20px -45px;
        color: #fff;
      }
    }

    .con-right {
      margin-left: 30px;
      width: 85%;

      .team {
        font-size: 32px;
        font-family: Medium;
        font-weight: 700;
        color: rgb(51, 51, 51);
      }

      .team-box {
        width: 52px;
        margin-top: 20px;
        height: 0;
        border-top-color: #0c5cd6;
        border-top-width: 8px;
        border-top-style: solid;
        border-right: 6px solid rgba(0, 0, 0, 0);
      }

      .titlt {
        margin-bottom: 40px;
        font-size: 28px;
        color: #0c5cd6;
        font-weight: bold;
        font-family: Medium;
      }

      .p {
        text-align: justify;
        text-indent: 2em;
        line-height: 30px;
        margin-bottom: 40px;
        font-size: 16px;
      }

      .boxImg {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 40px;

        img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }
      }

      .time {
        display: flex;
        justify-content: flex-end;
        margin-top: 50px;
        align-items: center;

        span {
          font-size: 22px;
          color: #0c5cd6;
        }
      }
    }
  }

  .contentf {
    display: flex;

    .content-left {
      padding-bottom: 50px;
      width: 300px;
      border-right: 1px solid #e8e8e8;
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      padding-right: 60px;
      box-sizing: border-box;

      .yarn {
        font-size: 24px;
        color: #666;

        &.active {
          color: #0c5cd6;
        }
      }

      .content-left-title {
        font-family: Medium;
        font-size: 18px;
        font-weight: 600;
        color: rgb(12, 92, 214);
        line-height: 1.667;
      }

      .content-left-time {
        font-size: 18px;
        font-family: Medium;
        color: rgb(114, 112, 114);
        line-height: 1.667;
        font-weight: 500;
      }

      .content-left-box {
        margin-top: 20px;
        width: 23px;
        height: 2px;
        background-color: #b9b9b9;
      }
    }

    .content-right {
      padding-bottom: 50px;
      margin-left: 50px;

      > div {
        display: flex;
        margin-bottom: 50px;

        .content-right-time {
          color: #0c5cd6;
          font-size: 24px;
          font-weight: 700;
          width: 180px;
        }

        .content-writh {
          margin-left: 50px;

          .content-intro {
            font-size: 16px;
            color: rgb(102, 102, 102);
            line-height: 1.875;
          }

          .content-image {
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
            width: 100%;

            .content-img {
              width: 250px;
              height: 180px;
              margin-right: 25px;
              margin-top: 20px;
              border-radius: 5px;
              overflow: hidden;
            }
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
}

@media (max-width: 1440px) {
  .hotcontent {
    /* width: 1200px; */

    .content {
      width: 100%;
      padding: 0px 0 50px;

      .group {
        .bottom {
          background: #fafafa;
          height: 580px;
          padding: 30px 40px 40px 66px;
          display: flex;

          .b-left {
            width: 60%;
            height: 100%;
            font-size: 18px;
            margin-right: 50px;
            line-height: 30px;
            padding-top: 0px;

            .b-pBox {
              width: 100%;
              /* height: 300px; */
              :deep(p) {
                font-size: 15px !important;
                /* line-height: 1.5 !important; */
                text-align: justify;
              }
            }

            .b-icon {
              margin-top: 20px;

              i {
                margin-right: 20px;
              }
            }
          }

          .b-right {
            width: 40%;
            height: 100%;

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
