<template>
  <div class="informationCenter-box">
    <div class="informationCenter">
      <div>INFORMATION CENTER</div>
      <div><span class="line">资讯中心</span></div>
    </div>
    <div style=" width: 80%; margin: 0 auto; position: relative;margin-bottom: 20px">
      <van-tabs v-model:active="active" @click-tab="onClickTab" shrink>
        <van-tab v-for="item in seekNav" :key="item" :title="item.name">
          <!--          <div class="subtabs">-->
          <!--            <van-tabs v-model:active="subactive" @click-tab="subClickTab">-->
          <!--              <van-tab-->
          <!--                v-for="ite in smalltitle"-->
          <!--                :key="ite"-->
          <!--                :title="ite"-->
          <!--              ></van-tab>-->
          <!--            </van-tabs>-->
          <!--          </div>-->
        </van-tab>
      </van-tabs>
      <div class="iocn" style="position: absolute;top:calc(50% - 20px);right:-20px">
        <i class="iconfont " style="color: #000;font-size: 24px !important;" @click.stop="poptab">&#xe790;</i>
      </div>
    </div>
    <!--弹窗-->
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker :columns="poptablist" @cancel="showPicker = false" @confirm="subClickTab"/>
    </van-popup>
    <!--    公告-->
    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="volume-o">
      <van-swipe vertical class="notice-swipe" :autoplay="3000" :touchable="false" :show-indicators="false">
        <van-swipe-item v-for="item in noticelist" :key="item" @click="navtonotice(item)">
          {{ item.title }}
        </van-swipe-item>
      </van-swipe>
    </van-notice-bar>
    <!--    列表-->
    <div class="components">
      <div v-for="item in threeList" :key="item.id">
        <KeepAlive>
          <component v-show="idtitle == item.name" :is="getCmp(item)" :list="list"></component>
        </KeepAlive>
      </div>
    </div>
    <div class="more" @click="navto"><span>查看更多</span></div>
  </div>
</template>
<script setup name="informationCenter">
import {Popup} from 'vant';
import {ref, onMounted} from "vue";
import {gettree, get} from "@/utils/request.js";
import articlelist from "../newslist.vue"; // 新闻中心#articlelist-center
import articlelist1 from "../timelist.vue"; // 行业动态#articlelist1-hy
import articlelist2 from "../newsphotolist.vue";
import {value} from "lodash/seq"; // 媒体动态#articlelist2
const cmps = {
  articlelist,
  articlelist1,
  articlelist2,
};
const idkey = ref(""); //参数键名获取id
const idtitle = ref(""); //所点击的三级导航name
const active = ref(0); //二级活动tab
const subactive = ref(0); //三级活动tab
const list = ref([]); //传值给组件的列表数组
const smalltitle = ref([]); //截断的标题
const seekNav = ref([]); //二级导航列表
const threeList = ref([]); //三级导航列表
const noticelist = ref([]); //公告列表
const showPicker = ref(false);//弹窗
const poptablist = ref([]); //弹窗列表

const show = ref(false);
onMounted(() => {
  getseek();
  getnoticelist(); //公告
});
//获取二级导航
const getseek = async () => {
  //根据参数键名获取id
  const res = await get(`/system/config/list?configKey=${"seekNav"}`);
  idkey.value = res.rows[0].configValue;
  gettab();
};
//根据获取的id得到青旅动态的下一级tab
const gettab = (index) => {
  let id = idkey.value;
  gettree(id, false).then((res) => {
    seekNav.value = res.data;
    let arr =
        res.data[index == undefined ? 0 : index === 0 ? 0 : 1].description.split(
            ";"
        );
    idtitle.value = arr[0];
    smalltitle.value = arr;
    getThreeNav(index == undefined || index === 0 ? "hotnew" : "partybuilding");
  });
};
//type为hotnew查询热点新闻id|type为partybuilding查询党建中心id  然后查询当前tab内容
const getThreeNav = async (type) => {
  const res = await get(`/system/config/list?configKey=${type}`);
  let id = res.rows[0].configValue;
  // 根据id查询tab
  gettree(id, false).then((val) => {
    //将热点新闻或者党建中的 与页面三个相似的取出
    threeList.value = val.data.filter((item) =>
        smalltitle.value.includes(item.name)
    );
    newcont(threeList.value[0].id);
  });
};
//获取新闻中心内容  此内容需要传值给组件
const newcont = (id) => {
  let data = {
    categoryId: id,
    status: "publish",
    pageSize: 5,
    pageNum: 1,
  };
  get("/cms/article/list", data).then((res) => {
    let foundTopping = false; // 标志是否找到置顶文章
    let listItems = []; // 用于保存最终的文章列表

    res.rows.forEach((item) => {
      let tops = item.tags;
      const hasTagZero = tops.find((tag) => tag === "tag-0");

      if (hasTagZero) {
        // 如果当前文章是置顶文章，将其放在列表第一个，并标记为找到置顶文章
        listItems.unshift(item);
        foundTopping = true;
      } else {
        // 如果当前文章不是置顶文章，将其加入列表
        listItems.push(item);
      }
    });
// 如果没有找到置顶文章，直接将整个文章列表赋值给 list.value
    if (!foundTopping) {
      listItems = res.rows;
    }
// 将 listItems 赋值给 list.value
    list.value = listItems;

  });
};
//二级tab点击事件
const onClickTab = (title) => {
  active.value = title.name;
  seekNav.value.map((item) => {
    if (item.name == title.title) {
      list.value = [];
      gettab(title.name);
      subactive.value = 0;
    }
  });
};
//三级tab点击事件
const subClickTab = (title) => {
  // subactive.value = title.name;
  // idtitle.value = title.title;
  subactive.value = title.selectedIndexes[0];
  idtitle.value = title.selectedOptions[0].text;
  threeList.value.map((item) => {
    if (item.name == idtitle.value) {
      newcont(item.id);
    }
  });
  showPicker.value = false
};

