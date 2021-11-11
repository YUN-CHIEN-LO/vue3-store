<template>
  <div class="shop">
    <!-- 加入購物車提示 -->
    <el-popover
      placement="bottom-end"
      :width="500"
      :visible="toggleCart"
      :show-arrow="false"
    >
      <template #reference>
        <span class="shop__cartinfo"></span>
      </template>
      <h3 style="text-align: center">本商品已加入購物車</h3>
      <hr />
      <div class="shop__cartinfo__detail">
        <img
          :src="
            'https://s1.lativ.com.tw/' + item.info[curColor].ItemList[0].img280
          "
          alt=""
        />
        <p>{{ item.ProductName }}</p>
        <p>NT${{ item.Price }}</p>
      </div>
      <hr />
      <div style="display: flex">
        <el-button type="primary" :style="btnStyle">前往結帳</el-button>
      </div>
    </el-popover>

    <!-- 產品頁 -->
    <div class="shop__cover">
      <div class="shop__cover__block">
        <!-- 產品圖片 -->
        <img
          :src="
            'https://s1.lativ.com.tw/' + item.info[curColor].ItemList[0].img280
          "
          alt=""
        />
      </div>
      <div class="shop__cover__block">
        <!-- 產品名稱 -->
        <h2 class="shop__cover__row shop__title">
          {{ item.ProductName }}
        </h2>
        <!-- 產品價格 -->
        <div class="shop__cover__row shop__price">
          <span v-if="item.ActivityPrice === 0"> {{ item.Price }} </span>
          <span v-if="item.ActivityPrice > 0" class="shop__price--activity">
            <p>{{ item.Price }}</p>
            {{ item.ActivityPrice }}
          </span>
        </div>
        <hr />
        <!-- 產品色號 -->
        <div
          class="shop__cover__row shop__color"
          style="justify-content: flex-start"
        >
          <div
            v-for="(x, id) in item.info"
            :key="x.color"
            class="shop__color"
            :class="{ 'is-selected': id === curColor }"
            @click="selectColor(id)"
          >
            <img :src="'https://s1.lativ.com.tw/' + x.colorImg" alt="" />
          </div>
        </div>
        <!-- 產品尺寸 -->
        <div class="shop__cover__row shop__size">
          <span
            v-for="(x, id) in item.info[curColor].ItemList"
            :key="x.size"
            :class="{
              'is-disabled': x.invt === 0,
              'is-selected': id === curSize,
            }"
            @click="selectSize(id, x.invt === 0)"
          >
            {{ x.size }}
          </span>
        </div>
        <!-- 其他工具 -->
        <div class="shop__cover__row shop__tool">
          <div class="shop__tool__item">
            <el-icon class="shop__tool__icon"><chat-line-square /></el-icon>
            評價({{ item.commentCount }})
          </div>
          <div class="shop__tool__item">
            <el-icon class="shop__tool__icon"><crop /></el-icon>
            產品說明與尺寸表
          </div>
          <div class="shop__tool__item">
            <el-icon class="shop__tool__icon"><star /></el-icon>
            收藏商品
          </div>
        </div>
        <hr />
        <!-- 加入購物車 -->
        <div class="shop__cover__row shop__cart">
          數量
          <el-input-number
            v-model="curNum"
            :min="1"
            :max="10"
            style="margin-left: 10px"
          />
          <el-button
            :icon="Message"
            type="primary"
            style="margin-left: 10px"
            @click="handleAdd"
            >加入購物車</el-button
          >
        </div>
        <div class="shop__cover__row shop__note"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { ElIcon, ElInputNumber, ElButton, ElPopover } from "element-plus";
