<template>
  <el-container style="margin: 50px">
    <el-aside width="180px"> <Sidebar /></el-aside>
    <el-container>
      <el-header><Navbar /></el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import { ElAside, ElContainer, ElHeader, ElMain } from "element-plus";

export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
    ElAside,
    ElContainer,
    ElHeader,
    ElMain,
  },
};
</script>

<style lang="scss" scoped>
body,
html {
  margin: 0;
}
</style>
