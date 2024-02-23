<template>
  <div class="city">
    <div class="consulting">
      <div class="cruisebox">
        <van-field
            v-model="fieldValue"
            is-link
            readonly
            placeholder="选择游轮"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker
              :columns="corporationlist"
              @cancel="showPicker = false"
              @confirm="onConfirm"
          />
        </van-popup>
      </div>
      <div class="con-right">
        <div class="boxtitle">
          <div class="box-top">{{ name }}</div>
          <div class="box-bottom"></div>
        </div>
        <div class="overview">{{ content.产品概况 }}</div>
        <div class="imageroute">
          <img v-if="img.length > 0" :src="img[0]" alt=""/>
        </div>
        <div class="line">航行路线</div>
        <div
            class="routeBox"
            v-if="content.航行路线 && content.航行路线.length > 0"
        >
          <div
              class="route"
              v-for="(item, index) in content.航行路线"
              :key="index"
          >
            <div v-if="item">
              <div
                  style="margin: 10px 0; color: #0c5cd6"
                  v-if="index == 0 && content.路线一"
              >
                {{ content.路线一 }}
              </div>
              <div
                  style="margin: 10px 0; color: #0c5cd6"
                  v-if="index == 1 && content.路线二"
              >
                {{ content.路线二 }}
              </div>
              <div class="textcon">
                <div
                    class="textbox"
                    v-for="(ite, ind) in getsplit(item)"
                    :key="ite"
                >
                  <div class="text">{{ ite }}</div>
                  <div v-if="getsplit(item).length - 1 != ind">
                    <i class="iconfont" style="font-size: 14px; color: #666">
                      &#xe621;</i
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="content.特色航线" class="line">特色航线</div>
        <div
            style="line-height: 30px"
            v-html="content.特色航线 ? content.特色航线 : ''"
        ></div>
        <div v-if="content.特色航线">
          <div class="imageroute" v-if="img.length > 0 && img[1]">
            <img :src="img[1]" alt=""/>
          </div>
        </div>
        <div class="line">使用船舶</div>
        <div class="imagebox">
          <div class="images" v-for="item in imgcontarr" :key="item">
            <van-image
                class="imgs"
                :src="item.img[0].url"
                fit="cover"
                position="center"
                @click="goContent(item)"
                alt=""
            />
            <div class="title">{{ item.title }}</div>
          </div>
        </div>
        <div class="line" v-if="content.航行时间">航行时间</div>
        <div>{{ content.航行时间 ? content.航行时间 : "" }}</div>
        <div class="line" v-if="content.航次时间">航次时间</div>
        <div>{{ content.航次时间 ? content.航次时间 : "" }}</div>
        <div class="line" v-if="content.运营时间">运营时间</div>
        <div>{{ content.运营时间 ? content.运营时间 : "" }}</div>
        <div class="line">游客须知</div>
        <div style="line-height: 30px">
          游客须知:<br/>1.购票规则：游船购票实行实名制，请持身份证购票、验票登船。<br/>
          2.检票时间：开航前20分钟开始检票，开航前5分钟停止检票。<br/>
          3.注意事项：游船班次以当日公示为准，如遇天气、风浪等不可抗力因素无法乘船，造成不便敬请谅解，详情请关注“奥帆海洋文化旅游区一票通”官方小程序。
          <p v-if="lShow">
            购买奥帆中心往返崂山风景区航线船票时，建议提前拨打客服电话咨询相关乘船事宜。
          </p>
          <p>客服专线：0532-58617801</p>
        </div>
        <div class="buttonbox">
          <van-button type="primary" class="text" @click="byShow = true"
          >立即预约
          </van-button
          >
        </div>
      </div>
    </div>
    <van-popup v-model:show="byShow" round closeable class="phpopups">
      <div class="popuptitle">预约</div>
      <van-image
          src="/static/images/pictures.jpg"
          class="imgpo"
          fit="cover"
          position="center"
      ></van-image>
      <div class="popupline-height">您可以扫描二维码线上预约</div>
    </van-popup>
    <van-popup v-model:show="shipShow" round closeable class="shipShowpopups">
      <div class="popuptitle">{{ popdata.title }}</div>
      <div class="popupline-height" v-html="popdata.content"></div>
    </van-popup>
  </div>
