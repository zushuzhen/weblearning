<template>
  <div class="shop">
    <titileBus :title="cmpData.name"></titileBus>
    <!-- <div class="classification">
      <div
        :class="obj.active == index ? 'active' : ''"
        v-for="(item, index) in obj.classtion"
        :key="item.id"
        @click="classtion(index)"
      >
        {{ item.name }}
      </div>
    </div> -->
    <div class="nav-r">
      <ul id="navList">
        <li
          :class="obj.active == index ? 'active' : ''"
          v-for="(item, index) in obj.classtion"
          :key="item.id"
          @click="classtion(index)"
          style="font-size: 20px; font-family: Medium"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="boxAll">
      <div
        class="box"
        v-for="item in obj.active == 3
          ? obj.listQingmian
          : obj.active == 2
          ? obj.listOtherList
          : obj.active == 1
          ? obj.listJpin
          : obj.literatureList"
        :key="item.id"
      >
        <div class="image" v-if="item.cover">
          <img :src="'https://images.maxdata.cc/5a/' + item.cover" alt="" />
        </div>
        <div class="commodity">
          <div class="contop">
            <div class="title">{{ item.title }}</div>
            <div class="sumny">
              {{ item.shop.name }}
            </div>
          </div>
          <div class="conbottom">
            <div class="money">￥{{ item.price }}</div>
            <div class="buy" @click="buyBtn">购买</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="obj.dialogVisible" title="线上预订" width="30%" center>
      <div style="text-align: center">
        <img src="@/assets/images/buywx.jpg" alt="" />
      </div>
      <div class="online">您可以扫描二维码线上预订</div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ElDialog, ElMessage } from "element-plus";
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import titileBus from "@/components/title.vue";
const props = defineProps(["cmpData", "topNav"]);

const obj = reactive({
  dialogVisible: false,
  classtion: [
    { id: 1, name: "奥帆帆专栏" },
    { id: 2, name: "纪念品" },
    { id: 3, name: "国粹精品" },
    { id: 4, name: "青免国际" },
  ],
  active: 0,
  idArr: [42, 95, 101, 43, 227],
  idOther:[102,105],
  literatureList: [], //奥帆饭
  listOtherList: [], // 国粹精品
  listJpin: [], //纪念品
  listQingmian: [], //青免国际
});
onMounted(() => {
  getshoping();
  getshopOther();
  getJpin();
  getOther();
});

