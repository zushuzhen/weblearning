<script setup>
import titileBus from "@/components/title.vue";
import { reactive, ref, onMounted, toRefs, watchEffect, watch } from "vue";
import { get, gettree } from "../../utils/request";
import { ElDialog } from "element-plus";
import { formatDate } from "@/utils/time.js";
const navList = ref([]);
const name = ref("");
const props = defineProps(["cmpData", "curNav"]);

const pageData = reactive({
  articles: [],
  active: 0,
  classtion: [
  ],
  productArr:[],
  content: {},
  briefArr: {},
  articleArr: [],
  imgages: "",
  dialogVisible:false,
  buyShow:false
});
const { articleArr, briefArr, imgages,active,classtion,productArr } = toRefs(pageData);
let urlHash = location.hash.replace("#", "");
onMounted(() => {
  classtion.value = props.cmpData.children.splice(0,2)
  getproduct(classtion.value[0].id)
  imgages.value = props.cmpData.imgurls.split(",");
  getDetail(props.cmpData.children[0].id);
});
//点击分类
const productBtn=(item,index)=>{
  getproduct(item.id)
  active.value = index
}

//旅行产品详情
const getproduct=(id)=>{
  let data = {
    categoryId: id,
    status: "publish",
  };
  get("/cms/article/list", data).then((res) => {
    console.log(res,'分类数据');
    productArr.value=res.rows
  });
}

//获取旅行业务详情
const getDetail = (id) => {
  //文章模板---获取内容信息
  let data = {
    categoryId: id,
    status: "publish",
  };
  get("/cms/article/list", data).then((res) => {
    articleArr.value = res.rows;
  });
};
const buyBtn=(item)=>{
  window.open(`/articlepage.html?query=${item.id}` + `&topNav=首页`)

}

watch(
  () => props.curNav,
  (value) => {
    console.log("监听到了nav切换");
  }
);
</script>

<template>
  <div class="city">
    <titileBus :title="cmpData.name"></titileBus>

    <div class="nav-r">
      <ul id="navList">
        <li
          :class="active == index ? 'active' : ''"
          v-for="(item, index) in classtion"
          :key="item.id"
          @click="productBtn(item,index)"
          style="font-size: 20px; font-family: Medium"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="boxAll">
      <div
        class="box"
        v-for="item in productArr"
        :key="item.id"
      >
        <div class="image">
          <!-- <img :src="'https://images.maxdata.cc/5a/' + item.cover" alt="" /> -->
          <img :src="item.img[0].url?item.img[0].url:''" alt="">
        </div>
        <div class="commodity">
          <div class="contop">
            <div class="title">{{item.title}}</div>
          </div>
          <div class="conbottom">
            <div class="buy" @click="buyBtn(item)">查看详情</div>
          </div>
        </div>
      </div>
    </div>
    <titileBus title="旅行业务"></titileBus>

    <div
      class="describe list"
      v-for="item in articleArr"
      :key="item.id"
    >
      <div class="d-left" style="width: 70%">
        <div class="leftBox">
          <div class="title">{{ item.title }}</div>
          <div class="content">{{ item.summary }}</div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <div style=" min-width: 10px;">
<!--              <div class="address">-->
<!--                <span-->
<!--                  ><i-->
<!--                    class="iconfont"-->
<!--                    style="font-size: 14px; margin-right: 6px"-->
<!--                    >&#xe76f;</i-->
<!--                  >景点位置：</span-->
<!--                >{{ item.contact }}-->
<!--              </div>-->
              <div class="time">
                <span>
                  <i class="iconfont" style="font-size: 14px; margin-right: 6px"
                    >&#xe85f; </i
                  >联系电话：</span
                >  {{ item.contact }}
              </div>
<!--              <div class="buyline">-->
<!--                <span-->
<!--                  ><i-->
<!--                    class="iconfont"-->
<!--                    style="font-size: 14px; margin-right: 6px"-->
<!--                    >&#xe61f;</i-->
<!--                  >-->
<!--                  <span-->
<!--                    style="text-decoration: underline; cursor: pointer"-->
<!--                    @click="pageData.buyShow = true"-->
<!--                    >预约须知</span-->
<!--                  ></span-->
<!--                >-->
<!--              </div>-->
            </div>
<!--            <div class="buy" @click="pageData.dialogVisible=true">线上预约</div>-->
          </div>
        </div>
      </div>
      <div class="d-right" style="width: 30%">
        <img
          v-if="item.img && item.img.length > 0"
          :src="item.img[0].url"
          alt=""
        />
      </div>
    </div>
    <!-- overflow: hidden; text-overflow: ellipsis; -webkit-line-clamp: 5; /*
    显示行数，这里2行 */ -webkit-box-orient: vertical; display: -webkit-box;
    text-align: justify; -->
    <el-dialog v-model="pageData.dialogVisible" title="预约" width="30%" center>
      <div style="text-align: center">
        <img src="@/assets/images/buywx.jpg" alt="" />
      </div>
      <div style="text-align: center;margin-top: 20px;">您可以扫描二维码线上预约</div>
    </el-dialog>
    <el-dialog v-model="pageData.buyShow" title="购买须知" width="60%" center>

<div style="line-height: 30px">
  游客须知:<br />1.购票规则：游船购票实行实名制，请持身份证购票、验票登船。<br />
  2.检票时间：开航前20分钟开始检票，开航前5分钟停止检票。<br />
  3.注意事项：游船班次以当日公示为准，如遇天气、风浪等不可抗力因素无法乘船，造成不便敬请谅解。详情请关注“奥帆海洋文化旅游区一票通”官方小程序。购买奥帆中心往返崂山风景区航线船票时，请提前拨打客服专线进行预约。
</div>
</el-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
.city {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding-bottom: 50px;
  box-sizing: border-box;
  .list {
    border-radius: 5px;
    margin-bottom: 30px;
    &:hover {
      border: 1px solid #0c5cd6;
      .d-right {
        img {
          transform: scale(1.2);
        }
      }
      .d-left {
        .leftBox {
          .title {
            color: #0c5cd6;
          }
        }
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
  .boxAll {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    .box {
      width: 100%;
      background: #fafafa;
      border-radius: 10px;
      padding: 20px;
      box-sizing: border-box;
      .image {
        width: 100%;
        height: 260px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .commodity {
        width: 100%;
        height: 120px;
        margin-left: 20px;
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
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 0 20px;
          box-sizing: border-box;
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
  .describe {
    width: 100%;
    height: 300px;
    border: 1px solid #eeeded;
    display: flex;
    overflow: hidden;

    .d-left {
      width: 60%;
      display: flex;
      align-items: center;
      padding: 0 40px;
      box-sizing: border-box;
      background: #fafafa;
      .leftBox {
        width: 100%;
        .title {
          font-size: 20px;
          color: #333;
          margin-bottom: 10px;
          font-weight: 600;
          font-family: Medium;
        }
        .content {
          line-height: 25px;
          margin-bottom: 20px;
          font-size: 16px;
          text-align: justify;
        }
        .address {
          margin-bottom: 10px;
        }
        .buyline {
          color: #0c5cd6;
          margin-top: 10px;
        }
        .buy {
          padding: 14px 30px;
          background: #0c5cd6;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .d-right {
      width: 40%;
      height: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: 0.3s;
      }
    }
  }
  .de-top {
    border: none;
    height: 350px;
  }
}
@media (max-width: 1440px) {
  .city {
    width: 1200px;
    .describe {
      .d-left {
        /* width: 70%; */
      }
      .d-right {
        /* width: 30%; */
      }
    }
  }
}
</style>
