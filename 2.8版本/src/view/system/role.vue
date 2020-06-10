<template>
    <div class="mix-page list-page box-shadow">
    <h4 class="title-bar clearfix">
      <p class="title pull-left">角色列表</p>
      <div class="extra pull-right">
        <a class="clearfix pl5 pr5 theme-btn-color pull-left lh18"  @click="ModelType">
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
<!--      下面是创建弹出层-->
      <Modal class="ws-modal qs" v-model="createModel.show" class-name="vertical-center-modal" @on-cancel="handleReset('RoleFrom')">
        <div slot="header" class="fs18">
          创建角色
        </div>
        <div class="modal-content creatmodel">
          <div class="minH">
            <Form :rules="ruleRole" :model="RoleFrom" class="pl30 pr30 pt20" :label-width="80" ref="RoleFrom">
              <FormItem label="角色名称" prop="role_name">
                <Input v-model="RoleFrom.role_name"></Input><p class="WenZi">2到12个中文字</p>
              </FormItem>
              <FormItem label="状态">
                <RadioGroup v-model="RoleFrom.status">
                  <Radio label="0">失效</Radio>
                  <Radio label="1">有效</Radio>
                </RadioGroup>
              </FormItem>
            </Form>
          </div>
        </div>
        <div slot="footer" class="clearfix">
          <div class="pull-right clearfix">
            <a class="ws-confirm-btn" @click="modalConfirmBtn('RoleFrom')" :style="{marginRight:'10px'}">确定</a>
            <a class="ws-cancel-btn" @click="handleReset('RoleFrom')">取消</a>
          </div>
        </div>
      </Modal>
      <!--      下面是注册弹出层，先注释-->
