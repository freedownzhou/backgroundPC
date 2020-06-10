<template>
  <div class="details-page bg-fff pl20 pr20 box-shadow">
    <div class="tilte-bar clearfix">
      <div class="page-name clearfix pull-left lh50">
        <a @click="returnListBtn" class="return-list-btn ml5"><i class="iconfont icon-back-square fs14 mr2"></i>返回</a>
        <h4 class="pull-left">录单详情数据</h4>
      </div>
      <div class="pull-right">
        <a class="clearfix pl15 pr15 theme-btn-f7f lh18 mt10" @click="refreshBtn">
          <i class="pull-left iconfont icon-shuaxin fs12"></i>
          <p class="pull-left ml8 fs12">刷新</p>
        </a>
      </div>
      <h3 class="tilte-bar-name clearfix">
        <p class="pull-left">江苏东政防腐工程有限公司</p>
        <p class="pull-left ws-tag-box mt10 ml5">被保人</p>
      </h3>
    </div>
    <div class="tilte-bar-fix clearfix" v-show="tilteBarFix">
      <div class="page-name clearfix pull-left lh50">
        <a @click="returnListBtn" class="return-list-btn ml5"><i class="iconfont icon-back-square fs14 mr2"></i>返回</a>
        <h4 class="pull-left">录单详情数据</h4>
      </div>
      <div class="pull-right">
        <a class="clearfix pl15 pr15 theme-btn-f7f lh18 mt10" @click="refreshBtn">
          <i class="pull-left iconfont icon-shuaxin fs12"></i>
          <p class="pull-left ml8 fs12">刷新</p>
        </a>
      </div>
      <h3 class="tilte-bar-name clearfix">
        <p class="pull-left">江苏东政防腐工程有限公司</p>
        <p class="pull-left ws-tag-box mt10 ml5">被保人</p>
      </h3>
    </div>
    <div class="pt30 pb20 pl70">
      <Steps :current="1">
        <Step title="订单领取"></Step>
        <Step title="确认录单" content="这里是该步骤的描述信息"></Step>
        <Step title="确认审核" content="这里是该步骤的描述信息"></Step>
        <Step title="审核通过" content="这里是该步骤的描述信息"></Step>
        <Step title="确认出单" content="这里是该步骤的描述信息"></Step>
      </Steps>
    </div>
    <div style="min-width:960px">
      <Row class="pt30 pb30 pl30 pr30">
        <i-col span="3" style="max-width:160px">
          <i class="iconfont icon-menu fs14"></i>
          <span class="ml5 fs14 txt-color-101">订单信息</span>
          <div class="txt-color-999 clearfix details-page-info-strip">
            <p class="dot">•</p>
            <p class="txt">投保方案信息投保方案信息</p>
          </div>
        </i-col>
        <i-col span="21">
          <i-col span="10">
            <ul class="information-list">
              <li class="clearfix no-margin-t">
                <p class="pull-left list-title">订单编号：</p>
                <p class="txt-color-333 pull-left">12219040910313190578</p>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">保险产品：</p>
                <p class="txt-color-333 pull-left">安徽平安 -- 雇主责任险 -- 雇主方案</p>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">订单状态：</p>
                <p class="txt-color-333 pull-left">待录单</p>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">待录单：</p>
                <p class="txt-color-333 pull-left">已支付</p>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">起保日期：</p>
                <p class="txt-color-333 pull-left">2019-04-10 00:00:00 起</p>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">死亡/伤残：</p>
                <p class="txt-color-333 pull-left">80万/年</p>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">法律责任：</p>
                <p class="txt-color-333 pull-left">2019-04-10 00:00:00 起</p>
              </li>
            </ul>
          </i-col>
          <i-col span="11">
            <ul class="information-list">
              <li class="clearfix no-margin-t">
                <p class="pull-left list-title">订单编号：</p>
                <p class="txt-color-333 pull-left">12219040910313190578</p>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">保险产品：</p>
                <p class="txt-color-333 pull-left">安徽平安 -- 雇主责任险 -- 雇主方案</p>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">订单状态：</p>
                <p class="txt-color-333 pull-left">待录单</p>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">待录单：</p>
                <p class="txt-color-333 pull-left">已支付</p>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">起保日期：</p>
                <p class="txt-color-333 pull-left">2019-04-10 00:00:00 起</p>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">死亡/伤残：</p>
                <p class="txt-color-333 pull-left">80万/年</p>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">法律责任：</p>
                <p class="txt-color-333 pull-left">2019-04-10 00:00:00 起</p>
              </li>
            </ul>
          </i-col>
          <i-col span="21">
            <ul class="information-list">
              <li class="clearfix">
                <p class="pull-left list-title">雇主人员清单：</p>
                <a @click="clickSeeInventory" class="txt-color-006 pull-left">点击查看人员清单</a>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">电子保单：</p>
                <a @click="electronicPolicyBtn" class="txt-color-006 pull-left">document/upload/policy/X100122/201904/12588003900660892345.pdf （点击下载保单）</a>
              </li>
            </ul>
          </i-col>
        </i-col>
      </Row>
      <div class="dividing-line"></div>
      <Row class="pt30 pb30 pl30 pr30">
        <i-col span="3" style="max-width:160px">
          <i class="iconfont icon-menu fs14"></i>
          <span class="ml5 fs14 txt-color-101">基本信息</span>
          <div class="txt-color-999 clearfix details-page-info-strip">
            <p class="dot">•</p>
            <p class="txt theme-txt-color">赵紫仓</p>
          </div>
          <div class="txt-color-999 clearfix details-page-info-strip">
            <p class="dot">•</p>
            <p class="txt">投、被保人信息</p>
          </div>
          <div class="txt-color-999 clearfix details-page-info-strip">
            <p class="dot">•</p>
            <p class="txt">经办人信息</p>
          </div>
          <div class="txt-color-999 clearfix details-page-info-strip">
            <p class="dot">•</p>
            <p class="txt">投保资料文件信息</p>
          </div>
        </i-col>
        <i-col span="21">
          <i-col span="24" class="pb15 border-bottom-dashed-ccc">
            <i-col span="10">
              <ul class="information-list">
                <li class="clearfix no-margin-t">
                  <p class="pull-left list-title">投保单位：</p>
                  <p class="txt-color-333 pull-left">江苏山峰建设工程有限公司</p>
                </li>
                <li class="clearfix">
                  <p class="pull-left list-title">单位邮箱：</p>
                  <p class="txt-color-333 pull-left">3317001780@qq.com</p>
                </li>
              </ul>
            </i-col>
            <i-col span="11">
              <ul class="information-list">
                <li class="clearfix no-margin-t">
                  <p class="pull-left list-title">统一信用代码：</p>
                  <p class="txt-color-333 pull-left">91320902MA1UX7UE05</p>
                </li>
                <li class="clearfix">
                  <p class="pull-left list-title">银行账户：</p>
                  <p class="txt-color-333 pull-left">/</p>
                </li>
              </ul>
            </i-col>
          </i-col>
          <i-col span="24" class="pt15 pb15 border-bottom-dashed-ccc">
            <i-col span="10">
              <ul class="information-list">
                <li class="clearfix no-margin-t">
                  <p class="pull-left list-title">投保单位：</p>
                  <p class="txt-color-333 pull-left">江苏山峰建设工程有限公司</p>
                </li>
                <li class="clearfix">
                  <p class="pull-left list-title">单位邮箱：</p>
                  <p class="txt-color-333 pull-left">3317001780@qq.com</p>
                </li>
              </ul>
            </i-col>
            <i-col span="11">
              <ul class="information-list">
                <li class="clearfix no-margin-t">
                  <p class="pull-left list-title">统一信用代码：</p>
                  <p class="txt-color-333 pull-left">91320902MA1UX7UE05</p>
                </li>
              </ul>
            </i-col>
          </i-col>
          <i-col span="24" class="pt15">
            <i-col span="10">
              <ul class="information-list">
                <li class="clearfix no-margin-t">
                  <p class="pull-left list-title">经办人：</p>
                  <p class="txt-color-333 pull-left">赵紫仓</p>
                </li>
              </ul>
            </i-col>
            <i-col span="11">
              <ul class="information-list">
                <li class="clearfix no-margin-t">
                  <p class="pull-left list-title">手机号：</p>
                  <p class="txt-color-333 pull-left">18751323210</p>
                </li>
              </ul>
            </i-col>
          </i-col>
          <i-col span="24" class="pt15 pb15 border-bottom-dashed-ccc">
            <ul class="information-list">
              <li class="clearfix no-margin-t">
                <p class="pull-left list-title">收件地址：</p>
                <p class="txt-color-333 pull-left">江苏省 南通市 崇川区 工农路155号天鑫大厦601C室</p>
              </li>
            </ul>
          </i-col>
          <i-col span="24" class="pt15">
            <div class="clearfix">
              <p class="pull-left list-title mt30">人员清单盖章<br>(扫描件)：</p>
              <div style="width:87.2%;" class="pull-left clearfix">
                <div class="picture-preview pull-left">
                  <div class="mask-box"></div>
                  <img src="@/assets/img/head-portrait.jpg" width="100%" alt="">
                  <div class="see-btn">
                    <a class="txt-color-fff" @click="clickSeeImgBtn">点击查看</a>
                  </div>
                </div>
                <div class="picture-preview pull-left">
                  <div class="mask-box"></div>
                  <img src="@/assets/img/head-portrait.jpg" width="100%" alt="">
                  <div class="see-btn">
                    <a class="txt-color-fff" @click="clickSeeImgBtn">点击查看</a>
                  </div>
                </div>
              </div>
            </div>
          </i-col>
          <i-col span="24" class="pt15">
            <div class="clearfix">
              <p class="pull-left list-title " style="margin-top:40px">投保单：</p>
              <div style="width:87.2%;" class="pull-left clearfix">
                <div class="picture-preview pull-left">
                  <div class="mask-box"></div>
                  <img src="@/assets/img/head-portrait.jpg" width="100%" alt="">
                  <div class="see-btn">
                    <a class="txt-color-fff" @click="clickSeeImgBtn">点击查看</a>
                  </div>
                </div>
              </div>
            </div>
          </i-col>
        </i-col>
      </Row>
      <div class="dividing-line"></div>
      <Row class="pt30 pb30 pl30 pr30">
        <i-col span="3" style="max-width:160px">
          <i class="iconfont icon-menu fs14"></i>
          <span class="ml5 fs14 txt-color-101">投保清单</span>
          <div class="txt-color-999 clearfix details-page-info-strip">
            <p class="dot">•</p>
            <p class="txt">首次投保清单信息</p>
          </div>
          <div class="txt-color-999 clearfix details-page-info-strip">
            <p class="dot">•</p>
            <p class="txt">短期投保</p>
          </div>
          <div class="txt-color-999 clearfix details-page-info-strip">
            <p class="dot">•</p>
            <p class="txt">厦门人保</p>
          </div>
          <div class="txt-color-999 clearfix details-page-info-strip">
            <p class="dot">•</p>
            <p class="txt">同保额保费</p>
          </div>
          <div class="txt-color-999 clearfix details-page-info-strip">
            <p class="dot">•</p>
            <p class="txt">线上审核出单</p>
          </div>
          <div class="txt-color-999 clearfix details-page-info-strip">
            <p class="dot">•</p>
            <p class="txt">房屋建筑/装修工程</p>
          </div>
        </i-col>
        <i-col span="21">
          <i-col span="10">
            <ul class="information-list">
              <li class="clearfix no-margin-t">
                <p class="pull-left list-title">批单编号：</p>
                <p class="txt-color-333 pull-left">PD19071117471797604</p>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">投保保费：</p>
                <div class="txt-color-333 pull-left clearfix">
                  <p class="pull-left txt-color-19b">￥4176元</p>
                  <p class="pull-left ws-tag-box-1 ml5 mb5 pl2 pr2">38.00</p>
                </div>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">渠道保费：</p>
                <div class="txt-color-333 pull-left clearfix">
                  <p class="pull-left txt-color-19b">￥4176元</p>
                  <p class="pull-left ws-tag-box-1 ml5 mb5 pl2 pr2">34.00</p>
                </div>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">起保日期：</p>
                <p class="txt-color-333 pull-left">2019-07-12 00:00:00起</p>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">保障期限：</p>
                <p class="txt-color-333 pull-left">60天</p>
              </li>
            </ul>
          </i-col>
          <i-col span="11">
            <ul class="information-list">
              <li class="clearfix no-margin-t">
                <p class="pull-left list-title">保单号：</p>
                <p class="txt-color-333 pull-left">12219040910313190578</p>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">净保费：</p>
                <div class="txt-color-333 pull-left clearfix">
                  <p class="pull-left txt-color-19b">￥4176元</p>
                  <p class="pull-left ws-tag-box-1 ml5 mb5 pl2 pr2">28.00</p>
                </div>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">保单状态：</p>
                <p class="txt-color-19b pull-left">已生效</p>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">届满日期：</p>
                <p class="txt-color-333 pull-left">2019-09-09 23:59:59止</p>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title">提交申请日期：</p>
                <p class="txt-color-333 pull-left">2019-07-11 17:47:17</p>
              </li>
            </ul>
          </i-col>
          <i-col span="21">
            <ul class="information-list">
              <li class="clearfix">
                <p class="pull-left list-title">人员清单：</p>
                <router-link to=""class="txt-color-006 pull-left">document/upload/lister/201907/RYQD(EPUB)_122fc344.xlsx （点击下载文件）</router-link>
              </li>
            </ul>
          </i-col>
          <i-col span="10">
            <ul class="information-list">
              <li class="clearfix">
                <p class="pull-left list-title">审核日期：</p>
                <p class="txt-color-333 pull-left">2019-07-11 17:56:49</p>
              </li>
            </ul>
          </i-col>
          <i-col span="11">
            <ul class="information-list">
              <li class="clearfix">
                <p class="pull-left list-title">出单日期：</p>
                <p class="txt-color-333 pull-left">2019-07-11 17:56:49</p>
              </li>
            </ul>
          </i-col>
          <i-col span="21">
            <ul class="information-list">
              <li class="clearfix">
                <p class="pull-left list-title">订单备注：</p>
                <p class="txt-color-333 pull-left"></p>
              </li>
            </ul>
          </i-col>
        </i-col>
      </Row>
      <Row type="flex" justify="center" class="pb40">
        <i-col class="clear-both::after" >
          <a class="theme-btn-color pull-left pl20 pr20" @click="confirmationBtn">确认录单</a>
          <a class="theme-btn-f7f pull-left ml30 pl22 pr22" @click="withdrawBtn">撤回</a>
          <a class="theme-btn-f7f pull-left ml30 pl22 pr22" @click="cancellationBtn">作废</a>
        </i-col>
      </Row>
      <div class="dividing-line"></div>
      <Row class="pt30 pb30 pl30 pr30">
        <i-col span="3" style="max-width:160px">
          <i class="iconfont icon-menu fs14"></i>
          <span class="ml5 fs14 txt-color-101">订单信息</span>
          <div class="txt-color-999 clearfix details-page-info-strip">
            <p class="dot">•</p>
            <p class="txt">投保方案信息投保方案信息</p>
          </div>
        </i-col>
        <i-col span="21">
          <i-col span="10">
            <ul class="information-list">
              <li class="clearfix no-margin-t">
                <p class="pull-left list-title">支付状态：</p>
                <p class="pull-left theme-txt-color">待用户上传支付凭证</p>
              </li>
              <li class="clearfix">
                <p class="pull-left list-title mt5">最后账期日：</p>
                <Date-picker type="date" placeholder="选择日期" style="width: 200px" class="pull-left"></Date-picker>
              </li>
            </ul>
          </i-col>
          <i-col span="21">
            <ul class="information-list">
              <li class="clearfix">
                <p class="pull-left list-title">支付备注：</p>
                <p class="txt-color-999 pull-left"></p>
              </li>
            </ul>
          </i-col>
        </i-col>
      </Row>
      <Row type="flex" justify="center" class="pb40">
        <i-col class="clear-both::after" >
          <a class="theme-btn-color pull-left pl20 pr20" @click="modifyDateBtn">修改账期日</a>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
  import common from '@/lib/common';
    export default {
        name: "ludanDetails",
      data(){
        return{
          tilteBarFix: false
        }
      },
      methods:{
        //返回列表
        returnListBtn(){
          this.$router.push({name: '录单'})
        },
        //刷新
        refreshBtn(){
          alert('刷新');
        },
        //点击查看人员清单
        clickSeeInventory(){
          alert('点击查看人员清单');
        },
        //电子保单
        electronicPolicyBtn(){
          alert('电子保单');
        },
        //点击查看图片
        clickSeeImgBtn(){
          alert('点击查看图片');
        },
        //确定录单
        confirmationBtn(){
          alert('确定录单');
        },
        //撤回
        withdrawBtn(){
          alert('撤回');
        },
        //作废
        cancellationBtn(){
          alert('作废');
        },
        //修改账期日
        modifyDateBtn(){
          alert('修改账期日');
        },
        scrollToTop() {
          this.tilteBarFix = common.scrollToTop();
        }
      },
      mounted() {
        this.$nextTick(function() {
          window.addEventListener('scroll', this.scrollToTop);
        });
      },
      destroyed() {
        window.removeEventListener('scroll', this.scrollToTop);
      }
    }
