<template>
    <div class="mix-page list-page box-shadow">
    <h4 class="title-bar clearfix">
      <p class="title pull-left">角色列表</p>
      <div class="extra pull-right">
        <a class="clearfix pl5 pr5 theme-btn-color pull-left lh18"  @click="ModelType('角色')">
          <i class="pull-left iconfont icon-addto fs14"></i>
          <p class="pull-left ml5 fs12">创建角色</p>
        </a>
        <a class="clearfix pl15 pr15 theme-btn-f7f pull-left lh18 ml10" @click="rold">
          <i class="pull-left iconfont icon-shuaxin fs12"></i>
          <p class="pull-left ml8 fs12">刷新</p>
        </a>
      </div>
    </h4>
      <div class="condition-bar pt15 pb15">
<!--        <i-select v-model.sync="userTypeModel" style="width:160px" placeholder="请选择管理员类型">-->
<!--          <i-option v-for="(item,index) in userTypeList" :value="item.value" :key="index">{{ item.label }}</i-option>-->
<!--        </i-select>-->
        <i-select v-model.sync="userTypeModel" style="width:160px;margin-left:12px;" placeholder="请选择账号状态">
          <i-option v-for="(item,index) in userTypeList" :value="item.value" :key="index">{{ item.label }}</i-option>
        </i-select>
        <Input v-model="conditions" style="width:160px;margin-left: 10px" placeholder="姓名" />
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
      <!--      这是管理弹出层-->
      <ModifyModels></ModifyModels>
      <!--      权限弹出层-->
      <Permissions></Permissions>
  </div>
</template>

<script>
    import Models from '../PublicComponent/Models.vue';
    import ModifyModels from '../PublicComponent/ModifyModels.vue';
    import Permissions from '../PublicComponent/Permissions.vue';
    import expandRow from '../PublicComponent/table-expand.vue';
    import Api from "../../lib/api";      // 导入我们的api接口
    export default {
        // name: "Role"
      components:{Models,expandRow,ModifyModels,Permissions},
      provide(){
        return {
          getTableData:this.getTableData
        }
      },
      data() {
        return {
          userTypeList: [
            {
              value: '1',
              label: '有效'
            },
            {
              value: '0',
              label: '失效'
            },
          ],
          // 表数据
          tableData:[],
          tableLoading: false,
          page: {
            count: 0,
            page: 1,
            limit: 10
          },
          // 表头
          tableFormat: [
            // 下拉框暂且不显示
            // {
            //   type: 'expand',
            //   width: 50,
            //   render: (h, params) => {
            //     return h(expandRow, {
            //       props: {
            //         row: params.row
            //       }
            //     })
            //   }
            // },
            {
              title: "角色名",
              key: "role_name",
              align: "center",
            },
            {
              title: "ID",
              key: "id",
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
                          this.permissionsBtn(params.row);
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
          statusData:{
            "status_0":"失效",
            "status_1":"有效",
          },
          // 搜索条件3个
          conditions:'',
          userTypeModel: '',
        };
      },
      methods: {
        // 查内容
        getTableData(){
          Api.getRoleList({
            keyword:this.userTypeModel,
            page:this.page.page,
            limit:this.page.limit
          }).then(res=>{
            this.page.count = res.data.count
            this.tableData = res.data.data
            console.log(res)
          }).catch(error => {
            console.log('错误');
          })
        },
        // 分页
        pageChange(page) {
          this.page.page = page;
          this.getTableData();
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
        //管理按钮
        manageBtn(msg){
          var messages = [msg,'角色']
          this.$root.Bus.$emit("Modify-click",messages)
        },
        //权限按钮
        permissionsBtn(msg){
          var messages = [msg,'角色']
          this.$root.Bus.$emit("Permissions-click",messages)
        },
        modalConfirmBtn(){

        },
        modalCancelBtn(){
          this.ejectModel.show = !this.ejectModel.show;
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
          Api.getRoleList(this.$options.methods.formData(that)).then(res=>{
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
            status:that.userTypeModel,
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
