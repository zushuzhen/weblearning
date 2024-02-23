<template>
  <div class="hotcontent">
    <div class="content" v-if="type == 1">
      <titileBus title="集团简介"></titileBus>
      <div class="group">
        <div class="top">
          <img src="@/assets/images/logo-mini.png" alt="" />
          集团简介
        </div>
        <div class="bottom">
          <div class="b-left">
            <div class="b-pBox" v-html="brief.content"></div>
            <div class="b-icon">
              <i class="iconfont">&#xe633;</i>
              企业宣传片
            </div>
          </div>
          <div class="b-right">
            <img
              v-if="brief && brief.img && brief.img.length > 0"
              :src="brief?.img[0]?.url"
              alt=""
            />
          </div>
        </div>
        <!-- <div class="right">
        </div> -->
      </div>
    </div>
    <div class="contentt" v-if="type == 2">
      <titileBus title="管理团队"></titileBus>

      <div class="contentt-list">
        <div class="box" v-for="item in teamList" :key="item.id">
          <div class="text">
            <div class="title">{{ item.title }}</div>
            <div class="boxcontent">{{ item.summary }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="contents" v-if="type == 3">
      <titileBus title="组织架构"></titileBus>

      <div class="organization">
        <oraniz></oraniz>
      </div>
    </div>
    <div v-if="type == 4">
      <titileBus title="集团板块"></titileBus>

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
          <div class="titlt" v-if="brief.title">
            <i class="iconfont" style="font-size: 30px">&#xe84f;</i>
            {{ brief.title }}
          </div>
          <div class="p" v-html="brief.content"></div>
          <div class="boxImg">
            <img v-for="item in brief.img" :key="item" :src="item.url" alt="" />
          </div>
          <div class="time">联系电话：<span>0532-58617999</span></div>
        </div>
      </div>
    </div>
    <div v-if="type == 5">
      <titileBus title="发展历程"></titileBus>
      <div class="contentf">
        <div class="content-left">
          <div
            class="yarn"
            :class="childrenactive == index ? 'active' : ''"
            v-for="(item, index) in navList"
            :key="item.id"
          >
            <div
              style="margin-top: 10px; cursor: pointer"
              @click="clickYarn(item.id, index)"
            >
              {{ item.name }}
            </div>
            <div class="content-left-box" v-for="item in 3" :key="item"></div>
          </div>
        </div>
        <div class="content-right">
          <div v-for="item in teamList" :key="item.id">
            <div class="content-right-time">{{ item.title }}</div>
            <div class="content-writh">
              <div class="content-intro" v-html="item.content"></div>
              <div class="content-image" v-if="item.img.length > 0">
                <img
                  v-for="(pitem, index) in item.img"
                  :key="index"
                  class="content-img"
                  :src="pitem.url"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="honor" v-if="type == 6">
      <titileBus title="荣誉资质"></titileBus>
      <honor :contentId="contentId"></honor>
    </div>
    <div v-if="type == 7">
      <titileBus title="联系我们"></titileBus>
      <Map></Map>
    </div>
  </div>
</template>

<script setup name="teammanagement">
import { onMounted, reactive, toRefs } from "vue";
import Map from "./map.vue";
import honor from "./honorswiper.vue";
import oraniz from "./organization.vue";
import $bus from "@/utils/bus.js";
import titileBus from "@/components/title.vue";
import { gettree, get } from "@/utils/request.js";
const contentObj = reactive({
  type: "",
  contentId: null, //导航id
  active: 0,
  childrenactive: 0,
  brief: {},
  teamList: [],
  navList: [],
});
const { type, contentId, active, childrenactive, brief, teamList, navList } =
  toRefs(contentObj);
onMounted(() => {
  $bus.on("content", (val) => {
    contentId.value = val.id;
    console.log(contentId.value);
    type.value = val.index + 1;
    clear();
    if (type.value == 6 || type.value == 7) {
      return;
    }
    if (type.value == 4 || type.value == 5) {
      threeNav();
      return;
    }
    getCont();
  });
});
//清空数据
const clear = () => {
  active.value = 0;
  childrenactive.value = 0;
  navList.value = [];
  teamList.value = [];
  brief.value = {};
};
//三级菜单获取
const threeNav = () => {
  gettree(contentId.value, false).then((res) => {
    console.log(res.data, "三级菜单");
    navList.value = res.data;
    getCont(res.data[0].id);
  });
};
//获取内容信息
const getCont = (id) => {
  let data = {
    categoryId: id ? id : contentId.value,
    status: "publish",
  };
  get("/cms/article/list", data).then((res) => {
    switch (type.value) {
      case 1:
        brief.value = res.rows[0];
        break;
      case 2:
        teamList.value = res.rows;
        break;
      case 4:
        brief.value = res.rows[0];
        break;
      case 5:
        teamList.value = res.rows;
        break;
      default:
        break;
    }
  });
};
const clickYarn = (id, index) => {
  childrenactive.value = index;
  getCont(id);
};
const navClick = (index, id) => {
  active.value = index;
  getCont(id);
};
</script>

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
        line-height: 95px;
        font-size: 32px;
        color: #fff;
        height: 95px;
        width: 100%;
        background: #0c5cd6;
        display: flex;
        align-items: center;
        img {
          margin-right: 20px;
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
            p {
              text-indent: 2em;
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
}
@media (max-width: 1440px) {
  .hotcontent {
    width: 1200px;
    .content {
      width: 100%;
      padding: 0px 0 50px;
      .group {
        .top {
          padding-left: 80px;
          box-sizing: border-box;
          line-height: 95px;
          font-size: 32px;
          color: #fff;
          height: 95px;
          width: 100%;
          background: #0c5cd6;
          display: flex;
          align-items: center;
          img {
            margin-right: 20px;
          }
        }
        .bottom {
          background: #fafafa;
          height: 540px;
          padding: 30px 40px 40px 66px;
          display: flex;
          .b-left {
            width: 60%;
            height: 100%;
            font-size: 18px;
            margin-right: 70px;
            line-height: 30px;
            padding-top: 35px;
            .b-pBox {
              width: 100%;
              height: 300px;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 10; /* Limit to 3 lines */
              text-align: justify;
              p {
                text-indent: 2em;
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
              margin-top: 50px;
              color: #fff;
              background: #0c5cd6;
              font-size: 18px;
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
}
</style>
