<template>
    <div class="listbox">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
            label="日期"
            width="180">
              <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column
            label="游戏时长(s)"
            width="180">
              <template slot-scope="scope">
                  <!-- <i class="el-icon-time"></i> -->
                  <span style="margin-left: 10px">{{ scope.row.duration }}</span>
              </template>
              <!-- <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                  <p>姓名: {{ scope.row.name }}</p>
                  <p>住址: {{ scope.row.address }}</p>
                  <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.name }}</el-tag>
                  </div>
                  </el-popover>
              </template> -->
            </el-table-column>
            <el-table-column
            label="得分"
            width="180">
              <template slot-scope="scope">
                  <span style="margin-left:10px">{{scope.row.score}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                  <!-- <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
        <input type="text" placeholder="请输入id" v-model="id">
        <input type="text" placeholder="请输入人名" v-model="name">
        <input type="submit" value="提交" @click="submit" ref="haha">
        <!-- <ul> -->
          <!-- 给transition-group添加appear属性，实现页面刚展示出来的时候入场的效果 -->
          <!-- 通过为transition-group设置tag属性，指定transition-group渲染为指定的元素，
               如果不指定tag属性，默认渲染为span标签 -->
          <transition-group appear tag="ul" ref="hehe">
            <li v-for="(item ,index) in list" :key="index"  @click="del(index)">
              {{item.id}}-------{{item.name}}
            </li>
          </transition-group>
         
        <!-- </ul> -->

        <!-- <a href="" @click.prevent="comName='login'"></a>
        <a href="" @click.prevent="comName='register'"></a>
        <component :is="comName"></component> -->

        <input type="text" v-model="firstName">+
        <input type="text" v-model="middleName">+
        <input type="text" v-model="lastName">=
        <input type="text" v-model="Name">
    </div>
</template>

<script>
import Vue from "vue";
Vue.config.keyCodes.f2 = 113;
      const fs = require('fs');


Vue.directive("focus", {
  // 在每个钩子函数中，第一个参数永远是el，表示被绑定了指令的那个元素，这个el参数是一个原生的js对象
  bind(el) {
    //每当指令绑定到元素上的时候，会立即执行这个函数，只执行一次
    // 在元素刚绑定了指令的时候，还没有插入到DOM中区，这个时候调用focus方法没有作用
  },
  inserted(el, binding) {
    // 表示元素插入到DOM中的时候，只执行一次
    el.focus();
  },
  update(el) {
    // 当Vnode更新的时候，可能会触发多次
  }
});
Vue.directive("fffff", {
  // 在每个钩子函数中，第一个参数永远是el，表示被绑定了指令的那个元素，这个el参数是一个原生的js对象
  bind(el, binding) {
    //每当指令绑定到元素上的时候，会立即执行这个函数，只执行一次
    // 在元素刚绑定了指令的时候，还没有插入到DOM中区，这个时候调用focus方法没有作用
    // el.style.color = binding.expression;
    console.log(binding);
    console.log(binding.value);
    console.log(binding.expression);
  },
  inserted(el, binding) {
    // 表示元素插入到DOM中的时候，只执行一次
  },
  update(el) {
    // 当Vnode更新的时候，可能会触发多次
  }
});
export default {
  name: "usercenter",
  data() {
    return {
      message: "游戏列表",
      tableData: [
        {
          date: "2016-05-02",
          // name: "王小虎",
          // address: "上海市普陀区金沙江路 1518 弄",
          duration: 100,
          score: 10
        },
        // {
        //   date: "2016-05-02",
        //   // name: "王小虎",
        //   // address: "上海市普陀区金沙江路 1518 弄",
        //   duration: 100,
        //   score: 9
        // },
        // {
        //   date: "2016-05-02",
        //   // name: "王小虎",
        //   // address: "上海市普陀区金沙江路 1518 弄",
        //   duration: 100,
        //   score: 8
        // },
        // {
        //   date: "2016-05-02",
        //   // name: "王小虎",
        //   // address: "上海市普陀区金沙江路 1518 弄",
        //   duration: 100,
        //   score: 7
        // }
      ],
      id:5,
      name:'小谁',
      list:[
        {
          id:1,
          name:'小明'
        },
        {
          id:2,
          name:'小兰'
        },
        {
          id:3,
          name:'小明'
        },
        {
          id:4,
          name:'小兰'
        }
      ],
      firstName:'',
      middleName:'',
      lastName:'',
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.tableData.splice(index, 1);
    },
    hehe() {
      console.log("点了");

    },
    animation() {
      this.show = !this.show;
    },
    // 表示动画入场之前，此时动画尚未开始，可以在beforeEnter中设置开始动画之前的起始样式
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    // 表示动画开始之后的样式，结束状态
    enter(el, done) {
      el.offsetWidth;
      el.style.transform = "translate(260px,260px)";
      el.style.transition = "all 1s ease";
      done();
      // 在enter和leave方法中，回调函数done是必须的，
    },
    afterEnter(el) {
      this.flag = !this.flag;
    },
    submit(){
      let per = {
        id:this.id,
        name:this.name
      };
      this.list.push(per);
    
    },
    del(e){
      this.list.splice(e,1);
    }
  },
  directives: {
    color: function(el, binding) {
      console.log(binding);
      console.log(binding.value);
      console.log(binding.expression);
      el.style.color = binding.expression;
    }
  },
  computed:{
    'Name'(){
      return this.firstName+this.middleName+this.lastName
    }
  }
};
</script>

<style scoped>
.listbox {
  width: 100%;
  height: 100%;
  /* background-color: pink; */
}

ul li {
  list-style: none;
}

li {
  height: 30px;
  border: 1px solid red;
  margin: 1px;
  line-height: 30px;
  /* width: 100%; */
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(80px);
}

.v-enter-active,
.v-leave-active{
  transition: all 1s ease;  
}

/* .v-move {
  transition: all 1s ease;
}

.v-leave-active {
  position: absolute
} */

</style>

