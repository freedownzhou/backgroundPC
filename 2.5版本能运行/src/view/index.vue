<style>
    .welcome-user-box{
        height: 160px;
        padding-left: 30px;
    }
    .index-column-info{
        position: relative;
        margin-bottom: 20px;
        min-width: 1170px;
    }
    .row-list{
        max-height: 166px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 6px 0px;
        background: rgb(255, 255, 255);
    }
    .index-column-info .ws-grid-col{
        padding: 30px;
        border-right: 1px solid rgb(245, 245, 246);
    }
    .index-column-info .ws-grid-row{
        width: 50%;
        line-height: 18px;
    }
    .index-column-info .col-item{
        min-width: 72px;
    }
    .index-column-info .ws-grid-row a:hover{
        text-decoration: underline;
    }
    .ws-index-chart{
        padding: 30px;
        background-color: #ffffff;
        min-height: 300px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 6px 0px;
    }
</style>
<template>
  <div style="margin:10px;">
    <div class="welcome-user-box">
        <div class="clearfix lh25">
            <p class="pull-left fs18 txt-color-181">您好，上海赋奥网络科技有限公司</p>
            <i class="pull-left iconfont icon-modify2 theme-txt-color fs18 font-blod ml5 opacity-hover"></i>
        </div>
        <a class="theme-btn-color mt15 pl10 pr10" size="small">修改密码</a>
    </div>
    <Row class="index-column-info row-list">
        <i-col span="8" class="ws-grid-col">
            <h4 class="mb20 lh24">账号信息</h4>
            <div class="clearfix mb20">
                <div class="ws-grid-row clearfix pull-left">
                    <p class="col-item pull-left">账号类型</p>
                    <router-link to="" class="pull-left theme-txt-color">系统管理员</router-link>
                </div>
                <div class="ws-grid-row clearfix pull-left">
                    <p class="col-item pull-left">所属部门</p>
                    <router-link to="" class="pull-left theme-txt-color">技术部</router-link>
                </div>
            </div>
              <div class="clearfix">
                <div class="ws-grid-row clearfix pull-left">
                    <p class="col-item pull-left">部门角色</p>
                    <router-link to="" class="pull-left theme-txt-color">超级管理员</router-link>
                </div>
                <div class="ws-grid-row clearfix pull-left">
                    <p class="col-item pull-left">权限类型</p>
                    <router-link to="" class="pull-left theme-txt-color">角色权限</router-link>
                    <Tooltip class="pull-left txt-color-999 fs14 ml10" :content="tipsContent" placement="top">
                        <i class="iconfont icon-sigh"></i>
                    </Tooltip>
                </div>
            </div>
        </i-col>
        <i-col span="8" class="ws-grid-col">
            <h4 class="mb20 lh24">待办提醒</h4>
            <div class="clearfix mb20">
                <div class="ws-grid-row clearfix pull-left">
                    <p class="col-item pull-left">待办工单</p>
                    <router-link to="" class="pull-left theme-txt-color">0个</router-link>
                </div>
                <div class="ws-grid-row clearfix pull-left">
                    <p class="col-item pull-left">待办订单</p>
                    <router-link to="" class="pull-left theme-txt-color">0个</router-link>
                </div>
            </div>
              <div class="clearfix">
                <div class="ws-grid-row clearfix pull-left">
                    <p class="col-item pull-left">系统消息</p>
                    <router-link to="" class="pull-left theme-txt-color">0条</router-link>
                </div>
            </div>
        </i-col>
        <i-col span="8" class="ws-grid-col">
            <h4 class="mb20 lh24">财务提醒</h4>
            <div class="clearfix mb20">
                <div class="ws-grid-row clearfix pull-left">
                    <p class="col-item pull-left">可索取发票</p>
                    <router-link to="" class="pull-left theme-txt-color">0个</router-link>
                </div>
                <div class="ws-grid-row clearfix pull-left">
                    <p class="col-item pull-left">可结算佣金</p>
                    <router-link to="" class="pull-left theme-txt-color">￥1240.00</router-link>
                </div>
            </div>
        </i-col>
    </Row>
    <Row class="index-column-info row-list">
        <i-col span="8" class="ws-grid-col">
            <div class="clearfix mb20 lh25">
                <h4 class="pull-left">待办提醒短信通知：</h4>
                <i-Switch v-model="backlogChecked" class="pull-left" @on-change="backlogRemindSwitch"></i-Switch>
                <Tooltip class="pull-left txt-color-999 fs16 ml10" :content="tipsContent" placement="top">
                    <i class="iconfont icon-ask"></i>
                </Tooltip>
            </div>
            <div class="clearfix">
                <div class="ws-grid-row clearfix pull-left">
                    <p class="col-item pull-left">接收手机号：</p>
                    <p class="theme-txt-color">{{backlogState}}</p>
                </div>
            </div>
        </i-col>
        <i-col span="8" class="ws-grid-col">
            <div class="clearfix mb20 lh25">
                <h4 class="pull-left">财务待办提醒短信通知：</h4>
                <i-Switch v-model="cw_backlogChecked" class="pull-left" @on-change="cw_backlogRemindSwitch"></i-Switch>
                <Tooltip class="pull-left txt-color-999 fs16 ml10" :content="tipsContent" placement="top">
                    <i class="iconfont icon-ask"></i>
                </Tooltip>
            </div>
            <div class="clearfix">
                <div class="ws-grid-row clearfix pull-left">
                    <p class="col-item pull-left">接收手机号：</p>
                    <p class="theme-txt-color">{{cw_backlogState}}</p>
                </div>
            </div>
        </i-col>
        <i-col span="8" class="ws-grid-col">
            <div class="clearfix mb20 lh25">
                <h4 class="pull-left txt-color-999">暂未开通</h4>
            </div>
            <div class="clearfix">
                <div class="ws-grid-row clearfix pull-left">
                    <p class="pull-left txt-color-999">预留待上线功能区域</p>
                </div>
            </div>
        </i-col>
    </Row>
    <Row class="ws-index-chart bg-fff">
        <i-col span="24">
           <h4>近十二个月订单统计</h4>
        </i-col>
        <i-col span="24">
            <div id="orderRiseLine" :style="{height:'450px',margin:'0 auto'}"></div>
        </i-col>
    </Row>
    <!--Modal begin-->
    <Modal class="ws-modal" v-model="ejectModel.show" class-name="vertical-center-modal" :mask-closable="false">
        <div slot="header" class="fs18">
            {{ejectModel.title}}
        </div>
        <div class="modal-content">
            <div class="ws-modal-tips-bar clearfix mb20">
                <i class="iconfont icon-sigh pull-left no-cursor"></i>
                <p class="pull-left ml10" style="width:80%">注意：手机号将用于短信通知。</p>
            </div>
            <Form :rules="rulePhoneFrom" :model="phoneFrom" class="pl30 pr30">
                <FormItem class="no-margin-b" prop="phone" :label="phoneFrom.label">
                    <Input type="text" v-model="phoneFrom.input" style="width:250px" placeholder="请输入手机号"/>
                </FormItem>
            </Form>
        </div>
        <div slot="footer" class="clearfix">
            <div class="pull-right clearfix">
                <a class="ws-confirm-btn btn-disabled" @click="modalConfirmBtn" :style="{marginRight:'10px'}">确定</a>
                <a class="ws-cancel-btn" @click="modalCancelBtn()">取消</a>
            </div>
        </div>
    </Modal>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入圆饼图
