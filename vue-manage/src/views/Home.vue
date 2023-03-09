<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card" shadow="hover">
        <div class="user">
          <img class="user-img" src="../assets/images/user.png" alt="" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="login-info">
          <p>上次登录时间：<span>2023-3-6</span></p>
          <p>上次登录地点：<span>温州</span></p>
        </div>
      </el-card>

      <el-card shadow="hover" style="height: 492px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column v-for="(val, key) in tableLabel" :key="val" :prop="key" :label="val" width="93">
          </el-table-column>
          <!-- <el-table-column prop="todayBuy" label="本日购买" width="100"> </el-table-column>
          <el-table-column prop="monthBuy" label="本月购买" width="100"> </el-table-column>
          <el-table-column prop="totalBuy" label="总购买"> </el-table-column> -->
        </el-table>
      </el-card>
    </el-col>

    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card
          :body-style="{ display: 'flex', padding: '0px' }"
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
        >
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ backgroundColor: item.color }"></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>

      <!-- 折线图 -->
      <el-card style="height: 280px" class="lineChart">
        <div ref="echarts1" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card>
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <el-card>
          <div ref="echarts3" style="height: 260px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../api";
import * as echarts from "echarts";

export default {
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "品牌",
        todayBuy: "本日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    // setTimeout(() => {}, 1000);
    getData().then(({ data }) => {
      const { tableData } = data.data;
      // console.log(data.data);
      this.tableData = tableData;

      // 初始化echarts  dom
      const echarts1 = echarts.init(this.$refs.echarts1);
      const echarts1Option = {};
      // 处理数据
      const { orderData, userData, videoData } = data.data;
      // x轴
      const xAxis = Object.keys(orderData.data[0]);
      const xAxisData = {
        data: xAxis,
      };
      echarts1Option.xAxis = xAxisData;
      echarts1Option.yAxis = {};

      echarts1Option.legend = {
        data: xAxis,
      };
      echarts1Option.series = [];
      xAxis.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });

      // console.log(echarts1Option);

      // 显示图表
      echarts1.setOption(echarts1Option);

      ////////////////////////////////////////////
      // 柱状图
      // const echarts2 = echarts.init(document.getElementById("#echarts2"));

      // console.log(this.$refs.echarts2);
      const echarts2 = echarts.init(this.$refs.echarts2);
      const echarts2Option = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          { name: "新增用户", data: userData.map((item) => item.new), type: "bar" },
          { name: "活跃用户", data: userData.map((item) => item.active), type: "bar" },
        ],
      };
      echarts2.setOption(echarts2Option);

      ////////////////////////////////////////////
      // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3);
      const echarts3Option = {
        tooltip: {
          trigger: "item",
        },
        color: ["#0f78f4", "#dd536b", "#9462e5", "#a6a6a6", "#e1bb22", "#39c362", "#3ed1cf"],
        series: [{ data: videoData, type: "pie" }],
      };
      echarts3.setOption(echarts3Option);
    });
  },
};
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
.user {
  display: flex;
  align-items: center;
}

.user-img {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  margin-right: 40px;
}

.userinfo .name {
  font-size: 32px;
  margin-bottom: 10px;
}

.userinfo:hover {
  cursor: pointer;
}

.access {
  color: #999;
}
.login-info p {
  font-size: 16px;
  line-height: 25px;
  color: #999;
}
.login-info span {
  font-size: 14px;
  color: #555;
  margin-left: 50px;
}
.num {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.num:hover {
  cursor: pointer;
}

.num .icon {
  width: 80px;
  height: 80px;
  font-size: 30px;
  text-align: center;
  line-height: 80px;

  color: #fff;
}

.detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
}
.price {
  font-size: 30px;
  margin-bottom: 10px;
  line-height: 30px;
  height: 30px;
}
.desc {
  font-size: 14px;
  color: #999;
  text-align: center;
}
.lineChart {
  margin-top: 20px;
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.graph .el-card {
  width: 48%;
  /* height: 260px; */
}
</style>
