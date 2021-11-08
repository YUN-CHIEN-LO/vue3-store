<template>
  <div class="sidebar">
    <div class="sidebar__logo">
      <img src="https://s3.lativ.com.tw/images/logo-2011.png" alt="" />
    </div>
    <div v-for="i in sidebar" :key="i.label" class="sidebar__label">
      <p>
        <el-icon><Menu /></el-icon>
        {{ i.label }}
      </p>
      <p class="sidebar__label__link" v-for="j in i.subs" :key="j">
        <el-icon><arrow-right /></el-icon>
        {{ j }}
      </p>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { onMounted } from "@vue/runtime-core";
import { defineComponent, ref } from "vue";
import { ElIcon } from "element-plus";
import { Menu, ArrowRight } from "@element-plus/icons";
export default defineComponent({
  name: "Sidebar",
  components: { ElIcon, Menu, ArrowRight },
  setup() {
    const sidebar = ref([]);
    const getSidebar = () => {
      api.lativ.getSidebar().then((res) => {
        sidebar.value = res.data;
      });
    };
    onMounted(getSidebar);
    return {
      sidebar,
    };
  },
});
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap");
* {
  font-family: "Nunito", sans-serif;
}
.sidebar {
  margin-top: 20px;
  tab-size: 14px;
  & p {
    cursor: pointer;
    color: #4c3026;
    &:hover {
      text-decoration: underline;
      color: #9e511d;
    }
  }
  &__label {
    &__link {
      font-size: 14px;
      margin: 10px;
    }
  }
}
</style>
