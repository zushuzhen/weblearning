<template>
  <div>
    <div class="videolist">
      <div v-if="list.length != 0 && list[0]?.title" v-for="(item, index) in list" :key="item" class="container">
        <div class="main-image" @click="navideo(item, index)">
          <img v-if="item.imgUrls" :src="item.imgUrls" alt=" " />
          <img v-else src="'/static/images/defalut.png'" alt=" " />
          <div class="centered-image">
            <i class="iconfont iconsize">&#xe83e;</i>
          </div>
        </div>
        <div>
          <van-image-preview v-model:show="show" :images="videos" closeable @close="onClose">
            <template #image="{ src }">
              <video style="width: 100%" autoplay controls>
                <source :src="src" />
              </video>
            </template>
          </van-image-preview>
        </div>
        <p class="text">{{ item.title }}</p>
      </div>
      <div v-if="list.length != 0 && list[0]?.vrName" v-for="(item, index) in list" :key="item" class="container">
        <div class="main-image" @click="navto(item, index)">
          <van-image fit="cover" position="center" :src="item.imgurl" class="vanmage" />
          <div class="vcentered-image">
            <div class="centered-vr">
              <i class="iconfont iconsize">&#xe69b;</i>
            </div>
          </div>
        </div>
        <p class="text">{{ item.vrName }}</p>
      </div>
    </div>
  </div>
</template>

<script setup name="videolist">
import { ref, onMounted, defineProps, watchEffect, nextTick } from "vue";
import { ImagePreview } from "vant";
import { showImagePreview } from "vant";

const props = defineProps(["list"]);
const list = ref("");
const videos = ref([])
const show = ref(false)
watchEffect(() => {
  list.value = props.list;
  console.log(list.value);
});
const navto = (item, index) => {
  window.location.href = item.linkUrl;
};
const navideo = (item, index) => {
  console.log(item)
  videos.value = [item.locationUrls ? item.locationUrls : item.url]
  setTimeout(() => {
    show.value = true
  }, 250) // 延迟500毫秒执行
};
const onClose = () => {
  videos.value = []
}
</script>

<style lang="scss">
.videolist {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;

  .container {
    position: relative;

    .main-image {
      position: relative;

      .vanmage {
        width: 100%;
        height: 100%;
      }

      .centered-image {
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -52%);
        height: 96%;
        width: 100%;
        background: rgba(0, 0, 0, 0.3);

        .iconfont {
          color:#fff;
          font-size: 30px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .icon {
          height: 40px;
          width: 40px;
        }
      }

      .vcentered-image {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -52%);
        height: 96%;
        width: 100%;
        background: rgba(0, 0, 0, 0.3);

        .centered-vr {
          margin: 0 auto;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px dashed #fff;

          .iconfont {
            color:#fff;
            font-size: 30px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }

  .text {
    width: 100%;
    font-size: 14px;
    text-overflow: ellipsis;
    text-align: center;
    margin-top: 5px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.main-image img {
  width: 100%;
  height: 23vw;
}

.centered-image img {
  width: 15vw;
  height: auto;
}
</style>
