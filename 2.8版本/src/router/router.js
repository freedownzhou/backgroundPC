// let routers = [
//   {
//     path: '/login',
//     name: 'login',
//     component: (resolve) => require(['@/view/login'], resolve),
//     meta: {
//       title: '登录',
//       requireAuth: true
//     },
//     children: []
//   }]
// export default routers;

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login'),
    //hidden: true
  }
]
const router = new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
// router.$addRoutes = (params) => {
//   router.matcher = new Router({mode: 'history'}).matcher;
//   router.addRoutes(params)
// }

export default router;

export const asyncRouterMap = [

]


