<script setup>
import titileBus from "@/components/title.vue";
import {onMounted, reactive, ref} from "vue";
import {get} from "../../utils/request";
import {formatDate} from "@/utils/time.js";
import pages from "@/components/xhapage.vue";

const props = defineProps(['cmpData','topNav'])

const articleList = ref([])

const pageObj = reactive({
  pageNum: 1,
  pageSize: defPageSize,
  total: 0
})
const defPageSize = 6;
let data = {
  categoryId: props.cmpData.id,
  status: "publish",
  pageNum: 1,
  pageSize: defPageSize
};

function query() {
  get("/cms/article/list", data).then((res) => {
    articleList.value = res.rows
    pageObj.total = res.total
  })
}

onMounted(() => {
  query();
})

function pageChange(pageObj) {
  console.log(pageObj)
  data.pageNum = parseInt(pageObj.pageNum)
  pageObj.pageNum = data.pageNum
  query()
}
function goContent(item) {
  if(item.jumpurl){
    window.open(item.jumpurl)
  }else{
  window.open(`/articlepage.html?query=${item.id}` + `&topNav=${props.topNav}`)
  }
  // location.href = `/articlepage.html?query=${item.id}`+`&topNav=${props.topNav}`
  // window.open(`/articlepage.html?query=${item.id}` + `&topNav=${props.topNav}`)

}
</script>

<template>
  <div class="hotcontent">
  <div class="contentt">
    <titileBus :title="cmpData.name"></titileBus>

    <div
        class="ttbox"
        @click="goContent(item)"
        v-for="item in articleList"
        :key="item.id"
    >
      <div class="box-l">
        <p>{{ formatDate(item.publishtime, "date") }}</p>
        <p>{{ formatDate(item.publishtime, "yarn") }}</p>
      </div>
      <div class="box-r">
        <div>
          <p>{{ item.title }}</p>
          <p>{{ (item.summary != "\t\t\t\t\t\r\n\t\t\t\t") && item.summary?item.summary:'筑梦想，赢未来' }}</p>
        </div>
      </div>
    </div>
    <pages v-model:page-num="pageObj.pageNum" :page-size="pageObj.pageSize" v-model:total="pageObj.total" @change="pageChange"></pages>
  </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";

.hotcontent {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;

  .content {
    width: 100%;
    padding-bottom: 50px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
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
          color: #666;
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 3; /* 显示行数，这里2行 */
          -webkit-box-orient: vertical;
          display: -webkit-box;
        }
      }
    }
  }

  .contentt {
    width: 100%;
    padding-bottom: 50px;

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
        width: calc(100% - 180px);
        padding: 60px 50px;
        height: 180px;
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-items: center;
        > div {
          width: 80%;
          /* display: flex; */
          /* flex-direction: column; */
          /* justify-content: space-between; */
          position: relative;

          > p:nth-child(1) {
            color: #000;
            font-family: Medium;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
            overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1; /* 显示行数，这里2行 */
          -webkit-box-orient: vertical;
          display: -webkit-box;
          }

          > p:nth-child(2) {
            margin-top: 14px;
            color: #666;
            line-height: 22px;
            overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2; /* 显示行数，这里2行 */
          -webkit-box-orient: vertical;
          display: -webkit-box;
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
    padding-bottom: 50px;
    box-sizing: border-box;

    .con-left {
      width: 225px;
      height: 100%;
      margin-right: 30px;

      .nav-box {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 18px;

        &:hover {
          background: #0c5cd6 url("@/assets/images/bgack.png") no-repeat;
          background-size: 320px;
          background-position: -60px -40px;
          color: #fff;
        }
      }

      .actives {
        background: #0c5cd6 url("@/assets/images/bgack.png") no-repeat;
        background-size: 320px;
        background-position: -60px -45px;
        color: #fff;
      }
    }

    .con-right {
      margin-right: 10px;
      width: 88%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 20px;

      .conbox {
        width: 100%;
        text-align: center;
        margin-bottom: 35px;

        > div {
          border-radius: 5px;
          overflow: hidden;
          width: 100%;
          height: 210px;
          position: relative;

          img {
            width: 100%;
            height: 100%;
          }

          > .mark {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            img {
              width: 60px !important;
              height: 60px !important;
            }
          }
        }

        > p {
          margin-top: 25px;
        }
      }
    }
  }

  .contents {
    padding-bottom: 50px;

    .consix {
      display: flex;
      border-bottom: 1px solid #f0f0f0;
      padding: 28px 0;
      cursor: pointer;
      transition: 0.3s;
      overflow: hidden;
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
        width: calc(100% - 285px);
        padding: 5px 24px;
        box-sizing: border-box;

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

.videBox {
  width: 100%;
  height: 600px;

  video {
    width: 100%;
    height: 100%;
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
    width: 1200px;

    .content {
      .box {
        .image {
          width: 100%;
          height: 210px;
          overflow: hidden;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.3s;
        }
      }
    }

    .consulting {
      .con-right {
        .conbox {
          > div {
            height: 170px;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
  }
  .videBox {
    width: 100%;
    height: 400px;
  }
}
</style>
