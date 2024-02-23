<template>
  <div v-if="accordionShow">
    <div class="accordion">
      <div>
        <div
          class="item"
          v-for="(item, index) in accordion"
          :key="item.title"
          :class="{ active: index === activeIndex }"
        >
          <div
            class="header"
            :style="`background:${item.content}`"
            @mouseenter="activateItems(index)"
          >
            <div class="title" :style="'background:' + item.color">
              <block>
                <div class="gift" :style="getBackgroundStyle(item)">
                  <div class="icon">
                    <i class="iconfont iconsize" v-html="item.icon"></i>
                  </div>
                  <div class="tetx text-df">
                    <p>{{ item.name }}</p>
                  </div>
                </div>
              </block>
            </div>
            <div class="content">
              <div
                :style="getBackgroundStyle2(item)"
                class="mask-box"
                @click="goBarUrl(item.url)"
              >
                <div class="title text-lg">{{ item.name }}</div>
                <div class="content">
                  <div
                    :class="
                      activeIndex == index
                        ? ' wow animate__animated' +
                          ' ' +
                          'animate__fadeInDown animate__faster	'
                        : ''
                    "
                    class="goodsImg textBox"
                  >
                    <div class="text-xs" style="color: #fff; z-index: 9999" v-html="item.description">

                    </div>
                    <a class="text-xs block" :href="'./bar.html' + item.url"
                      >查看详情 > </a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gettree, get } from "@/utils/request.js";
