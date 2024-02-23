<template>
  <!-- 商品列表循环 -->
  <div class="schoollist">
    <div v-for="item in goodMallList" :key="item" class="list">
      <div class="flex-start">
        <div class="img">
          <img
              :src="`https://images.maxdata.cc/5a/${item.cover}`"
              alt="Smiley face"
              class="spiamge"
              @click="imagepreview(item)"
          />
        </div>
        <div class="shop_Detail">
          <div class="title">
            {{ item.title }}
          </div>
          <div class="text">
            {{ item.shop.name }}
          </div>
          <div class="flex-between">
            <div class="price">
              <text>￥</text>
              {{ item.price }}
            </div>
            <div class="box" @click="byShow = true">购买</div>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model:show="byShow" round closeable class="phpopups">
      <div class="popuptitle">购买</div>
      <van-image src="/static/images/buywx.jpg" class="imgpo" fit="cover"
                 position="center"></van-image>
      <div class="popupline-height">
        您可以扫描二维码线上购买
      </div>
    </van-popup>
  </div>
</template>
<script setup>
import {ref, onMounted, defineProps, watchEffect} from "vue";
import {showImagePreview} from "vant";

const props = defineProps(["goodMallList"]);
const goodMallList = ref([]);
const byShow = ref(false)
watchEffect(() => {
  goodMallList.value = props.goodMallList;
});
const imagepreview = (item) => {
  showImagePreview([`https://images.maxdata.cc/5a/${item.cover}`]);
};
const navtowx = () => {
  // wx.navigateToMiniProgram({
  //   appId: '',
  //   path: 'page/index/index?id=123',
  //   extraData: {
  //     foo: 'bar'
  //   },
  //   envVersion: 'develop',
  //   success(res) {
  //     // 打开成功
  //   }
  // })
}

</script>
<style scoped lang="scss">
.phpopups {
  width: 80%;
  height: 300px;
  padding: 20px;

  .popuptitle {
    text-align: center;
    font-size: 16px;
  }

  .imgpo {
    width: 150px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    justify-content: center;
  }

  .popupline-height {
    font-size: 14px;
    line-height: 28px;
    text-align: center;
  }
}

.schoollist {
  margin-top: 20px;
  overflow: hidden;

  .list {
    .flex-start {
      margin-bottom: 10px;
      background: #f7f7f7;
      display: flex;
      border-radius: 10px;

      .img {
        width: 100px;

        .spiamge {
          width: 80px;
          height: 80px;
          border-radius: 5%;
          object-fit: cover;
        }
      }

      .shop_Detail {
        border-radius: 10px;
        padding: 5px 10px 5px 5px;
        width: 100%;
        margin-left: 5px;
        font-size: 20px;

        .title {
          width: 55vw;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 16px;
          font-weight: 600;
        }

        .text {
          width: 55vw;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 5px 0;
          font-size: 14px;
        }

        .flex-between {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .price {
            color: rgb(234, 87, 3);
            font-size: 14px;
            font-weight: 600;
          }

          .box {
            color: #0c5cd6;
            border: 1px solid #0c5cd6;
            padding: 4px 10px;
            font-size: 14px;
            text-align: center;
            line-height: 20px;
            border-radius: 5px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