</template>
<script setup>
import {
  reactive,
  ref,
  onMounted,
  toRefs,
  watchEffect,
  defineProps,
} from "vue";
import {get, gettree} from "@/utils/request.js";

const corporationlist = ref("");
const showPicker = ref(false);
const fieldValue = ref("");
const navList = ref([]);
const contList = ref([]);
const content = ref({});
const imgcontarr = ref([]); //小图片
const byShow = ref(false); //预约弹窗
const shipShow = ref(false); //轮船弹窗
const popdata = ref({}); //弹窗轮船内容
const imgurls = ref([]); //大图片
const lShow = ref(false);
const props = defineProps(["cmpData", "curNav"]);
// const curNav = ref({});
const pageData = reactive({
  articles: [],
  active: 0,
  dialogVisible: false,
  name: "",
  img: {},
});
const {active, name, img} = toRefs(pageData);
onMounted(() => {
  getthree1(props.cmpData.id);
});
//获取三级菜单
const getthree1 = (result) => {
  gettree(result, false).then((res) => {
    corporationlist.value = res.data.map((item) => {
      return {
        text: item.name,
        value: item.id,
      };
    });

    imgurls.value = res.data.map((item) => {
      return {
        imgurls: item.imgurls,
      };
    });
    chudata(res.data);
    navList.value = res.data; //弹窗列表
    content.value = contList.value[active.value];
    let imggg = imgurls.value[0].imgurls;
    let arrimg = imggg.split(",");
    // 移除数组中的每个元素的首尾空格，并将每个元素转换为字符串
    img.value = arrimg = arrimg.map(function (item) {
      return item.trim();
    });

    getDetail(res.data[0].id);
  });
};
const getsplit = (text) => {
  return text.split("---");
};
//获取详情图片
const getDetail = (id) => {
  if (id == 1739894853614129153) {
    lShow.value = true;
  } else {
    lShow.value = false;
  }
  //文章模板---获取内容信息
  let data = {
    categoryId: id,
    status: "publish",
  };
  get("/cms/article/list", data).then((res) => {
    imgcontarr.value = res.rows;
  });
};

//弹窗
function goContent(item) {
  if (item.content == '') {
    return
  } else {
    shipShow.value = true
    popdata.value = item
  }
}
//选择轮船弹窗确认
const onConfirm = (value) => {
  let ind = value.selectedIndexes[0];
  content.value = contList.value[ind];
  navList.value.map((item, index) => {
    if (item.id == value.selectedOptions[0].value) {
      getDetail(value.selectedOptions[0].value);
      img.value = imgurls.value[index].imgurls.split(",");
    }
  });
  showPicker.value = false;
  name.value = value.selectedOptions[0].text;
  fieldValue.value = value.selectedOptions[0].text;
};
//处理数据
const chudata = (datas) => {
  let mapArr = datas.map((item) => {
    // 使用//分割字符串成数组
    const array1 = item.description?.split("//\n");
    // 使用||分割每个数组元素成 key 和 value 形式
    const result = array1?.reduce((acc, element) => {
      const [key, value] = element?.split("\\");
      acc[key] = value;
      // 如果值中包含 +，则将其转换为数组
      if (value && value.indexOf("+") != -1) {
        acc[key] = value.split("+");
      }
      return acc;
    }, {});
    return result;
  });
  fieldValue.value = datas[0].name;
  name.value = datas[0].name; //标题
  img.value = datas[0].imgurls.split(","); //图片
  contList.value = mapArr; //内容
};
</script>

