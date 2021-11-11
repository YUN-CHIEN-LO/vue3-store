<template>
  <div class="navbar">
    <div class="navbar__row">
      <div class="navbar__search">
        <el-input v-model="search" size="mini" placeholder="SEARCH">
          <template #suffix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
      </div>
    </div>
    <div class="navbar__row">
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
      <div class="navbar__shortcuts">
        <div class="navbar__shortcuts__shortcut">訂閱電子報</div>
        <p>|</p>
        <div class="navbar__shortcuts__shortcut">登入/註冊</div>
        <p>|</p>
        <el-popover
          placement="bottom-end"
          :width="500"
          trigger="hover"
          :show-arrow="false"
        >
          <template #reference>
            <div class="navbar__shortcuts__shortcut">
              <el-icon><shopping-cart /></el-icon>
              {{ cart.length }} 個商品
            </div>
          </template>
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
    const activeTab = ref("WOMEN");
    const tabs = ref(["WOMEN", "MEN", "KIDS", "BABY", "SPORTS"]);
    const search = ref("");
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
    handleActive(x) {
      this.activeTab = x;
      this.$emit("change", x);
      this.$router.push({
        path: "/",
        query: {
          catagory: x,
        },
      });
    },
    handleClickCell(row, column, cell, event) {
      event.stopPropagation();

      if (column.property === "ProductName") {
        console.log(row);
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
