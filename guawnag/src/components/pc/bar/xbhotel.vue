<script setup>
import titileBus from "@/components/title.vue";
import { reactive, ref, onMounted, toRefs, watchEffect, watch } from "vue";
import { get, gettree } from "../../utils/request";
const navList = ref([]);
const name=ref('')
const props = defineProps(["cmpData", "curNav"]);
// const curNav = ref({});

const pageData = reactive({
  articles: [],
  active: 0,
  content: {},
});
const { active, content } = toRefs(pageData);
let urlHash = location.hash.replace("#", "");
//获取三级菜单
const getthree1 = (result) => {
  gettree(result, false).then((res) => {
    navList.value = res.data;
    name.value =res.data[0].name
      getDetail(res.data[0].id);
  });
};
onMounted(() => {
    console.log(props.cmpData.url);
  getthree1(props.cmpData.id);
});

//获取详情
const getDetail = (id) => {
  //文章模板---获取内容信息
  let data = {
    categoryId: id,
    status: "publish",
  };
  get("/cms/article/list", data).then((res) => {
    content.value = res.rows[0];
    console.log(res.rows);
  });
};

function navClick(index, id) {
  active.value = index;
  name.value = navList.value[index].name
  getDetail(id);
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
    <div class="consulting">
      <div class="con-left">
        <div
          class="nav-box"
          @click="navClick(index, item.id)"
          :class="index == active ? 'actives' : ''"
          v-for="(item, index) in navList"
          :key="item.id"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="con-right">
        <div class="boxtitle">
          <div class="box-top">{{name }}</div>
          <div class="box-bottom"></div>
        </div>
        <p v-html="content.content"></p>
      </div>
    </div>
  </div>
</template>

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
      width: 300px;

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
      padding: 50px 0;
      .boxtitle {
        margin-bottom: 30px;
        .box-top {
          font-size: 28px;
          padding-bottom: 16px;
          font-weight: bold;
          font-family: Medium;
          color: #333;
        }

        .box-bottom {
          width: 52px;
          height: 0;
          border-top-color: #0c5cd6;
          border-top-width: 8px;
          border-top-style: solid;
          border-right: 6px solid rgba(0, 0, 0, 0);
        }
      }
      .team {
        font-size: 32px;
        font-family: Medium;
        font-weight: 700;
        color: rgb(51, 51, 51);
      }
      .team-box {
        width: 52px;
        margin-top: 20px;
        height: 0;
        border-top-color: #0c5cd6;
        border-top-width: 8px;
        border-top-style: solid;
        border-right: 6px solid rgba(0, 0, 0, 0);
      }
      .titlt {
        margin-bottom: 40px;
        font-size: 28px;
        color: #0c5cd6;
        font-weight: bold;
        font-family: Medium;
      }
      p {
        text-align: justify;
        color: #666;
        line-height: 30px;
        margin-bottom: 40px;
      }
      
      .boxImg {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 40px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
          overflow: hidden;
        }
      }
      .time {
        display: flex;
        justify-content: flex-end;
        margin-top: 50px;
        align-items: center;
        span {
          font-size: 22px;
          color: #0c5cd6;
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
    width: 1200px;
  }
}
</style>
