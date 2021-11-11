<template>
  <div class="main">
    <img :src="banner[$route.query.catagory]" alt="" />
    <div class="main__item">
      <item v-for="x in list" :key="x.sort" :item="x" @click="viewShop(x)" />
    </div>
  </div>
</template>

<script>
import api from "@/api";
import Item from "@/components/Item.vue";
import { ref } from "@vue/runtime-core";
import { concat, debounce } from "lodash";
export default {
  name: "Main",
  components: { Item },
  props: {
    catagory: String,
  },
  setup(props) {
    // 顯示的產品
    const list = ref([]);
    // 產品分頁
    const pageIndex = ref(1);
    // 是否顯示所有產品
    const endFlag = ref(false);
    // 分類圖片
    const banner = ref({
      WOMEN:
        "https://s3.lativ.com.tw/i/NewArrivalBanner/54261_1010X400_211101_TW.jpg",
      MEN: "https://s3.lativ.com.tw/i/NewArrivalBanner/54133_1010X400_211025_TW_0.jpg",
      KIDS: "https://s3.lativ.com.tw/i/NewArrivalBanner/54441_1010X400_211108_TW.jpg",
      BABY: "https://s3.lativ.com.tw/i/NewArrivalBanner/55040_1010X400_211108_TW.jpg",
      SPORTS:
        "https://s3.lativ.com.tw/i/NewArrivalBanner/54032_1010X400_211108_TW.jpg",
    });

    return {
      props,
      list,
      pageIndex,
      endFlag,
      banner,
    };
  },
  mounted() {
    // 掛載監聽事件
    this.$nextTick(() => {
      window.document.addEventListener("scroll", debounce(this.onScroll, 1000));
    });
    // 取得第一頁產品
    this.getLativ(this.pageIndex);
  },
  methods: {
    /**
     * 取得產品
     *
     * @param {number} pageIndex - 頁碼
     */
    getLativ(pageIndex) {
      const _ = this;
      const catagory = this.$route.query.catagory;
      api.lativ
        .getLativ({
          catagory: catagory,
          pageIndex: pageIndex,
        })
        .then((res) => {
          if (res.data.length === 0) {
            // 若返回空陣列，表示已經返回所有產品
            this.endFlag = true;
          } else {
            // 擴充產品陣列
            _.list = concat(_.list, res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * 檢視產品
     */
    viewShop(x) {
      // 切換路由
      this.$router.push({
        path: "/shop",
        query: {
          catagory: this.$route.query.catagory,
          id: x.ProductID,
        },
      });
    },
    /**
     * 當 scroll 時，更新 isScroll 狀態
     */
    onScroll() {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;
      let modifier = 200;
      if (currentScroll + modifier > documentHeight && !this.endFlag) {
        this.getLativ(this.pageIndex++);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  & img {
    width: 100%;
    margin-bottom: 20px;
  }
  &__item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
