<style>
.width_1200 {
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
.login-top p {
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
.login-warp .ivu-form-item {
  margin-bottom: 20px;
}
.login-warp .ivu-form-item input.ivu-input.ivu-input-default {
  height: 40px;
  background-color: #fff !important;
}
.login-warp .ivu-input-group-append,
.login-warp .ivu-input-group-prepend {
  background-color: #fff !important;
  border-right: none !important;
  border-radius: 0;
}
.login-warp .ivu-input {
  border-left: none !important;
}
.login-btn-bar .ivu-form-item-content {
  line-height: 38px;
}
.login-btn-bar .login-btn {
  display: inline-block;
  width: 280px;
  text-align: center;
  padding: 0;
  border-radius: 4px;
}
.login-bottom {
  text-align: center;
  height: 150px;
  line-height: 150px;
}
</style>
<template>
  <div class="login-warp">
    <div class="login-top">
      <div class="width_1200 clearfix">
        <h1 class="pull-left theme-txt-color">
          LOGO
          <span class="ml10">赋奥科技</span>
        </h1>
        <p class="pull-left txt-color-181 fs24">登录</p>
      </div>
    </div>
    <div class="login-content width_1200">
      <div class="login-content-box">
        <div class="title">赋奥账号登录</div>
        <div class="login-main mt30">
          <Form ref="formCustom" :model="formCustom" :rules="ruleValidate">
            <FormItem prop="userAccount">
              <Input
                type="text"
                name="userAccount"
                v-model="formCustom.userAccount"
                placeholder="请输入账号"
                @keyup.enter.native="handleSubmit('formCustom')"
              >
                <i class="iconfont icon-people fs16" slot="prepend"></i>
              </Input>
            </FormItem>
            <FormItem prop="userPwd">
              <Input
                type="password"
                name="userPwd"
                v-model="formCustom.userPwd"
                placeholder="请输入密码"
                @keyup.enter.native="handleSubmit('formCustom')"
              >
                <i class="iconfont icon-lock fs18" slot="prepend"></i>
              </Input>
            </FormItem>
            <FormItem prop="captcha">
              <Input
                type="text"
                name="captcha"
                v-model="formCustom.captcha"
                placeholder="请输入验证码"
                @keyup.enter.native="handleSubmit('formCustom')"
                style="width: 60%"
              >
                <i class="iconfont icon-lock fs16" slot="prepend"></i>888
              </Input>
              <span
                style="width: 100px;height: 40px;border: 1px solid #D7D7D7;position: absolute;left: 180px;top: 0;"
                @click="changeImgCode"
              >
                <img :src="imgCodeUrl" style="width: 100px;height: 100%;cursor: pointer;" />
              </span>
            </FormItem>
            <FormItem class="login-btn-bar no-margin-b mt30">
              <a
                class="theme-btn-color login-btn fs16"
                @click="handleSubmit('formCustom')"
              >登&nbsp;&nbsp;录</a>
            </FormItem>
          </Form>
        </div>
        <div class="text-center mt30">
          <p>提示：如忘记登录账号或密码，请联系上级管理员</p>
        </div>
      </div>
    </div>
    <div class="login-bottom fs14">
      <p>
        沪ICP备17001021号-1 版权所有© 2017
        <a>上海赋奥网络科技有限公司</a>
      </p>
    </div>
  </div>
</template>
<script>
import powerMenu from "@/router/powerMenu";

export default {
  name: "login",
  data() {
    return {
      imgCodeUrl: "",
      permitFlag: true,
      formCustom: {
        userAccount: "",
        userPwd: "",
        captcha: ""
      },
      ruleValidate: {
        userAccount: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        userPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      redirectPath:'index'
    };
  },
  methods: {
    // 点击图片修改图片src
    changeImgCode() {
      var num = Math.ceil(Math.random() * 10); //生成一个随机数（防止缓存）
      this.imgCodeUrl = this.Util.host() + "captcha.jpg?" + num;
    },
    handleSubmit(name) {
      var that = this;

      if (that.permitFlag) {
        that.$refs[name].validate(valid => {
          if (valid) {
            // 调用api接口,加true走本地，不加走接口
            that.Api.postLogin(that.formCustom, true).then(res => {
            // that.Api.postLogin(that.formCustom, true).then(res => {
              // 获取数据成功后的其他操作
              if (res && res.code == 0) {
                var data = res.data;
                that.Util.setToken(data.token);
                that.Api.getUserAuthMenuList(true).then(res => {
                // that.Api.getUserAuthMenuList(true).then(res => {
                  if (res.code == 0) {
                    that.Util.setMenu(res.data.data);
                    powerMenu().then(res => {
                      if (res == 0) {
                        that.$Message.success("登录成功，正在请求跳转···");
                        that.Util.setlocalItem("Account", that.formCustom.userAccount);
                        that.Util.setItem("user_name", data.userName);
                        setTimeout(function() {
                          that.$router.push({
                            path: that.redirectPath
                          });
                        }, 2000);
                      } else {
                        that.Util.removeToken();
                      }
                    });
                  } else {
                    that.Util.removeToken();
                    that.$Message.error(
                      res.msg ? res.msg : "获取用户系统权限失败"
                    );
                  }
                });
              } else {
                that.$Message.error(res.msg ? res.msg : "登录失败");
                that.permitFlag = true;
              }
            });
          }
        });
      }
    }
  },
  created() {
    var redirectPath = this.$route.query.redirect;
    if (redirectPath) {
      this.redirectPath = redirectPath;
    }

    this.imgCodeUrl = this.Util.host() + "captcha.jpg";
    var account = this.Util.getlocalItem("Account");
    if (account) {
      this.formCustom.userAccount = account;
    }
  }
};
</script>
