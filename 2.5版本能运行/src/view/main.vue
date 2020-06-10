<template>
    <div class="warp">
        <!-- 顶部工具条-->
        <div class="top-bar">
            <div class="top-tool-bar">
                <div class="clearfix pl10 pr10">
                    <div class="pull-left">
                        <div class="clearfix theme-txt-color lh50">
                            <p class="pull-left fs24 font-bold">LOGO</p>
                            <p class="pull-left fs20 ml15">赋奥网络</p>
                        </div>
                    </div>
                    <div class="pull-right">
                        <div class="clearfix txt-color-333 fs14">
                            <div class="pull-left">
                                <a class="topbar-btn">财务</a>
                            </div>
                            <div class="pull-left">
                                <a class="topbar-btn">工单</a>
                            </div>
                            <div class="pull-left">
                                <a class="topbar-btn">理赔</a>
                            </div>
                            <div class="pull-left">
                                <a class="topbar-btn fs16">
                                    <i class="iconfont icon-small-bell"></i>
                                </a>
                            </div>
                            <div class="pull-left">
                                <a class="topbar-btn fs16">
                                    <i class="iconfont icon-home"></i>
                                </a>
                            </div>
                            <div class="pull-left relative topbar-info-dropdown">
                                <a class="topbar-btn">
                                    <img class="user-head-box mt10" src="../assets/img/head-portrait.jpg" alt="">
                                </a>
                                <div class="topbar-info-dropdown-menu txt-color-333 fs12">
                                    <div class="clearfix border-bottom-ded pl15 pr15 pt10 pb10">
                                        <img class="pull-left user-info-head-box" src="../assets/img/head-portrait.jpg" alt="">
                                        <p class="pull-left user-name ml10">{{user_name}}</p>
                                        <ul class="topbar-user-list clearfix pull-left">
                                            <li>
                                                <a>基本资料</a>
                                            </li>
                                            <li>
                                                <a>安全设置</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="pt10 pb10 border-bottom-ded">
                                        <ul class="topbar-user-body-list txt-color-181">
                                            <li>
                                                <a class="clearfix">
                                                    <i class="iconfont icon-people fs14 pull-left"></i>
                                                    <p class="ml10 pull-left">基本资料</p>
                                                </a>
                                            </li>
                                            <li>
                                                <a class="clearfix">
                                                    <i class="iconfont icon-lock fs14 pull-left"></i>
                                                    <span class="ml10 pull-left">账号权限</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a class="clearfix">
                                                    <i class="iconfont icon-safe fs14 pull-left"></i>
                                                    <span class="ml10 pull-left">安全设置</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="topbar-user-footer fs14">
                                        <a>退出管理系统</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!---->
        <div id="root-app" class="root-app in-homepage">
            <div class="sidebar-app app">
                <div class="side-user-avatar">
                    <div class="info-tag">
                        <div class="trapezium-left"></div>
                        用户中心
                        <div class="trapezium-right"></div>
                    </div>
                    <a target="_blank">
                        <img class="head-portrait" src="../assets/img/head-portrait.jpg" alt="">
                        <p class="user-name">{{user_name}}</p>
                    </a>

                </div>
<!--              下面是菜单-->
                <div class="system-menu">
                    系统菜单项
                </div>
                <div>
                    <div class="side-nav-box side-nav-item">
                        <router-link to="/index" class="menu-item" tag="li" active-class="current">
                            <span>账户总览</span>
                        </router-link>
                    </div>
                    <div class="side-nav-box" v-for="(item,index) in authMenu" :key="index" v-model="authMenu" v-if="item.menu_isshow == 'Y'">
                        <div class="side-nav-item pb15">
                            <div class="side-nav-item-title">{{item.name}}</div>
                            <router-link :to="_item.path" tag="li" class="menu-item" active-class="current"
                                v-for="(_item, twoIndex) in item.children" :key="twoIndex" v-if="_item.menu_isshow == 'Y'" v-show="twoIndex < item.showCount">
                                <span>{{_item.name}}</span>
                            </router-link>
                            <div v-if="item.children && item.count > item.minCount" class="fold-btn-bar">
                                <div class="fold-btn" @click="sideMenuFoldBtn(index)">
                                    <i class="iconfont" :class="item.show ? 'icon-triangle-up' : 'icon-triangle-down'"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usercenter-app">
                <transition name="component-fade" mode="out-in">
                  <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    import '../assets/css/headside.css';
    export default {
        data() {
            return {
                authMenu: [],
                user_name: "",
            };
        },
        methods: {
            sideMenuFoldBtn(index){
                let that = this;
                var list = that.authMenu[index];
                var show = list.show;
                if (show) {
                    list.showCount = list.minCount;
                    list.show = false;
                } else {
                    list.showCount = list.count;
                    list.show = true;
                }
            },
            routeJump(){
                this.$router.push({
                    path: '',
                    meta: {
                        title: ''
                    },
                    //component: (resolve) => require(['./views/' + '' + '.vue'], resolve)
                });
            },
            toPage(event) {
                let el = event.currentTarget;
                console.log("当前对象的内容："+el.innerHTML);
            }
        },
        created() {
            this.user_name = this.Util.getItem('user_name');
            this.authMenu = JSON.parse(this.Util.getMenu());
            //console.log(this.authMenu);
            //console.log(this.slidesMenu);
        }
    }
</script>