import { ChatLineSquare, Crop, Star, Message } from "@element-plus/icons";
import { findIndex } from "lodash";
import api from "@/api";
export default defineComponent({
  name: "Shop",
  components: {
    ElIcon,
    ElInputNumber,
    ElButton,
    ElPopover,
    ChatLineSquare,
    Crop,
    Star,
  },
  setup() {
    // 初始項目
    const item = ref({
      ProductName: "",
      Price: 0,
      ActivityPrice: 0,
      commentCount: "",
      info: [
        {
          colorImg: "/images/logo-2011.png",
          ItemList: [
            {
              img280: "/images/logo-2011.png",
            },
          ],
        },
      ],
    });

    // 暫存狀態
    const curColor = ref(0);
    const curSize = ref(0);
    const curNum = ref(1);

    // 是否顯示購物車新增提示
    const toggleCart = ref(false);

    // 自定義樣式
    const btnStyle = computed(() => ({
      margin: "10px 0px 10px auto",
      backgroundColor: "#724b3d",
      border: "none",
    }));

    return { item, curColor, curSize, curNum, toggleCart, btnStyle, Message };
  },
  mounted() {
    this.selectSize();
    const { catagory, id, color, size, number } = this.$route.query;

    // 依照路由參數返回指定項目資訊
    api.lativ
      .getProduct({ catagory, id })
      .then((res) => {
        if (!res.data.ProductName) {
          // 若項目條件不存在
          this.$router.push("/error");
        } else {
          this.item = res.data;

          const _ = this;
          // 初始顏色
          if (color) {
            this.curColor = findIndex(_.item.info, (x) => x.color === color);
          }
          // 初始尺寸
          if (size && color) {
            this.curSize = findIndex(
              _.item.info[_.curColor].ItemList,
              (x) => x.size === size
            );
          }
          // 初始數量
          if (number) {
            this.curNum = number;
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    /**
     * 處理新增事件
     */
    handleAdd() {
      if (this.curColor === null || this.curColor === undefined) return;
      if (this.curSize === null || this.curSize === undefined) return;
      const _ = this;

      // 更新購物車
      this.$store.dispatch("addToCart", {
        catagory: this.$route.query.catagory,
        ProductName: this.item.ProductName,
        ProductID: this.item.ProductID,
        number: this.curNum,
        color: this.item.info[this.curColor].color,
        colorImg: this.item.info[this.curColor].colorImg,
        size: this.item.info[this.curColor].ItemList[this.curSize].size,
        info: this.item.info[this.curColor].ItemList[this.curSize],
      });

      // 檢視新增提示
      this.toggleCart = true;
      const timer = setTimeout(() => {
        _.toggleCart = false;
        clearTimeout(timer);
      }, 3000);
    },

    /**
     * 選擇顏色
     *
     * @param {number} id - 該顏色在陣列中的id
     */
    selectColor(id) {
      this.curColor = id;
      this.selectSize();
    },

    /**
     * 選擇尺寸
     *
     * @param {number} id - 該尺寸在陣列中的id
     * @param {booleab} flag - 是否可選
     */
    selectSize(id, flag) {
      if (flag) return;
      if (id) this.curSize = id;
      else {
        const target = this.item.info[this.curColor].ItemList[0];
        this.curSize = target.invt === 0 ? null : id;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/style.scss";
.shop {
  position: sticky;
  top: 0;
  &__cover {
    display: flex;
    &__block {
      flex: 1;
      & img {
        width: calc(100% - 20px);
      }
    }
    &__row {
      display: flex;
      margin: 20px 0px;
    }
  }
  &__price {
    display: flex;
    justify-content: flex-end;

    color: $red-color;
    font-weight: bold;
    & span {
      font-size: 64px;
    }
    &:before {
      content: "NT$";
      font-size: 24px;
      margin-top: 5px;
    }
    &--activity {
      position: relative;
      & p {
        margin: 0;
        top: -24px;
        right: 0;
        position: absolute;
        font-size: 22px;
        color: $text-sub-color;
        text-decoration: line-through;
      }
    }
  }
  &__color {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    margin: 0px 5px;
    & img {
      width: 25px;
      cursor: pointer;
    }
  }
  &__size {
    & span {
      cursor: pointer;
      display: inline-block;
      width: 50px;
      text-align: center;
      background-color: $light-bg-color;
      padding: 3px 5px;
      margin: 5px;
      font-size: 14px;
    }
  }
  &__tool {
    display: flex;
    justify-content: flex-end;
    &__item {
      padding: 0px 10px;
      font-size: 14px;
      color: $text-sub-color;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    &__icon {
      color: $light-color;
    }
  }
  &__cart {
    display: flex;
    align-items: center;
  }
  &__cartinfo {
    position: absolute;
    right: 0;
    top: 0;
    &__detail {
      display: flex;
      justify-content: center;
      align-items: center;
      & img {
        width: 60px;
      }
      & p {
        margin: 0px 10px;
      }
    }
  }
}

.is-selected {
  border: solid 2px $text-sub-color;
}
.is-disabled {
  color: #aaa;
  border: solid 1px #aaa;
  background-color: #fff !important;
  cursor: not-allowed !important;
}
</style>
