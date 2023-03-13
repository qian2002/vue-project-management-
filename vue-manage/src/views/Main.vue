<template>
  <div>
    <el-container>
      <el-aside width="auto"><common-aside></common-aside></el-aside>
      <el-container class="con">
        <el-header> <common-header></common-header> </el-header>
        <common-tag />
        <el-main> <router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonTag from "../components/CommonTag.vue";

export default {
  components: { CommonAside, CommonHeader, CommonTag },
  data() {
    return {};
  },
};
</script>

<style scoped>
div el-container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  padding: 0;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>
