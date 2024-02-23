<template>
  <div class="header">
    <div class="web-nav">
      <div class="nav-bar">
        <div class="nav-l"></div>
        <div class="nav-r" @click="toggleNav">
          <i class="iconfont">&#xe6e4;</i>
        </div>
      </div>
    </div>
    <div class="pc-nav" ref="pcNav">
      <!-- <div class="weather-bar">天气信息</div> -->
      <div class="nav-bar">
        <a class="nav-l" href="./index.html">
          <img
            :src="
              !logoShow
                ? '/static/images/logo.jpg'
                : '/static/images/logo-black.png'
            "
            alt=""
          />
        </a>
        <div class="nav-r">
          <ul>
            <li
              v-for="(item, index) in navList"
              :key="item.id"
              :class="index == 0 ? 'active' : ''"
            >
              <a :href="item.url">{{ item.name }}</a>
              <ul v-if="item.children&&!item.pageTitle">
                <li v-for="p in item.children" :key="p.id">
                  <a v-if="p.jumpurl" :href="p.jumpurl" target="_blank">{{
                    p.name
                  }}</a>
                  <a v-else :href="item.url + (p.url??'')">{{ p.name }}</a>
                </li>
              </ul>
            </li>
          </ul>
          <div class="search">
            <input
              type="text"
              ref="searchInput"
              placeholder="请输入关键字"
              maxlength="20"
              v-model.trim="keywords"
              @keydown.enter="search"
            />
            <i class="iconfont iconsearch" @click="toggleSearchInput"
              >&#xe840;</i
            >
          </div>
          <!-- <div class="lang">
            <i class="iconfont"> &#xe640;</i>
            <ul>
              <li>
                <a href="/index.html"
                  ><img src="@/assets/images/icon_cn.png" alt="" />CN</a
                >
              </li>
              <li>
                <a href="/index.html"
                  ><img src="@/assets/images/icon_en.png" alt="" />EN</a
                >
              </li>
              <li>
                <a href="/index.html"
                  ><img src="@/assets/images/icon_kor.png" alt="" />KOR</a
                >
              </li>
              <li>
                <a href="/index.html"
                  ><img src="@/assets/images/icon_jp.png" alt="" />JP</a
                >
              </li>
            </ul>
          </div> -->
        </div>
      </div>
    </div>
    <el-drawer v-model="show" direction="ltr" modal-class="drawer-nav">
      <div>
        <ul>
          <li>
            <a>首页</a>
          </li>
          <li>
            <a>关于我们</a>
          </li>
          <li>
            <a>党建工作</a>
          </li>
          <li>
            <a>热点新闻</a>
          </li>
          <li>
            <a>岛城印象</a>
          </li>
          <li>
            <a>品牌和企业文化</a>
          </li>
          <li>
            <a>人力资源</a>
          </li>
          <li>
            <a>阳光招采</a>
          </li>
        </ul>
      </div>
    </el-drawer>
  </div>
</template>
<script setup name="Header">
import { ElDrawer } from "element-plus";

import { onMounted, ref, reactive } from "vue";
import { getTtrees, getClassification } from "@/utils/package.js";
import { gettree } from "@/utils/request.js";

