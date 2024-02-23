<template>
  <div
    ref="bannerRef"
    class="city"
    :style="
      'background: url(' + banner + ') no-repeat;background-size: 100% 100%;'
    "
  >
    <div class="mask">
      <div class="hotcontent">
        <div class="left">
          <div
            class="box"
            ref="animation"
            :class="active == index ? 'active' : ''"
            v-for="(item, index) in nav"
            :key="item.id"
            @click="navBtn(index)"
          >
            <div class="name">
              <div style="font-family: pmz">{{ item.name }}</div>
              <div class="vertical">{{ item.description }}</div>
            </div>
          </div>
        </div>
        <div
          class="right animate__animated animate__faster"
          ref="rightRef"
          @mouseenter="mouseenter"
          @mouseleave="mouseleave"
        >
          <div class="topNav">
            <div
              class="navList"
              :class="index == on ? 'on' : ''"
              @click="topNav(item.id, index)"
              v-for="(item, index) in conNav"
              :key="item.id"
            >
              <h1>{{ item.name }}</h1>
              <p>{{ item.pageTitle }}</p>
            </div>
          </div>
          <div class="bottomCon">
            <!-- <div class="conLef" v-if="content.title">{{ content.title }}</div> -->
            <div class="conRight">
              <p v-html="content.content"></p>
              <div @click="detail">
                <a>查看详情</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, toRefs, onUnmounted } from "vue";
import { getClassification } from "@/utils/package.js";
import { gettree } from "@/utils/request.js";
import { get } from "@/utils/request.js";
import { formatDate } from "@/utils/time.js";
const rightRef = ref();
const banner = ref("/static/images/city.jpg");
const emit = defineEmits(["detail"]);
const animation = ref(null);
const bannerRef = ref();
const delayedAction = ref(null);
const Obj = reactive({
  nav: [],
  active: 0,
  timer: null,
  conNav: [],
  content: {},
  isShow: true,
  on: 0,
});
const { nav, active, timer, conNav, content, isShow, on } = toRefs(Obj);
onMounted(() => {
  action();
  let Data = localStorage.getItem("Data");
  //获取二级导航
  fetchData(JSON.parse(Data));
});
async function fetchData(data) {
  const result = getClassification("Islandcity", data); // 替换 'yourFunc' 为需要的值
  gettree(result, false).then((res) => {
    nav.value = res.data.slice(0, 4);
    console.log(res.data);
    conNav.value = res.data[0].children;
    banner.value = res.data[0].imgurls;
    getDetail(res.data[0].children[0].id);
  });
}
onUnmounted(() => {
  clearInterval(timer.value);
});

//添加动画效果
const animtianAdd = () => {
  // bannerRef.value.classList.add("animate__fadeIn");
  rightRef.value.classList.add("animate__fadeIn");
  setTimeout(() => {
    if (rightRef.value) {
      // bannerRef.value.classList.remove("animate__fadeIn");

      rightRef.value.classList.remove("animate__fadeIn");
    }
  }, 500);
};
//切换详情
const topNav = (id, index) => {
  on.value = index;
  getDetail(id);
};

// 移入内容
let entertime = "";
let leavetime = "";
const mouseenter = () => {
  if (delayedAction.value) {
    clearTimeout(delayedAction.value);
  }
  clearInterval(timer.value);
  entertime = new Date();
  
  console.log("移入", formatDate());
};
//移出内容
const mouseleave = () => {
  leavetime = new Date();
  if (delayedAction.value) {
    console.log("清除一次性定时器");
    clearTimeout(delayedAction.value);
  }
  console.log(parseInt(leavetime - entertime) + "秒");
  let remain = parseInt(leavetime - entertime); //移入了总共几秒钟
  let remaintime = "";
  if (remain > 6000) {
    remaintime = 1000;
  } else {
    remaintime = 6000 - remain;
  }
  delayedAction.value = setTimeout(() => {
    // 移出后执行的逻辑
    if (active.value == 3) {
      active.value = 0;
    } else {
      active.value++;
    }
    conNav.value = nav.value[active.value].children;
    banner.value = nav.value[active.value].imgurls;
    getDetail(conNav.value[0].id);
    action();
  }, 3000);
};
//开始计时
const action = () => {
  console.log("开始计时");
  timer.value = setInterval(() => {
    animtianAdd();
    on.value = 0;
    if (active.value == 3) {
      active.value = 0;
      conNav.value = nav.value[active.value].children;
      banner.value = nav.value[active.value].imgurls;

      getDetail(conNav.value[0].id);
      return;
    }
    active.value++;
    conNav.value = nav.value[active.value].children;
    banner.value = nav.value[active.value].imgurls;
    getDetail(conNav.value[0].id);
  }, 6000);
};
//点击侧边栏
const navBtn = (index) => {
  if (timer.value) {
    console.log("清除定时器");
    clearInterval(timer.value);
  }
  if (delayedAction.value) {
    console.log("清除一次性定时器");
    clearTimeout(delayedAction.value);
  }
  on.value = 0;
  active.value = index;
  conNav.value = nav.value[active.value].children;
  banner.value = nav.value[index].imgurls;
  getDetail(conNav.value[0].id);
  setTimeout(() => {
    action();
  }, 10);
  animtianAdd();
};
//获取详情
const getDetail = (id) => {
  //文章模板---获取内容信息
  let data = {
    categoryId: id,
    status: "publish",
  };
  get("/cms/article/list", data).then((res) => {
    content.value = res.rows[0];
  });
};

