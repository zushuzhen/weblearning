<template>
  <div class="box">
    <van-field
        v-model="fieldValue"
        is-link
        readonly
        label="公司"
        placeholder="选择公司"
        @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
          :columns="corporationlist"
          @cancel="showPicker = false"
          @confirm="onConfirm"
      />
    </van-popup>

    <div class="just-start">
      <i class="iconfont iconsize">&#xe84f;</i>
      <div class="subheading">{{ cendata.title }}</div>
    </div>
    <div class="contentgroup" v-html="cendata.content"></div>
    <van-image
        v-show="cendata.img && cendata.img.length === 0"
        v-for="item in cendata.img"
        :key="item"
        width="100%"
        :src="item.url"
        class="image"
    />
    <div v-if="cendata.contact != ''" class="bottom-phone">
      联系方式: <span class="text">{{ cendata.contact }}</span>
    </div>
  </div>
</template>

<script setup name="developmentCourse">
import {ref, onMounted, defineProps} from "vue";

const props = defineProps(["cmpData"]);
import {gettree, get} from "@/utils/request.js";

const corporationlist = ref("");
const columns = ref([]);
const fieldValue = ref("");
const showPicker = ref(false);
const cendata = ref({});
onMounted(() => {
  let data = {
    categoryId: props.cmpData.id,
    status: "publish",
    params: {
      containSub: true,
    },
  };
  get(`/cms/article/list`, data).then((res) => {
    columns.value = res.rows.slice().reverse();
    cendata.value = columns.value[0];
    fieldValue.value = columns.value[0].title;
    corporationlist.value = columns.value.map((item) => {
      return {
        text: item.title,
        value: item.id,
      };
    });
  });
});

const onConfirm = (res) => {
  columns.value.map((item) => {
    if (item?.id == res?.selectedOptions[0]?.value) {
      cendata.value = item;
    }
  });
  showPicker.value = false;
  fieldValue.value = res?.selectedOptions[0]?.text;
};
</script>
<style scoped lang="scss">
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

.box {
  padding: 0 20px;

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

.just-start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0;

  .subheading {
    margin-left: 5px;
    font-size: 18px;
    font-family: Medium;
    color: #0c5cd6;
  }
}

.iconsize {
  color: #0c5cd6;
}

.contentgroup {
  font-size: 14px;
  line-height: 28px;
  text-indent: 2em;

  p {
    margin: 0;
    padding: 0;
  }
}

.image {
  padding: 20px 0;
}

.bottom-phone {
  font-size: 15px;
  text-align: right;
  margin-bottom: 20px;
  font-family: Medium;

  .text {
    font-family: Medium;
    font-size: 17px;
    color: #0c5cd6;
  }
}
</style>
