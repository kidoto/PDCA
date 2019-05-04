import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from '@/components/Top.vue'
import Login from '@/components/Login.vue'
import List from '@/components/List.vue'

// Vuexと同様で最初にプラグインとして登録
Vue.use(VueRouter)
// VueRouterインスタンスを生成する
const router = new VueRouter({
  mode: 'history',

  // URLのパスと紐づくコンポーネントをマッピング
  routes: [
    {
      path: '/',
      component: Top
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/list',
      component: List
    }
  ]
})
// 生成したVueRouterインスタンスをエクスポート
export default router
