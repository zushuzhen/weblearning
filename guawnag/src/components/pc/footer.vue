<template>
  <div class="footer-box">
    <div class="footer-atuo">
      <div class="footer-content-top">
        <div class="footer-top-left-one">
          <div class="footer-logo">
            <img src="@/assets/images/logo-w.png" alt="" />
          </div>
          <div class="footer-code">
            <img src="@/assets/images/tg_01.jpg" alt="" />
            <span>官方公众号</span>
          </div>
        </div>
        <div class="footer-top-left-two">
          <div class="quickNavigation-box">
            <ul class="col-list" v-for="item in navList" :key="item.id">
              <li style="margin-bottom: 20px" v-if="item.name != '首页'">
                <a :href="item.url" style="color: #fff; font-weight: 600">{{
                  item.name
                }}</a>
              </li>
              <li v-for="p in item.children" :key="p.id">
                <a v-if="p.jumpurl" :href="p.jumpurl" target="_blank">{{
                    p.name
                  }}</a>
                  <a v-else :href="item.url + (p.url??'')">{{ p.name }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-top-left-three">
          <div class="footer-phone">
            <span>{{ usList.name }}</span>
            <p>{{ usList.contact }}</p>
          </div>
          <div class="footer-phone">
            <span>电子邮箱</span>
            <p style="font-size: 16px">{{ usList.email }}</p>
          </div>
          <div class="footer-phone">
            <span>联系地址</span>
            <p style="font-size: 16px">{{ usList.url }}</p>
          </div>
        </div>
      </div>
      <div class="footer-content-bottom">
        <p>
          {{ usList.copyrightInfo }}
          <a href="https://beian.miit.gov.cn/" style="margin-left: 10px"
            >鲁ICP备17011232号-2</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup name="footer">
import { ref, onMounted } from "vue";
import { getTtrees, getClassification, fetchData } from "@/utils/package.js";
import { gettree } from "@/utils/request.js";
import { get } from "@/utils/request.js";

const name = ref("i am footer");
const usList = ref({});
const navList = ref([]);
onMounted(async () => {
  let result = await fetchData("heardNav");
  navList.value = result.data;
  getUs();
});
const getUs = () => {
  let data = {
    keywords: "about",
  };
  get("/cms/websites/list", data).then((res) => {
    usList.value = res.rows[0];
  });
};
</script>

<style scoped>
.footer-box {
  width: 100%;
  min-width: 1200px;
  background-color: #07102d;
}
.footer-atuo {
  width: 80%;
  min-width: 950px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.footer-content-top {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
}
.footer-top-left-one {
  width: 14%;
  height: 100%;
}
.footer-logo {
  width: 100%;
  min-width: 180px;
  margin-bottom: 20px;
}
.footer-logo img {
  width: 100%;
}
.footer-code {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
}
.footer-code img {
  width: 60%;
  min-width: 100px;
  margin-bottom: 10px;
}
.footer-code span {
  color: #fff;
  width: 70%;
  min-width: 100px;
  text-align: center;
  font-size: 14px;
}
.footer-top-left-two {
  width: 60%;
  height: 100%;
  margin-left: 40px;
}

.quickNavigation-box {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.col-list {
  margin-left: 20px;
}
.col-list li {
  width: 100%;
text-align: center;
  margin-bottom: 10px;
}
.col-list li a {
  color: hsla(0, 0%, 100%, 0.6);
  transition: color 0.3s;
  font-size: 14px;
}
.footer-top-left-three {
  width: 27%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.footer-phone {
  width: 100%;
  min-width: 200px;
  margin-left: 100px;
  margin-bottom: 20px;
}
.footer-phone span {
  font-size: 14px;
  font-weight: 500;
  color: hsla(0, 0%, 100%, 0.6);
  line-height: 14px;
  margin-bottom: 12px;
}
.footer-phone p {
  height: 28px;
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  line-height: 28px;
  margin-bottom: 0;
  margin-top: 4px;
}
.footer-content-bottom {
  width: 100%;
  height: 60px;
  margin-top: 30px;
}
.footer-content-bottom p {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 14px;
  color: hsla(0, 0%, 100%, 0.6);
}
.footer-content-bottom p a {
  font-size: 14px;
  color: hsla(0, 0%, 100%, 0.6);
}
@media screen and (max-width: 1440px) {
  .footer-phone p {
    font-size: 24px;
  }
  .footer-top-left-three {
    width: 22%;
  }
}
</style>
