<template>
  <div>
    <navigate v-if="props.navKey!='funcBar'" :show-title="props.showTitle" :active="active" v-model="curNav"
              :nav-list="navList"
              :model-style="props.modelStyle"></navigate>
    <navigateicon v-else :show-title="props.showTitle" :active="active" v-model="curNav"
                  :nav-list="navList"></navigateicon>
    <div v-for="item in navList" :key="item">
      <KeepAlive>
        <component v-show="curNav.id == item.id" :is="getCmp(item)" :cmp-data="item" :top-nav="bannerQuery"></component>
      </KeepAlive>
    </div>
  </div>
</template>
<script setup name="contactUs">
import navigate from "../navigate.vue";
import navigateicon from "../navigateicon.vue";
import introduction from "./introduction.vue"; // 集团简介#introduction
import managerteam from "./managerteam.vue"; // 管理团队#managerteam
import article from "./article.vue"; // 组织架构#organization  党委概况#article
import grouppart from "./grouppart.vue"; // 集团板块#grouppart
import grouphistory from "./grouphistory.vue"; // 发展历程#grouphistory
import honorswiper from "./honorswiper.vue"; // 荣誉资质#honorswiper
import contactus from "./contactus.vue"; // 联系我们#contactus
import brandidentity from "./brandidentity.vue"; // 品牌标识#brandidentity
import groupvision from "./groupvision.vue"; // 集团愿景#groupvision
import corevalues from "./corevalues.vue"; // 核心价值观#corevalues
import corporate from "./corporate.vue"; // 企业文化理念#corporate-cc
import sresponsibility from "./sresponsibility.vue"; // 社会责任#sresponsibility
import articlelist from "./articlelist.vue"; // 新闻中心-center 主题活动-hd
import articlelist1 from "./articlelist1.vue"; // 行业动态-hy 集团公告-gg 党建动态 廉洁青旅
import articlelist2 from "./articlelist2.vue"; // 媒体动态#articlelist2
import videolist from "./videolist.vue"; // 视频中心#videolist
import articlelist3 from "./articlelist3.vue"; // 招聘信息#articlelist3-zp
import city1 from "./city1.vue"; // 山 海 湾 城#city1-m
import Island from "./Island.vue"; // 岛城vr#Island
import scenic from "./scenic.vue"; // 景区
import shoplist from "./shoplist.vue"; //商品列表
import travel from "./travel.vue"; //旅行
import hotel from "./hotel.vue"; //酒店
import cruise from "./cruise.vue"; //邮轮
import otherfun from "./otherfun.vue" //购票
import tourism from "./tourism.vue" //文旅
import meeting from "./meeting.vue" //会议
import articlepagelist from "./articlepagelist.vue" //签证 用车
import brand from "./brand.vue"; // 党建品牌
import {defineProps, onMounted, ref, toRefs, watchEffect} from "vue";
import {get, gettree} from "@/utils/request.js";
import $bus from "@/utils/bus.js";

const cmps = {
  brand,
  brandidentity,
  groupvision,
  corevalues,
  corporate,
  sresponsibility,
  articlelist,
  articlelist1,
  articlelist2,
  articlelist3,
  videolist,
  article,
  introduction,
  grouppart,
  contactus,
  grouphistory,
  managerteam,
  honorswiper,
  city1,
  Island,
  shoplist,
  travel,
  hotel,
  articlepagelist,
  cruise,
  otherfun,
  tourism,
  meeting,
  scenic
};
const props = defineProps(["navKey", "showTitle", "modelStyle"]);
const urlHash = ref("");
let active = ref("0");
const curNav = ref({});
const navList = ref([]);
const {bannerQuery} = toRefs(props);
const timer = ref(null)
onMounted(() => {
  urlHash.value = location.hash.replace("#", "");
  console.log(urlHash.value)
  getData();
  window.addEventListener("hashchange", newchange);
});
const newchange = () => {
  let urlhash = location.hash
  if (urlhash) {
    urlHash.value = urlhash
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      $bus.emit("navList", {navList: navList.value});
      if (urlHash.value) {
        navList.value.map((item, index) => {
          if (item.url == urlhash) {
            curNav.value = item;
            $bus.emit("subactive", {subactive: index});
          }
        });
      } else {
        curNav.value = navList.value.data[0];
      }
    }, 20)
  }
}
const getData = async () => {
  let Akey = props.navKey
  //根据参数键名获取id
  await get(`/system/config/list?configKey=${Akey}`).then((res) => {
    let listid = res.rows[0].configValue;
    // 根据id查询tab
    gettree(listid, false).then((val) => {
      navList.value = val.data.map((ite) => {
        let cmp = ite.url?.split("-")[0];
        return {...ite, urls: cmp,};
      });
      console.log(navList.value)
      $bus.emit("navList", {navList: navList.value});
      if (urlHash.value) {
        val.data.map((item, index) => {
          if (item.url == `#${urlHash.value}`) {
            curNav.value = item;
            $bus.emit("subactive", {subactive: index});
          }
        });
      } else {
        curNav.value = val.data[0];
      }
    });
  })
}

function getCmp(nav) {
  if (nav.name == "党建动态") {
    return cmps["articlelist"];
  } else {
    if (nav && nav.urls) {
      let h = nav.urls.replace("#", "");
      let arr = h.split("-");
      return cmps[arr[0]];
    }
  }
}
</script>
<style lang="scss"></style>
