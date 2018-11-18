<template>
    <div class="gamebox">
        <el-button @click="startGame" type="primary" round id="start">开始游戏</el-button>
        <!-- <el-button type="primary" round @click="gameList">游戏记录</el-button> -->
        <!-- <el-button type="primary" round>游戏排行</el-button> -->
        <div v-cloak class="map"></div>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "usercenter",
  data() {
    return {
      message: "休闲时刻",
      Food: {},
      Snake: {},
      startGameButton: false,
      foodNum: -1,
    };
  },
  methods: {
    startGame() {
      if (this.startGameButton) {
        return;
      }
      var _this = this;
      this.startGameButton = true;
      this.foodNum = -1;
      this.startTime = this.getTime();
      var map = document.querySelector(".map");
      while (map.firstChild) {
        map.removeChild(map.firstChild);
      }
      var runSn;
      // 用来保存每个食物
      var elementFood = [];
      // 食物的构造函数
      function Food(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.color = color || "green";
        this.width = width || 20;
        this.height = height || 20;
      }

      //食物初始化
      Food.prototype.init = function(map) {
        removeFood();
        var div = document.createElement("div");
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.position = "absolute";
        div.style.backgroundColor = this.color;
        this.x =
          parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y =
          parseInt(Math.random() * (map.offsetHeight / this.height)) *
          this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        map.appendChild(div);
        elementFood.push(div);
      };

      //删除上一个食物
      function removeFood() {
        console.log("删除食物");
        _this.foodNum++;
        for (var i = 0; i < elementFood.length; i++) {
          var ele = elementFood[i];
          ele.parentNode.removeChild(ele);
          elementFood.splice(i, 1);
        }
      }

      var elementSnake = [];
      //小蛇构造函数
      function Snake(width, height, direction) {
        this.width = width || 20;
        this.height = height || 20;
        this.body = [
          { x: 2, y: 2, color: "red" },
          { x: 1, y: 2, color: "orange" },
          { x: 0, y: 2, color: "orange" }
        ];
        this.direction = direction || "right";
      }

      //小蛇初始化
      Snake.prototype.init = function(map) {
        removeSnake();
        for (var i = 0; i < this.body.length; i++) {
          var obj = this.body[i];
          var div = document.createElement("div");
          div.style.width = this.width + "px";
          div.style.height = this.height + "px";
          div.style.position = "absolute";
          div.style.backgroundColor = obj.color;
          div.style.left = obj.x * this.width + "px";
          div.style.top = obj.y * this.height + "px";
          map.appendChild(div);
          elementSnake.push(div);
        }
      };

      //小蛇移动
      Snake.prototype.move = function(food, map) {
        var i = this.body.length - 1;
        for (; i > 0; i--) {
          this.body[i].x = this.body[i - 1].x;
          this.body[i].y = this.body[i - 1].y;
        }
        switch (this.direction) {
          case "left":
            this.body[0].x -= 1;
            break;
          case "right":
            this.body[0].x += 1;
            break;
          case "top":
            this.body[0].y -= 1;
            break;
          case "bottom":
            this.body[0].y += 1;
            break;
        }
      };

      //删除上一个小蛇
      function removeSnake() {
        // 这两种删除方式都可以，主要是分清i是怎么变的
        // for(var i = 0;i<element.length;){
        //     var ele = element[i];
        //     ele.parentNode.removeChild(ele);
        //     element.splice(i,1);
        // }
        var i = elementSnake.length - 1;
        for (; i >= 0; i--) {
          var ele = elementSnake[i];
          ele.parentNode.removeChild(ele);
          elementSnake.splice(i, 1);
        }
      }

      var that = null;
      //游戏的构造函数
      function PlayGame(map) {
        this.food = new Food();
        this.sn = new Snake();
        this.map = map;
        that = this; //that指向PlayGame的实例对象
      }
      //初始化游戏，可以显示小蛇和食物
      PlayGame.prototype.init = function() {
        this.food.init(this.map);
        this.sn.init(this.map);
        this.runSnake(this.food, this.map);
        this.bindKey();
      };
      //让小蛇自己动起来
      PlayGame.prototype.runSnake = function(food, map) {
        runSn = setInterval(
          function() {
            this.sn.move(food, map);
            this.sn.init(map);
            var headX = map.offsetWidth / this.sn.width;
            var headY = map.offsetHeight / this.sn.height;
            var snX = this.sn.body[0].x;
            var snY = this.sn.body[0].y;
            //小蛇碰到了四周墙壁 
            if (snX >= headX || snY >= headY || snX < 0 || snY < 0) {
              clearInterval(runSn);
              _this.endGame();
            }
            //小蛇撞到了自己
            for (var i = 1; i < this.sn.body.length; i++) {
              if (
                this.sn.body[0].x === this.sn.body[i].x &&
                this.sn.body[0].y === this.sn.body[i].y
              ) {
                clearInterval(runSn);
                _this.endGame();
              }
            }
            //小蛇吃到了食物
            if (
              snX * this.sn.width === food.x &&
              snY * this.sn.height === food.y
            ) {
              var last = this.sn.body[this.sn.body.length - 1];
              this.sn.body.push({
                x: last.x,
                y: last.y,
                color: last.color
              });
              this.food.init(this.map);
            }
          }.bind(that),
          300
        );
      };
      //监听用户按键，改变小蛇移动方向
      PlayGame.prototype.bindKey = function() {
        document.addEventListener(
          "keydown",
          function(e) {
            switch (e.keyCode) {
              case 37:
                this.sn.direction = "left";
                break;
              case 38:
                this.sn.direction = "top";
                break;
              case 39:
                this.sn.direction = "right";
                break;
              case 40:
                this.sn.direction = "bottom";
                break;
            }
          }.bind(that),
          false
        );
      };

      var gm = new PlayGame(map);
      gm.init();
    },
    getTime() {
      return new Date().getTime();
    },
    endGame() {
      var that = this;
      this.startGameButton = false;
      this.endTime = this.getTime();
      var time = Math.round((this.endTime - this.startTime) / 1000); //本次游戏持续时间
      var startDate = this.timeStampToDate(this.startTime); //本次游戏开始时间
      console.log(startDate);
      //   console.log(Math.round(time / 1000));
      //   console.log(this.foodNum); //本次游戏吃到的苹果数
      const param = qs.stringify({
        a: "recordScores",
        userId: "2",
        startDate: startDate,
        duration: time,
        foodNum: that.foodNum
      });
      // axios.post("/apis/02-phpApi.php", param).then(res => {
      //   console.log("返回值为");
      //   console.log(res);
      // });
      axios.get('apis/api/getnewslist')
      .then(res => {
        console.log(res)
      })
      // axios.get('/apis/02-phpApi.php?a=recordScores&userId=1&startDate='
      // +startDate+'&duration='+time+'&foodNum='+that.foodNum)
      // .then(res => {
      //     console.log('返回值为');
      //     console.log(res);
      // })
      alert("游戏结束了");
    },
    timeStampToDate(timestamp) {
      var date = new Date(timestamp);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var time = Y + M + D + h + m + s;
      return time;
    }
  }
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}

.gamebox {
  width: 100%;
  height: 100%;
}
.map {
  width: 100%;
  height: 90%;
  background-color: #ccc;
  position: relative;
  margin-top: 10px;
}

.list {
  width: 100%;
  height: 90%;
  background: #ffffff;
  position: relative;
  margin-top: 10px;
}
</style>

