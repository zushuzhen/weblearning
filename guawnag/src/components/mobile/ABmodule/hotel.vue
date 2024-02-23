<template>
  <div class="city">
    <div class="consulting">
      <div class="cruisebox">
        <van-field
            v-model="fieldValue"
            is-link
            readonly
            placeholder="选择酒店"
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
          <div class="box-top">{{ fieldValue }}</div>
          <div class="box-bottom"></div>
        </div>
        <div v-html="contentarticle"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {reactive, ref, onMounted, toRefs, watchEffect, watch} from "vue";
import {get, gettree} from "@/utils/request.js";

const corporationlist = ref("");
const showPicker = ref(false);
const fieldValue = ref("");
const navList = ref([]);
const contentarticle = ref('')
// const imgcontarr = ref([]);
const props = defineProps(["cmpData", "curNav"]);
let urlHash = location.hash.replace("#", "");
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
    navList.value = res.data; //弹窗列表
    getDetail(res.data[0].id);
  });
};
//获取详情
const getDetail = (id) => {
  //文章模板---获取内容信息
  let data = {
    categoryId: id,
    status: "publish",
  };
  get("/cms/article/list", data).then((res) => {
    // imgcontarr.value = res.rows;
    contentarticle.value = res.rows[0].content
    fieldValue.value = res.rows[0].title
  });
};
const onConfirm = (res) => {
  console.log(res.selectedOptions[0].value);
  navList.value.map((item) => {
    if (item.id == res.selectedOptions[0].value) {
      getDetail(item.id);
    }
  });
  showPicker.value = false;
  fieldValue.value = res.selectedOptions[0].text;
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";

.van-cell__title .van-field__label {
  width: 20px !important;
  font-size: 14px !important;
  margin: 0 !important;
}

.van-field__label {
  width: auto !important;
  font-size: 14px !important;
}

.van-picker-column__item {
  font-size: 14px !important;
}

.van-field__control {
  font-size: 14px !important;
}

.van-picker__cancel {
  font-size: 14px !important;
}

.van-picker__confirm {
  font-size: 14px !important;
}

.cruisebox {
  margin-bottom: 20px;

  .van-cell {
    color: hsla(0, 0%, 100%, 0.6) !important;
    background: #fff !important;
    border: 1px solid #eee !important;
    position: static !important;
  }

  .van-cell {
    display: flex;
    align-items: center;
  }
}

.city {
  padding: 0 20px 20px 20px;
  margin: 0 auto;

  .consulting {
    .con-right {
      p {
        font-size: 14px;
        line-height: 28px;
      }

      .boxtitle {
        margin-bottom: 20px;

        .box-top {
          font-size: 20px;
          padding-bottom: 7px;
          font-weight: bold;
          font-family: Medium;
          color: #333;
        }

        .box-bottom {
          width: 40px;
          height: 0;
          border-top-color: #0c5cd6;
          border-top-width: 5px;
          border-top-style: solid;
          border-right: 6px solid rgba(0, 0, 0, 0);
        }
      }
    }
  }
}
</style>
