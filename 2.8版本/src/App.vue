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
import powerMenu from "@/router/powerMenu";
export default {
  name: "App",
  data() {
    return {
      menuArr: []
    };
  },
  methods: {},
  created() {
    powerMenu().then(res => {
      console.log(res);
    });
  }
};
</script>

