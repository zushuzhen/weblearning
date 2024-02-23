<script setup>
import titileBus from "@/components/title.vue";
import { reactive, ref, onMounted, nextTick } from "vue";
import { get, gettree } from "../../utils/request";
import { debounce } from "@/utils/index.js";
const contr = ref(null);
const navList = ref([]);
const navactive = ref(0);
const curNav = ref({});
const dispalaySHow = ref(true);
const props = defineProps(["cmpData"]);
const pageData = reactive({
  articles: [],
});
let data = {
  categoryId: props.cmpData.id,
  status: "publish",
  params: {
    containSub: true,
  },
};
const rightList = ref({});
get("/cms/article/list", data).then((res) => {
  console.log(res);
  if (res.rows && res.rows.length > 0) {
    pageData.articles = res.rows;
  }
  gettree(props.cmpData.id, false).then((res) => {
    console.log(res.data, "三级菜单");
    navList.value = res.data;

    pageData.articles.forEach((article) => {
      navList.value.forEach((nav) => {
        if (article.categoryId && article.categoryId.includes(nav.id)) {
          if (nav.article) {
            nav.article.push(article);
          } else {
            nav.article = [article];
          }
        }
      });
    });
    curNav.value = navList.value[0];
  });
});
onMounted(() => {
});
//双向锚点
const handleScroll = () => {
  // 获取所有锚点元素
  const navContents = document.querySelectorAll(".anchor-item");
  // 所有锚点元素的 offsetTop
  console.log(navContents);
  const offsetTopArr = [];
  navContents.forEach((item) => {
    offsetTopArr.push(item.offsetTop);
  });
  // 获取当前文档流的 scrollTop
  const offset = contr.value.scrollTop;

  offsetTopArr.forEach((item, index) => {
    if (offset >= item) {
      navactive.value=index
    }
  });
};
function clickYarn(item) {
  curNav.value = item;
}
function leftClick(item,index) {
  // 获取你想要滚动的元素
  navactive.value=index
  var ee = rightList.value[item.id];
  console.log(contr, ee.offsetTop, ee.offsetParent);
  contr.value.scrollTo({
    top: ee.offsetTop,
    left: 0,
    behavior: "smooth",
  });
  // ee.scrollIntoView({
  //   behavior: "smooth",
  //   block: "start",
  // });
}
</script>

<template>
  <div>
    <titileBus title="发展历程"></titileBus>
    <div class="contentf" style="position: relative">
      <!--      <div v-show="dispalaySHow" class="dispaly" style="height: 1000px"></div>-->

      <div id="conLeft" class="content-left">
        <div
          class="yarn"
          :class="navactive == index ? 'active' : ''"
          v-for="(item, index) in navList"
          :key="item.id"
          @click="leftClick(item,index)"
        >
          <div
            style="margin-top: 10px; cursor: pointer"
            @click="clickYarn(item)"
          >
            {{ item.name }}
          </div>
          <div v-if="index !== navList.length - 1">
            <div class="content-left-box" v-for="item in 2" :key="item"></div>
          </div>
        </div>
      </div>
      <div class="content-right" ref="contr" @scroll="handleScroll">
        <template v-for="(nav, index) in navList">
          <div
            class="anchor-item"
            style="font-size: 30px; color: #0c5cd6"
            :ref="
              (el) => {
                rightList[nav.id] = el;
              }
            "
          >
            {{ nav.name }}
          </div>
          <div v-for="(item, index) in nav.article" :key="item.id">
            <div class="content-right-time" style="color: #333">
              {{ item.title }}
            </div>
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
        </template>
      </div>
    </div>
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
  .contentf {
    display: flex;
    overflow: hidden;
    margin-bottom: 50px;
    .content-left::-webkit-scrollbar {
      display: none;
    }
    .content-left {
      padding-bottom: 50px;
      width: 300px;
      border-right: 1px solid #e8e8e8;
      height: 800px;
      overflow: auto;
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      padding-right: 60px;
      box-sizing: border-box;

      .yarn {
        font-size: 20px;
        color: #666;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

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
    .content-right::-webkit-scrollbar {
      display: none;
    }
    .content-right {
      overflow-y: scroll;
      overscroll-behavior-y: contain;
      margin-left: 50px;
      height: 800px;
      overflow: auto;
      > div {
        margin-bottom: 50px;

        .content-right-time {
          color: #0c5cd6;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 10px;
          text-wrap: nowrap;
        }

        .content-writh {
          .content-intro {
            font-size: 16px;
            color: rgb(102, 102, 102);
            line-height: 1.875;
          }

          .content-image {
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
.disable-scroll {
  overflow: hidden !important;
}
@media (max-width: 1440px) {
  .hotcontent {
    /* width: 1200px; */

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
