import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Menu from '@/components/Menu'
import UserCenter from '@/components/UserCenter'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path:'/',
      redirect:Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Menu',
      name: 'Menu',
      component: () => System.import("@/components/Menu.vue"),
      children: [
        {
          path:'/',
          component:() => System.import("@/components/UserCenter.vue"),
        },
        {
          path: "/Menu/UserCenter",
          name: "个人中心",
          component:() => System.import("@/components/UserCenter.vue")
        },
        {
          path: "/Menu/Game",
          component: () => System.import("@/components/Game.vue"),
          name: "休闲时刻"
        },
        {
          path: "/Menu/GameList",
          component: () => System.import("@/components/GameList.vue"),
          name: "游戏记录"
        },
        {
          path: "/Menu/Routeline",
          component: () => System.import("@/components/Routeline.vue"),
          name: "路线规划"
        },
 
        {
          path: "/Menu/Weather",
          component: () => System.import("@/components/Weather.vue"),
          name: "天气查询"
        }
      ]
    }
  ],
  mode:'history'
})