// 点击查看详情
const detail = (item) => {
  let urlHash = nav.value[active.value].url;
  let query = conNav.value[on.value].id;
  console.log(urlHash, query);
  location.href = `/citycon.html?query=${query}${urlHash}`;

  clearInterval(timer.value);
  isShow.value = false;
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
.city {
  width: 100%;
  height: 100vh;
  .mask {
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.2);
    .hotcontent {
      width: 100%;
      max-width: 1600px;
      padding-left: 1%;
      height: 100%;
      margin: 0 auto;
      padding-top: 150px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .left {
        width: 15%;
        height: 80%;
        min-height: 110px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .box {
          width: 100%;
          height: 23%;
          min-width: 116px;
          background: firebrick;
          background: rgba($color: #000000, $alpha: 0.5);
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          &.active {
            position: relative;
            color: #63c4ff;
            &::before {
              content: "";
              position: absolute;
              bottom: 0px;
              left: 0;
              bottom: 0;
              width: 0;
              height: 5px;
              background-color: #63c4ff;
              animation: fill 5.5s forwards;
              z-index: 9;
            }
            &::after {
              content: "";
              position: absolute;
              bottom: -10px;
              left: 0;
              bottom: 0;
              width: 100%; /* 初始宽度为0 */
              height: 5px;

              background-color: rgba(255, 255, 255, 0.9); /* 高亮颜色 */
              z-index: 4;
            }
          }

          /* 定义动画效果 */
          @keyframes fill {
            to {
              width: 100%; /* 最终宽度为100% */
            }
          }
          .name {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 60px;
            font-size: 80px;
            .vertical {
              width: 60px;
              height: 100%;
              font-size: 14px;
              transform: rotate(90deg);
              margin-left: -20px;
              display: flex;
              justify-content: center;
              text-transform: uppercase;
            }
          }
        }
      }
      .right {
        width: calc(100% - 17%);
        height: 80%;
        box-sizing: border-box;
        background: rgba($color: #000000, $alpha: 0.5);
        padding-top: 50px;
        padding-left: 25px;
        .topNav {
          color: #fff;
          display: flex;
          .navList {
            padding:0 40px;
            border-right: 2px solid #fff;
            box-sizing: border-box;
            cursor: pointer;
            &.on {
              color: #63c4ff;
            }
            h1 {
              font-size: 22px;
              margin-bottom: 10px;
            }
            p {
              font-size: 12px;
            }
            &:last-child {
              border: none;
            }
          }
        }
        .bottomCon {
          display: flex;
          justify-content: space-between;
          margin-top: 60px;
          padding: 0 50px;
          box-sizing: border-box;
          .conLef {
            max-width: 100px;
            height: 100px;
            font-size: 28px;
            display: flex;
            justify-content: center;
            color: #fff;
            font-family: Medium;
          }
          .conRight {
            max-height: 300px;
            overflow: hidden;
            p {
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 10; /* Limit to 3 lines */

              text-align: justify;
              text-indent: 2em;
              color: #fff;
              line-height: 30px;
              /* height: 365px; */
              margin-bottom: 40px;
            }
            div {
              cursor: pointer;
              width: 200px;
              margin: 0 auto;
              color: #fff;
              border: 1px solid #fff;
              border-radius: 5px;
              height: 50px;
              display: flex;
              justify-content: center;
              align-items: center;
              a {
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
}
@media (max-width: 1440px) {
  .city {
    min-width: 1200px;
    /* min-height: 783px; */
    .mask {
      .hotcontent {
        width: 1200px;
        padding-left: 0%;
        .right {
          .bottomCon {
            margin-top:40px;
            .conRight {
              width: calc(100% - 120px);
              overflow: visible;
              p {
                text-align: justify;
                text-indent: 2em;
                color: #fff;
                line-height: 30px;
                /* height: 240px; */
                margin-bottom: 40px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 7; /* Limit to 3 lines */
                text-align: justify;
              }
              div {
                width: 200px;
                margin: 0 auto;
                color: #fff;
                border: 1px solid #fff;
                border-radius: 5px;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
        }
        .left {
          width: 15%;
          height: 80%;
          min-height: 110px;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          .box {
            width: 100%;
            height: 23%;
            min-width: 116px;
            background: firebrick;
            background: rgba($color: #000000, $alpha: 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            &.active {
              position: relative;
              color: #63c4ff;
              &::before {
                content: "";
                position: absolute;
                bottom: 0px;
                left: 0;
                bottom: 0;
                width: 0;
                height: 5px;
                background-color: #63c4ff;
                animation: fill 5.5s forwards;
                z-index: 9;
              }
              &::after {
                content: "";
                position: absolute;
                bottom: -10px;
                left: 0;
                bottom: 0;
                width: 100%; /* 初始宽度为0 */
                height: 5px;

                background-color: rgba(255, 255, 255, 0.9); /* 高亮颜色 */
                z-index: 4;
              }
            }

            /* 定义动画效果 */
            @keyframes fill {
              to {
                width: 100%; /* 最终宽度为100% */
              }
            }
            .name {
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 60px;
              .vertical {
                width: 60px;
                height: 100%;
                font-size: 14px;
                transform: rotate(90deg);
                margin-left: -20px;
              }
            }
          }
        }
      }
    }
  }
}
@media (min-width:1440px) and (max-width:1600px){
  .mask {
    padding: 0 5%;
    box-sizing: border-box;
  }
}
</style>