require("echarts/lib/chart/pie");
// 引入折线图
require("echarts/lib/chart/line");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  data() {
    return {
        backlogChecked: false,
        cw_backlogChecked: false,
        tipsContent:'',
        backlogState: '未开启',
        cw_backlogState: '未开启',
        ejectModel: {
            show: false,
            title:''
        },
        phoneFrom:{
            input:'',
            label:'手机号：'
        },
        rulePhoneFrom:{
            phone: [
                { 
                    required: true, 
                    message: ' ', 
                    trigger: 'blur' 
                }
            ]
        }
    };
  },
  watch: {},
  methods: {
    backlogRemindSwitch() {
        let that = this;
        if(this.backlogChecked){
            that.ejectModel.show = true;
            that.ejectModel.title = '添加接收手机号';
        }else{
            that.backlogState = '未开启';
        }
    },
    cw_backlogRemindSwitch(){
        let that = this;
        if(this.cw_backlogChecked){
            that.ejectModel.show = true;
            that.ejectModel.title = '添加接收手机号';
        }else{
            that.cw_backlogState = '未开启';
        }
    },
    modalConfirmBtn(){
        let that =this;
        that.ejectModel.show = !that.ejectModel.show;
    },
    modalCancelBtn(){
        let that = this;
        that.ejectModel.show = !that.ejectModel.show;
        that.backlogChecked = false;
        that.cw_backlogChecked = false;
    },
    orderRiseLine(id) {
      let myChart = echarts.init(document.getElementById(id));
      myChart.setOption({
            tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data:['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'value'
            }
        ],
        yAxis : [
            {
                type : 'category',
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                stack: '总量',
                itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                data:[320, 302, 301, 334, 390, 330, 320]
            },
            {
                name:'邮件营销',
                type:'bar',
                stack: '总量',
                itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'bar',
                stack: '总量',
                itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'bar',
                stack: '总量',
                itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                data:[150, 212, 201, 154, 190, 330, 410]
            },
            {
                name:'搜索引擎',
                type:'bar',
                stack: '总量',
                itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                data:[820, 832, 901, 934, 1290, 1330, 1320]
            }
        ]
      });
    }
  },
  created() {},
  mounted() {
      this.orderRiseLine("orderRiseLine");
  }
};
</script>
