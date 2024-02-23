<template>
  <div class="contactUs-box">
    <div class="contactbox">
      <i
          class="iconfont"
          @click="toggleSearchInput"
          style="padding-right: 18px"
          v-html="usList.fontStyle"
      ></i>
      <div class="title">{{ usList.name }}</div>
      <div class="number">{{ usList.contact }}</div>
    </div>
    <div class="contactbox">
      <i
          class="iconfont"
          @click="toggleSearchInput"
          style="padding-right: 18px"
          v-html="usList.themeColor"
      ></i>
      <div class="title">{{ usList.theme }}</div>
      <div class="number">{{ usList.email }}</div>
    </div>
    <div class="contactbox">
      <i
          class="iconfont"
          @click="toggleSearchInput"
          style="padding-right: 18px"
      >&#xe633;</i>
      <div class="title">在线留言</div>
      <div class="number" style="text-decoration: underline" @click="line">点击可在线留言</div>
    </div>
    <div class="map">
      <div id="container"></div>
    </div>
    <van-popup v-model:show="popliuyanshow" class="popliuyan" closeable round>
      <van-cell-group inset>
        <van-field
            required="auto"
            v-model="contact"
            label="联系方式"
            placeholder="请填写联系方式"
            :rules="[{ required: true, message: '请填写联系方式' }]" label-align="top"
        />
        <van-field
            required="auto"
            autosize
            type="textarea"
            v-model="verbContent"
            label="留言内容"
            rows="4"
            placeholder="请填写留言内容"
            :rules="[{ required: true, message: '请填写留言内容' }]"
            label-align="top"
        />
        <van-field
            required
            v-model="code"
            center
            label="验证码"
            placeholder="请输入验证码"
        >
          <template #button>
            <van-image
                class="yzmimg"
                @click="getcode"
                fit="cover"
                :src="'data:image/gif;base64,' + codeimg"
                alt=""
            />
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit" @click="onSubmit">
          提交
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup name="contactUs">
import {Notify, showNotify, closeNotify, Popup, Form, Field, CellGroup} from 'vant';
import {get, postJson} from "@/utils/request.js";
import {onMounted, onUnmounted, defineProps, ref, reactive, toRefs} from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

const contact = ref('')
const verbContent = ref('')
const code = ref('')

const uuid = ref('');
const codeimg = ref('');
const props = defineProps(["cmpData"]);
let map = null;
const popliuyanshow = ref(false);
const usList = ref({});
window._AMapSecurityConfig = {
  securityJsCode: "07140fb0eccb38d2a74e170c64263e58", // 应用生成的秘钥
};
onMounted(() => {
  getcode()
  let data = {
    tags: "about",
  };
  get("/cms/websites/list", data).then((res) => {
    usList.value = res.rows[0];
  });
  AMapLoader.load({
    key: "4abe6e61862d3c59633be129c2ac142c", // 申请好的Web端开发者Key，首次调用 load 时必填
    // version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.ToolBar", "AMap.ControlBar", "AMap.Scale"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
      .then((AMap) => {
        map = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "2D", // 否为3D地图模式
          zoom: 15, // 初始化地图级别
          center: [120.397805, 36.058466], // 初始化地图中心点位置
        });
        var content = ["<div style='font-size:14px'>", "青岛旅游集团</div>"];
        const infoWindow = new AMap.InfoWindow({
          //使用自定义窗体
          content: content.join("<br>"), //信息窗体的内容可以任意html片段
          offset: new AMap.Pixel(1, -20),
        });
        //将创建的点标记添加到已有的地图实例：
        infoWindow.open(map, map.getCenter());
        //创建一个 Marker 实例：
        const marker = new AMap.Marker({
          position: new AMap.LngLat(120.369557, 36.094406), //经纬度对象，也可以经纬度构成的一维数组[116.39, 39.9]
          title: "青岛旅游集团",
        });
        map.add(marker);
        map.addControl(new AMap.ToolBar());
        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
        map.addControl(new AMap.Scale());
      })
      .catch((e) => {
        console.log(e);
      });
});

onUnmounted(() => {
  map?.destroy();
});

//获取验证码
const getcode = () => {
  get("/captchaImage").then((res) => {
    codeimg.value = res.data.img;
    uuid.value = res.data.uuid;
  });
};
//留言弹窗
const line = () => {
  popliuyanshow.value = true
  getcode()
}
//提交信息
const onSubmit = async (formEl) => {
  // 验证联系方式
  if (contact.value == '') {
    showNotify({type: 'warning', message: '联系方式不可为空'});
    return;
  }
  // 验证留言内容
  if (verbContent.value == '') {
    showNotify({type: 'warning', message: '留言内容不可为空'});
    return;
  }
  // 验证验证码
  if (code.value == '') {
    showNotify({type: 'warning', message: '验证码不可为空'});
    return;
  }
  let data = {
    contact: contact.value,
    verbContent: verbContent.value,
    code: code.value,
    verbTitle: "用户留言",
    uuid:uuid.value,
  }
  postJson("/cms/verb", data).then((res) => {
    showNotify({type: 'success', message: '提交成功'});
    code.value = '';
    verbContent.value = '';
    contact.value = '';
    popliuyanshow.value = false;
  }).catch(err => {
    // 危险通知
    showNotify({type: 'danger', message: '验证码错误'});
    getcode()
  })

};
</script>
<style scoped lang="scss">
.yzmimg {
  width: 80px;
}

.van-cell {
  background: none !important;
  border: none !important;
  position: static !important;
  border-bottom: 1px solid #f7f7f7 !important;
}

.contactUs-box {
  padding: 0 20px 20px;
}

.popliuyan {
  padding: 20px 0;
  width: 80%;

}

.contactbox {
  background: #f2f2f2;
  font-size: 20px;
  padding: 20px 20px;
  border-radius: 10px;
  margin-bottom: 20px;

  .iconfont {
    font-size: 30px;
    color: #333;
  }

  .title {
    font-family: Medium;
    font-size: 18px;
    line-height: 28px;
  }

  .number {
    margin-top: 5px;
    font-size: 14px;
  }
}

.titleBox {
  padding: 20px 0;

  .bigTitle {
    text-align: center;
    font-size: 24px;
    padding-bottom: 10px;
    font-family: Medium;
    color: #333;
  }

  .rectangle {
    margin: 0 auto;
    width: 52px;
    height: 0;
    border-top-color: #0c5cd6;
    border-top-width: 6px;
    border-top-style: solid;
    border-right: 6px solid rgba(0, 0, 0, 0);
  }
}

.map {
  width: 100%;
  height: 600px;
  margin-bottom: 30px;

  #container {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
