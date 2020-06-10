<template>
    <div class="mix-page list-page box-shadow">
    <h4 class="title-bar clearfix">
      <p class="title pull-left">管理员列表</p>
      <div class="extra pull-right">
        <a class="clearfix pl5 pr5 theme-btn-color pull-left lh18" @click="ModelType('管理员')">
          <i class="pull-left iconfont icon-addto fs14"></i>
          <p class="pull-left ml5 fs12">创建管理员</p>
        </a>
        <a class="clearfix pl15 pr15 theme-btn-f7f pull-left lh18 ml10" @click="rold">
          <i class="pull-left iconfont icon-shuaxin fs12"></i>
          <p class="pull-left ml8 fs12">刷新</p>
        </a>
      </div>
    </h4>
    <div class="condition-bar pt15 pb15">
      <i-select v-model.sync="formDatas.userType" style="width:160px" placeholder="请选择管理员类型">
        <i-option v-for="(item,index) in userTypeList" :value="item.value" :key="index">{{ item.label }}</i-option>
      </i-select>
      <i-select v-model.sync="formDatas.userAccount" style="width:160px;margin-left:12px;" placeholder="请选择账号类型">
        <i-option v-for="(item,index) in accountType" :value="item.value" :key="index">{{ item.label }}</i-option>
      </i-select>
      <Input v-model="formDatas.keyword" style="width:160px;margin-left: 10px" placeholder="姓名 | 电话号码" />
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
    </div>
</template>

<script>
  import Models from '../PublicComponent/Models.vue';
  import ModifyModels from '../PublicComponent/ModifyModels.vue';
  import expandRow from '../PublicComponent/table-expand.vue';
  import Api from "../../lib/api";      // 导入我们的api接口
    export default {
        // name: "Administrator"
      components:{Models, expandRow,ModifyModels},
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
              label: '平台管理员'
            },
            {
              value: '2',
              label: '渠道'
            },
            {
              value: '3',
              label: '业务员'
            }
          ],
          accountType: [
            {
              value: '1',
              label: '正式账号'
            },
            {
              value: '2',
              label: '测试账号'
            }
          ],
          // 管理员列表数据
          tableData:[],
          tableLoading: false,
          createModel: {
            show: false,
            title:''
          },
          page: {
            count: 1,  // 数据总数
            page: 1,    // 当前页数
            limit: 1,    // 每页条数
          },
          statusData:{
            "status_0":"禁用",
            "status_1":"启用",
            "status_2":"冻结",
            "status_3":"失效",
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
              title: "用户账号",
              key: "user_account",
              align: "center",
            },
            {
              title: "用户名",
              key: "user_name",
              align: "center",
            },
            {
              title: "昵称",
              key: "nickname",
              align: "center",
            },
            {
              title: "手机号",
              key: "mobile",
              align: "center",
            },
            {
              title: "电子邮箱",
              key: "email",
              align: "center",
            },
            {
              title: "状态",
              key: "status",
              align: "center",
              render: (h, params) => {
                let that = this;
                var data = params.row;
                var ststus = "status_" + data.status;
                var texts = that.statusData[ststus];
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
              title: "创建时间",
              key: "gmt_create",
              align: "center",
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
          // 验证规则
          rulePhoneFrom:{
            mobile: [
              {required: true, message: '手机号不能为空', trigger: 'blur'},
              {pattern: '^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\\d{8}$', message: '请输入正确的手机号',trigger: 'blur' },
              {type: 'number', trigger: 'blur',message: '请输入'},
            ],
            nickname:[
              {required: true, message: '昵称不能为空', trigger: 'blur'},
              {pattern: '^[a-zA-Z]{1,35}$', message: '昵称输入有误',trigger: 'blur' },
            ],
            email: [
              { required: true, message: '邮箱不能为空', trigger: 'blur' },
              { type: 'email', message: '不正确的电子邮件格式', trigger: 'blur' }
            ],
            user_name: [
              { required: true, message: '用户名不能为空', trigger: 'blur' },
              {pattern: '^[a-zA-Z]{1,35}$', message: '用户名输入有误',trigger: 'blur' },
            ],
          },
          // 搜索表单
          formDatas:{
            userType:'',
            userAccount:'',
            keyword:''
          }

        };
      },
      methods: {
        // 查内容
        getTableData(){
          Api.getUserList({
            keyword:this.userTypeModel,
            page:this.page.page,
            limit:this.page.limit
          }).then(res=>{
            console.log(res)
            this.tableData = res.data.data
            console.log(this.tableData)
          }).catch(error => {
            console.log('错误');
          })
        },
        // 分页
        pageChange(page) {
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
          var messages = [msg,'管理员']
          this.$root.Bus.$emit("Modify-click",messages)
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
          this.formDatas = {
            userType:'',
            userAccount:'',
            keyword:''
          };
        },
        // 搜索函数
        conditionsStart(){
          var that = this;
          Api.getUserList(this.$options.methods.formData(that)).then(res=>{
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
            userType:that.formDatas.userType,
            userAccount:that.formDatas.userAccount,
            keyword:that.formDatas.keyword
          }
          return queryInfo;
        },
        // 刷新函数
        rold(){
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
