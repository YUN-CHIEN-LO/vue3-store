<template>
  <div class="hello">
    <item
      v-for="x in list"
      :key="x.sn"
      :title="x.ProductName"
      :price="x.Price"
      :img="x.OutfitPic[0] ? x.OutfitPic[0] : ''"
    />
    
  </div>
</template>

<script>
import api from "@/api";
import Item from "@/components/Item.vue";
import { ref } from "@vue/runtime-core";
import { concat, debounce } from "lodash";
export default {
  name: "HelloWorld",
  components: { Item },
  props: {
    msg: String,
  },
  setup() {
    const list = ref([]);
    const pageIndex = ref(1);
    const endFlag = ref(false);
    return {
      list,
      pageIndex,
      endFlag,
    };
  },
  mounted() {
    // 掛載監聽事件
    this.$nextTick(() => {
      window.document.addEventListener("scroll", debounce(this.onScroll, 1000));
    });
    this.getLativ(this.pageIndex);
  },
  methods: {
    /**
     * 當 scroll 時，更新 isScroll 狀態
     */
    onScroll() {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;
      let modifier = 200;
      if (currentScroll + modifier > documentHeight && !this.endFlag) {
        console.log("You are at the bottom!");
        this.getLativ(this.pageIndex++);
      }
    },
    getLativ(pageIndex) {
      const _ = this;
      api.lativ
        .getLativ({
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
.hello {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
