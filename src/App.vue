<template>
  <el-container style="margin: 50px; min-width: 1200px">
    <el-aside width="180px"> <Sidebar /></el-aside>
    <el-container>
      <el-header><Navbar @change="handleChange" /></el-header>
      <el-main>
        <Main :catagory="cat" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import Main from "@/components/Main.vue";
import { ElAside, ElContainer, ElHeader, ElMain } from "element-plus";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
    Main,
    ElAside,
    ElContainer,
    ElHeader,
    ElMain,
  },
  setup() {
    const cat = ref("WOMEN");
    return { cat };
  },
  methods: {
    handleChange(cat) {
      this.cat = cat;
    },
  },
};
</script>

<style lang="scss" scoped>
body,
html {
  margin: 0;
}
</style>
