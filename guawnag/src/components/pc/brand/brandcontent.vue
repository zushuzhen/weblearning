<template>
  <div>
    <div class="content">
      <div class="one" ref="anchorRef">
        <div class="title-box margin anchor-item" ref="one">
          <div class="title">品牌标识</div>
          <div class="rectangle"></div>
        </div>
        <div class="wow animate__animated animate__fadeInUp">
          <div class="one-top">
            <div class="top-left">
              <div class="image">
                <img
                  v-if="logoObj && logoObj.img && logoObj.img.length > 0"
                  :src="logoObj.img[0].url || textObj.img[0].url"
                  alt=""
                />
              </div>
            </div>
            <div class="top-right">
              <h1>{{ logoObj.title }}</h1>
              <p v-html="logoObj.content"></p>
              <h1>{{ textObj.title }}</h1>
              <p v-html="textObj.content"></p>
            </div>
          </div>
        </div>
        <div class="title-box margin anchor-item" ref="two">
          <div class="title">企业文化理念</div>
          <div class="rectangle"></div>
        </div>
        <div class="culture wow animate__animated animate__fadeInUp" >
          <div class="culture-box" v-for="item in teamList" :key="item.id">
            <div class="culture-image">
              <img class="img" :src="item.img[0].url" alt="" />
              <div class="mask">
                <h3>{{ item.title }}</h3>
                <span v-html="item.content" style="text-align: center"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="title-box margin anchor-item" ref="three">
          <div class="title">集团愿景</div>
          <div class="rectangle"></div>
        </div>
        <div class="group wow animate__animated animate__fadeInUp">
          <img
            :src="
              groupObj.img && groupObj.img.length > 0
                ? groupObj.img[0].url
                : '/static/images/defalut.png'
            "
            alt=""
          />
          <div>
            <div>
              <div>
                <h4>{{ groupObj.title }}</h4>
                <h1>{{ groupObj.summary }}</h1>
              </div>
              <div style="margin-top: 20px;">
                <h4 style="">{{ groupObj.subtitle }}</h4>
                <h1 v-html="groupObj.content"></h1>
              </div>
            </div>
          </div>
        </div>
        <div class="title-box margin anchor-item" ref="four">
          <div class="title">核心价值观</div>
          <div class="rectangle"></div>
        </div>
        <div class="activity cultureBox wow animate__animated animate__fadeInUp">
          <div
            class="activity-box box"
            style="width: 100%;background: #fafafa;"
            v-for="item in valueList"
            :key="item.id"
          >
            <div class="box-image">
              <img class="img" :src="item.img[0].url" alt="" />
            </div>
            <div class="box-content contentBox">
              <div class="tag-box" style="margin-bottom: 10px;">
                <div class="tag text-xs">{{ item.title }}</div>
              </div>
              <div
                v-if="!item.summary"
                v-html="item.content"
                class="content"
              ></div>
              <div v-else class="content">{{ item.summary }}</div>
            </div>
          </div>
        </div>
        <!-- <div class="title-box margin anchor-item" ref="five">
          <div class="title">社会责任</div>
          <div class="rectangle"></div>
        </div>
        <div class="activity wow animate__animated animate__fadeInUp">
          <div
            class="activity-box "
            style="width: 48%;background-color: #fafafa;"
            v-for="item in responsibilityList"
            :key="item.id"
          >
            <div class="box-image">
              <img class="img" :src="item.img[0].url" alt="" />
            </div>
            <div class="box-content contentBox">
              <div class="tag-box ">
                <div class="tag text-xs">{{ item.title }}</div>
              </div>
              <div
                v-if="!item.summary"
                v-html="item.content"
                class="content"
              ></div>
              <div v-else class="content">{{ item.summary }}</div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, toRefs, ref } from "vue";
