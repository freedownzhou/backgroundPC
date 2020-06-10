/** 
 * 权限拼装
 */
export default {
  assemblyMenu(subs) {
    var router = [];
    if (subs) {
      let temp = {
        path: '/index',
        name: 'index',
        component: (resolve) => require(['@/view/index'], resolve)
      }
      router.push(temp);
      for (let i = 0; i < subs.length; i++) {
        let temp3 = [];
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
        }

        let temp2 = {
          path: subs[i].path,
          name: subs[i].name,
          component: (resolve) => require([`@/view/${subs[i].component}`], resolve),
          children:temp3,
          redirect:subs[i].redirect,
          meta:subs[i].meta
        }
        router.push(temp2);
      }
    }
    return router;
  },
  assemblyMain(subs) {
    var router;
    if (subs) {
      router = (resolve) => require([`@/view/${subs}`], resolve)
    }
    return router
  }
}
