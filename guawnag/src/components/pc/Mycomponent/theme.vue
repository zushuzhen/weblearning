<template>
  <div class="layout wow animate__animated animate__fadeInUp">
    <div class="theme">
      <div>theme activities</div>
      <div><span class="line">主题活动</span></div>
      <div class="activity">
        <div
          class="activity-box"
          @click="detalil(item)"
          v-for="item in themNav"
          :key="item.id"
        >
          <div class="box-image">
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
          <div class="box-content">
            <div class="tag-box">
              <div
                v-if="item.tags && item.tags.length > 0"
                class="tag text-xs"
                style="background: rgb(41, 202, 186)"
              >
                {{ gettages(item.tags[0]) }}
              </div>
              <div class="time">{{ formatDate(item.publishtime, "all") }}</div>
            </div>
            <div class="title ellipsis">
              {{ item.title }}
            </div>
            <div class="content">
              {{
                item.summary != "\t\t\t\t\t\r\n\t\t\t\t" && item.summary
                  ? item.summary
                  : "筑梦想，赢未来"
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="more them" @click="moreBtn"><span>查看更多></span></div>
  </div>
</template>

<script setup name="Theme">
import { ref, reactive, onMounted } from "vue";
import { get, gettree } from "@/utils/request.js";
import { formatDate } from "@/utils/time.js";
import { gettages } from "@/utils/tags.js";

const themNav = ref([]);

onMounted(async () => {
  //根据参数键名获取id
  const res = await get(`/system/config/list?configKey=${"theme"}`);
  console.log(res);
  let id = res.rows[1].configValue;
  gettheme(id);
});
const gettheme = (id) => {
  let data = {
    categoryId: id,
    status: "publish",
    pageSize: 4,
    pageNum: 1,
  };
  get("/cms/article/list", data).then((res) => {
    themNav.value = res.rows;
  });
};
const detalil = (item) => {
  // location.href = `/articlepage.html?query=${item.id}` + `&topNav='首页'`;
  window.open(`/articlepage.html?query=${item.id}` + `&topNav=首页`);
};
const moreBtn = () => {
  location.href = `/hotnews.html#articlelist-hd`;
};
</script>

<style scoped lang="scss">
@import "@/assets/css/base.scss";
.layout {
  background: #f9fafc;
}
@media (min-width: 1440px) and (max-width: 1600px) {
  .theme {
    padding: 0 5%;
  }
}


.theme {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  height: 640px;
  box-sizing: border-box;
  padding-top: 50px;
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
  .activity {
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    .activity-box {
      border-radius: 6px;
      overflow: hidden;
      transition: 0.3s;
      background-color: #ffffff;
      &:hover {
        box-shadow: 5px 5px 20px rgba($color: #999, $alpha: 0.2);
      }
      .box-image {
        width: 100%;
        height: 200px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .box-content {
        padding: 20px 30px 40px 30px;
        background: #fff;
        .tag-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          .tag {
            padding: 8px 10px;

            font-size: 14px;
            border-radius: 2px;
            color: #fff;
          }
          .time {
            color: #adaeb3;
            font-size: 14px;
          }
        }
        .title {
          color: #333;
          text-align: justify;
          margin: 18px 0;
          cursor: pointer;
          font-size: 20px;
          font-family: Medium;
        }
        .content {
          cursor: pointer;
          width: 100%;
          height: 90px;
          line-height: 22px;
          font-size: 16px;
          white-space: normal;
          text-align: justify;
          display: -webkit-box; /* 使用弹性盒子布局 */
          -webkit-line-clamp: 4; /* 限制文本显示的行数，这里设置为3行 */
          -webkit-box-orient: vertical; /* 垂直排列文本 */
          overflow: hidden; /* 隐藏超出容器的文本 */
          text-overflow: ellipsis; /* 当文本超出容器宽度时显示省略号 */
        }
      }
    }
  }
}
@media screen and (max-width: 1440px) {
  .theme {
    width: 1200px;
    padding: 0;
  
  }
}
</style>