import $bus from "@/utils/bus.js";
import { gettree, get } from "@/utils/request.js";
import { getClassification } from "@/utils/package.js";
import { debounce } from "@/utils/index.js";
const one = ref();
const two = ref();
const three = ref();
const four = ref();
const five = ref();
const anchorRef = ref(null);
const contentObj = reactive({
  type: "",
  contentId: "", //导航id
  active: 0,
  teamList: [],
  logoObj: {},
  textObj: {},
  groupObj: {},
  valueList: [],
  responsibilityList: [],
  seekNav: [],
});
const {
  type,
  contentId,
  teamList,
  textObj,
  logoObj,
  groupObj,
  valueList,
  responsibilityList,
} = toRefs(contentObj);

onMounted(() => {
  $bus.on("content", (val) => {
    type.value = val.type;
    if (type.value) {
      scrollToElement(type.value);
    }

    // getCont(contentId.value);
  });
  let Data = localStorage.getItem("Data");
  let data = JSON.parse(Data);
  getbrand(data);
  getcorporate(data);
  getgroup(data);
  getvalues(data);
  getresponsibility(data);
  window.addEventListener("scroll", debounce(handleScroll, 100));
});
//双向锚点
const handleScroll = () => {
  // 获取所有锚点元素
  const navContents = document.querySelectorAll(".anchor-item");
  // 所有锚点元素的 offsetTop
  const offsetTopArr = [];
  navContents.forEach((item) => {
    offsetTopArr.push(item.offsetTop);
  });
  // 获取当前文档流的 scrollTop
  const offset = window.document.documentElement.scrollTop;

  offsetTopArr.forEach((item, index) => {
    if (offset >= item) {
      getname(index);
    }
  });
  if (offset < 700) {
    getname(0);
  }
};
const getname = (index) => {
  let element = null;
  switch (index) {
    case 0:
      element = "品牌标识";
      break;
    case 1:
      element = "企业文化理念";
      break;
    case 2:
      element = "集团愿景";
      break;
    case 3:
      element = "核心价值观";
      break;
    case 4:
      element = "社会责任";
      break;
  }
  $bus.emit("offset", element);
};
const scrollToElement = (type) => {
  let element = null;
  console.log(type, "传过来的");
  switch (type) {
    case "品牌标识":
      element = one.value;
      break;
    case "企业文化理念":
      element = two.value;
      break;
    case "集团愿景":
      element = three.value;
      break;
    case "核心价值观":
      element = four.value;
      break;
    case "社会责任":
      element = five.value;
      break;
  }

  element.scrollIntoView({ behavior: "smooth", block: "start" });
};
//获取品牌标识
const getbrand = async (data) => {
  const result = getClassification("brand", data); // 替换 'yourFunc' 为需要的值
  const res = await getCont(result);
  res.rows.forEach((item) => {
    if (item.title.indexOf("logo") != -1) {
      logoObj.value = item;
    } else {
      textObj.value = item;
    }
  });
};
//获取企业文化理念
const getcorporate = async (data) => {
  const result = getClassification("corporate", data); // 替换 'yourFunc' 为需要的值
  const res = await getCont(result);
  teamList.value = res.rows;
};
//获取集团愿景
const getgroup = async (data) => {
  const result = getClassification("group", data); // 替换 'yourFunc' 为需要的值
  const res = await getCont(result);

  groupObj.value = res.rows[0];
};
//获取核心价值观
const getvalues = async (data) => {
  const result = getClassification("values", data); // 替换 'yourFunc' 为需要的值
  const res = await getCont(result);
  valueList.value = res.rows;
};
const getresponsibility = async (data) => {
  const result = getClassification("responsibility", data); // 替换 'yourFunc' 为需要的值
  const res = await getCont(result);
  responsibilityList.value = res.rows;
};
//文章模板---获取内容信息
const getCont = (id) => {
  return new Promise((resolve, reject) => {
    let data = {
      categoryId: id ? id : contentId.value,
      status: "publish",
    };
    get("/cms/article/list", data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";

.content {
  max-width: 1600px;
  margin: 0 auto;
  .one {
    padding: 0 0 80px 0;
    .title-box {
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
    .margin {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 75px 75px;
    }
    .one-top {
      display: flex;
      width: 100%;
    }
    .top-right {
      width: 50%;
      padding: 30px;
      box-sizing: border-box;
      background: #fafafa;
      border-radius: 5px;
      h1 {
        text-align: center;
        color: #0c5cd6;
        margin: 20px 0;
        font-size: 20px;
        font-weight: 600;
      }
      p {
        line-height: 30px;
        text-indent: 2em;
        font-size: 16px;
        text-align: justify;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .top-left {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .image {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 50%;
          height: 80%;
          object-fit: cover;
        }
      }
    }
    /* Reverse the order for every even occurrence */
    .one-top:nth-child(even) {
      flex-direction: row-reverse;
    }

    .left-p {
      line-height: 30px;
      overflow: hidden;
      max-height: 250px;
      margin-bottom: 38px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 8;
      text-align: justify;
      p {
        text-indent: 2em;
      }
    }

    .one-bottom {
      margin-top: 10px;
      width: 100%;
      display: flex;
      .bottom-left {
        height: 750px;
        border-radius: 20px;
        width: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .bottom-right {
        width: 50%;
        height: 750px;
        overflow: hidden;
        box-sizing: border-box;
        padding-left: 35px;
        > div:nth-child(1) {
          height: 300px;
          h2 {
            margin-top: 20px;
            font-size: 30px;
            font-weight: bold;
            font-family: Medium;
            color: #333;
            margin-bottom: 20px;
          }
          .pbox {
            height: 245px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 8; /* Limit to 3 lines */
            text-align: justify;
            p {
              text-indent: 2em;
              line-height: 30px;
            }
          }
        }
      }
      .imgboxs {
        width: 100%;
        height: 430px;
        display: flex;
        justify-content: flex-end;
        img {
          width: 90%;
          height: 100%;
          object-fit: contain;
        }
      }
      .img-bottom {
        width: 100%;
        height: 110px;
        display: flex;
        margin-top: 30px;
        justify-content: flex-end;
        img {
          width: 30%;
          height: 110px;
          &:nth-child(1) {
            margin-right: 30px;
          }
        }
      }
    }

    .activity {
      margin-top: 50px;
      display: flex;
      justify-content: space-between;
      .activity-box {
        width: 31%;
        border-radius: 2px;
        overflow: hidden;
        transition: 0.3s;
        &:hover {
          box-shadow:3px 3px 10px rgba($color: #999, $alpha: 0.2);
          .box-content {
            .tag-box {
              .tag {
                color: #0c5cd6;
              }
            }
          }
        }
        .box-image {
          width: 100%;
          height: 350px;
          cursor: pointer;
          img {
            object-fit: cover;
          }
        }
        .box-content {
          padding: 30px;
          box-sizing: border-box;

          .tag-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            .tag {
              font-size: 20px;
              border-radius: 2px;
              font-weight: bold;
              font-family: Medium;
              transition: 0.3s;
              color: #333;
            }
            .time {
              color: #adaeb3;
              font-size: 16px;
            }
          }
          .title {
            color: #333;
            text-align: justify;
            margin: 20px 0;
            cursor: pointer;
            font-size: 18px;
          }
          .content {
            cursor: pointer;
            width: 100%;
            text-align: justify;
            margin-top: 5px;
            line-height: 24px;
            font-size: 16px;
          }
        }
      }
    }
    .cultureBox {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 20px;
      .activity-box {
        .box-image {
          height: 200px;
        }
        .box-content {
          background: none;
          padding-top: 20px;
          .tag-box {
            justify-content: center;
          }
        }
      }
    }
    .culture {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 20px;
      .culture-box {
        height: 400px;
        width: 100%;
        .culture-image {
          border-radius: 5px;
          width: 100%;
          height: 100%;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .mask {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 40%;
            background-image: linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0),
              #0c5cd6
            );
            padding-bottom: 30px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            color: #fff;
            justify-content: flex-end;
            text-align: center;

            h3 {
              font-size: 16px;
              margin-bottom: 10px;
              font-weight: 600;
            }
            span {
              text-align: justify;
              line-height: 30px;
              font-size: 20px;
              font-weight: 600;
            }
          }
        }
      }
    }
    .group {
      display: flex;
      width: 100%;
      height: 460px;
      background: #fafafa;

      img {
        width: 650px;
        height: 100%;
        object-fit: cover;
      }
      > div {
        /* width: 750px; */
        height: 100%;
        display: flex;
        align-items: center;
        margin: 0 80px;
        > div {
          /* width: 600px; */
          height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          h4,
          h1 {
            text-align: justify;
          }
          h4 {
            color: #0c5cd6;
            font-size: 20px;
            font-weight: bold;
            font-family: Medium;
            position: relative;
            padding-left: 12px;
            margin-bottom: 10px;
            height: 24px;
            &::before {
              display: block;
              content: "";
              position: absolute;
              top: 2px;
              left: 0;
              width: 5px;
              height: 20px;
              background-color: #0c5cd6;
            }
          }
          h1 {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            line-height: 50px;
            font-family: Medium;
          }
        }
      }
    }
    .core {
      width: 100%;
      height: 500px;
      background: url("@/assets/images/childbanner.jpg") no-repeat;
      background-size: 100% 100%;
      overflow: hidden;
      > div {
        width: 800px;
        margin: 125px auto;
        .box {
          padding: 0 90px;
          display: flex;
          justify-content: space-between;
          .boxcon {
            width: 113px;
            height: 48px;
            border: 1px solid #fff;
            border-radius: 5px;
            color: #fff;
            font-size: 22px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .core-text {
          color: #fff;
          line-height: 30px;
          margin-top: 55px;
          text-align: justify;
          font-size: 16px;
        }
      }
    }
  }
}
@media (max-width: 1440px) {
  .content {
    /* width: 1200px; */
    .one {
      .cultureBox{
        grid-template-columns:repeat(3,1fr)
      }
      .left-p {
        p {
          text-indent: 2em;
        }
      }
      .one-top {
        display: flex;
        width: 100%;
      }
      .top-right {
        /* height: 420px; */
        width: 50%;
        background: #fafafa;
        border-radius: 5px;
        p {
          width: 100%;
          line-height: 30px;
          overflow: hidden;
          /* max-height: 180px; */
          /* display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          text-align: justify; */
        }
      }
      .top-left {
        width: 50%;
        /* height: 400px; */
        .image {
          img {
            width: 50%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      .one-bottom {
        width: 100%;
        display: flex;
        .bottom-left {
          height: 670px;
          border-radius: 20px;
          width: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .bottom-right {
          width: 50%;
          height: 670px;
          overflow: hidden;
          box-sizing: border-box;
          padding-left: 35px;
        }
        .imgboxs {
          width: 100%;
          height: 350px;
          img {
            width: 90%;
            height: 100%;
            object-fit: contain;
          }
        }
        .img-bottom {
          width: 100%;
          height: 110px;
          display: flex;
          margin-top: 30px;
          justify-content: flex-end;
          img {
            width: 30%;
            height: 110px;
            &:nth-child(1) {
              margin-right: 30px;
            }
          }
        }
      }
      .activity {
        .activity-box {
          .maximages {
            height: 240px;
            img {
              object-fit: cover;
            }
          }
        }
      }
      .culture {
        .culture-box {
          height: 300px;
          .culture-image {
            .mask {
              height: 35%;
              span {
                text-align: justify;
                line-height: 30px;
              }
            }
          }
        }
      }
    }
  }
}
@media (min-width:1440px) and (max-width:1600px){
  .content {
    padding: 0 5%;
    box-sizing: border-box;
  }
}
</style>