<!--      <Models></Models>-->
      <!--      这是管理弹出层-->
      <Modal class="ws-modal" v-model="createModel.Modifyshow" class-name="vertical-center-modal" @on-cancel="handleResetModify('RoleFromBj')">
        <div slot="header" class="fs18">
          编辑
        </div>
        <div class="modal-content creatmodel">
          <!--        编辑角色-->
          <div>
            <Form :rules="ruleRoleBj" :model="RoleFromBj" class="pl30 pr30" :label-width="80" ref="RoleFromBj">
              <FormItem label="角色名称" prop="role_name">
                <Input v-model="RoleFromBj.role_name"></Input><p class="WenZi">2到12个中文字</p>
              </FormItem>
              <FormItem label="ID" prop="id">
                <Input v-model="RoleFromBj.id" disabled></Input>
              </FormItem>
              <FormItem label="状态">
                <RadioGroup v-model="RoleFromBj.status">
                  <Radio label="0">失效</Radio>
                  <Radio label="1">有效</Radio>
                </RadioGroup>
              </FormItem>
            </Form>
          </div>
        </div>
        <div slot="footer" class="clearfix">
          <div class="pull-right clearfix">
            <a class="ws-confirm-btn" @click="modifyConfirmBtn('RoleFromBj')" :style="{marginRight:'10px'}">确定</a>
            <a class="ws-cancel-btn" @click="handleResetModify('RoleFromBj')">取消</a>
          </div>
        </div>
      </Modal>
      <ModifyModels></ModifyModels>
      <!--      权限弹出层-->
      <Modal class="ws-modal" v-model="createModel.treePermissions" class-name="vertical-center-modal" :mask-closable="false">
        <div slot="header" class="fs18">
          编辑角色权限
        </div>
        <Tree :data="data4" show-checkbox multiple></Tree>
        <div slot="footer" class="clearfix">
          <div class="pull-right clearfix">
            <a class="ws-confirm-btn" @click="treeConfirmBtn" :style="{marginRight:'10px'}">确定</a>
            <a class="ws-cancel-btn" @click="treeReset">取消</a>
          </div>
        </div>
      </Modal>
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
          // 创建角色表内容
          RoleFrom:{
            role_name:'',    //角色名字
            status:'1'     //状态（0：失效 、1：有效）
          },
          // 创建菜单表内容
          MenuFrom:{
            menu_name:'', //菜单名称
            menu_url:'',  //菜单url
            menu_type:'1', //菜单类型（1：导航菜单，2：子页面菜单）
            // level:1,     //级别
            is_show:'1',   //是否显示菜单（0：否、1：是）
            status:'1'     //状态（0：失效 、1：有效）
          },
          // 创建角色规则
          ruleRole:{
            role_name:[
              {required: true, message: '名称不能为空', trigger: 'blur'},
              {pattern: '^([\u4E00-\\uFA29]|[\\uE7C7-\\uE7F3]|[a-zA-Z0-9_]){2,30}$', message: '菜单名称输入有误',trigger: 'blur' },
            ],
          },
          createModel: {
            show: false,
            Modifyshow:false,
            treePermissions:false,
            title:''
          },
          // 树形数据
          data4: [
            {
              title: '用户管理',
              expand: false,
              selected: false,
              children: [
                {title: '会员用户', expand: true,children:[]},
                {title: '企业用户', expand: true,children:[]}
              ]}, {
              title: '产品管理',
              expand: false,
              selected: false,
              children: [
                {title: '企业产品', expand: true,children:[]},
                {title: '个人产品', expand: true,children:[]},
              ]},
            {
              title: '订单管理',
              expand: false,
              selected: false,
              children: [
                {title: '订单领取', expand: false, children: [
                    {
                      title: 'leaf 1-1-1',
                      disabled: true
                    },
                    {
                      title: 'leaf 1-1-2'
                    }
                  ]},
                {title: '录单', expand: true,children:[]},
                {title: '批单', expand: true,children:[]},
                {title: '人员清单', expand: true, children: [
                    {
                      title: 'leaf 1-2-1',
                      checked: true
                    },
                    {
                      title: 'leaf 1-2-1'
                    }
                  ]},
                {title: '所有订单', expand: true, children: [
                    {
                      title: 'leaf 1-2-1',
                      checked: true
                    },
                    {
                      title: 'leaf 1-2-1'
                    }
                  ]},
                {title: '所有批单', expand: true, children: [
                    {
                      title: 'leaf 1-2-1',
                      checked: true
                    },
                    {
                      title: 'leaf 1-2-1'
                    }
                  ]},
              ]
            },{
              title: '系统管理',
              expand: false,
              selected: false,
              children: [
                {title: '管理员', expand: true, children: [
                    {
                      title: 'leaf 1-1-1',
                      disabled: true
                    },
                    {
                      title: 'leaf 1-1-2'
                    }
                  ]},
                {title: '菜单', expand: true, children: [
                    {
                      title: 'leaf 1-2-1',
                      checked: true
                    },
                    {
                      title: 'leaf 1-2-1'
                    }]},
                {title: '角色', expand: true, children: [
                    {
                      title: 'leaf 1-2-1',
                      checked: true
                    },
                    {
                      title: 'leaf 1-2-1'
                    }
                  ]},
                {title: '组织机构', expand: true, children: [
                    {
                      title: 'leaf 1-2-1',
                      checked: true
                    },
                    {
                      title: 'leaf 1-2-1'
                    }
                  ]}
              ]
            },
          ],
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
          // 编辑角色表内容
          RoleFromBj:{
            id: '',     // ID
            role_name:'',    //角色名字
            status:'1'     //状态（0：失效 、1：有效）
          },
          // 編輯角色规则
          ruleRoleBj:{
            role_name:[
              {required: true, message: '名称不能为空', trigger: 'blur'},
              {pattern: '^([\u4E00-\\uFA29]|[\\uE7C7-\\uE7F3]|[a-zA-Z0-9_]){2,30}$', message: '菜单名称输入有误',trigger: 'blur' },
            ],
          },
        };
      },
      methods: {
        // tree权限确定函数
        treeConfirmBtn(){
          this.$router.go(0)
        },
        // tree权限取消函数
        treeReset () {
          this.createModel.treePermissions=false;
        },
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
          // this.$root.Bus.$emit("Modify-click",messages)

          var that = this;
          for(var p in messages[0]){
            if(that.RoleFromBj.hasOwnProperty(p)){
              that.RoleFromBj[p] = messages[0][p];
              that.RoleFromBj.status = that.RoleFromBj.status.toString()
            }
          }
          this.createModel.Modifyshow = true;
        },
        //权限按钮
        permissionsBtn(msg){
          var messages = [msg,'角色']
          // this.$root.Bus.$emit("Permissions-click",messages)
          this.createModel.treePermissions = true;
        },
        modalConfirmBtn(){

        },
        modalCancelBtn(){
          this.ejectModel.show = !this.ejectModel.show;
        },
        // 创建按钮函数
        ModelType(value){
          // this.$root.Bus.$emit("on-click",value)
          this.createModel.show = true;
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
        },
        // 确定函数
        modalConfirmBtn(name){
          var that = this;
          this.$refs[name].validate((valid) => {
            if (valid) {
              // 当是角色表时
              var datas = that.RoleFrom;
              Api.createRole(datas).then(res=>{
                if (res && res.code == 0) {
                  that.$Message.success("注册角色成功，即将刷新");
                  console.log(res)
                  that.$refs.RoleFrom.resetFields();
                  that.getTableData();
                  that.createModel.show=false;
                }else {
                  that.$Message.error(res.msg ? res.msg : "注册失败");
                  that.$refs.RoleFrom.resetFields();
                  that.createModel.show=false;
                }
              })
            } else {
              this.$Message.error('表单验证未通过，请重新输入');
            }
          })
        },
        // 取消函数
        handleReset (name) {
          this.$refs[name].resetFields();
          this.createModel.show=false;
        },
        // 管理确定函数
        modifyConfirmBtn(name){
          var that = this;
          this.$refs[name].validate((valid) => {
            if (valid) {
              Api.updateRole({
                roleId:that.RoleFromBj.id,
                role_name:that.RoleFromBj.role_name,
                status:that.RoleFromBj.status,
              }).then(res=>{
                if (res && res.code == 0) {
                  that.$Message.success("修改用户成功，即将刷新");
                  that.getTableData();
                  that.createModel.Modifyshow=false;
                }else {
                  that.$Message.error(res.msg ? res.msg : "修改失败");
                  that.createModel.Modifyshow=false;
                }
              })
            }else {
              this.$Message.error('表单验证未通过，请重新输入');
              return false;
            }
          })
        },
        // 管理取消函数
        handleResetModify (name) {
          console.log(name)
          this.$refs[name].resetFields();
          this.createModel.Modifyshow=false;
        },
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
  .minH{
    max-height: 420px;
    overflow: auto;

  }
  .WenZi{
    position: absolute;top: 2px;left: 160px;color: #7f7f7f;
  }
</style>
