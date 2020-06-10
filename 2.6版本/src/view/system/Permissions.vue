<template>
  <div class="mix-page list-page box-shadow">
    <h4 class="title-bar clearfix">
      <p class="title pull-left">权限列表</p>
      <div class="extra pull-right">
        <a class="clearfix pl5 pr5 theme-btn-color pull-left lh18"  @click="ModelType('权限')">
          <i class="pull-left iconfont icon-addto fs14"></i>
          <p class="pull-left ml5 fs12">创建权限</p>
        </a>
        <a class="clearfix pl15 pr15 theme-btn-f7f pull-left lh18 ml10" @click="rold">
          <i class="pull-left iconfont icon-shuaxin fs12"></i>
          <p class="pull-left ml8 fs12">刷新</p>
        </a>
      </div>
    </h4>
    <div class="condition-bar pt15 pb15">
      <i-select v-model.sync="userTypeModel" style="width:160px" placeholder="请选择权限类型">
        <i-option v-for="(item,index) in userTypeList" :value="item.value" :key="index">{{ item.label }}</i-option>
      </i-select>
      <Input v-model="conditions" style="width:160px;margin-left: 10px" placeholder="权限名称" />
      <a class="theme-btn-color pl20 pr20 ml10" @click="conditionsStart">搜索</a>
      <a class="theme-btn-color-frame pl20 pr20 ml10" @click="conditionsRemove">重置</a>
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
    <!--      下面是注册弹出层-->
    <Models></Models>
    <!--      下面是菜单权限弹出层-->
    <AccessPolicy></AccessPolicy>
    <!--      这是管理弹出层-->
    <ModifyModels></ModifyModels>
  </div>
</template>

<script>
  import Models from '../PublicComponent/Models.vue';
  import ModifyModels from '../PublicComponent/ModifyModels.vue';
  import expandRow from '../PublicComponent/table-expand.vue';
  import AccessPolicy from '../PublicComponent/AccessPolicy.vue';
  import Api from "../../lib/api";      // 导入我们的api接口
  export default {
    // name: "MenuContent"
    components:{Models,expandRow,ModifyModels,AccessPolicy},
    provide(){
      return {
        getTableData:this.getTableData
      }
    },
    data() {
      return {
        statusData:{
          "status_0":"失效",
          "status_1":"有效",
        },
        typedata:{
          powerStyle_1:'菜单',
          powerStyle_2:'功能按钮',
          powerStyle_3:'文件',
          powerStyle_4:'页面元素',
        },
        userTypeList: [
          {
            value: '1',
            label: '菜单'
          },
          {
            value: '2',
            label: '功能按钮'
          },
          {
            value: '3',
            label: '文件'
          },
          {
            value: '4',
            label: '页面元素'
          },
        ],
        tableData:[],
        tableLoading: false,
        page: {
          count: 0,
          page: 1,
          limit: 10
        },
        tableFormat: [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(expandRow, {
                props: {
                  row: params.row
                }
              })
            }
          },
          {
            title: "ID",
            key: "id",
            align: "center",
          },
          {
            title: "权限名称",
            key: "power_name",
            align: "center",
          },
          {
            title: "权限类型",
            key: "power_type",
            align: "center",
            render: (h, params) => {
              let that = this;
              var data = params.row;
              var status = "powerStyle_" + data.power_type;
              var texts = that.typedata[status];
              console.log(params)
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
            title: "平台编码",
            key: "platform_code",
            align: "center",
          },
          {
            title: "修改时间",
            key: "gmt_modified",
            align: "center",
          },
          {
            title: "创建时间",
            key: "gmt_create",
            align: "center",
          },
          {
            title: "状态",
            key: "state",
            align: "center",
            render: (h, params) => {
              let that = this;
              var data = params.row;
              var ststus = "status_" + data.status;
              var texts = that.statusData[ststus];
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
                        this.MenuPermissions(params.row);
                      }
                    }
                  },
                  "权限"
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
        },
        // 搜索条件3个
        conditions:'',
        userTypeModel: '',
      };
    },
    methods: {
      // 查内容
      getTableData(){
        Api.getPowerList({
          keyword:this.userTypeModel,
          page:this.page.page,
          limit:this.page.limit
        }).then(res=>{
          console.log(res)
          this.page.count = res.data.count
          this.tableData = res.data.data
        }).catch(error => {
          console.log('错误');
        })
      },
      // 分页
      pageChange(page) {
        this.page.page = page;
        this.page.page = page;
        this.getTableData();
        console.log('另外一页数据')
      },
      // 分页条数
      sizeChange(size){
        this.page.limit = size;
        this.getTableData();
      },
      // 分页：显示条数
      limitChange(limit) {
        this.page.limit = limit;
        this.getTableData();
      },
      //管理
      manageBtn(msg){
        var messages = [msg,'权限']
        this.$root.Bus.$emit("Modify-click",messages)
      },
      modalConfirmBtn(){

      },
      modalCancelBtn(){
        this.ejectModel.show = !this.ejectModel.show;
      },
      //菜单权限按钮事件
      MenuPermissions(value){
        this.$root.Bus.$emit("MenuP-click",value)
      },
      // 创建按钮函数
      ModelType(value){
        this.$root.Bus.$emit("on-click",value)
      },
      // 搜索条件重置函数
      conditionsRemove(){
        this.conditions='';
        this.userTypeModel='';
      },
      // 搜索函数
      conditionsStart(){
        var that = this;
        Api.getPowerList(this.$options.methods.formData(that)).then(res=>{
          console.log(res)
          this.tableData = res.data.data
          console.log(this.tableData)
        }).catch(error => {
          console.log('错误');
        })
      },
      // 返回搜索条件
      formData(that){
        var queryInfo = {
          page:that.page.page,
          limit:that.page.page,
          power_type:that.userTypeModel,
          keyword:that.conditions
        }
        return queryInfo;
      },
      // 刷新函数
      rold(){
        console.log('刷新了');
        this.getTableData();
      }
    },
    created() {
      this.getTableData();
    },
    mounted() {
    }
  }
</script>

<style scoped>
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
