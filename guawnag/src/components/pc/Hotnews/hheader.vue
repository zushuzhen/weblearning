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
    <div
      class="pc-nav animate__fadeInDown animate__faster"
      :class="prop.us ? 'active' : ''"
      ref="pcNav"
    >
      <!-- <div class="weather-bar">天气信息</div> -->
      <div class="nav-bar">
        <a class="nav-l" href="./index.html">
          <img
            :src="
              prop.us
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
              :class="curNav == item.name ? 'active' : ''"
            >
              <a :href="item.url">{{ item.name }}</a>
              <ul v-if="item.children && !item.pageTitle">
                <li v-for="(p, index) in item.children" :key="p.id">
                  <a v-if="p.jumpurl" :href="p.jumpurl" target="_blank">{{
                    p.name
                  }}</a>
                  <a v-else :href="item.url + (p.url ?? '')">{{ p.name }}</a>
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
              v-model="keywords"
              @keydown.enter="search"
            />
            <i class="iconfont iconsearch" @click="toggleSearchInput"
              >&#xe840;</i
            >
          </div>
          <!--          <div class="lang">
            <i class="iconfont">&#xe640;</i>
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
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup name="Header">
import { ref, reactive, onMounted, watch } from "vue";
import { ElDrawer } from "element-plus";
import $bus from "@/utils/bus.js";
import { gettree } from "@/utils/request.js";
import { getTtrees, getClassification } from "@/utils/package.js";

import { debounce } from "@/utils/index.js";
const prop = defineProps({ us: Boolean, curNav: String });

const searchInput = ref();
const pcNav = ref();
const show = ref(false);
const on = ref(0);

const navList = ref([]);
const keywords = ref("");
//搜索事件
const search = () => {
  console.log("回车搜索关键词", keywords.value);
  location.href = "/keyword.html?keywords=" + keywords.value;
};
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
  if (offset > 580) {
    if (pcNav.value) {
      pcNav.value.classList.add("animate__animated", "animate__fadeOutUp");
    }
  } else {
    if (pcNav.value) {
      pcNav.value.classList.remove("animate__animated", "animate__fadeOutUp");
      pcNav.value.classList.add("animate__animated", "animate__fadeInDown");
    }
  }
};

onMounted(() => {
  let Data = localStorage.getItem("Data");
  //获取导航数据
  fetchData(JSON.parse(Data));
  $bus.on("active", (val) => {
    on.value = val.bannerQuery.active;
  });
  window.addEventListener("scroll", debounce(handleScroll, 10));
});
async function fetchData(Data) {
  // await getTtrees();
  const result = getClassification("heardNav", Data); // 替换 'yourFunc' 为需要的值
  console.log(result, "数据");
  gettree(result, false).then((element) => {
    navList.value = element.data;
  });
}
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
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
  /* .header .pc-nav.active {
    display: none;
    .weather-bar {
      margin-top: -50px !important;
    }
  } */
}
@media (min-width: 1440px) and (max-width: 1600px) {
  .header .pc-nav {
    box-sizing: border-box;
    padding: 0 5%;
  }
}
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
  z-index: 9;
  .web-nav {
    display: none;
    width: 100%;
    background-color: #fff;
    .nav-bar {
      height: 60px;
      display: flex;
      justify-content: space-between;
      color: rgb(51, 51, 51);
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
    .nav-bar .nav-r > ul li a {
      color: rgb(51, 51, 51);
    }
  }
  .pc-nav.active {
    background-color: rgba($color: #000000, $alpha: 0.2);
    .weather-bar {
      margin-top: -80px;
      transition: all 0.5s linear;
    }
    .nav-bar {
      color: #fff;
    }
    .nav-bar .nav-r > ul > li > a {
      color: #fff;
    }
  }
  .pc-nav {
    width: 100%;
    position: relative;
    top: 0;
    font-size: 16px;
    background-color: #fff;
    transition: 0.3s;
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
      color: rgb(51, 51, 51);
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
              color: rgb(51, 51, 51);
            }
            /* 二级菜单出 */
            ul {
              display: none;
              margin: 0;
              padding: 0;
              position: absolute;
              background: #fff;
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
