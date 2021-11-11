<template>
  <div class="navbar">
    <div class="navbar__row">
      <!-- 搜尋 -->
      <!-- [TODO] 沒有作用 -->
      <div class="navbar__search">
        <el-input v-model="search" size="mini" placeholder="SEARCH">
          <template #suffix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
      </div>
    </div>
    <div class="navbar__row">
      <!-- 分類 -->
      <div class="navbar__tabs">
        <span v-for="(x, i) in tabs" :key="x" class="navbar__tabs__tab">
          <span
            :class="{ 'navbar__tabs--active': activeTab === x }"
            class="navbar__tabs__label"
            @click="handleActive(x)"
          >
            {{ x }}
          </span>
          <span class="navbar__tabs__divider" v-if="i < tabs.length - 1"
            >|</span
          >
        </span>
      </div>
      <!-- 快捷鍵 -->
      <div class="navbar__shortcuts">
        <div class="navbar__shortcuts__shortcut">訂閱電子報</div>
        <p>|</p>
        <div class="navbar__shortcuts__shortcut">登入/註冊</div>
        <p>|</p>
        <!-- 購物車 -->
        <el-popover
          placement="bottom-end"
          trigger="hover"
          :width="500"
          :show-arrow="false"
        >
          <template #reference>
            <div class="navbar__shortcuts__shortcut">
              <el-icon><shopping-cart /></el-icon>
              {{ cart.length }} 個商品
            </div>
          </template>
          <!-- 購物車內容 -->
          <el-table
            :data="cart"
            :cell-style="cellStyle"
            :header-cell-style="headerCellStyle"
            row-class-name="no-hover"
            empty-text=" "
            style="width: 100%"
            @cell-click="handleClickCell"
          >
            <el-table-column prop="ProductName" label="商品名稱" width="180" />
            <el-table-column prop="color" label="顏色" width="80" />
            <el-table-column prop="size" label="尺寸" width="80" />
            <el-table-column prop="number" label="數量" width="80" />
          </el-table>
          <!-- [TODO] 前往結帳按鈕無效 -->
          <div style="display: flex">
            <el-button type="primary" :style="btnStyle">前往結帳</el-button>
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  ElIcon,
  ElInput,
  ElPopover,
  ElTable,
  ElTableColumn,
  ElButton,
} from "element-plus";
import { Search, ShoppingCart } from "@element-plus/icons";
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  name: "Navbar",
  components: {
    ElIcon,
    ElInput,
    ElPopover,
    ElTable,
    ElTableColumn,
    ElButton,
    Search,
    ShoppingCart,
  },
  setup() {
    // 使用中的分類
    const activeTab = ref("WOMEN");
    // 分類陣列
    const tabs = ref(["WOMEN", "MEN", "KIDS", "BABY", "SPORTS"]);
    // 搜尋關鍵字
    const search = ref("");

    // 自訂義樣式
    const cellStyle = computed(() => ({
      fontSize: "14px",
      color: "#724b3d",
    }));
    const headerCellStyle = computed(() => ({
      fontSize: "14px",
      fontWeight: "bold",
      color: "#724b3d",
    }));
    const btnStyle = computed(() => ({
      margin: "10px 0px 10px auto",
      backgroundColor: "#724b3d",
      border: "none",
    }));

    return {
      activeTab,
      tabs,
      cellStyle,
      headerCellStyle,
      btnStyle,
      search,
    };
  },
  computed: { ...mapGetters(["cart"]) },
  methods: {
    /**
     * 處理切換分類頁籤事件
     *
     * @param {string} x - 頁籤
     */
    handleActive(x) {
      this.activeTab = x;
      // 切換路由
      this.$router.push({
        path: "/",
        query: {
          catagory: x,
        },
      });
    },

    /**
     * 處理點擊購物車項目事件
     *
     * @param {object} row - 列物件
     * @param {object} column - 欄物件
     * @param {object} cell - 格物件
     * @param {event} event - 事件
     */
    handleClickCell(row, column, cell, event) {
      event.stopPropagation();

      // 若點擊產品名稱
      if (column.property === "ProductName") {
        // 切換路由，注意，路由攜帶該購物車項目的條件
        this.$router.push({
          path: "/shop",
          query: {
            catagory: row.catagory,
            id: row.ProductID,
            color: row.color,
            size: row.size,
            number: row.number,
          },
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/style.scss";

.navbar {
  min-width: 820px;
  &__row,
  &__tabs,
  &__shortcuts {
    display: flex;
    align-items: flex-end;
  }
  &__search {
    margin-left: auto;
  }
  &__tabs {
    &__tab {
      display: inline-block;
      text-align: center;
      cursor: pointer;
      color: $text-sub-color;
      font-weight: bold;
      &:hover {
        color: $text-color;
      }
    }
    &--active {
      color: $text-color;
      background-color: #e9e4d9;
    }
    &__label {
      display: inline-block;
      padding: 5px 10px;
      min-width: 80px;
    }
    &__divider {
      display: inline-block;
      margin: 0px 3px;
    }
  }
  &__shortcuts {
    margin-left: auto;
    font-size: 14px;
    padding: 5px;
    &__shortcut {
      padding: 3px;
      color: $text-color;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    & p {
      margin: 3px;
    }
  }
}
:deep(.el-table__empty-block) {
  display: none;
}
</style>
