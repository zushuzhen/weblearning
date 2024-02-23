<template>
  <div>
    <div class="header">
      <div class="header-logo" style="height: 70px">
        <van-image src="static/images/logo-black.png" block style="width: 180px; object-fit: contain"
                   @click="navtoindex"/>
        <div class="header-icon">
          <i class="iconfont" style="padding-right: 18px;color: #000;font-size: 24px !important;"
             @click.stop="navtokeyword">&#xe840;</i>
          <i v-if="show" class="iconfont" @click.stop="showPopupOff"
             style="padding-right: 10px;color: #000;font-size: 24px !important;"> &#xe617;</i>
          <i v-else class="iconfont" style="padding-right: 10px;color: #000;font-size: 24px !important;"
             @click.stop="showPopupOn">&#xe790;</i>
        </div>
      </div>
      <!--栏目-->
      <van-popup v-model:show="show" position="right"
                 :style="{width: '100%',height: '100%',marginTop: `68px`,}">
        <van-collapse v-for="(item, index) in menuList" :key="item.id" v-model="activeName" accordion>
          <van-collapse-item :name="item.id" @click="tourl(item, index)">
            <template #title>
              <div class="border">{{ item.name }}</div>
            </template>
            <template #right-icon>
              <van-icon color="#000" v-if="item.children.length == 0 ? false : true" name="arrow"
                        :style="{transform: `rotate(${item.children.length == 0 ? 0 : item.open ? 0 : 90}deg)`,
                transformOrigin: 'center center',
                paddingRight: `${item.children.length == 0 ? 5 : item.open ? 5 : 10}px`,
                marginTop: `${item.open ? 5 : 10}px`,}"/>
            </template>
            <van-cell v-for="(ite, index) in item.children" :key="ite.id" :title="ite.name"
                      @click.stop="navto(ite, index)"/>
          </van-collapse-item>
        </van-collapse>
      </van-popup>
      <!--栏目子页-->
    </div>
    <!--    <div style="height: 30px; background: #fff"></div>-->
    <div style="height: 70px; background: #fff"></div>
  </div>
</template>
<script setup>
import $bus from "@/utils/bus.js";
import {ref, onMounted} from "vue";
import {gettree, get} from "@/utils/request.js";

const activeName = ref("0");
const url = ref();
const show = ref(false);
const id = ref();
const menuList = ref();
const relateArr = ref({})
onMounted(async () => {
  gettree().then((res) => {
    res?.data?.map((item) => {
      if (item.name == "导航") {
        menuList.value = item.children.map((item) => {
          return {
            ...item,
            open: false,
          };
        });
      }
    });
  });
  get('/cms/websites/list', {keywords: 'about'}).then(res => {
    relateArr.value = res?.rows[0]
  })
});
const height = ref();
// 菜单弹窗开
const showPopupOn = () => {
  show.value = true;
};
// 菜单弹窗关
const showPopupOff = () => {
  show.value = false;
  subpageShow.value = false;
};
const tourl = (item, index) => {
  if (item.children.length == 0) {
    window.location.href = item.url;
  } else {
    url.value = item.url;
    id.value = item.id;
    let number = index;
    menuList.value = menuList.value.map((ite, ind) => ({
      ...ite,
      open: ind == number ? (item.open ? false : true) : false,
    }));
  }
};
//跳转页面
const navto = (ite, index) => {
  show.value = false;
  if (ite.name == "招采信息") {
    window.location.href = 'https://app.51qqt.com/qingdaotourism/portal/#/login'
  } else {
    $bus.emit("subactive", {subactive: index});
    $bus.emit("navList", {navList: ite});
    window.location.href = url.value + `${ite.url}`;
  }
};
//跳转搜索页
const navtokeyword = () => {
  show.value = false;
  window.location.href = `./keyword.html`;
};
//跳转主页
const navtoindex = () => {
  show.value = false;
  window.location.href = `./index.html`;
};
</script>
<style scoped lang="scss">
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  .felx-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: url("@/assets/images/head_bg.jpg");
    background-size: cover;

    .weatherfelx {
      display: flex;
      align-items: center;
    }

    .flex-box {
      background: #fff;
    }

    .weatherbutton {
      background-color: #3d77f4;
      color: #fff;
    }
  }

  .header-logo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 0px 10px 0px 20px;

    .header-icon {
      display: flex;
      align-items: center;
    }
  }
}

.van-popup--right {
  background: #f9f9f9;
}


.van-cell__right-icon {
  --van-cell-right-icon-color: #fff !important;
}

.van-overlay {
  background: none;
}
</style>