</script>

<style scoped>
  .details-page{
    margin: 10px;
  }
  .tilte-bar{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #dddddd;
    position: relative;
  }
  .return-list-btn{
    color: #ff6a00;
    /*border: 1px solid #ff6a00;*/
    margin-top: 14px;
    float: left;
    padding: 2px 4px;
    line-height: 16px;
  }
  .return-list-btn:hover{
    color: #ffffff;
    border: 1px solid #ff6a00;
    border-color: #ff6a00;
    background-color: #ff6a00;
  }
  .tilte-bar-name{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 50px;
    line-height: 50px;
  }
  .ws-tag-box{
    display: inline-block;
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    color: #ff6a00;
    background-color: #fff3eb;
    border: 1px solid #ff6a00;
    padding: 0 5px;
    border-radius: 4px;
  }
  .ws-tag-box-1{
    display: inline-block;
    font-size: 12px;
    height: 15px;
    line-height: 15px;
    color: #ff6a00;
    background-color: #fff3eb;
    border: 1px solid #ff6a00;
    padding: 0 5px;
    border-radius: 4px;
  }
  .ivu-col-span-3 .iconfont{
    cursor: default;
  }
  .information-list li{
    width: 100%;
    margin-top: 15px;
    font-size: 12px;
    color: #666666;
    line-height: 24px;
  }
  .list-title{
    width: 100px;
    text-align: right;
  }
  .dividing-line{
    width: 98%;
    height: 1px;
    background-color: #ccc;
    margin: 0 auto;
  }
  .list-img-title{
    width: 120px;
    text-align: right;
    font-size: 14px;
    color: #666666;
    padding-top: 35px
  }
  .picture-preview{
    position: relative;
    width: 120px;
    height: 100px;
    overflow: hidden;
    margin: 0 15px 15px 10px;

  }
  .picture-preview img{
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0,-50%);
  }
  .picture-preview .mask-box{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #000;
    opacity: .45;
    z-index: 2;
  }
  .picture-preview .see-btn{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 3;
  }
  .details-page-info-strip {
    padding-left: 10px;
    margin-top: 5px;
    font-size: 12px;
  }
  .details-page-info-strip .dot{
    width: 5px;
    float: left;
  }
  .details-page-info-strip .txt{
    float: left;
    width: 90%;
    margin-left: 5px;
  }
  .tilte-bar-fix{
    position: fixed;
    top: 50px;
    left: 180px;
    right: 0;
    background-color: #ffffff;
    padding: 0 20px;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
    z-index: 5;
  }
</style>