//判断选择的组件
function getCmp(nav) {
if(nav.name=="党建动态"){
  return cmps["articlelist"];
}else{
  if (nav && nav.url) {
    let h = nav.url.replace("#", "");
    let arr = h.split("-");
    return cmps[arr[0]];
  }

}

}

// more 更多跳转
const navto = () => {
  if (active.value == 0) {
    window.location.href = `./hotnews.html${
        threeList.value[subactive.value].url
    }`;
  } else if (active.value == 1) {
    window.location.href = `./party.html${
        threeList.value[subactive.value].url
    }`;
  }
};

const poptab = () => {
  poptablist.value = smalltitle.value.map(item => {
    return {
      text: item,
      value: item
    }
  })
  showPicker.value = true
};

// 集团公告 模块
const getnoticelist = async () => {
  const res = await get(`/system/config/list?configKey=${"hotnew"}`);
  let id = res.rows[0].configValue;
  // 根据id查询tab
  gettree(id, false).then((val) => {
    val.data.map((item) => {
      if (item.name == "集团公告") {
        getlistdata(item.id);
      }
    });
  });
};
//公告列表
const getlistdata = async (id) => {
  let data = {
    categoryId: id,
    status: "publish",
    pageSize: 10,
    pageNum: 1,
  };
  await get(`/cms/article/list`, data).then((res) => {
    noticelist.value = res.rows;
  });
};
//跳转集团公告
const navtonotice = (item) => {
  window.location.href = "./newsSubpage.html?id=" + item.id;
};
// .iocn {
//   width: 100%;
//   z-index: 199;
//   display: flex;
//   justify-content: right;
//   position: absolute;
//   transform: translateY(-140%);
// }
</script>
<style lang="scss" scoped>

.icon {
  position: absolute;
  top: 0;
  right: 0
}

.iconfont {
  font-size: 24px;
}

.swipeellipsis {
  width: 50vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.subtabs {
  :deep(.van-tabs__nav) {
    justify-content: center !important;
    white-space: nowrap !important;
    overflow-x: auto !important;
  }

  :deep(.van-tabs--line .van-tabs__wrap) {
    height: 45px !important;
  }

  :deep(.van-tab--shrink) {
    padding: 0 10px !important;
  }

  :deep(.van-tabs__wrap) {
    border-bottom: 1px solid #e8e8e8 !important;
  }

  :deep(.van-tab--active) {
    font-weight: 600;
    color: #0c5cd6;
  }

  :deep(.van-tab) {
    font-size: 14px;
  }

  :deep(.van-tabs__line) {
    background: none !important;
  }
}

:deep(.van-tab__text) {
  font-weight: bold;
}

:deep(.van-tab__text--ellipsis) {
  overflow: visible !important;
}


:deep(.van-tab) {
  font-size: 14px;
}

:deep(.van-tab--active) {
  color: #0c5cd6 !important;
  font-weight: 600;
}

:deep(.van-tabs__line) {
  width: 60px;
  background: linear-gradient(
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
  ) !important;
}

:deep(.van-tabs__wrap) {
  border-bottom: none !important;
}

:deep(.van-notice-bar) {
  margin: 0 20px;
  align-items: center;
  height: 28px;
}

.informationCenter-box {

  .informationCenter {
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    background-size: 100% 100%;
    box-sizing: border-box;
    margin-bottom: 20px;

    > div:nth-child(1) {
      text-align: center;
      line-height: 40px;
      color: #d2d5da;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    > div:nth-child(2) {
      line-height: 26px;
      text-align: center;
      color: #333;
      font-size: 24px;
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

    .body {
      padding: 10px 0;
      margin-bottom: 20px;

      .content-news {
        padding: 20px 0;
        font-size: 16px;
        font-weight: 500;
        border-right: 6px solid rgba(0, 0, 0, 0);
      }

      .tag-news {
        font-weight: 300;
        font-size: 16px;

        .small-title {
          line-height: 16px;
          padding-bottom: 16px;
        }

        .flex-start {
          display: flex;
          align-items: center;
        }

        .tag {
          background: #f3f3f3;
          color: #0c5cd6;
          font-weight: 400;
          font-size: 12px;
          padding: 5px;
          margin-right: 15px;
        }
      }
    }
  }
}

.components {
  padding-top: 15px;
}

.more {
  margin: 0 20px;
  padding: 15px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #bfbfbf;
}

.layout {
  background: url("@/assets/images/link.png");
}

.text-lg {
  font-size: 16px;
  font-weight: 600;
}

.notice-swipe {
  height: 40px;
  line-height: 40px;
}

:deep(.van-icon:before) {
  font-size: 14px;
  margin-right: 10px;
}

:deep(.van-swipe-item) {
  height: auto !important;
  font-size: 14px;
  width: 60vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
<style scoped>
:deep( .van-tabs__wrap) {
  margin-top: 30px;
  border: none;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

:deep(.van-tab) {
  padding: 0 15px;
}
</style>
