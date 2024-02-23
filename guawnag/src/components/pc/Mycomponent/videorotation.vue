<template>
  <div class="video" id="videoRef" ref="viedeoRed">
    <div class="headerbox animate__animated" ref="headrRef">
      <div>Promotion video</div>
      <div><span class="line">宣传视频</span></div>
    </div>
    <div v-if="SwiperShow">
      <swiper
        ref="MySwiper"
        class="mySwiper"
        :modules="modules"
        :thumbs="{ swiper: thumbsSwiper }"
        :spaceBetween="10"
        :navigation="navigation"
        @slideChange="onSlideChange"
      >
        <!-- :autoplay="{ delay: 10000, pauseOnMouseEnter: true }" -->
        <swiper-slide v-for="(item, index) in bigImgs" :key="index">
          <video id="myVideo" controls>
            <source :src="item.locationUrls ? item.locationUrls : item.url" />
          </video>
          <!-- <div class="poster" v-if="!item.flag">
            <img :src="item.imgUrls" alt="" />
            <div class="mask" @click="handlePosterClick(index)">
              <i class="iconfont" style="font-size: 80px; color: #fff"
                >&#xe83e;</i
              >
              <div style="font-size: 18px">{{ item.title }}</div>
            </div>
          </div> -->
          <div class="hideo" @click="hideoShow">
            <i class="iconfont" style="font-size: 22px" v-if="ListShow"
              >&#xe617;</i
            >
            <i class="iconfont" style="font-size: 22px" v-else>&#xe790;</i>
          </div>
        </swiper-slide>
      </swiper>

      <div class="ThumbsBox animate__animated" ref="thumbsRef">
        <div class="conBox">
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
          <swiper
            class="mySwiperThumbs"
            :modules="modules"
            watch-slides-progress
            @swiper="setThumbsSwiper"
            @slideChange="onSwiper"
            :slides-per-view="num"
            :space-between="20"
          >
            <swiper-slide v-for="(item, index) in bigImgs" :key="index">
              <div class="imgBox">
                <img :src="item.imgUrls" alt="" />
                <div
                  v-if="
                    index !=
                    (thumbsSwiper?.clickedIndex
                      ? thumbsSwiper.clickedIndex
                      : '0')
                  "
                  class="mask"
                >
                  <div>
                    <div class="mask-img">
                      <i class="iconfont iconsize">&#xe83e;</i>
                    </div>
                    <div>{{ item.title }}</div>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="Video">
