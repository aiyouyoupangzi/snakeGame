<template>
    <div class="box">
      <el-container style="height:100%; border: 1px solid #eee;background-color:#ffffff">
        <el-aside width="200px" style="background-color: #ffffff;">
          <el-menu :default-openeds="['1','2','3','4']" router>
            <el-submenu index="1">
              <template slot="title"><i class="icon-user icon">个人中心</i></template>
              <el-menu-item index="/Menu/UserCenter">完善信息</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="icon-sun icon">天气查询</i></template>
              <el-menu-item index="/Menu/Weather">一周天气</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="icon-airplane icon">路线规划</i></template>
              <el-menu-item index="/Menu/Routeline">设计路线</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="icon-gamepad icon">休闲时刻</i></template>
              <el-menu-item index="/Menu/Game">贪吃蛇</el-menu-item>
              <el-menu-item index="/Menu/GameList">游戏记录</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        
        <el-container>
          <el-header style="text-align: right; font-size: 12px">
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>王小虎</span>
          </el-header>
          
          <el-main id="content">
            <router-view></router-view>
            <!-- <el-table :data="tableData">
              <el-table-column prop="date" label="日期" width="140">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="120">
              </el-table-column>
              <el-table-column prop="address" label="地址">
              </el-table-column>
            </el-table> -->
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        // tableData: Array(20).fill(item)
      }
    },

  };
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }

  .box {
    height: 100vh;
    background-color: white
  }

  #content {
    height: 85vh;
    padding: 0;
    margin: 10px;
  }

</style>
