<template>
  <div class="main">
    <img :src="banner[getCatagory]" alt="" />
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
import { mapGetters } from "vuex";
export default {
  name: "Main",
  components: { Item },
  props: {
    catagory: String,
  },
  setup(props) {
    const list = ref([]);
    const pageIndex = ref(1);
    const endFlag = ref(false);
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
  computed: {
    ...mapGetters(["getCatagory"]),
  },
  watch: {
    getCatagory(newVal) {
      this.list = [];
      this.pageIndex = 1;
      this.getLativ(newVal, this.pageIndex);
    },
  },
  mounted() {
    // 掛載監聽事件
    this.$nextTick(() => {
      window.document.addEventListener("scroll", debounce(this.onScroll, 1000));
    });
    this.getLativ(this.getCatagory, this.pageIndex);
  },
  methods: {
    viewShop(x) {
      this.$router.push({
        path: "/shop",
        query: {
          catagory: this.getCatagory,
          id: x.ProductID,
        },
      });
      this.$store.dispatch("setItem", x);
    },
    /**
     * 當 scroll 時，更新 isScroll 狀態
     */
    onScroll() {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;
      let modifier = 200;
      if (currentScroll + modifier > documentHeight && !this.endFlag) {
        this.getLativ(this.getCatagory, this.pageIndex++);
      }
    },
    getLativ(mainCategory, pageIndex) {
      const _ = this;
      api.lativ
        .getLativ({
          mainCategory: mainCategory,
          pageIndex: pageIndex,
        })
        .then((res) => {
          if (res.data.length === 0) {
            this.endFlag = true;
          } else {
            _.list = concat(_.list, res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
