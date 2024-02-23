<template>
  <div class="footer-box">
    <div class="footer-auto">
      <van-collapse
          v-for="(item, index) in menuList"
          :key="item.id"
          v-model="activeName"
          accordion
      >
        <van-collapse-item :name="item.id" @click="tourl(item, index)">
          <template #title>
            <div class="border">{{ item.name }}</div>
          </template>
          <template #right-icon>
            <van-icon
                color="#fff"
                v-if="item.children.length == 0 ? false : true"
                name="arrow"
                :style="{
                transform: `rotate(${
                  item.children.length == 0 ? 0 : item.open ? 0 : 90
                }deg)`,
                transformOrigin: 'center center',
                paddingRight: `${
                  item.children.length == 0 ? 5 : item.open ? 5 : 10
                }px`,
                marginTop: `${item.open ? 5 : 10}px`,
              }"
            />
          </template>
          <van-cell
              v-for="(ite, index) in item.children"
              :key="ite.id"
              :title="ite.name"
              @click.stop="navto(ite, index)"
          />
        </van-collapse-item>
      </van-collapse>
      <div class="connection">
        <p>联系电话</p>
        <p style="font-family: Medium">{{ relateArr.contact }}</p>
        <p style="font-family: Medium">电子邮箱</p>
        <p>{{ relateArr.email }}</p>
        <p style="font-family: Medium">联系地址</p>
        <p>{{ relateArr.url }}</p>
        <div>
          <van-image width="100" height="100" :src="relate.wxcode"/>
        </div>
      </div>
      <div class="copyright">
        <p>{{ relateArr.copyrightInfo }}</p>
      </div>
    </div>
  </div>
</template>
<script setup name="mobileFooter">
import $bus from "@/utils/bus.js";
import {ref, onMounted} from "vue";
import {gettree, get} from "@/utils/request.js";

const activeName = ref("0");
const url = ref();
const id = ref();
const menuList = ref();
const relateArr = ref({})
const relate = ref({
  titlephone: "联系电话",
  phone: "0532-66776720",
  titleqq: "电子邮箱",
  qq: "qdlyjt2015@163.com",
  titleaddress: "联系地址",
  address: "青岛市市南区澳门路121号甲",
  gzh: "官方公众号",
  wxcode: "static/images/tg_01.jpg",
});
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
//存储链接
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
  if (ite.name == "招采信息") {
    window.location.href = 'https://app.51qqt.com/qingdaotourism/portal/#/login'
  } else {
    $bus.emit("subactive", {subactive: index});
    window.location.href = url.value + `${ite.url}`;
  }
};
</script>
<style scoped lang="scss">
.footer-box {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #050b1e;

  .footer-auto {
    width: 100%;
    padding-top: 20px;
  }
}

.connection {
  margin-top: 15px;
  background: #050b1e;
  text-align: center;
  font-weight: 600;

  p {
    margin: 0 auto;
    font-size: 60px;
    color: #a2a4b1;
    font-weight: bold;
    font-family: Medium;
  }

  p:nth-child(odd) {
    font-size: 14px;
  }

  p:nth-child(even) {
    padding:2px 0 15px 0;
    font-size: 20px;
    color: #fff;
  }

  div {
    margin-top: 10px;
    padding-bottom: 5px;
  }
}

.copyright {
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  color: #848484;
  background: #050b1e;
  font-size: 12px;
}

:deep(.van-icon ) {
  color: #a2a4b1 !important;
}

:deep(.van-cell ) {
  color: hsla(0, 0%, 100%, 0.6) !important;
  background: #050b1e !important;
  border: none !important;
  position: static !important;
  border-bottom: 1px solid #333 !important;
}

:deep(.van-collapse-item__content) {
  background: #050b1e;
}

:deep(.van-collapse van-hairline--top-bottom) {
  border: none !important;
}

:deep([class*="van-hairline"]:after) {
  position: relative;
}

:deep(.van-cell:after ) {
  position: static !important;
}
</style>
