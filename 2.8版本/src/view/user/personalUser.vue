
<style>
.mix-page.list-page{
    background-color: #fff;
    padding: 0 16px;
    margin: 10px;
}
.mix-page .title-bar {
    padding: 12px 0;
    border-bottom: 1px solid #d4d3d3;
    height: auto;
    line-height: normal;
}
.mix-page .title-bar .title {
    color: #181818;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
}
.ivu-select-selection,.ivu-select-dropdown{
  border-radius: 0px;
}
</style>
<template>
    <div class="mix-page list-page box-shadow">
        <h4 class="title-bar clearfix">
          <p class="title pull-left">会员用户列表</p>
          <div class="extra pull-right">
            <a class="clearfix pl5 pr5 theme-btn-color pull-left lh18">
              <i class="pull-left iconfont icon-addto fs14"></i>
              <p class="pull-left ml5 fs12">创建用户</p>
            </a>
            <a class="clearfix pl15 pr15 theme-btn-f7f pull-left lh18 ml10">
              <i class="pull-left iconfont icon-shuaxin fs12"></i>
              <p class="pull-left ml8 fs12">刷新</p>
            </a>
          </div>
        </h4>
        <div class="condition-bar pt15 pb15">
          <i-select :model.sync="userTypeModel" style="width:160px" placeholder="请选择用户类型">
              <i-option v-for="(item,index) in userTypeList" :value="item.value" :key="index">{{ item.label }}</i-option>
          </i-select>
          <i-select :model.sync="userTypeModel" style="width:160px;margin-left:12px;" placeholder="请选择账号状态">
              <i-option v-for="(item,index) in userTypeList" :value="item.value" :key="index">{{ item.label }}</i-option>
          </i-select>
          <a class="theme-btn-color pl20 pr20 ml10">搜索</a>
          <a class="theme-btn-color-frame pl20 pr20 ml10">重置</a>
        </div>
        <div>
          <Table :loading="tableLoading" :columns="tableFormat" :data="tableData"></Table>
        </div>
        <div class="clearfix">
          <div class="clearfix pt30 pb30 pull-right">
              <Page class="pull-left" 
                    :total="page.count" 
                    :current="page.page" 
                    :page-size="page.limit" 
                    show-elevator show-sizer 
                    size="small" 
                    @on-change="pageChange" 
                    @on-page-size-change="sizeChange"></Page>
              <div class="page-number pull-left lh24 ml20">
                共：<span>{{page.count}}&nbsp;&nbsp;</span>条数据
              </div>
          </div>
        </div>
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

export default {
  data() {
    return {
      userTypeModel: '',
      userTypeList: [
          {
              value: 'beijing',
              label: '北京市'
          },
          {
              value: 'shanghai',
              label: '上海市'
          },
          {
              value: 'shenzhen',
              label: '深圳市'
          },
          {
              value: 'hangzhou',
              label: '杭州市'
          },
          {
              value: 'nanjing',
              label: '南京市'
          },
          {
              value: 'chongqing',
              label: '重庆市'
          }
      ],
      tableData:[
        {
            user_name: '王小明',
            order_no: '01',
            product_name: '保险1',
            scheme_name: '方案1',
            insurer: '保险公司1',
            accounts: '11',
            settlement_ratio: '10',
            ctime:'2019-7-22 15:01'
        },
        {
            user_name: '张小二',
            order_no: '02',
            product_name: '保险2',
            scheme_name: '方案1',
            insurer: '保险公司1',
            accounts: '2',
            settlement_ratio: '80',
            ctime:'2019-7-22 15:01'
        },
      ],
      tableLoading: false,
      page: {
        count: 0,
        page: 1,
        limit: 10
      },
      tableFormat: [
        {
          title: "用户名",
          key: "user_name",
          align: "center",
        },
        {
          title: "编号",
          key: "order_no",
          align: "center",
        },
        {
          title: "产品名称",
          key: "product_name",
          align: "center",
        },
        {
          title: "方案名称",
          key: "scheme_name",
          align: "center",
        },
         {
          title: "保险公司",
          key: "insurer",
          align: "center"
        },
        {
          title: "账期",
          key: "accounts",
          align: "center",
        },
        {
          title: "结算比率（%）",
          key: "settlement_ratio",
          align: "center",
        },
        {
          title: "创建时间",
          key: "ctime",
          align: "center",
        },
        {
          title: "状态",
          key: "state",
          align: "center",
          render: (h, params) => {
            let that = this;
            let texts = '待领取';
            return h(
              "div",
              {
                props: {}
              },
              texts
            );
          }
        },
        {
          title: "操作",
          key: "operation",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("a", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                  },
                  style:{
                    color: '#ff6a00'
                  },
                  on: {
                    click: () => {
                        this.manageBtn(params.row);
                    }
                  }
                },
                "管理"
              ),
            ]);
          }
        }
      ],
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
  methods: {
    // 分页
    pageChange(page) {
      this.page.page = page;
      //this.getTableData();
    },
    // 分页条数
    sizeChange(size){
      this.page.limit = size;
      //this.getTableData();
    },
    // 分页：显示条数
    limitChange(limit) {
      this.page.limit = limit;
      //this.getTableData();
    },
    //管理
    manageBtn(){
      this.ejectModel.title = '管理';
      this.ejectModel.show = true;
    },
    modalConfirmBtn(){

    },
    modalCancelBtn(){
      this.ejectModel.show = !this.ejectModel.show;
    }
  },
  created() {
  },
  mounted() {
  }
};
</script>
