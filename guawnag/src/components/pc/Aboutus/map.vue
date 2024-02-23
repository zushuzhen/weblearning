<template>
  <div>
    <titileBus title="联系我们"></titileBus>
    <div>
      <div class="tab" v-if="usList">
        <div>
          <p><i class="iconfont iconfsize" v-html="usList.fontStyle"></i></p>
          <p>{{ usList.name }}</p>
          <p>{{ usList.contact }}</p>
        </div>
        <div>
          <p><i class="iconfont iconfsize" v-html="usList.themeColor"></i></p>
          <p>{{ usList.theme }}</p>
          <p>{{ usList.email }}</p>
        </div>
        <div>
          <p><i class="iconfont iconfsize"> &#xe633;</i></p>
          <p>在线留言</p>
          <p style="text-decoration: underline" @click="line">
            点击可在线留言
          </p>
        </div>
      </div>
      <div class="map">
        <div id="container"></div>
      </div>
    </div>
    <el-dialog v-model="fromShow">
      <el-form :model="form" :rules="rules" ref="ruleFormRef">
        <el-form-item label="联系方式" label-width="80" prop="contact">
          <el-input
            style="height: 40px"
            v-model="form.contact"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="留言内容" label-width="80" prop="verbContent">
          <el-input
            v-model="form.verbContent"
            :autosize="{ minRows: 4, maxRows: 10 }"
            type="textarea"
            placeholder="请输入留言内容"
          />
        </el-form-item>
        <el-form-item label="验证码" label-width="80" prop="code">
          <div class="formDiv">
            <el-input
              style="width: 200px; height: 40px"
              v-model="form.code"
              autocomplete="off"
              placeholder="请输入留言内容"
            />
            <img
              @click="getcode"
              :src="'data:image/gif;base64,' + codeimg"
              alt=""
            />
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetForm(ruleFormRef)">关闭</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, reactive, toRefs } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { get, postJson } from "@/utils/request.js";
import titileBus from "@/components/title.vue";
import {
  ElDialog,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
} from "element-plus";
let map = null;
const usList = ref([]);
const fromShow = ref(false);
const codeimg = ref("");
const ruleFormRef = ref(null);
const form = reactive({
  verbTitle: "用户留言",
  contact: "",
  verbContent: "",
  code: "",
  uuid: "",
});
const { uuid } = toRefs(form);
const rules = reactive({
  verbContent: [{ required: true, message: "请输入留言内容", trigger: "blur" }],
  contact: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
});
window._AMapSecurityConfig = {
  securityJsCode: "07140fb0eccb38d2a74e170c64263e58", // 应用生成的秘钥
};
const content = reactive([
  "<div style='font-size:14px'>",
  "青岛旅游集团</div>",
]);
onMounted(() => {
  getUs();
  AMapLoader.load({
    key: "4abe6e61862d3c59633be129c2ac142c", // 申请好的Web端开发者Key，首次调用 load 时必填
    // version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.ToolBar", "AMap.ControlBar", "AMap.Scale"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "3D", // 否为3D地图模式
        zoom: 16, // 初始化地图级别
        center: [120.397805, 36.058466], // 初始化地图中心点位置
      });
      var content = ["<div style='font-size:14px'>", "青岛旅游集团</div>"];
      const infoWindow = new AMap.InfoWindow({
        //使用自定义窗体
        content: content.join("<br>"), //信息窗体的内容可以任意html片段
        offset: new AMap.Pixel(1, -20),
      });
      //将创建的点标记添加到已有的地图实例：
      // infoWindow.open(map, map.getCenter());
      //创建一个 Marker 实例：
      const marker = new AMap.Marker({
        position: new AMap.LngLat(120.397805, 36.058466), //经纬度对象，也可以经纬度构成的一维数组[116.39, 39.9]
        label: { content: "青岛旅游集团", direction: "bottom" },
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
const line=()=>{
  fromShow.value = true;
  getcode();

}
//提交信息
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      postJson("/cms/verb", form).then((res) => {
          ElMessage({
            message: "提交成功",
            type: "success",
          });
          formEl.resetFields();
          fromShow.value = false;
      }).catch(err=>{
        ElMessage({
            message: "验证码错误",
            type: "error",
          });
      })
    } else {
      console.log("error submit!", fields);
    }
  });
};
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
  fromShow.value = false;
};
//获取验证码
const getcode = () => {
  get("/captchaImage").then((res) => {
    codeimg.value = res.data.img;
    uuid.value = res.data.uuid;
  });
};
//获取联系方式
const getUs = () => {
  let data = {
    tags: "about",
  };
  get("/cms/websites/list", data).then((res) => {
    usList.value = res.rows[0];
  });
};

onUnmounted(() => {
  map?.destroy();
});
</script>

<style lang="scss" scoped>
.formDiv {
  display: flex;
  img {
    margin-left: 12px;
    height: 40px;
    object-fit: cover;
    cursor: pointer;
  }
}
.tab {
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  border-radius: 2px;

  > div {
    cursor: pointer;
    background: #f2f2f2;
    width: 32%;
    padding: 25px 40px;
    height: 175px;
    box-sizing: border-box;
    color: #666;
    line-height: 35px;
    font-weight: 700;
    font-family: Medium;

    &:hover {
      color: #fff;
      background: #0c5cd6;
    }

    p {
      .iconfsize {
        font-weight: normal;
        font-size: 40px;
      }

      &:nth-child(2) {
        font-size: 18px;
      }

      &:nth-child(3) {
        font-size: 20px;
      }
    }
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
