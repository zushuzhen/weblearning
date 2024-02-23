<template>
  <div>
    <div class="headerbox">
      <div>PROMOTION VIDEO</div>
      <div><span class="line">宣传视频</span></div>
    </div>
    <!--    选择器-->
    <div class="videofiel">
      <van-field v-model="fieldValue" is-link readonly placeholder="请选择视频" @click="videoshowPicker = true">
        <template #left-icon>
          <i class="iconfont" style="color: #333;margin-right: 10px">&#xe666;</i>
        </template>
      </van-field>
    </div>
    <!--    弹窗-->
    <van-popup v-model:show="videoshowPicker" round position="bottom">
      <van-picker :columns="videotextlist" @cancel="videoshowPicker = false" @confirm="onConfirm" />
    </van-popup>
    <!--   视频-->
    <div class="datav">
      <div class="poster" v-if="onevideo.flag == false">
        <div class="postion" @click="handlePosterClick">
          <van-image fit="cover" position="center" :src="onevideo.imgUrls" class="fmimg" />
          <div class="mask">
            <div class="demo">
              <i class="iconfont" style="font-size: 40px; color: #fff">&#xe83e;</i>
              <div style="font-size: 14px;margin-top: 10px">{{ onevideo.title }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <video v-if="onevideo.locationUrls || onevideo.url" id="myVideo" autoplay controls class="videohei">
          <source :src="onevideo.locationUrls ? onevideo.locationUrls : onevideo.url" class="videosource" />
        </video>
        <!-- muted 声音 -->
      </div>
    </div>
  </div>
</template>

<script setup name="Video">
import { reactive, ref, onMounted, toRefs } from "vue";
import { get } from "@/utils/request.js";

const videoshowPicker = ref(false)//视频选择弹窗
const videotextlist = ref([])//视频选择弹窗列表
const SwiperShow = ref(false)//视频接口列表有数据为true 显示
const fieldValue = ref('')//选择框默认显示的内容

const bigImgs = ref([])//轮播数组列表
const onevideo = ref({})
onMounted(() => {
  getVideo();
});
// 获取数据
const getVideo = () => {
  let data = {
    tags: "home",
  };
  get("/cms/videos/list", data).then((res) => {
    bigImgs.value = res.rows.map((item) => {
      return { ...item, flag: false, };
    });
    videotextlist.value = res.rows.map((item) => {
      return {
        text: item.title,
        value: item.id
      };
    });
    fieldValue.value = videotextlist.value[0].text
    SwiperShow.value = true;
    console.log(bigImgs.value)
    onevideo.value = bigImgs.value[0]
    console.log(onevideo.value)
  });
};

//点击视频封面图
const handlePosterClick = () => {
  console.log(12)
  onevideo.value.flag = true
};
//弹窗确定
const onConfirm = (res) => {
  videoshowPicker.value = false
  fieldValue.value = res.selectedOptions[0].text
  bigImgs.value = bigImgs.value.map((item, index) => {
    return {
      ...item,
      flag: false,
    }
  })

  bigImgs.value.map((item, index) => {
    if (item.id == res.selectedOptions[0].value) {
      onevideo.value = bigImgs.value[index]
    }
  })

  console.log(onevideo.value)
}
</script>

<style scoped lang="scss">
.headerbox {
  margin-top: 20px;
  margin-bottom: 20px;

  >div:nth-child(1) {
    text-align: center;
    line-height: 40px;
    color: #d2d5da;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  >div:nth-child(2) {
    line-height: 26px;
    text-align: center;
    color: #333;
    font-size: 26px;
    font-weight: bold;
  }

  .line {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -30px;
      width: 14px;
      height: 1px;
      background-color: #d2d5da;
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      right: -30px;
      width: 14px;
      height: 1px;
      background-color: #d2d5da;
    }
  }
}

.videofiel {
  padding: 20px 20px;
}

.datav {
  height: 50vw;

  .poster {
    position: relative;

    .postion {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 0%);
      width: 100vw;

      .fmimg {
        width: 100vw;
        height: 50vw;
      }

      .mask {
        height: 50vw;
        background: rgba(0, 0, 0, 0.5);
        transform: translateY(-101%);
        text-align: center;
        color: #fff;

        .demo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }

  .videohei {
    width: 100vw;
    height: 50vw;

    .videosource {
      width: 100vw;
      height: 50vw;
    }
  }
}
</style>
