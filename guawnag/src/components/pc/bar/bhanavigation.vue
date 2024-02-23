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
      <p class="text-lg">{{ banner.title=="首页"?'核心主业':'' }}</p>
      <p>{{ banner.wasp }}</p>
      <img src="@/assets/images/downward.jpg" alt="" />
    </div>
  </div>
  <div ref="navRef" class="navigation animate__faster">
    <div class="nav">
      <div class="nav-l">
        <ul id="navList">
          <li
            :class="modelValue == item ? 'active' : ''"
            v-for="(item, index) in navList"
            :key="item.id"
            @click="seekClick(item, index)"
          >
            <div class="icon">
              <i class="iconfont" v-html="item.icon"></i>
            </div>
            <div class="text">
              <a>{{ item.name }}</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-if="navShow" style="height: 76px"></div>
</template>

<script setup>
import { ref, onMounted, reactive, toRefs } from "vue";
import $bus from "@/utils/bus.js";
import { debounce } from "@/utils/index.js";

const props = defineProps(["navList", "banner", "modelValue"]);
const emits = defineEmits(["update:modelValue"]);
const { navList, banner, modelValue } = toRefs(props);

const navRef = ref(null);
const navShow = ref(false);
const seekClick = (item, index) => {
  location.href = item.url;

  emits("update:modelValue", item);
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
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          color: #333;
          &:hover {
            color: #004898;
            .text {
              a {
                color: #004898;
              }
            }
          }
          .icon {
            margin-bottom: 10px;
          }
          a {
            text-decoration: none;
          }
        }
        li:hover ~ li:before {
          left: 0;
        }
        .active {
          color: #004898;
          font-family: Medium;
          .text {
            a {
              color: #004898;
            }
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
