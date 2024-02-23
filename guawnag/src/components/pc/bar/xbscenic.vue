<template>
  <div class="city">
    <div class="consulting">
      <div class="con-left">
        <div
          class="nav-box"
          @click="productBtn(item, index)"
          :class="index == active ? 'actives' : ''"
          v-for="(item, index) in classtion"
          :key="item.id"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="con-right">
        <titileBus :title="logoObj.name"></titileBus>

        <div class="one-top">
          <div class="top-left">
            <div class="image">
              <img
                v-if="logoObj && logoObj.imgurls"
                :src="logoObj.imgurls"
                alt=""
              />
            </div>
          </div>
          <div class="top-right">
            <div>
              <p v-html="logoObj.description"></p>
              <div class="btn" v-if="show">
                <div class="buy" @click="phoneBtn">
                  <i class="iconfont iconSize">&#xe6c1;</i>游客中心讲解预约
                </div>
                <div class="buy" @click="phoneBtn">
                  <i class="iconfont iconSize">&#xe76a;</i>景区观光车预约
                </div>
              </div>
            </div>
          </div>
        </div>
        <titileBus title="景点介绍"></titileBus>

        <div class="boxAll">
          <div class="box" v-for="item in productArr" :key="item.id">
            <div class="image">
              <!-- <img :src="'https://images.maxdata.cc/5a/' + item.cover" alt="" /> -->
              <img :src="item.img[0].url ? item.img[0].url : ''" alt="" />
            </div>
            <div class="commodity">
              <div class="contop">
                <div class="title">{{ item.title }}</div>
              </div>
              <div class="conbottom">
                <p>{{ item.summary }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog v-model="dialogVisible" title="预约" width="30%" center>
        <div class="reservation">预约电话：<span>（0532）5861 7777</span></div>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ElDialog, ElMessage } from "element-plus";

import { ref, reactive, watch, onMounted } from "vue";
import titileBus from "@/components/title.vue";
import { get } from "../../utils/request";

const props = defineProps(["cmpData", "curNav"]);
const classtion = ref([]);
const active = ref(0);
const productArr = ref(0);
const logoObj = ref(0);
const show = ref(false);
const dialogVisible = ref(false);
//点击分类
const productBtn = (item, index) => {
  getproduct(item.id);
  if (item.name.indexOf("奥林匹克帆船中心") != -1) {
    show.value = true;
  } else {
    show.value = false;
  }
  console.log(item.name.indexOf("奥林匹克帆船中心") != -1);
  active.value = index;
  logoObj.value = classtion.value[index];
};
//景区介绍
const getproduct = (id) => {
  let data = {
    categoryId: id,
    status: "publish",
  };
  get("/cms/article/list", data).then((res) => {
    console.log(res, "分类景区数据");
    productArr.value = res.rows;
  });
};
//点击弹窗
const phoneBtn = () => {
  dialogVisible.value = true;
};

onMounted(() => {
  console.log(props.cmpData, "景区数据");
  classtion.value = props.cmpData.children;
  logoObj.value = props.cmpData.children[0];
  if (logoObj.value.name.indexOf("奥林匹克帆船中心") != -1) show.value = true;

  getproduct(logoObj.value.id);
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
.city {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  .consulting {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    height: auto;
    .con-left {
      width: 250px;

      padding-top: 50px;
      margin-right: 30px;
      border-right: 1px solid #f3f3f3;

      .nav-box {
        height: 80px;
        line-height: 80px;
        cursor: pointer;
        font-size: 16px;
        text-align: center;
        &:hover {
          background: #0c5cd6 url("@/assets/images/bgack.png") no-repeat;
          background-size: 200px;
          background-position: center;
          color: #fff;
        }
      }
      .actives {
        background: #0c5cd6 url("@/assets/images/bgack.png") no-repeat;
        background-size: 200px;
        background-position: center;
        color: #fff;
      }
    }
    .con-right {
      margin-left: 30px;
      width: 85%;
      padding: 0px 0 50px;
      .one-top {
        display: flex;
        width: 100%;
        border-radius: 10px;
        overflow: hidden;
        .top-right {
          width: 50%;
          padding: 50px;
          box-sizing: border-box;
          background: #fafafa;
          border-radius: 5px;
          display: flex;
          align-items: center;
          .btn {
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
            margin-top: 36px;
            .buy {
              margin-left: 20px;
              color: #fff;
              background: #0c5cd6;
              padding:20px;
              font-size: 16px;
              text-align: center;
              line-height: 20px;
              border-radius: 5px;
              cursor: pointer;
              transition: 0.3s;
              .iconSize {
                color: #fff;
                font-size: 20px;
                margin-right: 10px;
              }
            }
          }
          p {
            line-height: 30px;
            text-indent: 2em;
            font-size: 16px;
            text-align: justify;
          }
        }
        .top-left {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          .image {
            width: 100%;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
      .boxAll {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;
        margin-top: 30px;
        .box {
          width: 100%;
          background: #fafafa;
          border-radius: 10px;
          padding: 20px;
          box-sizing: border-box;
          .image {
            width: 100%;
            height: 200px;
            border-radius: 10px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: 0.3s;
            }
          }
          .commodity {
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            transition: 0.3s;

            .contop {
              margin-top: 20px;
              .title {
                display: -webkit-box; /* 使用弹性盒子布局 */
                -webkit-line-clamp: 1; /* 限制文本显示的行数，这里设置为3行 */
                -webkit-box-orient: vertical; /* 垂直排列文本 */
                overflow: hidden; /* 隐藏超出容器的文本 */
                text-overflow: ellipsis;
                margin-bottom: 10px;
                color: #333;
                font-size: 20px;
                font-family: Medium;
              }
              .sumny {
                line-height: 25px;
                display: -webkit-box; /* 使用弹性盒子布局 */
                -webkit-line-clamp: 2; /* 限制文本显示的行数，这里设置为3行 */
                -webkit-box-orient: vertical; /* 垂直排列文本 */
                overflow: hidden; /* 隐藏超出容器的文本 */
                text-overflow: ellipsis;
                color: #666;
              }
            }
            .conbottom {
              width: 100%;
              line-height: 30px;
              box-sizing: border-box;
              text-align: justify;
            }
          }
          &:hover {
            box-shadow: 0px 0px 0px 1px #0c5cd6 inset;
            .image {
              img {
                transform: scale(1.2);
              }
            }
          }
        }
      }
    }
    .conVr {
      display: grid;
    }
  }
}
@media (max-width: 1440px) {
  .city {
    min-width: 1200px;
  }
  .top-right{
    padding: 20px !important;
  }
}
.reservation {
    display: flex;
    justify-content: center;
    align-items: center;
    span{
        font-size: 20px;
        color: #0c5cd6;
    }
}
</style>