const classtion = (index) => {
  console.log(index);
  obj.active = index;
};
const buyBtn = () => {
  obj.dialogVisible = true;
};
const getshoping = () => {
  let id = 2;
  axios
    .get(
      "https://merchant.qosmcareas.com/api/ecmall/shop_list_label?keyword=&label_id=" +
        id
    )
    .then((res) => {
      if (res.data.code == 200) {
        let List = res.data.data;
        let intersectArray = List.filter(
          (item) => !obj.idArr.some((pitem) => pitem == item.id)
        );
        let OtherintersectArray = List.filter((item) =>
          obj.idArr.some((pitem) => pitem == item.id)
        );
        obj.listOtherList.push(...OtherintersectArray);
        obj.literatureList = intersectArray;
      } else if (res.data.code == 500) {
        ElMessage.error("服务器错误");
      } else {
        ElMessage.error("获取数据失败");
      }
    });
};
const getshopOther = () => {
  axios
    .get(
      "https://merchant.qosmcareas.com/api/ecmall/shop_list_label?keyword=&label_id=" +
        1
    )
    .then((res) => {
      if (res.data.code == 200) {
        let List = res.data.data;
        obj.listOtherList.push(...List);
      } else if (res.data.code == 500) {
        ElMessage.error("服务器错误");
      } else {
        ElMessage.error("获取数据失败");
      }
    });
};
//纪念品
const getJpin = () => {
  axios
    .get(
      "https://merchant.qosmcareas.com/api/ecmall/shop_list_label?keyword=&label_id=4"
    )
    .then((res) => {
      if (res.data.code == 200) {
        let List = res.data.data;
        obj.listJpin.push(...List);
      } else if (res.data.code == 500) {
        ElMessage.error("服务器错误");
      } else {
        ElMessage.error("获取数据失败");
      }
    });
};
//其他 青免国际
const getOther = () => {
  axios
    .get(
      "https://merchant.qosmcareas.com/api/ecmall/shop_list_label?keyword=&label_id=" +
        3
    )
    .then((res) => {
      if (res.data.code == 200) {
        let List = res.data.data;
       let qingmianArr= List.filter(item=>!obj.idOther.some(p=>item.id ===p))
        let OhterArr=List.filter(item=>obj.idOther.some(p=>item.id ===p))
        obj.listOtherList.push(...OhterArr)
        obj.listQingmian.push(...qingmianArr);
      } else if (res.data.code == 500) {
        ElMessage.error("服务器错误");
      } else {
        ElMessage.error("获取数据失败");
      }
    });
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";

.shop {
  padding-bottom: 50px;
  width: 100%;
  box-sizing: border-box;
  .boxAll {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    .box {
      width: 100%;
      height: 170px;
      background: #fafafa;
      border-radius: 10px;
      padding: 0 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .image {
        width: 150px;
        height: 120px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .commodity {
        width: 60%;
        height: 120px;
        margin-left: 20px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        transition: 0.3s;

        .contop {
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
          display: flex;
          justify-content: space-between;
          align-items: center;
          .money {
            color: rgb(234, 87, 3);
            font-size: 18px;
            font-weight: 600;
          }
          .buy {
            color: #0c5cd6;
            border: 1px solid #0c5cd6;
            padding: 10px 20px;
            font-size: 16px;
            text-align: center;
            line-height: 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: 0.3s;
            &:hover {
              background: #0c5cd6;
              color: #fff;
            }
          }
        }
      }
      &:hover {
        box-shadow: 0px 0px 0px 1px #0c5cd6 inset;
      }
    }
  }
  .classification {
    display: flex;
    margin-bottom: 20px;
    > div {
      cursor: pointer;
      margin-right: 50px;
      &.active {
        color: #0c5cd6;
      }
    }
  }
  .nav-r {
    justify-content: center;
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    margin-top: -40px;
    .lang {
      margin-left: 30px;
      position: relative;
      cursor: pointer;
      &:hover {
        ul {
          display: block;
        }
      }
      ul {
        display: none;
        margin: 0;
        padding: 0;
        position: absolute;
        left: 50%;
        top: 100%;
        width: 100px;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 4px;
        overflow: hidden;
        animation: navU2 0.5s ease forwards;
        @keyframes navU2 {
          0% {
            opacity: 0;
            transform: translate(-50px, -30px);
          }
          100% {
            opacity: 1;
            transform: translate(-50px, 0);
          }
        }
        li {
          list-style: none;
          box-sizing: border-box;
          cursor: pointer;
          a {
            display: block;
            padding: 0 10px;
            height: 40px;
            text-transform: uppercase;
            text-align: center;
            line-height: 40px;
            border-bottom: 1px solid #dfdfdf;
            background: #fff;
            box-shadow: 0 0 6px #dfdfdf;
            text-decoration: none;
            color: rgb(51, 51, 51);
            &:hover {
              color: #004898;
            }
            img {
              margin-right: 10px;
              width: 32px;
            }
          }
        }
      }
    }
    > ul {
      height: 100%;
      display: flex;
      margin: 0;
      padding: 0;
      > li {
        list-style: none;
        margin: 0 30px;
        line-height: 60px;
        display: inline-block;
        position: relative;
        cursor: pointer;
        color: #666;
        transition: all 0.2s linear;
        &::before {
          /* 伪元素来做下划线 */
          content: "";
          position: absolute;
          bottom: 0;
          left: 100%;
          width: 0; /* 一开始宽度为0下划线也为0看不出来 */
          height: 0;
          border-bottom: 4px solid;
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
          &::before {
            width: 100%; /* hover后宽度显示出来下划线也显示出来 */
            bottom: 0;
            left: 0;
            transition-delay: 0.1s;
          }
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
        color: #0c5cd6 !important;
        font-weight: 600;
        &::before {
          width: 100%; /* hover后宽度显示出来下划线也显示出来 */
          bottom: 0;
          left: 0;
        }
      }
    }
  }
  .online {
    width: 80%;
    line-height: 30px;
    margin: 0 auto;
    text-align: center;
    margin-top: 10px;
    border-radius: 30px;
  }
}
</style>
