<style>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
<template>
  <div id="app">
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import addMenu from "@/router/addMenu";
export default {
  name: "App",
  data() {
    return {
      menuArr: []
    };
  },
  methods: {
    // 页面刷新跳转时不让页面路由数据消失的函数，getMenu取出登录成功时存的sessionStorage
    postSlidesMenu() {
      // 刷新getMenu取出登录成功时存的sessionStorage来进行渲染
      console.log('刷新getMenu取出登录成功时存的sessionStorage来进行渲染')
      this.menuArr = JSON.parse(this.Util.getMenu());
      let children1 = [];

      var aaChildren = this.menuArr;
      for (let i = 0; i < aaChildren.length; i++) {
        if (aaChildren[i].children) {
          var children2 = aaChildren[i].children;
          for (let y = 0; y < children2.length; y++) {
            let ch = {};
            ch.component = children2[y].component;
            ch.path = children2[y].path;
            ch.name = children2[y].name;
            ch.children = children2[y].children;
            ch.redirect = children2[y].redirect;
            ch.meta = children2[y].meta;
            children1.push(ch);
          }
        }
      }
      // 上面是处理从sessionStorage拿出来的数据，初步转为普通路由集合信息。再去调用addMenu.js的assemblyMenu添加路由方法。
      // 下面和登录成功时的流程一样
      // assemblyMenu会将整理好的路由返回给你，再由你来用addRoutes添加进路由
      let aaChildren2 = addMenu.assemblyMenu(children1);
      let aaChildren3 = [
        {
          path: "/",
          name: "main",
          component: "main",
          redirect: "/index",
          meta: {
            requireAuth: false
          },
          children: aaChildren2
        }
      ];
      console.log('处理前的aaChildren3【0】.component'+ aaChildren3[0].component)
      console.log(aaChildren3[0].component)
      // 这里是将一开始的main，默认打开路径的component配置好，算一个单独文件，不改。
      aaChildren3[0].component = addMenu.assemblyMain(aaChildren3[0].component);
      console.log('处理后的aaChildren3【0】.component')
      console.log(aaChildren3[0].component)
      console.log('刷新后添加的路由总信息'+ aaChildren3);
      console.log(aaChildren3);
      // 这个if判断是避免刷新或者跳转后重复添加同样的路由
      if (this.$router.options.routes.length <= 1) {
        this.$router.addRoutes(aaChildren3);
        // this.$router不是响应式的，所以手动将路由元注入路由对象
        this.$router.options.routes.push(aaChildren3);
      }
    }
  },
  created() {
    // 处理刷新路由消失不见
    let info = this.Util.getToken();
    if (info != "") {
      this.postSlidesMenu();
    }else{
      console.log('刚打开无任何信息')
    }
  }
};
</script>

