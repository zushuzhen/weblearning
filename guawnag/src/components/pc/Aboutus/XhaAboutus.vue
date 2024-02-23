<template>
  <div class="hotcontent">
    <keep-alive>
      <template :key="index" v-for="(item, index) in navList">
        <!--        <div>{{ item.id == curNav.id }}-{{ item.url }}-{{item.id}}-{{curNav.id}}</div>-->
        <component
          v-if="item.url"
          v-show="item == curNav"
          :is="getCmp(item)"
          :cmp-data="item"
        ></component>
      </template>
    </keep-alive>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, toRefs } from "vue";
import introduction from "@/components/Aboutus/xhaintroduction.vue";
import organization from "@/components/Aboutus/organization.vue";
import contactus from "@/components/Aboutus/map.vue";
import honorswiper from "@/components/Aboutus/honorswiper.vue";
import managerteam from "@/components/Aboutus/xhamanagerteam.vue";
import grouppart from "@/components/Aboutus/xhagrouppart.vue";
import grouphistory from "@/components/Aboutus/xhagrouphistory.vue";

const props = defineProps(["curNav", "navList"]);
const cmps = {
  introduction,
  grouppart,
  organization,
  contactus,
  grouphistory,
  managerteam,
  honorswiper,
};

const { curNav } = toRefs(props);
const cmpData = reactive({
  curNav,
});
function getCmp(nav) {
  if (nav && nav.url) {
    let h = nav.url.replace("#", "");
    let arr = h.split("-");
    return cmps[arr[0]];
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";

.title-box {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 80px;

  .title {
    font-size: 28px;
    padding-bottom: 16px;
    font-weight: bold;
    font-family: Medium;
    color: #333;
  }

  .rectangle {
    width: 52px;
    height: 0;
    border-top-color: #0c5cd6;
    border-top-width: 8px;
    border-top-style: solid;
    border-right: 6px solid rgba(0, 0, 0, 0);
  }
}

.hotcontent {
  width: 100%;
  width: 1600px;
  margin: 0 auto;

  .content {
    width: 100%;
    padding: 0px 0 50px;

    .group {
      .top {
        padding-left: 80px;
        box-sizing: border-box;
        line-height: 95px;
        font-size: 32px;
        color: #fff;
        height: 95px;
        width: 100%;
        background: #0c5cd6;
        display: flex;
        align-items: center;

        img {
          margin-right: 20px;
        }
      }

      .bottom {
        background: #fafafa;
        height: 725px;
        padding: 30px 40px 40px 66px;
        display: flex;
        box-sizing: border-box;

        .b-left {
          width: 60%;
          height: 100%;
          font-size: 18px;
          margin-right: 70px;
          line-height: 30px;
          padding-top: 35px;
          box-sizing: border-box;

          .b-pBox {
            width: 100%;
            text-indent: 2em;

            p {
              text-indent: 2em;
            }
          }

          .b-icon {
            width: 260px;
            height: 70px;
            margin: 0 auto;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 100px;
            color: #fff;
            background: #0c5cd6;
            font-size: 18px;

            i {
              margin-right: 20px;
            }
          }
        }

        .b-right {
          width: 40%;
          height: 100%;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }

  .contentt {
    width: 100%;
    padding: 0px 0 50px;

    .team {
      font-size: 32px;
      font-family: Medium;
      font-weight: 700;
      color: rgb(51, 51, 51);
    }

    .team-box {
      /*
      background-color: rgb(12, 92, 214);
      width: 50px;
      height: 8px;
      border-bottom-right-radius: 20px; */
      width: 52px;
      margin-top: 20px;
      height: 0;
      border-top-color: #0c5cd6;
      border-top-width: 8px;
      border-top-style: solid;
      border-right: 6px solid rgba(0, 0, 0, 0);
    }

    .contentt-list {
      margin-top: 50px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 20px;

      .box {
        width: 80%;
        margin-bottom: 30px;
        cursor: pointer;
        color: #333333;
        padding: 50px 30px;
        background-color: #f6f7f8;

        &:hover {
          background-color: #0c5cd6;
          color: #fff;
        }

        .text {
          box-sizing: border-box;

          .title {
            font-family: Medium;
            font-size: 26px;
            font-weight: 700;
            line-height: 1.154;
            letter-spacing: 2px;
          }

          .boxcontent {
            font-family: Medium;
            margin-top: 20px;
            line-height: 1.875;
            font-size: 16px;
          }
        }
      }
    }
  }

  .contents {
    width: 100%;
    padding: 0px 0 50px;

    .team {
      font-size: 32px;
      font-family: Medium;
      font-weight: 700;
      color: #333;
    }

    .team-box {
      width: 52px;
      margin-top: 20px;
      height: 0;
      border-top-color: #0c5cd6;
      border-top-width: 8px;
      border-top-style: solid;
      border-right: 6px solid rgba(0, 0, 0, 0);
    }

    .organization {
      margin-top: 40px;
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .consulting {
    display: flex;
    justify-content: space-between;
    padding: 0px 0 50px;
    box-sizing: border-box;

    .con-left {
      width: 300px;

      margin-right: 30px;
      border-right: 1px solid #f3f3f3;

      .nav-box {
        height: 80px;
        line-height: 80px;
        cursor: pointer;
        font-size: 16px;
        text-align: center;
        border-radius: 5px;

        &:hover {
          background: #0c5cd6 url("@/assets/images/bgack.png") no-repeat;
          background-size: 320px;
          background-position: -20px -40px;
          color: #fff;
        }
      }

      .actives {
        background: #0c5cd6 url("@/assets/images/bgack.png") no-repeat;
        background-size: 320px;
        background-position: -20px -45px;
        color: #fff;
      }
    }

    .con-right {
      margin-left: 30px;
      width: 85%;

      .team {
        font-size: 32px;
        font-family: Medium;
        font-weight: 700;
        color: rgb(51, 51, 51);
      }

      .team-box {
        width: 52px;
        margin-top: 20px;
        height: 0;
        border-top-color: #0c5cd6;
        border-top-width: 8px;
        border-top-style: solid;
        border-right: 6px solid rgba(0, 0, 0, 0);
      }

      .titlt {
        margin-bottom: 40px;
        font-size: 28px;
        color: #0c5cd6;
        font-weight: bold;
        font-family: Medium;
      }

      .p {
        text-align: justify;
        text-indent: 2em;
        line-height: 30px;
        margin-bottom: 40px;
        font-size: 16px;
      }

      .boxImg {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 40px;

        img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }
      }

      .time {
        display: flex;
        justify-content: flex-end;
        margin-top: 50px;
        align-items: center;

        span {
          font-size: 22px;
          color: #0c5cd6;
        }
      }
    }
  }

  .contentf {
    display: flex;

    .content-left {
      padding-bottom: 50px;
      width: 300px;
      border-right: 1px solid #e8e8e8;
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      padding-right: 60px;
      box-sizing: border-box;

      .yarn {
        font-size: 24px;
        color: #666;

        &.active {
          color: #0c5cd6;
        }
      }

      .content-left-title {
        font-family: Medium;
        font-size: 18px;
        font-weight: 600;
        color: rgb(12, 92, 214);
        line-height: 1.667;
      }

      .content-left-time {
        font-size: 18px;
        font-family: Medium;
        color: rgb(114, 112, 114);
        line-height: 1.667;
        font-weight: 500;
      }

      .content-left-box {
        margin-top: 20px;
        width: 23px;
        height: 2px;
        background-color: #b9b9b9;
      }
    }

    .content-right {
      padding-bottom: 50px;
      margin-left: 50px;

      > div {
        display: flex;
        margin-bottom: 50px;

        .content-right-time {
          color: #0c5cd6;
          font-size: 24px;
          font-weight: 700;
          width: 180px;
        }

        .content-writh {
          margin-left: 50px;

          .content-intro {
            font-size: 16px;
            color: rgb(102, 102, 102);
            line-height: 1.875;
          }

          .content-image {
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
            width: 100%;

            .content-img {
              width: 250px;
              height: 180px;
              margin-right: 25px;
              margin-top: 20px;
              border-radius: 5px;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1440px) {
  .hotcontent {
    width: 1200px;

    .content {
      width: 100%;
      padding: 0px 0 50px;

      .group {
        .top {
          padding-left: 80px;
          box-sizing: border-box;
          line-height: 95px;
          font-size: 32px;
          color: #fff;
          height: 95px;
          width: 100%;
          background: #0c5cd6;
          display: flex;
          align-items: center;

          img {
            margin-right: 20px;
          }
        }

        .bottom {
          background: #fafafa;
          height: 540px;
          padding: 30px 40px 40px 66px;
          display: flex;

          .b-left {
            width: 60%;
            height: 100%;
            font-size: 18px;
            margin-right: 70px;
            line-height: 30px;
            padding-top: 35px;

            .b-pBox {
              width: 100%;
              height: 300px;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 10; /* Limit to 3 lines */
              text-align: justify;

              p {
                text-indent: 2em;
              }
            }

            .b-icon {
              width: 260px;
              height: 70px;
              margin: 0 auto;
              border-radius: 5px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 50px;
              color: #fff;
              background: #0c5cd6;
              font-size: 18px;

              i {
                margin-right: 20px;
              }
            }
          }

          .b-right {
            width: 40%;
            height: 100%;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
  }
}
</style>