import { getTtrees, getClassification } from "@/utils/package.js";
const accordion = ref([
  { title: "Item 1", content: "red" },
  { title: "Item 2", content: "blue" },
  { title: "Item 3", content: "yellow" },
]);
const timer= ref(null)
const bannerSize = ref("165px");
const accordionShow = ref(false);
const activeIndex = ref(0); // 默认展开第一个
const curColor = ref([
  "#e60012", // 红色
  "#ea5703", // 绿色
  "#f39800", // 蓝色
  "#b0cb03", // 黄色
  "#6ab935", // 品红
  "#01af7f", // 青色
  "#0082cb", // 紫色
  "#0d6fb8", // 橙色
  "#0e59a7",
  "#2b328e", // 深绿色
]);
function activateItems(index) {
  clearTimeout(timer.value)
  timer.value = setTimeout(()=>{
    activeIndex.value = index;
  },100)
}
onMounted(() => {
  getAccordionData();
  window.addEventListener("resize", handleResize);
  console.log(window.innerWidth,'开始宽度');
  if(window.innerWidth <=1440){
    bannerSize.value ='125px'
  }
});
const handleResize=()=>{
   let viewportWidth = window.innerWidth; // 获取当前视口宽度
   if(viewportWidth <=1440){
    bannerSize.value ='125px'
  }else{
    bannerSize.value ='165px'

  }
}
//背景颜色
const getBackgroundStyle = (item) => {
  return {
    background: `linear-gradient(to bottom, ${item.color}, rgba(230, 0, 18, 0)), url('${item.imgurls}') no-repeat center`,
    backgroundSize: "100% " + bannerSize.value,
    backgroundPosition: "bottom",
    /* 其他样式 */
  };
};
const getBackgroundStyle2 = (item) => {
  return {
    backgroundImage: ` url('${item.imgurls}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: `rgba(0, 0, 0, 0.9)` /* 添加黑色蒙版 */,
    /* 其他样式 */
  };
};
const goBarUrl = (url) => {
  location.href = `/bar.html${url}`;
};
//获取手风琴
async function getAccordionData() {
  try {
    await getTtrees();
    const result = getClassification("funcBar"); // 替换 'yourFunc' 为需要的值
    gettree(result, false).then((res) => {
      const newArray = res.data.map((item, index) => {
        const colorIndex = index % curColor.value.length;
        return {
          ...item,
          color: curColor.value[colorIndex],
        };
      });
      accordion.value = newArray;
      accordionShow.value = true;
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
</script>

<style lang="scss" scoped>
.accordion {
  margin: 0 auto;
  width: auto;
  display: flex;
  justify-content: center;
  > div {
    display: flex;
    height: 475px;
    overflow: hidden;
  }
}

.item {
  width: 107px; /* 每个项的固定宽度，根据需要调整 */
  height: 100%;
  transition: width 0.1s; 
  /* 过渡效果，可以根据需要调整 */
}

.item.active {
  width: 637px; /* 鼠标移入时的宽度，根据需要调整 */
}

.header {
  background-color: #eee;
  cursor: pointer;
  display: flex;
  height: 100%;
  box-sizing: border-box;
  .title {
    width: 107px;
    z-index: 9;
    .gift {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      /* 直接设置底部颜色为透明 */

      /* 居中显示 */
      z-index: 9;
      .icon {
        margin: 30px 0 10px 0;
        display: flex;
        justify-content: center;
      }
      .tetx {
        display: flex;
        align-items: center;
        flex-direction: column;
        color: #fff;
        p {
          writing-mode: vertical-rl;
          letter-spacing: 4px;
          font-size: 22px;
          //font-family: Medium;
          font-weight: 600;
        }
      }
      > div {
        width: 100%;
      }
    }
  }
  .content {
    z-index: 1;
    width: calc(100% - 107px);
    /* padding: 10px; */
    /* display: none; */
    height: 0;
    height: 100%;
    transition: height 0.3s ease-out; /* 过渡效果，可以根据需要调整 */
    .mask-box {
      position: relative;
      height: 100%;
      padding: 40px;
      box-sizing: border-box;
      .title {
        position: relative;
        color: #fff;
        font-size: 28px;
        font-family: Medium;
        &::before {
          /* 伪元素来做下划线 */
          content: "";
          position: absolute;
          bottom: -14px;
          left: 0;
          width: 50px; /* 一开始宽度为0下划线也为0看不出来 */
          height: 10px;
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
        }
      }
      .content {
        width: 100%;
        height: 360px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        .goodsImg {
          width: 48%;
          height: 310px;
          border-radius: 10px;
          overflow: hidden;
        }
        .textBox {
          width: 100%;
          height: 100%;
          > div:nth-child(1) {
            width: 100%;
            height: 200px;
            line-height: 25px;
            max-height: 300px;
            text-align: justify;
            display: -webkit-box;
            -webkit-line-clamp: 8; /* 设置最大行数 */
            -webkit-box-orient: vertical;
            margin-top: 20px;
            overflow: hidden;
          }
          .block {
            display: block;
            width: 80%;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #fff;
            color: #fff;
            margin: 18px auto;
          }
        }
      }
    }

    .mask-box::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(50, 95, 166, 0.7); /*半透明黑色*/
    }
  }
}

.item.active .content {
  height: 100%;
}
@media screen and (max-width: 1440px) {
  .accordion {
    > div {
      height: 400px;
    }
  }
  .item {
    width: 89px; /* 每个项的固定宽度，根据需要调整 */
    height: 100%;
  }

  .item.active {
    width: 399px; /* 鼠标移入时的宽度，根据需要调整 */
  }
  .header {
    .title {
      width: 89px;
      .gift{
        .tetx {
          p{
            font-size: 20px;
          }
        }
      } 
      .icon{
        margin: 26px 0 10px 0 !important;
        .iconsize{
          font-size: 30px;
        }
      }
    }
    .content {
      width: calc(100% - 89px);
      .mask-box{
        padding: 30px;
        .title{
          font-size: 24px;
        }
        .content{
          .textBox{
            >div:nth-child(1){
              font-size: 14px;
              height: auto;
            }
          } 
        }
      }
    }
  }
}
@media (min-width:1441px) and (max-width:1600px){
    .item {
    width: 105px; /* 每个项的固定宽度，根据需要调整 */
    height: 100%;
  }

  .header {
    .title {
      width:105px;
    }
    .content {
      width: calc(100% - 105px);
    }
  }
    .accordion {
    > div {
      margin: 0 5%;
      box-sizing: border-box;
      overflow: hidden;
      background-color: rebeccapurple;
    }
  }
}
</style>
