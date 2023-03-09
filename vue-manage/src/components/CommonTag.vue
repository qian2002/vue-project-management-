<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations(["delectMenu"]),
    // 点击tag跳转
    changeMenu(item) {
      console.log(item);
      this.$router.push({ name: item.name });
    },
    // 删除tag
    handleClose(item, index) {
      // 删除state中的数据
      this.delectMenu(item);
      const length = this.tags.length;
      //   删除后跳转
      if (item.name !== this.$route.name) {
        return;
      }
      //   删除的是最后一项
      if (index === length) {
        this.$router.push({ name: this.tags[index - 1].name });
      } else {
        //   删除中间，路由向后跳转
        this.$router.push({ name: this.tags[index].name });
      }
    },
  },
};
</script>

<style scoped>
.tabs {
  background-color: #e9eef3;
  padding: 20px 20px 0 20px;
}
.el-tag {
  margin-left: 10px;
  cursor: pointer;
}
</style>