<style lang="scss" scoped>
.phpopups {
  width: 80%;
  padding: 20px;

  .popuptitle {
    text-align: center;
    font-size: 16px;
  }

  .imgpo {
    width: 150px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    justify-content: center;
  }

  .popupline-height {
    font-size: 14px;
    line-height: 28px;
    text-align: center;
  }
}

.shipShowpopups {
  width: 80%;
  height: auto;
  padding: 20px;

  .popuptitle {
    text-align: center;
    font-size: 16px;
  }

  .imgpo {
    width: 150px;
    margin: 0 auto;
    padding: 20px;
    padding: 20px;
    display: flex;
    justify-content: center;
  }

  .popupline-height {
    font-size: 14px;
    line-height: 28px;
    text-align: left;

    p {
      padding: 0;
      margin: 0;
    }
  }
}

:deep(.van-cell__title .van-field__label) {
  width: 20px !important;
  font-size: 14px !important;
  margin: 0 !important;
}

:deep(.van-field__label) {
  width: auto !important;
  font-size: 14px !important;
}

:deep(.van-picker-column__item) {
  font-size: 14px !important;
}

:deep(.van-field__control) {
  font-size: 14px !important;
}

:deep(.van-picker__cancel) {
  font-size: 14px !important;
}

:deep(.van-picker__confirm) {
  font-size: 14px !important;
}

.cruisebox {
  margin-bottom: 20px;

  :deep(.van-cell) {
    color: hsla(0, 0%, 100%, 0.6) !important;
    background: #fff !important;
    border: 1px solid #eee !important;
    position: static !important;
  }

  :deep(.van-cell) {
    display: flex;
    align-items: center;
  }
}

.city {
  padding: 0 20px 20px 20px;
  margin: 0 auto;

  .consulting {
    .con-right {
      .boxtitle {
        margin-bottom: 20px;

        .box-top {
          font-size: 18px;
          padding-bottom: 10px;
          font-weight: bold;
          font-family: Medium;
          color: #333;
        }

        .box-bottom {
          width: 40px;
          height: 0;
          border-top-color: #0c5cd6;
          border-top-width: 6px;
          border-top-style: solid;
          border-right: 6px solid rgba(0, 0, 0, 0);
        }
      }

      .overview {
        text-align: justify;
        text-indent: 2em;
        line-height: 28px;
        margin-bottom: 20px;
        font-size: 14px;
      }

      .imageroute {
        width: 100%;
        height: auto;
        margin: 20px 0;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .line {
        padding-left: 16px;
        position: relative;
        font-size: 20px;
        font-family: Medium;
        margin: 20px 0;
        height: 24px;
        color: #333;
        font-weight: 600;

        &::after {
          position: absolute;
          top: 2px;
          left: 0;
          content: "";
          display: block;
          width: 5px;
          height: 20px;
          background: #0c5cd6;
        }
      }

      .reservation {
        color: #fff;
        width: 25%;
        padding: 20px 20px;
        background: #0c5cd6;
        margin: 0 auto;
        text-align: center;
        margin: 30px 0;
        cursor: pointer;
        display: flex;
        justify-content: center;
      }

      .routeBox {
        .route {
          .index {
            font-weight: 600;
            font-size: 18px;
            margin-bottom: 10px;
          }

          .textcon {
            display: flex;
            flex-wrap: wrap;

            .textbox {
              display: flex;
              justify-content: center;
              align-items: center;

              .text {
                padding: 8px 10px;
                background: #f1f1f1;
                font-size: 14px;
                color: #555;
                margin: 8px 4px;
              }
            }
          }
        }
      }

      .imagebox {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;

        .images {
          .imgs {
            width: 100%;
          }

          .title {
            width: 100%;
            text-align: center;
            margin-top: 5px;
            margin-bottom: 10px;
          }
        }
      }

      .buttonbox {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        :deep(.van-button--primary) {
          background: #0c5cd6;
          border: none !important;
        }
        .text {
          font-size: 14px;
          padding: 5px 10px;
        }
      }
    }
  }
}
</style>
