<template>
  <div
      class="imgprop"
      :style="{
      backgroundImage: 'url(' + banner.banner + ')',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundAttachment: 'inherit',
    }"
  >
    <div class="text-box">
      <p class="text-lg">{{ banner.title }}</p>
      <p>{{ banner.wasp }}</p>
      <img src="@/assets/images/downward.jpg" alt=""/>
    </div>
  </div>
  <div ref="navRef" class="navigation animate__faster">
    <div class="nav">
      <div class="nav-l">
        <ul id="navList">
          <li
              :class="modelValue ==item ?'active':''"
              v-for="(item, index) in navList"
              :key="item.id"

          >
            <a v-if="item.jumpurl" :href="item.jumpurl" target="_blank">{{ item.name }}</a>
            <a v-else :href="item.url" @click="seekClick(item, index)">{{ item.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-if="navShow" style="height: 76px"></div>
</template>

<script setup>
import {ref, onMounted, reactive, toRefs} from "vue";
import $bus from "@/utils/bus.js";
import {debounce} from "@/utils/index.js";


const props = defineProps(['navList', 'banner', 'modelValue'])
const emits = defineEmits(['update:modelValue'])
const {navList, banner, modelValue} = toRefs(props);

const navRef = ref(null);
const navShow = ref(false);
const seekClick = (item, index) => {
  console.log(item);
  emits('update:modelValue', item)
  window.scrollTo(0, 0);
};

onMounted(() => {
  window.addEventListener("scroll", debounce(handleScroll, 10));
});

const handleScroll = function () {
  const offset = window.document.documentElement.scrollTop;
  if (offset > 580) {
    if (navRef.value) {
      navRef.value.classList.add(
          "active",
          "animate__animated",
          "animate__fadeInDown"
      );
      navShow.value = true;
    }
  } else {
    if (navRef.value) {
      navRef.value.classList.remove(
          "active",
          "animate__animated",
          "animate__fadeInDown"
      );
      navShow.value = false;
    }
  }
};
</script>


<style lang="scss" scoped>
.navigation {
  width: auto;
  min-width: 1200px;
  border-bottom: 1px solid #e8e8e8;
  &.active {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 10;

  }
  .nav {
    max-width: 1600px;
    margin: 0 auto;
    display: flex;
    height: 76px;

    .nav-l {
      display: flex;
      align-items: center;
      width: 100%;
      /* border-bottom: 1px solid #e8e8e8; */
      > ul {
        height: 100%;
        display: flex;
        margin: 0;
        padding: 0;
        margin: 0 auto;
        > li {
          list-style: none;
          margin: 0 30px;
          line-height: 76px;
          display: inline-block;
          position: relative;
          cursor: pointer;
          color: #333;
          transition: all 0.2s linear;
          &::before {
            /* 伪元素来做下划线 */
            content: "";
            position: absolute;
            bottom: 0;
            left: 100%;
            width: 0; /* 一开始宽度为0下划线也为0看不出来 */
            height: 0;
            border-bottom: 2px solid;
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
            color: #004898;

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

                  font-family: Medium;
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
          a{
            color: #004898;
            font-family: Medium;
            font-weight: 600;
          }
        }
      }
    }
  }
  @media (max-width: 1440px) {
    .nav {
      width: 1200px;
    }
  }
}
.imgprop {
  width: 100%;
  min-width: 1200px;
  height: 480px;
  margin-top: 90px;
  > div {
    z-index: 2;
    height: 100%;
    color: #fff;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > p {
      font-size: 20px;
      text-shadow: 2px 2px 2px #474748;
      font-family: Medium;
    }
    > p:nth-child(1) {
      margin-bottom: 10px;
      font-size: 32px;
    }
    img {
      width: 16px;
      margin-top: 40px;
      animation: slide 1s infinite ease-in-out;
    }
  }
}
@keyframes slide {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