import { debounce } from "@/utils/index.js";
const searchInput = ref();
const pcNav = ref();
const show = ref(false);
const logoShow = ref(false);
const keywords=ref('')
let navList = ref([
  { id: 1, title: "首页", href: "./index.html" },
  {
    id: 2,
    title: "关于我们",
    href: "./about.html",
    children: [
      { id: 11, title: "集团简介", href: "#" },
      { id: 12, title: "管理团队", href: "#" },
      { id: 13, title: "组织架构", href: "#" },
      { id: 40, title: "集团板块", href: "#" },
      { id: 14, title: "发展历程", href: "#" },
      { id: 15, title: "荣誉资质", href: "#" },
      { id: 13, title: "联系我们", href: "#" },
    ],
  },
  {
    id: 3,
    title: "党建工作",
    href: "./party.html",
    children: [
      { id: 14, title: "党委概况", href: "#" },
      { id: 15, title: "党建品牌", href: "#" },
      { id: 16, title: "组织架构", href: "#" },
      { id: 17, title: "党建先锋", href: "#" },
      { id: 18, title: "党建动态", href: "#" },
      { id: 19, title: "廉洁青旅", href: "#" },
    ],
  },
  {
    id: 4,
    title: "热点新闻",
    href: "./hotnews.html",
    children: [
      { id: 20, title: "新闻中心", href: "./hotnews.html" },
      { id: 21, title: "行业动态", href: "#" },
      { id: 22, title: "媒体动态", href: "#" },
      { id: 23, title: "集团公告", href: "#" },
      { id: 24, title: "视频中心", href: "#" },
      { id: 25, title: "主题活动", href: "#" },
    ],
  },
  { id: 5, title: "岛城印象", href: "./Islandcity.html" },
  {
    id: 6,
    title: "品牌和企业文化",
    href: "./brand.html",
    children: [
      { id: 26, title: "品牌标识", href: "#" },
      { id: 27, title: "集团愿景", href: "#" },
      { id: 28, title: "核心价值观", href: "#" },
      { id: 29, title: "企业文化", href: "#" },
      { id: 30, title: "社会责任", href: "#" },
    ],
  },
  { id: 7, title: "人力资源", href: "./human.html" },
  { id: 8, title: "信息公示", href: "./Information.html" },
]);
//搜索事件
const search=()=>{
  // console.log('回车搜索关键词',keywords.value);
  location.href="/keyword.html?keywords="+keywords.value
}
const toggleSearchInput = function () {
  if (searchInput.value) {
    searchInput.value.classList.toggle("active");
  }
};
const toggleNav = function () {
  show.value = !show.value;
};
const handleScroll = function () {
  const offset = window.document.documentElement.scrollTop;
  if (offset > 0) {
    if (pcNav.value) {
      pcNav.value.classList.add("active");
      logoShow.value = true;
    }
  } else {
    if (pcNav.value) {
      pcNav.value.classList.remove("active");
      logoShow.value = false;
    }
  }
};
onMounted(() => {
  window.addEventListener("scroll", debounce(handleScroll, 100));
  fetchData();
});
async function fetchData() {
  try {
    await getTtrees();
    const result = getClassification("heardNav"); // 替换 'yourFunc' 为需要的值
    gettree(result, false).then((element) => {
      navList.value = element.data;
      console.log(element.data,'头部数据');
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
</script>
<style scoped lang="scss">
@media screen and (max-width: 1440px) {
  /*当屏幕尺寸小于1440px时，应用下面的CSS样式*/
  .header .pc-nav {
    font-size: 14px !important;
    .weather-bar {
      height: 50px !important;
    }
    .nav-bar {
      width: 1200px !important;
      height: 90px !important;
      .nav-l {
        padding-left: 0px !important;
        display: flex;
        justify-content: flex-start !important;
      }
      .nav-r {
        padding-right: 0px !important ;
      }
      .nav-r > ul {
        li {
          line-height: 90px !important;
        }
      }
    }
    .iconfont {
      font-size: 18px;
    }
    .iconsearch {
      font-size: 24px;
    }
  }
  .header .pc-nav.active {
    .weather-bar {
      margin-top: -50px !important;
    }
  }
}
@media (min-width: 1440px) and (max-width: 1600px) {
  .header .pc-nav {
  padding: 0 5%;
  box-sizing: border-box;
  }
}
/* @media screen and (max-width: 1200px) {
  .header .web-nav {
    display: block !important;
  }
  .header .pc-nav {
    display: none !important;
  }
} */
:deep(.drawer-nav) {
  .el-drawer {
    width: 400px !important;
    max-width: 100% !important;
    .el-drawer__body {
      ul {
        margin: 0;
        padding: 0;
        li {
          list-style: none;
          cursor: pointer;
          box-shadow: 3px 3px 5px #ccc;
          a {
            line-height: 50px;
            padding-left: 20px;
          }
          &:hover {
            background-color: #00a4ec;
            color: #fff;
          }
        }
      }
    }
  }
}
.header {
  width: 100%;
  min-width: 1200px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  .web-nav {
    display: none;
    width: 100%;
    background-color: #fff;
    .nav-bar {
      height: 60px;
      display: flex;
      justify-content: space-between;
      .nav-l {
        height: 100%;
        flex: 0 0 300px;
        padding-left: 100px;

        /* background-color: pink; */
        /* background: url('@/assets/images/logo.jpg');  */
      }
      .nav-r {
        line-height: 60px;
        cursor: pointer;
        i {
          font-size: 30px;
          color: blue;
        }
      }
    }
  }
  .pc-nav.active {
    background-color: #fff;
    .weather-bar {
      margin-top: -80px;
      transition: all 0.5s linear;
    }
    .nav-bar {
      color: rgb(51, 51, 51);
    }
    .nav-bar .nav-r > ul li a {
      color: rgb(51, 51, 51);
    }
  }
  .pc-nav {
    width: 100%;
    position: relative;
    top: 0;
    font-size: 16px;
    .weather-bar {
      width: 100%;
      height: 80px;
      background-color: gray;
      margin-top: 0;
      transition: all 0.5s linear;
    }
    .nav-bar {
      margin: 0 auto;
      width: 100%;
      height: 90px;
      max-width: 1600px;
      display: flex;
      justify-content: space-between;
      color: #fff;
      .nav-l {
        height: 100%;
        flex: 0 0 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 88%;
        }
        /* background-color: pink; */
      }
      .nav-r {
        height: 100%;
        display: flex;
        align-items: center;
        .search {
          margin-left: 20px;
          padding-left: 10px;
          cursor: pointer;
          position: relative;
          input {
            position: absolute;
            padding: 0;
            border: 0;
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            box-shadow: rgb(51, 51, 51) 0px 0px 4px;
            width: 0;
            height: 44px;
            line-height: 44px;
            background: rgb(255, 255, 255);
            outline: none;
            border-radius: 6px;
          }
          .active {
            width: 200px;
            padding: 0px 20px;
            transition: all 0.4s ease 0s;
          }
        }
        .lang {
          margin-left: 30px;
          position: relative;
          cursor: pointer;
          &:hover {
            ul {
              display: block;
            }
          }
          ul {
            display: none;
            margin: 0;
            padding: 0;
            position: absolute;
            left: 50%;
            top: 100%;
            width: 100px;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
            border-radius: 4px;
            overflow: hidden;
            animation: navU2 0.5s ease forwards;
            @keyframes navU2 {
              0% {
                opacity: 0;
                transform: translate(-50px, -30px);
              }
              100% {
                opacity: 1;
                transform: translate(-50px, 0);
              }
            }
            li {
              list-style: none;
              box-sizing: border-box;
              cursor: pointer;
              a {
                display: block;
                padding: 0 10px;
                height: 40px;
                text-transform: uppercase;
                text-align: center;
                line-height: 40px;
                border-bottom: 1px solid #dfdfdf;
                background: #fff;
                box-shadow: 0 0 6px #dfdfdf;
                text-decoration: none;
                color: rgb(51, 51, 51);
                &:hover {
                  color: #004898;
                }
                img {
                  margin-right: 10px;
                  width: 32px;
                }
              }
            }
          }
        }
        > ul {
          height: 100%;
          display: flex;
          margin: 0;
          padding: 0;
          > li {
            list-style: none;
            padding: 0 10px;
            margin: 0 5px;
            line-height: 90px;
            display: inline-block;
            position: relative;
            cursor: pointer;
            transition: all 0.2s linear;
            &::before {
              /* 伪元素来做下划线 */
              content: "";
              position: absolute;
              bottom: 0;
              left: 100%;
              width: 0; /* 一开始宽度为0下划线也为0看不出来 */
              height: 0;
              border-bottom: 3px solid;
              border-image: linear-gradient(
                  90deg,
                  #e60012,
                  #ea5703,
                  #f39800,
                  #b0cb03,
                  #6ab935,
                  #01af7f,
                  #0082cb,
                  #0d6fb8,
                  #2b328e
                )
                2;
              border-radius: 2px;
              transition: all 0.2s linear;
            }
            &:hover {
              &::before {
                width: 100%; /* hover后宽度显示出来下划线也显示出来 */
                bottom: 0;
                left: 0;
                transition-delay: 0.1s;
              }
              ul {
                display: block;
              }
            }
            a {
              text-decoration: none;
              color: #fff;
            }
            ul {
              display: none;
              margin: 0;
              padding: 0;
              position: absolute;
              left: 50%;
              top: 100%;
              width: 150px;
              box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
              border-radius: 4px;
              overflow: hidden;
              animation: navU 0.5s ease forwards;
              @keyframes navU {
                0% {
                  opacity: 0;
                  transform: translate(-75px, -30px);
                }
                100% {
                  opacity: 1;
                  transform: translate(-75px, 0);
                }
              }
              li {
                list-style: none;
                box-sizing: border-box;
                cursor: pointer;
                a {
                  display: block;
                  height: 40px;
                  text-transform: uppercase;
                  text-align: center;
                  line-height: 40px;
                  border-bottom: 1px solid #dfdfdf;
                  background: #fff;
                  box-shadow: 0 0 6px #dfdfdf;
                  text-decoration: none;
                  color: rgb(51, 51, 51);
                  &:hover {
                    color: #004898;
                  }
                  img {
                    margin-right: 10px;
                    width: 32px;
                  }
                }
              }
            }
          }
          li:hover ~ li:before {
            left: 0;
          }
          li.active {
            &::before {
              width: 100%; /* hover后宽度显示出来下划线也显示出来 */
              bottom: 0;
              left: 0;
            }
          }
        }
      }
    }
  }
  .iconsearch {
    font-size: 30px;
  }
}
</style>
