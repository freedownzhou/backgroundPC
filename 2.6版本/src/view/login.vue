<style>
.width_1200{
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.login-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  line-height: 80px;
  background-color: #fff;
  z-index: 2;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
.login-top p{
  padding-left: 10px;
  border-left: 1px solid #999;
  line-height: 26px;
  margin-top: 26px;
  margin-left: 10px;
}
.login-content {
  height: 700px;
  position: relative;
  background-image: url(../assets/img/login-bg.jpg);
  background-size: 100% 100%;
  margin-top: 80px;
  border-bottom: 1px solid #cfd0d1;
}
.login-content-box {
  width: 400px;
  position: absolute;
  background-color: #fff;
  border-radius: 2px;
  right: 0;
  top: 145px;
  padding-top: 40px;
  padding-bottom: 40px;
}
.login-content-box .title {
  color: #101010;
  font-size: 20px;
  text-align: center;
}
.login-main {
  width: 280px;
  margin-left: auto;
  margin-right: auto;
}
.login-warp .ivu-form-item{
  margin-bottom: 20px;
}
.login-warp .ivu-form-item input.ivu-input.ivu-input-default{
  height: 40px;
  background-color: #fff !important;
}
.login-warp  .ivu-input-group-append,.login-warp  .ivu-input-group-prepend{
  background-color: #fff !important;
  border-right: none !important;
  border-radius: 0;
}
.login-warp .ivu-input{
  border-left: none !important;
}
.login-btn-bar .ivu-form-item-content{
  line-height: 38px;
}
.login-btn-bar .login-btn{
  display: inline-block;
  width: 280px;
  text-align: center;
  padding: 0;
  border-radius: 4px;
}
.login-bottom{
  text-align: center;
  height: 150px;
  line-height: 150px;
}
</style>
<template>
  <div class="login-warp">
    <div class="login-top">
      <div class="width_1200 clearfix">
        <h1 class="pull-left theme-txt-color">LOGO<span class="ml10">赋奥科技</span></h1>
        <p class="pull-left txt-color-181 fs24">登录</p>
      </div>
    </div>
    <div class="login-content width_1200">
      <div class="login-content-box">
        <div class="title">赋奥账号登录</div>
        <div class="login-main mt30">
          <Form ref="formCustom" :model="formCustom" :rules="ruleValidate">
            <FormItem prop="userAccount">
              <Input type="text" name="userAccount" v-model="formCustom.userAccount" placeholder="请输入账号" @keyup.enter.native="handleSubmit('formCustom')" >
                <i class="iconfont icon-people fs16" slot="prepend"></i>
              </Input>
            </FormItem>
            <FormItem prop="userPwd">
              <Input type="password" name="userPwd" v-model="formCustom.userPwd" placeholder="请输入密码" @keyup.enter.native="handleSubmit('formCustom')">
                <i class="iconfont icon-lock fs18" slot="prepend"></i>
              </Input>
            </FormItem>
            <FormItem prop="captcha">
              <Input type="text" name="captcha" v-model="formCustom.captcha" placeholder="请输入验证码" @keyup.enter.native="handleSubmit('formCustom')" style="width: 60%" >
                <i class="iconfont icon-lock fs16" slot="prepend"></i>888
              </Input>
                <span style="width: 100px;height: 40px;border: 1px solid #D7D7D7;position: absolute;left: 180px;top: 0;" @click="changeImgCode">
                    <img :src="imgCode" style="width: 100px;height: 100%;cursor: pointer;"/>
                </span>

            </FormItem>
            <FormItem class="login-btn-bar no-margin-b mt30">
              <a class="theme-btn-color login-btn fs16"  @click="handleSubmit('formCustom')">登&nbsp;&nbsp;录</a>
            </FormItem>
          </Form>
        </div>
        <div class="text-center mt30">
          <p>提示：如忘记登录账号或密码，请联系上级管理员</p>
        </div>
      </div>

    </div>
    <div class="login-bottom fs14">
      <p>沪ICP备17001021号-1 版权所有© 2017 <a>上海赋奥网络科技有限公司</a></p>
    </div>
  </div>
</template>
<script>
import addMenu from "@/router/addMenu";
import Api from "../lib/api"; // 导入我们的api接口
export default {
  name: "login",
  data() {
    return {
      imgCode: 'http://192.168.1.100:8082/captcha.jpg',
      permitFlag: true,
        formCustom: {
        userAccount: "",
        userPwd: "",
        captcha:'',
      },
      ruleValidate: {
        userAccount: [{ required: true, message: "请输入账号", trigger: "blur" }],
        userPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        captcha:[{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi5b2V5Y2V5rWL6K-V6LSm5Y-3IiwiaWQiOiJmNTIxZTdlMmVmMzU0NDE3ODNmNzk4ZGJlZTBmOWE1OCIsImV4cCI6MTU2MzU4NjA1MywiaWF0IjoxNTYzNDk5NjUzfQ.UHoJ5PWXkpFv6hvfWcxDDWS9t_eI06EY7OrtE6GA8vM',
      authMenu: [
        {
          path: "/",
          component: "/",
          menu_isshow: "Y",
          count: 2,
          showCount: 1,
          minCount: 1,
          show: false,
          children: [
            {
              path: "/allUser",
              component: "user/allUser",
              menu_isshow: "Y",
              children: [],
              meta: { menu_id: "13002" },
              name: "会员用户"
            },
            {
              path: "/qyUser",
              component: "user/qyUser",
              menu_isshow: "Y",
              children: [],
              meta: { menu_id: "13003" },
              name: "企业用户"
            }
          ],
          name: "用户管理"
        },
        {
          path: "/",
          component: "/",
          menu_isshow: "Y",
          count: 2,
          showCount: 1,
          minCount: 1,
          show: false,
          children: [
            {
              path: "/qyProduct",
              component: "product/qyProduct",
              menu_isshow: "Y",
              children: [],
              meta: { menu_id: "13031" },
              name: "企业产品"
            },
            {
              path: "/grProduct",
              component: "product/grProduct",
              menu_isshow: "Y",
              children: [],
              meta: { menu_id: "13032" },
              name: "个人产品"
            }
          ],
          name: "产品管理"
        },
        {
          path: "/",
          component: "/",
          menu_isshow: "Y",
          count: 6,
          showCount: 3,
          minCount: 2,
          show: false,
          children: [
            {
              path: "gzOrder/childrenGzOrder",
              component: "order/gzOrder/childrenGzOrder",
              menu_isshow: "Y",
              children: [],
              name: "订单领取"
            },
            {
              path: "/ludan",
              component: "order/ludan",
              menu_isshow: "Y",
              children: [
                {
                  path: "/ludanDetails",
                  component: "order/ludanDetails",
                  // menu_isshow: "Y",
                  children: [],
                  meta: { menu_id: "13045" },
                  name: "录单详情数据"
                },
              ],
              meta: { menu_id: "13045" },
              name: "录单"
            },
            {
              path: "/biaoge",
              component: "order/biaoge",
              menu_isshow: "Y",
              children: [],
              meta: { menu_id: "13032" },
              name: "批单"
            },
            {
              path: "/gzOrderAllot",
              component: "order/gzOrderAllot",
              menu_isshow: "Y",
              children: [],
              meta: { menu_id: "13032" },
              name: "人员清单"
            },
            {
              path: "gzRecordSheet/childrenGzRecordSheet",
              component: "order/gzRecordSheet/childrenGzRecordSheet",
              menu_isshow: "Y",
              children: [],
              name: "所有订单"
            },
            {
              path: "gzRecordSheet/childrenGzRecordSheet",
              component: "order/gzRecordSheet/childrenGzRecordSheet",
              menu_isshow: "Y",
              children: [],
              name: "所有批单"
            }
          ],
          name: "订单管理"
        },
        {
          path:"/",
          component:"/",
          menu_isshow:"Y",
          count:5,
          showCount:3,
          minCount: 2,
          show:false,
          children:[
            {
              path: "/Administrator",
              component: "system/Administrator",
              menu_isshow: "Y",
              children: [],
              meta: { menu_id: "13038" },
              name: "管理员"
            },
            {
              path: "/MenuContent",
              component: "system/MenuContent",
              menu_isshow: "Y",
              children: [
                {
                  path: "/MenuContent/childOne/:parentId/:name",
                  component: "system/childOne",
                  // menu_isshow: "Y",
                  children: [],
                  meta: { menu_id: "13040" },
                  name: "一级子菜单"
                },
                {
                  path: "/MenuContent/childOne/childTwo/:parentOneId/:name",
                  component: "system/childTwo",
                  // menu_isshow: "Y",
                  children: [],
                  meta: { menu_id: "13039" },
                  name: "二级子菜单"
                },
              ],
              meta: { menu_id: "13038" },
              name: "菜单"
            },
            {
              path: "/Role",
              component: "system/Role",
              menu_isshow: "Y",
              children: [],
              meta: { menu_id: "13038" },
              name: "角色"
            },
            {
              path: "/Organization",
              component: "system/Organization",
              menu_isshow: "Y",
              children: [],
              meta: { menu_id: "13038" },
              name: "组织机构"
            },
            {
              path: "/Permissions",
              component: "system/Permissions",
              menu_isshow: "Y",
              children: [],
              meta: { menu_id: "13039" },
              name: "权限"
            },
          ],
          name: "系统管理"
        },
      ]
    };
  },
  methods: {
    // 点击图片修改图片src
    changeImgCode() {
      var num=Math.ceil(Math.random()*10);//生成一个随机数（防止缓存）
      this.imgCode = "http://192.168.1.100:8082/captcha.jpg?" + num;
    },
    handleSubmit(name) {
      var that = this;
      if (that.permitFlag) {
        //that.permitFlag = false;
        that.$refs[name].validate(valid => {
          if (valid) {
            // that.$Message.success("登录成功，正在请求跳转···");
            // that.Util.setToken(that.token);
            // that.Util.setItem("user_name", '上海赋奥网络科技有限公司');
            // 调用api接口
            Api.postLogin(that.formCustom).then(res => {
              // 获取数据成功后的其他操作
              console.log(res);
              if (res && res.code == 0) {
                that.$Message.success("登录成功，正在请求跳转···");
                that.Util.setToken(res.data.token);
                // 存账号名
                that.Util.setlocalItem("Account", that.formCustom.userAccount);
                // 存返回的用户名
                that.Util.setItem("user_name", res.data.userName);
                that.postSlidesMenu2();// 之后用that.postSlidesMenu函数，先用这个是因为后台菜单没有现在
                setTimeout(function() {
                  that.$router.push({
                    name: "main"
                  });
                }, 2000);
              } else {
                that.$Message.error(res.msg ? res.msg : "登录失败");
                that.permitFlag = true;
              }
            });

            //
            // that.postSlidesMenu2();
            // setTimeout(function() {
            //   that.$router.push({
            //     name: "main"
            //   });
            // }, 2000);
          }
        });
      }
    },
    postSlidesMenu() {
      console.log('有运行')
      var that = this;
      // 调用api接口
      console.log('开始登陆')
      postUserAuthorityMenu(that.formCustom).then(res => {
        // 获取数据成功后的其他操作
        if (res && res.code == 0) {
          let children1 = [];
          var aaChildren = res.data.data;
          //console.log("aaChildren:" + JSON.stringify(aaChildren));
          for (let i = 0; i < aaChildren.length; i++) {
            if (aaChildren[i].children) {
              var children2 = aaChildren[i].children;
              for (let y = 0; y < children2.length; y++) {
                let ch = {};
                ch.component = children2[y].component;
                ch.path = children2[y].path;
                ch.name = children2[y].name;
                ch.children = children2[y].children;
                //console.log(ch.name + ":" + JSON.stringify(children2[y].children));
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
          aaChildren3[0].component = addMenu.assemblyMain(
            aaChildren3[0].component
          );
          if (this.$router.options.routes.length <= 1) {
            this.$router.addRoutes(aaChildren3);
            // this.$router不是响应式的，所以手动将路由元注入路由对象
            this.$router.options.routes.push(aaChildren3);
          }
          that.Util.setMenu(JSON.stringify(res.data.data));
        } else {
          that.$Message.error(res.msg ? res.msg : "请求失败");
          that.permitFlag = true;
        }
      });
    },
    postSlidesMenu2() {
      var that = this;
      let children1 = [];
      var aaChildren = that.authMenu;
      //console.log("aaChildren:" + JSON.stringify(aaChildren));
      for (let i = 0; i < aaChildren.length; i++) {
        if (aaChildren[i].children) {
          var children2 = aaChildren[i].children;

          for (let y = 0; y < children2.length; y++) {
            let ch = {};
            ch.component = children2[y].component;
            ch.path = children2[y].path;
            ch.name = children2[y].name;
            ch.children = children2[y].children;
            //console.log(ch.name + ":" + JSON.stringify(children2[y].children));
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
      aaChildren3[0].component = addMenu.assemblyMain(
        aaChildren3[0].component
      );
      if (this.$router.options.routes.length <= 1) {
        this.$router.addRoutes(aaChildren3);
        // this.$router不是响应式的，所以手动将路由元注入路由对象
        this.$router.options.routes.push(aaChildren3);
      }

      that.Util.setMenu(JSON.stringify(that.authMenu));
    }
  },
  created() {
    if(this.Util.getlocalItem('Account')){
      this.formCustom.userAccount = this.Util.getlocalItem('Account');
    }
    // this.postSlidesMenu();
  }
};
</script>
