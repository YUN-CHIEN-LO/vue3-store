<template>
  <div class="navbar">
    <div class="navbar__row">
      <div class="navbar__search">
        <el-input size="mini" placeholder="SEARCH">
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
        <div class="navbar__shortcuts__shortcut">
          <el-icon><shopping-cart /></el-icon>
          0個商品
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElIcon, ElInput } from "element-plus";
import { Search, ShoppingCart } from "@element-plus/icons";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Navbar",
  components: { ElIcon, ElInput, Search, ShoppingCart },
  setup() {
    const activeTab = ref("WOMEN");
    const tabs = ref(["WOMEN", "MEN", "KIDS", "BABY", "SPORTS"]);
    return {
      activeTab,
      tabs,
    };
  },
  methods: {
    handleActive(x) {
      this.activeTab = x;
      this.$emit("change", x);
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
</style>