import { reactive, ref, onMounted, toRefs, nextTick } from "vue";
import { FreeMode, Navigation, Thumbs, Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { get } from "@/utils/request.js";

import "swiper/scss";

import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
const headrRef = ref(null);
const thumbsRef = ref(null);
const viedeoRed = ref(null);
const num = ref(5);
const Obj = reactive({
  bigImgs: [],
  SwiperShow: false,
  ListShow: true,
});
const { bigImgs, SwiperShow, ListShow } = toRefs(Obj);
const bigImg = reactive([]);
const MySwiper = ref(null);
const modules = [FreeMode, Navigation, Thumbs, Autoplay, A11y];
const navigation = reactive({
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
});
const thumbsSwiper = ref(null);
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);

  getVideo();
  if (window.innerWidth <= 1440) {
    num.value = 4;
  }
});
const handleResize = () => {
  let viewportWidth = window.innerWidth; // 获取当前视口宽度
  if (viewportWidth <= 1440) {
    num.value = 4;
  } else {
    num.value = 5;
  }
};
const handleScroll = () => {
  const targetEl = document.querySelector("#videoRef");
  const targetTop = targetEl.offsetTop;
  const viewportHeight = window.innerHeight;
  if (window.scrollY >= targetTop - viewportHeight) {
    let video;
    if (MySwiper.value) {
      video = MySwiper.value.$el.swiper.slides[0].querySelectorAll("video");
    }
    if (!video) return;
    video[0].volume = 0.0; // 设置音量静音
    video[0].play();
    viedeoRed.value.classList.add("animationVide");
  }
};
const getVideo = () => {
  let data = {
    tags: "home",
  };
  get("/cms/videos/list", data).then((res) => {
    let arr = res.rows.map((item) => {
      return { ...item };
    });
    bigImgs.value = arr;
    SwiperShow.value = true;
  });
};
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};
//点击弹出底部缩略图
const hideoShow = () => {
  if (headrRef.value) {
    if (!ListShow.value) {
      thumbsRef.value.classList.remove("animate__backOutDown");
      thumbsRef.value.classList.add("animate__backInUp");
      headrRef.value.classList.add("animate__backInDown");

      headrRef.value.classList.remove("animate__backOutUp");
    } else {
      thumbsRef.value.classList.remove("animate__backInUp");
      thumbsRef.value.classList.add("animate__backOutDown");
      headrRef.value.classList.add("animate__backOutUp");

      headrRef.value.classList.remove("animate__backInUp");
    }
    ListShow.value = !ListShow.value;
  }
};
//点击视频封面图
const handlePosterClick = (index) => {
  console.log(index);
  // bigImgs.value.forEach((item) => {
  //   item.flag = false;
  // });
  // bigImgs.value[index].flag = true;
  let video;
  if (MySwiper.value) {
    video = MySwiper.value.$el.swiper.slides[index].querySelectorAll("video");
  }

  setTimeout(() => {
    video[0].volume = 1;
    video[0].play();
  }, 300);
};
const onSlideChange = (swiper) => {
  ListShow.value = false;
  thumbsSwiper.value.clickedIndex = swiper.activeIndex;
  let index = swiper.activeIndex;
  handlePosterClick(swiper.activeIndex);
  // bigImgs.value.forEach((item) => {
  //   item.flag = false;
  // });
  console.log();
  if (headrRef.value) {
    headrRef.value.classList.add("animate__backOutUp");
    thumbsRef.value.classList.add("animate__backOutDown");
  }
  if (headrRef.value.classList.contains("animate__backOutUp")) {
    // if (headrRef.value) {
    //   headrRef.value.classList.remove("animate__backOutUp");
    //   thumbsRef.value.classList.remove("animate__backOutDown");
    //   setTimeout(() => {
    //     headrRef.value.classList.add("animate__backInDown");
    //     thumbsRef.value.classList.add("animate__backInUp");
    //   },300);
    // }
  }

  let video = MySwiper.value.$el.swiper.slides[index].querySelectorAll("video");
  let swiperLength = MySwiper.value.$el.swiper.slides.length;
  for (let i = 0; i < swiperLength; i++) {
    let other = MySwiper.value.$el.swiper.slides[i].querySelectorAll("video");
    other[0].pause();
    other[0].volume = 0.0; // 设置音量静音
  }
  video[0].currentTime = 0;
};
</script>

<style scoped lang="scss">
@import "@/assets/css/base.scss";

