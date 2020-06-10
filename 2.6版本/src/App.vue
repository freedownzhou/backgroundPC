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
    postSlidesMenu() {
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

      aaChildren3[0].component = addMenu.assemblyMain(aaChildren3[0].component);
      console.log(aaChildren3);
      if (this.$router.options.routes.length <= 1) {
        this.$router.addRoutes(aaChildren3);
        // this.$router不是响应式的，所以手动将路由元注入路由对象
        this.$router.options.routes.push(aaChildren3);
      }
    }
  },
  created() {
    let info = this.Util.getToken();
    if (info != "") {
      this.postSlidesMenu();
    }
  }
};
</script>

