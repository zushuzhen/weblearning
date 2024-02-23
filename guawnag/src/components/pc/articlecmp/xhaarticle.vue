<script setup>
import titileBus from "@/components/title.vue";
import {onMounted, reactive, ref} from "vue";
import {get} from "../../utils/request";
import {formatDate} from "@/utils/time.js";
import pages from "@/components/xhapage.vue";

const props = defineProps(["cmpData"]);

const articleList = ref([]);
const article = ref({});
const defPageSize = 1;
let data = {
  categoryId: props.cmpData.id,
  status: "publish",
  pageNum: 1,
  pageSize: defPageSize,
};

function query() {
  get("/cms/article/list", data).then((res) => {
    articleList.value = res.rows;
    if (res.rows && res.rows.length > 0)
      article.value = res.rows[0];
  });
}

onMounted(() => {
  query();
});
</script>

<template>
  <div class="hotcontent">
    <div class="contentone">
      <titileBus :title="cmpData.name"></titileBus>
      <p v-html="article.content"></p>
      <template v-if="article&&article.img">
        <img v-for="item in article.img" :src="item.url" alt="" :style="{'marginTop':article.content&&article.title!='组织架构'?'40px':0 }"/>
      </template>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/css/base.scss";

.hotcontent {
  width: 100%;
  width: 1600px;
  margin: 0 auto;
  padding-bottom: 130px;

  .contentone {
    p {
      text-align: justify;
      text-indent: 2em;
      line-height: 25px;
      color: #333;
    }

    img {
      //width: 750px;
      width: 70%;
      display: block;
      margin: 0 auto;
    }
  }

  .content {
    width: 100%;
    padding: 50px 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;

    .box {
      width: 100%;
      margin-bottom: 30px;
      cursor: pointer;

      &:hover img {
        transform: scale(1.2);
      }

      .image {
        width: 100%;
        height: 245px;
        overflow: hidden;
      }

      img {
        width: 100%;
        height: 245px;
        transition: 0.3s;
      }

      .text {
        padding: 24px 50px 0 0;
        box-sizing: border-box;

        .title {
          font-family: Medium;
          line-height: 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2; /* 显示行数，这里2行 */
          -webkit-box-orient: vertical;
          display: -webkit-box;
          text-align: justify;
          font-size: 18px;
          font-weight: 600;
          color: #000;
        }

        .boxcontent {
          margin: 10px 0;
          line-height: 20px;
          text-align: justify;
          color: #ccc;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 3; /* 显示行数，这里2行 */
          -webkit-box-orient: vertical;
          display: -webkit-box;
          font-size: 12px;
        }
      }
    }
  }

  .contentt {
    width: 100%;
    padding: 0px 0 50px;

    .ttbox {
      width: 100%;
      margin-bottom: 30px;
      background: #f7f7f7;
      cursor: pointer;
      display: flex;

      .box-l {
        color: #fff;
        background: #d7dbe7;
        width: 180px;
        height: 180px;
        text-align: center;
        line-height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        transition: 0.3s;

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
        padding: 60px 50px;
        box-sizing: border-box;
        position: relative;
        width: calc(100% - 180px);

        > div {
          width: 80%;
          height: 65px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;

          > p:nth-child(1) {
            color: #000;
            font-family: Medium;
            font-size: 18px;
            font-weight: 600;
          }

          > p:nth-child(2) {
            color: #666;
          }
        }

        &::before {
          display: block;
          content: "";
          width: 35px;
          height: 16px;
          background: url("@/assets/images/arrow.jpg") no-repeat;
          position: absolute;
          top: calc(50% - 8px);
          right: 50px;
        }
      }

      &:hover .box-l {
        background: #0c5cd6;
      }

      &:hover .box-r p {
        color: #0c5cd6 !important;
      }

      &:hover .box-r::before {
        background: url("@/assets/images/arrow-list.jpg") no-repeat;
      }
    }
  }

  .consulting {
    display: flex;
    justify-content: space-between;
    padding-top: 50px;
    box-sizing: border-box;
    height: 400px;
  }

  .contents {
    padding: 0px 0 50px;

    .consix {
      display: flex;
      border-bottom: 1px solid #f0f0f0;
      padding: 28px 0;
      box-sizing: border-box;
      cursor: pointer;
      transition: 0.3s;
      overflow: hidden;

      &:hover {
        .zoom-r {
          > div:nth-child(1) {
            > p:nth-child(1) {
              color: #0c5cd6;
            }
          }
        }
      }

      &:hover .zoomImg {
        transform: scale(1.2);
      }

      .zoom-l {
        width: 205px;
        height: 140px;
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
        width: calc(100% - 205px);
        padding: 5px 24px;
        box-sizing: border-box;
        position: relative;

        &::before {
          display: block;
          content: "";
          width: 35px;
          height: 16px;
          background: url("@/assets/images/arrow.jpg") no-repeat;
          position: absolute;
          top: calc(50% - 8px);
          right: 50px;
        }

        > div:nth-child(1) {
          width: 100%;
          /* display: flex;
          flex-direction: column;
          justify-content: space-between; */
          line-height: 40px;
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
        }
      }
    }
  }
}

.time {
  color: #aaa;
  font-size: 12px;
  display: flex;
  align-items: center;

  > span {
    display: block;
    width: 70px;
    height: 25px;
    background: #f3f3f3;
    color: #0c5cd6;
    text-align: center;
    line-height: 25px;
    margin-right: 20px;
    border-radius: 5px;
  }
}

@media (max-width: 1440px) {
  .hotcontent {
    /* width: 1200px; */
  }
}
</style>
