/**
 * 权限拼装
 */
export default {
  assemblyMenu(subs) {
    // 建立一个router对象，这就是将渲染进路由的对象.注意先看看后台传来的数据，可能结构和你平时看到的结构不一样
    var router = [];
    if (subs) {
      let temp = {
        path: '/index',
        name: 'index',
        component: (resolve) => require(['@/view/index'], resolve)
      }
      router.push(temp);  // 将登陆成功后的页面加入router对象
      // 一个for循环判断当前路由是否有子路由，这里生成一个存储当前路由的所有子路由的变量temp3，还生成一个局部变量temp2，每一次循环先循环出当前路由temp2的子路由temp1，然后再设置temp2的属性，最后push到router对象中
      for (let i = 0; i < subs.length; i++) {
        let temp3 = [];
        // 如果当前路由有子路由,再生成一个局部变量children3，先将所有子路由赋给它，再用一个循环，在循环中生成一个temp4变量存储当前子路由，再push到temp3对象中。(现在暂且无子路由所以只是有一个component转换的功效)
        if(subs[i].children) {
          let children3 = subs[i].children;
          for (let y = 0; y < children3.length; y++) {
            let temp4 = {
              path: children3[y].path,
              name: children3[y].name,
              component: (resolve) => require([`@/view/${children3[y].component}`], resolve)
            }
            temp3.push(temp4);
          }
          console.log(temp3)
        }
// 上面是当前路由的子路由temp1，下面是设置当前路由temp2
        let temp2 = {
          path: subs[i].path,
          name: subs[i].name,
          component: (resolve) => require([`@/view/${subs[i].component}`], resolve),
          children:temp3,
          redirect:subs[i].redirect,
          meta:subs[i].meta
        }
        // 将处理好的路由push到router中
        router.push(temp2);
      }
    }
    return router;
  },
  // 返回处理好的路由，在app.vue触发
  assemblyMain(subs) {
    var router;
    if (subs) {
      router = (resolve) => require([`@/view/${subs}`], resolve)
    }
    return router
  }
}
