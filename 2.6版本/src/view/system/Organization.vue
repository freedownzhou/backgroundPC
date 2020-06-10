<template>
  <div class="mix-page list-page box-shadow">
    <h4 class="title-bar clearfix">
      <p class="title pull-left">组织机构列表</p>
      <div class="extra pull-right">
        <a class="clearfix pl5 pr5 theme-btn-color pull-left lh18"  @click="ModelType('组织机构')">
          <i class="pull-left iconfont icon-addto fs14"></i>
          <p class="pull-left ml5 fs12">创建组织机构</p>
        </a>
        <a class="clearfix pl15 pr15 theme-btn-f7f pull-left lh18 ml10" @click="rold">
          <i class="pull-left iconfont icon-shuaxin fs12"></i>
          <p class="pull-left ml8 fs12">刷新</p>
        </a>
      </div>
    </h4>
    <div class="condition-bar pt15 pb15">
      <i-select v-model.sync="userTypeModel" style="width:160px" placeholder="请选择机构级别">
        <i-option v-for="(item,index) in 4" :value="item" :key="index">{{ item }}</i-option>
      </i-select>
      <Input v-model="conditions" style="width:160px;margin-left: 10px" placeholder="机构名字" />
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
    <!--    审核弹出层-->
    <Modal class="ws-modal" v-model="ejectModel.show" class-name="vertical-center-modal" :mask-closable="false">
      <div slot="header" class="fs18">
        {{ejectModel.title}}
      </div>
      <div class="modal-content">
        <Form :rules="ruleauditFrom" :model="auditFrom" class="pl30 pr30">
          <FormItem label="级别" prop="parent_id">
            <i-select v-model="auditFrom.parent_id" style="width: 150px" placeholder="选择负责人">
              <i-option v-for="(item,index) in headPeople" :value="item.userId" :key="index">{{ item.userName }}</i-option>
            </i-select>
          </FormItem>
          <FormItem label="状态">
            <RadioGroup v-model="auditFrom.status">
              <Radio label="0">禁用</Radio>
              <Radio label="1">启用</Radio>
              <Radio label="2">冻结</Radio>
              <Radio label="3">失效</Radio>
              <Radio label="4">待审核</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="clearfix">
        <div class="pull-right clearfix">
          <a class="ws-confirm-btn" @click="modalConfirmBtn" :style="{marginRight:'10px'}">确定</a>
          <a class="ws-cancel-btn" @click="modalCancelBtn()">取消</a>
        </div>
      </div>
    </Modal>
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
        statusData:{
          "status_0":"禁用",
          "status_1":"启用",
          "status_2":"冻结",
          "status_3":"失效",
          "status_4":"待审核",
        },
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
            title: "ID",
            key: "id",
            align: "center",
          },
          {
            title: "机构父id",
            key: "parent_id",
            align: "center",
          },
          {
            title: "组织名",
            key: "usergroup_name",
            align: "center",
          },
          {
            title: "级别",
            key: "level",
            align: "center",
          },
          {
            title: "机构编码",
            key: "organization_code",
            align: "center",
          },
          {
            title: "负责人ID",
            key: "leaderuser_id",
            align: "center",
          },
          {
            title: "备注",
            key: "remarks",
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
            width: 200,
            align: "center",
            render: (h, params) => {
              let that = this;
              var ststus = "status_" + params.row.status;
              var types = true
              if (that.statusData[ststus] == '待审核') { types = false; }
              return h("a", [
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "small",
                      disabled: !types
                    },
                    style:{
                      color: !types ? '' : '#ff6a00'
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
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "small",
                      disabled: types
                    },
                    style:{
                      color: types ? '' : '#ff6a00'
                    },
                    on: {
                      click: () => {
                        this.audit(params.row);
                      }
                    }
                  },
                  "审核"
                ),
              ]);
            }
          }
        ],
        ejectModel: {
          show: false,
          title:''
        },
        auditFrom:{
          input:'',
          status:'4',
          parent_id:','
        },
        ruleauditFrom:{
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
        //审核的数据来源
        AuditSJ:{},
        headPeople:[] //负责人
      };
    },
    methods: {
      // 查内容
      getTableData(){
        Api.getUserGroupList({
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
        var messages = [msg,'组织机构']
        this.$root.Bus.$emit("Modify-click",messages)
      },
      //权限按钮
      permissionsBtn(msg){
        var messages = [msg,'组织机构']
        this.$root.Bus.$emit("Permissions-click",messages)
      },
      // 审核按钮
      audit(msg){
        this.ejectModel.show = !this.ejectModel.show;
        this.AuditSJ = msg;
      },
      modalConfirmBtn(){
        var that = this;
        Api.updateUserGroup({
          userGroupId:parseInt(that.AuditSJ.id),  // 用户组ID
          status:parseInt(that.auditFrom.status),
          leaderuser_id:that.auditFrom.parent_id  //负责人ID
        }).then(res=>{
          if (res && res.code == 0) {
            that.$Message.success("修改用户组成功，即将刷新");
            that.getTableData();
            that.ejectModel.show=false;
          }else {
            that.$Message.error(res.msg ? res.msg : "修改失败");
            that.ejectModel.show=false;
          }
        })
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
        Api.getUserGroupList(this.$options.methods.formData(that)).then(res=>{
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
      Api.getLeaderUserList().then(res=>{
            console.log(res)
        this.headPeople = res.data.data
          }).catch(error => {
            console.log('查负责人错误');
          })
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