.video {
  position: relative;
  width: 100%;
  min-width: 1200px;
  margin: 0 auto;
  /* max-height: 1080px; */
  height: auto;
  overflow: hidden;
  box-sizing: border-box;
  .headerbox {
    position: absolute;
    width: 300px;
    top: 50px;
    left: calc(50% - 150px);
    z-index: 9;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 2px;
    > div:nth-child(1) {
      text-align: center;
      line-height: 40px;
      color: #fff;
      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    > div:nth-child(2) {
      line-height: 60px;
      text-align: center;
      color: #fff;
      font-size: 32px;
      font-weight: bold;
    }
  }
  .line {
    font-family: Medium;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -50px;
      width: 20px;
      height: 1px;
      background-color: #fff;
    }
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      right: -50px;
      width: 20px;
      height: 1px;
      background-color: #fff;
    }
  }
  .mySwiper {
    width: 100%;
    height: 100%;
    .swiper-slide {
      width: 100%;
      height: 860px;
      position: relative;
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .poster {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 2;
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          color: #fff;
          flex-direction: column;
          font-size: 44px;
          align-items: center;
          z-index: 10;
        }
      }
      .hideo {
        width: 100px;
        height: 100px;
        color: #fff;
        font-size: 24px;
        background-color: rgba(0, 0, 0, 0.4);
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        top: calc(50% - 50px);
        left: 0;
      }
    }
  }
  .swiper-button-prev {
    position: absolute;
    z-index: 10;
    left: 0px;
    top: calc(50% - 27px);
    background: url("@/assets/images/next.png") no-repeat;
    width: 50px;
    height: 55px;
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg); /* Safari and Chrome */
    cursor: pointer;
  }
  .swiper-button-next {
    cursor: pointer;
    position: absolute;
    top: calc(50% - 27px);
    right: 0px;
    z-index: 10;
    width: 50px;
    height: 55px;
    background: url("@/assets/images/next.png") no-repeat;
  }
  .ThumbsBox {
    bottom: 0px;
    position: absolute;
    width: 100%;
    background-color: rgba($color: #000000, $alpha: 0.4);
    box-sizing: border-box;
    z-index: 9;
    display: flex;
    justify-content: center;
    .conBox {
      position: relative;
      max-width: 1600px;
      width: 100%;
      padding: 20px 120px;
      box-sizing: border-box;
      background: none;
      .mySwiperThumbs {
        .swiper-slide {
          height: 180px;
          border: 4px solid #fff;
          box-sizing: border-box;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          .imgBox {
            width: 100%;
            height: 100%;
            position: relative;
            img {
              height: 100%;
              width: 100%;
              object-fit: cover;
            }
            .mask {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              background: rgba($color: #000000, $alpha: 0.5);
              top: 0;
              z-index: 10;
              > div {
                display: flex;
                flex-direction: column;
                align-items: center;
                .mask-img {
                  width: 50px;
                  height: 50px;
                }
                > div:nth-child(2) {
                  margin-top: 15px;
                  color: #fff;
                  text-align: center;
                  padding: 0 10px;
                  box-sizing: border-box;
                  font-size: 16px;
                }
              }
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
.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
  opacity: 0;
}
.swiper-button-next:after,
.swiper-rtl .swiper-button-prev:after {
  display: none;
}
.swiper-button-prev:after,
.swiper-rtl .swiper-button-next:after {
  display: none;
}
@media screen and (max-width: 1440px) {
  .video {
    .mySwiper {
      width: 100%;
      height: 100%;
      .swiper-slide {
        width: 100%;
        height: 700px;
        position: relative;
        video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .poster {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 2;
          }
          .mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            color: #fff;
            flex-direction: column;
            font-size: 44px;
            align-items: center;
            z-index: 10;
          }
        }
        .hideo {
          width: 80px;
          height: 80px;
          color: #fff;
          font-size: 24px;
          background-color: rgba(0, 0, 0, 0.4);
          position: absolute;
          cursor: pointer;
          top: calc(50% - 50px);
          left: 0;
        }
      }
    }

    .ThumbsBox {
      display: flex;
      justify-content: center;
      .conBox {
        position: relative;
        width: 1200px;
        padding: 20px 120px;
        box-sizing: border-box;
        background: none;
        .mySwiperThumbs {
          .swiper-slide {
            width: 1200px;
            height: 120px !important;
            .imgBox {
              width: 100%;
              height: 100%;
              position: relative;
              img {
                height: 100%;
                width: 100%;
                object-fit: cover;
              }
              .mask {
                > div {
                  > div:nth-child(2) {
                    margin-top: 0px;
                    font-size: 14px;
                    color: #fff;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
@media (min-width: 1440px) and (max-width: 1600px) {
  .video {
    .mySwiper {
      width: 100%;
      height: 100%;
      .swiper-slide {
        width: 100%;
        height: 700px;
        position: relative;
        video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .poster {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 2;
          }
          .mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            color: #fff;
            flex-direction: column;
            font-size: 44px;
            align-items: center;
            z-index: 10;
          }
        }
        .hideo {
          color: #fff;
          font-size: 24px;
          background-color: rgba(0, 0, 0, 0.4);
          position: absolute;
          cursor: pointer;
          top: calc(50% - 50px);
          left: 0;
        }
      }
    }

    .ThumbsBox {
      display: flex;
      justify-content: center;
      padding: 0 5%;
      .conBox {
        .mySwiperThumbs {
          .swiper-slide {
            width: 1200px;
            height: 140px !important;
            .imgBox {
              width: 100%;
              height: 100%;
              position: relative;
              img {
                height: 100%;
                width: 100%;
                object-fit: cover;
              }
              .mask {
                > div {
                  > div:nth-child(2) {
                    margin-top: 0px;
                    font-size: 14px;
                    color: #fff;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
/*  */
</style>
