let routers = [
  {
    path: '/login',
    name: 'login',
    component: (resolve) => require(['@/view/login'], resolve),
    meta: {
      title: '登录',
      requireAuth: true
    },
    children: []
  }]
export default routers;

