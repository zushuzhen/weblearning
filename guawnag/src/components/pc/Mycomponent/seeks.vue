<template>
  <div class="layout">
    <div class="seek" id="seekanimation" ref="seekRef">
      <div>Information Center</div>
      <div><span class="line">资讯中心</span></div>
      <div class="nav-r">
        <ul id="navList">
          <li
            :class="index == navon ? 'active' : ''"
            v-for="(item, index) in seekNav"
            :key="item.id"
            @click="seekClick(index, item)"
            style="font-size: 20px; font-family: Medium"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="consulting" ref="contentRef">
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
        <div
          v-if="active == 0"
          class="con-top wow animate__animated"
          :class="topping ? 'animate__fadeIn' : ''"
        >
          <div class="top" v-if="noticeList.length > 0">
            <div class="left">
              <div class="image">
                <img src="@/assets/images/notice.png" alt="" />
              </div>
              <i class="iconfont">&#xe633;</i>
            </div>
            <div class="right">
              <el-carousel
                direction="vertical"
                indicator-position="none"
                class="elCarousel"
              >
                <el-carousel-item
                  v-for="(item, index) in noticeList"
                  :key="item.id"
                  @click="goContent(item)"
                >
                  {{ item.title }}
                </el-carousel-item>
              </el-carousel>
              <div class="elmore" @click="elmoreBtn">查看更多></div>
            </div>
          </div>
          <div class="con-right">
            <div class="left-con">
              <div class="card" @click="goContent(topping)">
                <div class="card-img">
                  <!-- {{ topping.img[0] }}
                  {{ topping.img }} -->
                  <img
                    :src="
                      topping.img && topping.img.length > 0
                        ? topping.img[0].url
                        : '/static/images/defalut.png'
                    "
                    alt=""
                  />
                </div>
                <div
                  class="card-text"
                >
                  <div class="text text-lg ellipsis">
                    {{ topping.title }}
                  </div>
                  <div class="tag">
                    <div
                      class="topping"
                      v-if="topping.tags && topping.tags.length > 0"
                    >
                      <span>
                        {{ gettages(topping.tags[0]) }}
                      </span>
                    </div>
                    <div class="release">
                      <div class="time" v-if="topping.publishtime">
                        {{ formatDate(topping.publishtime, "all") }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="img-box">
                <div style="width: 100%" v-if="showSwiper">
                  <swiper
                    ref="Myswiper"
                    :modules="modules"
                    :loop="true"
                    :pagination="{ clickable: true }"
                    :autoplay="{ delay: 3000, pauseOnMouseEnter: true }" 
                  >
                  <!-- -->

                    <swiper-slide
                      class="swiperBoxc"
                      style="height: 230px"
                      v-for="item in swiperNews"
                      :key="item.id"
                      @click="goContent(item)"
                    >
                      <el-image
                        class="img images"
                        :src="
                          item.img && item.img.length > 0
                            ? item.img[0].url
                            : '/static/images/defalut.png'
                        "
                        fit="cover"
                      />
                      <div class="text">
                        {{ item.title }}
                      </div>
                    </swiper-slide>
                  </swiper>
                </div>
              </div>
            </div>
            <div class="right-con">
              <div
                class="con-box"
                v-for="item in news"
                :key="item.id"
                @click="goContent(item)"
              >
                <div class="box-left">
                  <div class="title ellipsis text-lg">
                    {{ item.title }}
                  </div>
                  <div class="content">
                    <p>
                      {{
                        item.summary != "\t\t\t\t\t\r\n\t\t\t\t" && item.summary
                          ? item.summary
                          : "筑梦想，赢未来"
                      }}
                    </p>
                  </div>
                  <div class="tag">
                    <div>
                      <div
                        class="news"
                        v-if="item.tags && item.tags.length > 0"
                      >
                        <span>
                          {{ gettages(item.tags[0]) }}
                        </span>
                      </div>
                    </div>
                    <div class="release">
                      <div class="time" style="border: none; padding: 0">
                        {{ formatDate(item.publishtime, "all") }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="box-right">
                  <img
                    class="img"
                    :src="
                      item.img && item.img.length > 0
                        ? item.img[0].url
                        : '/static/images/defalut.png'
                    "
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="active == 1"
          class="contents wow animate__animated"
          :class="otherArr.length > 1 ? 'animate__fadeIn' : ''"
        >
          <div
            class="consix"
            @click="goContent(item)"
            v-for="item in otherArr"
            :key="item.id"
          >
            <div class="zoom-l">
              <img
                class="img zoomImg"
                :src="
                  item.img && item.img.length > 0
                    ? item.img[0].url
                    : '/static/images/defalut.png'
                "
                alt=""
              />
            </div>

            <div class="zoom-r">
              <div>
                <p>{{ item.title }}</p>
                <p>
                  {{
                    item.summary != "\t\t\t\t\t\r\n\t\t\t\t" && item.summary
                      ? item.summary
                      : "筑梦想，赢未来"
                  }}
                </p>
              </div>
              <div class="time">
                <div class="news" v-if="item.tags && item.tags.length > 0">
                  <span>
                    {{ gettages(item.tags[0]) }}
                  </span>
                </div>
                <i>{{ formatDate(item.publishtime, "all") }}</i>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="active == 2"
          class="three wow animate__animated"
          :class="otherArr.length > 1 ? 'animate__fadeIn' : ''"
        >
          <div
            class="ttbox"
            @click="goContent(item)"
            v-for="item in otherArr"
            :key="item.id"
          >
            <div class="box-l">
              <p>{{ formatDate(item.publishtime, "date") }}</p>
              <p>{{ formatDate(item.publishtime, "yarn") }}</p>
            </div>
            <div class="box-r">
              <div>
                <div>
                  <p>{{ item.title }}</p>
                </div>
                <div>
                  <p>
                    {{
                      item.summary != "\t\t\t\t\t\r\n\t\t\t\t" && item.summary
                        ? item.summary
                        : "筑梦想，赢未来"
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="more" @click="moreBtn"><span>查看更多></span></div>
  </div>
</template>
<script setup name="Seek">
import { reactive, ref, onMounted, toRefs, nextTick } from "vue";
import "swiper/css";
import "animate.css";
import { ElImage, ElCarousel, ElCarouselItem } from "element-plus";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import { gettree, get } from "@/utils/request.js";
import { getTtrees, getClassification } from "@/utils/package.js";
import { formatDate } from "@/utils/time.js";
import { gettages } from "@/utils/tags.js";
const seekRef = ref(null);
const modules = [Autoplay, Pagination];
const Myswiper = ref();
const contentRef = ref();
const obj = reactive({
  seekNav: [],
  navList: [],
  navon: 0,
  active: 0,
  news: [],
  topping: {},
  swiperNews: [],
  otherArr: [],
  noticeList: [],
});
const showSwiper = ref(false);
const {
  seekNav,
  navList,
  navon,
  active,
  news,
  topping,
  swiperNews,
  otherArr,
  noticeList,
} = toRefs(obj);
onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  nextTick(() => {
    getseek();
    getNotice();
  });
  getcms();
});
const handleScroll = () => {
  const targetEl = document.querySelector("#seekanimation");
  const targetTop = targetEl.offsetTop;
  const viewportHeight = window.innerHeight;
  if (window.scrollY >= targetTop - viewportHeight) {
    seekRef.value.classList.add("animationVide");
  }
};
//查看更多
const moreBtn = () => {
  if (seekNav.value[navon.value].name == "青旅动态") {
    location.href = `/hotnews.html${navList.value[active.value].url}`;
  } else {
    location.href = `/party.html${navList.value[active.value].url}`;
  }
};
const elmoreBtn = () => {
  location.href = `/hotnews.html#articlelist1-gg`;
};
//获取标签
const getcms = () => {
  get("/system/dict/data/type/cms_article_tags").then((res) => {
    localStorage.setItem("cms", JSON.stringify(res.data));
  });
};
//获取二级导航
async function getseek() {
  try {
    await getTtrees();
    const result = getClassification("seekNav"); // 替换 'yourFunc' 为需要的值
    gettree(result, false).then((res) => {
      seekNav.value = res.data;
      let arr = res.data[0].description.split(";");
      getThreeNav("hotnew", arr);
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
const getThreeNav = (type, arr) => {
  const newId = getClassification(type);
  gettree(newId, false).then((element) => {
    let intersectArray = element.data.filter((item) =>
      arr.some((pitem) => item.name === pitem)
    );
    navList.value = intersectArray;
    newcont(intersectArray[0].id);
  });
};
//获取公告栏
async function getNotice() {
  try {
    await getTtrees();
    const noticeId = getClassification("notice");
    let data = {
      categoryId: noticeId,
      status: "publish",
      pageSize: 4,
      pageNum: 1,
    };
    get("/cms/article/list", data).then((res) => {
      noticeList.value = res.rows;
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

//点击二级菜单
const seekClick = (index, item) => {
  if (index == navon.value) return;
  showSwiper.value = false;
  noticeList.value = [];
  swiperNews.value = [];
  topping.value = {};
  active.value = 0;
  news.value = [];
  navon.value = index;
  navList.value = seekNav.value[index].children;
  let arr = seekNav.value[index].description.split(";");
  if (item.name == "党建动态") {
    getThreeNav("partybuildings", arr);
  } else {
    getThreeNav("hotnew", arr);
    getNotice();
  }

  if (contentRef.value) {
    contentRef.value.classList.add("acimationopactiy");
    setTimeout(() => {
      contentRef.value.classList.remove("acimationopactiy");
    }, 350);
  }
};
//点击三级菜单
const navClick = (index, id) => {
  if (index == active.value) return;
  showSwiper.value = false;
  active.value = index;

  clean();
  if (active.value > 0) {
    newOther(id);
    return;
  }
  newcont(id);
};
//清空数据
const clean = () => {
  topping.value = {};
  otherArr.value = [];
  news.value = [];
  swiperNews.value = [];
};
//获取新闻中心内容
const newcont = (id) => {
  let data = {
    categoryId: id,
    status: "publish",
    pageSize: 8,
    pageNum: 1,
  };
  get("/cms/article/list", data).then((res) => {
    let foundTopping = false; // 标志是否找到置顶文章
    res.rows.forEach((item, index) => {
      let tops = item.tags;
      // 使用 Array.prototype.find() 查找是否存在 "tag-0"
      const hasTagZero = tops.find((tag) => tag === "tag-0");
      if (!foundTopping && hasTagZero) {
        topping.value = item;
        foundTopping = true; // 找到置顶文章
      }
      
    });
    // 如果没有找到置顶文章，将 topping.value 设置为第一个文章
    if (!foundTopping && res.rows.length > 0) {
      topping.value = res.rows[0];
    }
    let remainingItems = res.rows.filter(item => item.id !== topping.value.id);
    console.log(remainingItems);
    remainingItems.forEach((item,index)=>{
        if (index >= 0 && index <= 3) {
        swiperNews.value.push(item);
      } else if (index > 3) {
        news.value.push(item);
      }
    })

    showSwiper.value = true;
  });
};
//获取其他新闻内容
const newOther = (id) => {
  let data = {
    categoryId: id,
    status: "publish",
    pageSize: 6,
    pageNum: 1,
  };
  get("/cms/article/list", data).then((res) => {
    console.log(res, "其他文章内容");
    otherArr.value = res.rows;
  });
};
const goContent = (item) => {
  // location.href = `/articlepage.html?query=${item.id}` + `&topNav='首页'`;
  if (item.jumpurl) {
    window.open(item.jumpurl);
  } else {
    window.open(`/articlepage.html?query=${item.id}` + `&topNav=首页`);
  }
  // window.open(`/articlepage.html?query=${item.id}` + `&topNav=首页`);
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.layout {
  /* background: url("@/assets/images/link.png") no-repeat;
  background-size: cover; */
  padding-top: 30px;
}
.text-lg {
  font-size: 20px;
  font-family: Medium;
}
.seek {
  width: 100%;
  max-width: 1600px;
  position: relative;
  margin: 0 auto;
  /* height: 910px; */
  background-size: 100% 100%;
  box-sizing: border-box;
  > div:nth-child(1) {
    text-align: center;
    line-height: 40px;
    color: #d2d5da;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  > div:nth-child(2) {
    line-height: 60px;
    text-align: center;
    color: #333;
    font-size: 32px;
    font-weight: bold;
  }
  .line {
    position: relative;
    font-family: Medium;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -50px;
      width: 20px;
      height: 1px;
      background-color: #d2d5da;
    }
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      right: -50px;
      width: 20px;
      height: 1px;
      background-color: #d2d5da;
    }
  }
  .nav-r {
    justify-content: center;
    display: flex;
    align-items: center;
    margin-top: 30px;
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
        margin: 0 30px;
        line-height: 60px;
        display: inline-block;
        position: relative;
        cursor: pointer;
        color: #666;
        transition: all 0.2s linear;
        &::before {
          /* 伪元素来做下划线 */
          content: "";
          position: absolute;
          bottom: 0;
          left: 100%;
          width: 0; /* 一开始宽度为0下划线也为0看不出来 */
          height: 0;
          border-bottom: 4px solid;
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
      .active {
        color: #0c5cd6 !important;
        font-weight: 600;
        &::before {
          width: 100%; /* hover后宽度显示出来下划线也显示出来 */
          bottom: 0;
          left: 0;
        }
      }
    }
  }
  .consulting {
    height: 600px;
    display: flex;
    justify-content: space-between;
    margin-top: 60px;
    .con-left {
      width: 180px;
      height: 100%;
      border-right: 2px solid #f2f2f2;
      .nav-box {
        width: 180px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 18px;
        &:hover {
          background: #0c5cd6 url("@/assets/images/bgack.png") no-repeat center;
          background-size: 100% 100%;
          color: #fff;
        }
      }
      .actives {
        background: #0c5cd6 url("@/assets/images/bgack.png") no-repeat center;
        background-size: 100% 100%;
        color: #fff;
      }
    }
    .con-right {
      width: 100%;
      height: 90%;
      display: flex;
      justify-content: space-between;
      .left-con {
        width: 38%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .card {
          width: 100%;
          height: 330px;
          cursor: pointer;
          transition: 0.3s;
          .card-img {
            width: 100%;
            height: 200px;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .card-text {
            width: 100%;
            padding: 16px;
            box-sizing: border-box;
            color: #333;
            transition: 0.3s;
          }
          &:hover {
            box-shadow: 5px 5px 20px rgba($color: #999, $alpha: 0.2);
            .card-text {
              color: #0c5cd6;
            }
          }
        }
        .img-box {
          width: 100%;
          height: 240px;

          .swiperBoxc {
            position: relative;
            .text {
              width: 100%;
              padding: 10px 15px;
              box-sizing: border-box;
              position: absolute;
              bottom: 0;
              color: #fff;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              background: rgba($color: #000000, $alpha: 0.5);
              z-index: 9;
            }
          }
        }
      }
      .right-con {
        width: 60%;
        height: 100%;
        /* overflow: hidden; */
        display: flex;
        flex-direction: column;
        .con-box {
          width: 100%;
          height: 33%;
          display: flex;
          border-bottom: 1px solid #f2f2f2;
          cursor: pointer;
          transition: 0.3s;
          &:hover {
            box-shadow: 5px 5px 20px rgba($color: #999, $alpha: 0.2);
          }
          &:hover .box-left .title {
            color: #0c5cd6;
          }
          .box-left {
            box-sizing: border-box;
            width: 70%;
            height: 100%;
            padding: 35px 30px;
            .title {
              color: #333;
            }
            .content {
              margin: 10px 0 20px;
              width: 100%;
              color: #999;
              text-align: justify;
              height: 50px;
              overflow: hidden;
              line-height: 25px;
              white-space: normal; /* 允许文本自动换行 */
              p {
                display: -webkit-box; /* 使用弹性盒子布局 */
                -webkit-line-clamp: 2; /* 限制文本显示的行数，这里设置为3行 */
                -webkit-box-orient: vertical; /* 垂直排列文本 */
                overflow: hidden; /* 隐藏超出容器的文本 */
                text-overflow: ellipsis; /* 当文本超出容器宽度时显示省略号 */
                font-size: 16px;
              }
            }
          }
          .box-right {
            box-sizing: border-box;
            width: 30%;
            height: 100%;
            padding: 26px 20px 26px 16px;
            img {
              object-fit: cover;
            }
          }
        }
      }
    }
  }
}
.animationVide {
  animation: myfirst 1s;
}
@keyframes myfirst {
  from {
    bottom: -200px;
    opacity: 0;
  }
  to {
    bottom: 0;
    opacity: 1;
  }
}
.acimationopactiy {
  animation: opactiys 3s;
}
@keyframes opactiys {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.tag {
  display: flex;
  margin-top: 18px;
  font-size: 14px;
  .topping {
    box-sizing: border-box;
    padding: 3px 10px;
    height: 26px;
    background: #f7b200;
    border-radius: 2px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
  }
  .news {
    box-sizing: border-box;
    padding: 5px 10px;
    height: 26px;
    background: #02b07f;
    border-radius: 2px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
  }
  .release {
    box-sizing: border-box;
    color: #d7d7d7;
    padding: 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .time {
      padding-left: 10px;
    }
  }
}
.con-top {
  width: 84%;
  .top {
    width: 100%;
    box-sizing: border-box;
    height: 8%;
    margin-bottom: 2%;
    display: flex;
    padding: 0 30px;
    background: #fafafa;
    .left {
      width: 180px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .image {
        width: 100px;
        height: 100%;
        display: flex;
        align-items: center;
        img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      }
    }
    .right {
      width: calc(100% - 180px);
      height: 100%;
      margin-left: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .elCarousel {
        cursor: pointer;
        width: 80%;
        height: 100%;
      }
      :deep(.el-carousel__item) {
        color: #000;
        height: 100%;
        display: flex;
        align-items: center;
      }
      :deep(.el-carousel__container) {
        height: 100%;
      }
      .elmore {
        cursor: pointer;
      }
    }
  }
}
.contents {
  width: 84%;
  overflow: hidden;
  .consix {
    display: flex;
    border-bottom: 1px solid #f0f0f0;
    padding: 10px 0;
    cursor: pointer;
    transition: 0.3s;
    overflow: hidden;
    position: relative;
    &:hover {
      .zoom-l {
        .zoomImg {
          transform: scale(1.2);
        }
      }
      .zoom-r {
        > div:nth-child(1) {
          > p:nth-child(1) {
            color: #004898;
          }
        }
      }
    }

    .zoom-l {
      width: 205px;
      height: 130px;
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
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2; /* 显示行数，这里2行 */
        -webkit-box-orient: vertical;
        display: -webkit-box;
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
        display: flex;
        align-items: center;
        .news {
          margin-right: 10px;
          box-sizing: border-box;
          padding: 5px 10px;
          height: 26px;
          font-size: 14px;
          background: #02b07f;
          border-radius: 2px;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
.three {
  width: 84%;
  overflow: hidden;
  /* display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-direction: column; */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  .ttbox {
    width: 100%;
    height: 180px;
    margin-bottom: 9px;
    cursor: pointer;
    display: flex;
    transition: 0.3s;

    .box-l {
      color: #fff;
      width: 180px;
      background: #d7dbe7;
      /* height: 180px; */
      text-align: center;
      line-height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
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
      display: flex;
      align-items: center;
      width: calc(100% - 180px);
      padding: 20px 30px;
      box-sizing: border-box;
      position: relative;
      background: #f7f7f7;

      > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;

        > div:nth-child(1) {
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1; /* 显示行数，这里2行 */
          -webkit-box-orient: vertical;
          display: -webkit-box;
          margin-bottom: 14px;

          p {
            color: #333;
            font-family: Medium;
            font-size: 20px;
            font-weight: 600;
          }
        }
        > div:nth-child(2) {
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2; /* 显示行数，这里2行 */
          -webkit-box-orient: vertical;
          display: -webkit-box;
          line-height: 20px;
          p {
            color: #666;
          }
        }
      }
    }
    &:hover {
      .box-r {
        > div {
          > div:nth-child(1) {
            p {
              color: #0c5cd6;
            }
          }
          > div:nth-child(2) {
            p {
              color: #0c5cd6;
            }
          }
        }
      }
    }
    &:hover .box-l {
      background: #0c5cd6;
      color: #fff !important;
    }
  }
}
@media screen and (max-width: 1440px) {
  .seek {
    width: 1200px;
    .consulting {
      .three{
        .ttbox{
          height: 140px;
          .box-l{
            width: 140px;
          }
          .box-r{
            width: calc(100% - 140px);
          }
        }
      }
      .con-right {
        .right-con {
          .con-box {
            .box-left {
              width: 64%;
            }
            .box-right {
              width: 36%;
            }
          }
        }
      }
    }
  }
}
:deep(.swiper-pagination) {
  bottom: 40px !important;
  .swiper-pagination-bullet {
    width: 50px;
    height: 5px;
    border-radius: 0;
  }
  /* 高亮状态 */
  .swiper-pagination-bullet-active {
    position: relative;
    background: rgba($color: #000, $alpha: 0.2);
  }

  /* 高亮状态的伪元素 */
  .swiper-pagination-bullet-active::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0; /* 初始宽度为0 */
    background-color: rgba(255, 255, 255, 0.9); /* 高亮颜色 */
    animation: fill 3.5s forwards;
  }

  /* 定义动画效果 */
  @keyframes fill {
    to {
      width: 100%; /* 最终宽度为100% */
    }
  }
}
</style>
