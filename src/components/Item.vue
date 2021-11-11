<template>
  <div class="item">
    <!-- 產品圖片 -->
    <img :src="'https://s1.lativ.com.tw/' + item.OutfitPic[0]" alt="" />
    <!-- 產品名稱 -->
    <p>{{ item.ProductName }}</p>
    <!-- 產品價格 -->
    <p>
      <span :class="{ 'is-activity': item.ActivityPrice > 0 }">
        NT${{ item.Price }}
      </span>
      <span v-if="item.ActivityPrice > 0">
        活動價 NT${{ item.ActivityPrice }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    item: Object,
  },
  setup(props) {
    return {
      props,
    };
  },
};
</script>

<style lang="scss">
@import "@/style.scss";
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  margin: 10px 0px;
  & img {
    width: 100%;
    margin-bottom: 10px;
    cursor: pointer;
  }
  & p {
    margin: 5px;
  }
}

.is-activity {
  text-decoration: line-through;
}
</style>
