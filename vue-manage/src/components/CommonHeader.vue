<template>
  <div class="header-container">
    <div class="left-content">
      <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
      <!-- <span>首页</span> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{
          item.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown>
        <span class="el-dropdown-link"> <img class="user" src="../assets/images/user.png" alt="" /> </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
};
</script>

<style scoped>
.header-container {
  background-color: #333;
  height: 60px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 20px;
}
/* .el-button:focus,
.el-button:hover {
  background: #23c6c8;
} */
.left-content {
  display: flex;
  align-items: center;
  gap: 20px;
}
.left-content /deep/.el-breadcrumb__item .el-breadcrumb__inner {
  color: #999;
  font-weight: 500;
  transition: all 0.2s;
}
.left-content /deep/.el-breadcrumb__item .el-breadcrumb__inner:hover {
  background-color: #6495ed;
  color: #ddd;
  padding: 3px;
  border-radius: 10%;
}
.left-content /deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #fff;
}

.right-content .user {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
