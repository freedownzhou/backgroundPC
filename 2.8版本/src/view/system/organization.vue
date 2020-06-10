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
    <!--      下面是注册弹出层，先注释-->
<!--    <Models></Models>-->
    <!--      这是管理弹出层-->
    <Modal class="ws-modal" v-model="createModel.Modifyshow" class-name="vertical-center-modal" @on-cancel="handleResetModify('InstitutionsBj')">
      <div slot="header" class="fs18">
        编辑
      </div>
      <div class="modal-content creatmodel">
        <div>
          <Form :rules="ruleInstitutionsBj" :model="InstitutionsBj" class="pl30 pr30" :label-width="85" ref="InstitutionsBj">
            <FormItem label="机构名" prop="usergroup_name">
              <Input v-model="InstitutionsBj.usergroup_name"></Input><p class="WenZi">2到15个中文字</p>
            </FormItem>
            <FormItem label="负责人ID" prop="id">
              <Input v-model="InstitutionsBj.id"></Input>
            </FormItem>
            <FormItem label="机构编码" prop="organization_code">
              <Input v-model="InstitutionsBj.organization_code"></Input>
            </FormItem>
            <FormItem label="备注" prop="remarks">
              <Input v-model="InstitutionsBj.remarks" :placeholder='InstitutionsBj.remarks' type="textarea"></Input>
            </FormItem>
            <FormItem label="状态">
              <RadioGroup v-model="InstitutionsBj.status">
                <Radio label="0">禁用</Radio>
                <Radio label="1">启用</Radio>
                <Radio label="2">冻结</Radio>
                <Radio label="3">失效</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </div>
      </div>
      <div slot="footer" class="clearfix">
        <div class="pull-right clearfix">
          <a class="ws-confirm-btn" @click="modifyConfirmBtn('InstitutionsBj')" :style="{marginRight:'10px'}">确定</a>
          <a class="ws-cancel-btn" @click="handleResetModify('InstitutionsBj')">取消</a>
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

<!--    创建弹出层-->
    <Modal class="ws-modal qs" v-model="createModel.show" class-name="vertical-center-modal" @on-cancel="handleReset">
      <div slot="header" class="fs18">
        创建组织机构
      </div>
      <div class="modal-content creatmodel">
        <div class="minH">
          <Form :rules="ruleInstitutions" :model="Institutions" class="pl30 pr30 pt20" :label-width="85" ref="Institutions">
            <FormItem label="机构名" prop="userGroupName">
              <Input v-model="Institutions.userGroupName"></Input><p class="WenZi">2到15个中文字</p>
            </FormItem>
            <FormItem label="机构编码" prop="organizationCode">
              <Input v-model="Institutions.organizationCode"></Input>
            </FormItem>
            <FormItem label="备注" prop="remarks">
              <Input v-model="Institutions.remarks" :placeholder='Institutions.remarks' type="textarea"></Input>
            </FormItem>
            <FormItem label="状态">
              <RadioGroup v-model="Institutions.status">
                <Radio label="4">待审核</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </div>
      </div>
      <div slot="footer" class="clearfix">
        <div class="pull-right clearfix">
          <a class="ws-confirm-btn" @click="modalConfirmBtns('Institutions')" :style="{marginRight:'10px'}">确定</a>
          <a class="ws-cancel-btn" @click="handleReset()">取消</a>
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
        createModel: {
          Modifyshow:false,
          show: false,
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
            title: "登录账号",
            key: "usergroup_account",
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
        //创建用户组表内容
        Institutions:{
          // parentId:'',       //用户组父id
          userGroupName:'',    //用户组名
          organizationCode:'',   //机构编码
          // leaderUserId:'',  //机构负责人用户id
          remarks:'',     //备注
          status:'4',     //状态（0：禁用 、1：启用、2：冻结、3：失效）
        },
        //创建表单规则
        ruleInstitutions:{
          role_name:[
            {required: true, message: '名称不能为空', trigger: 'blur'},
            {pattern: '^([\u4E00-\\uFA29]|[\\uE7C7-\\uE7F3]|[a-zA-Z0-9_]){2,30}$', message: '机构名输入有误',trigger: 'blur' },
          ],
          remarks:[
            {required: true, message: '备注不能为空', trigger: 'blur'},
          ],
          // leaderUserId:[
          //   {required: true, message: '负责人id不能为空', trigger: 'blur'},
          //   {pattern: '^[0-9]{1,20}$', message: '只能输入数字，最多20位',trigger: 'blur' },
          // ],
          organizationCode:[
            {required: true, message: '机构编码不能为空', trigger: 'blur'},
          ],
          userGroupName:[
            {required: true, message: '用户组名不能为空', trigger: 'blur'},
          ],
          // parentId:[
          //   {required: true, message: '用户组父ID不能为空', trigger: 'blur'},
          //   {pattern: '^[0-9]{1,20}$', message: '只能输入数字，最多20位',trigger: 'blur' },
          // ],
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
        //管理组织机构表内容
        InstitutionsBj:{
          usergroup_name:'',    //用户组名
          organization_code:'',   //机构编码
          id:'',  //机构负责人用户id
          level:'',         //级别
          remarks:'',     //备注
          status:'1',     //状态（0：禁用 、1：启用、2：冻结、3：失效）
        },
        // 编辑组织机构规则
        ruleInstitutionsBj:{
          usergroup_name:[
            {required: true, message: '名称不能为空', trigger: 'blur'},
            {pattern: '^([\u4E00-\\uFA29]|[\\uE7C7-\\uE7F3]|[a-zA-Z0-9_]){2,30}$', message: '机构名输入有误',trigger: 'blur' },
          ],
          remarks:[
            {required: true, message: '备注不能为空', trigger: 'blur'},
          ],
          id:[
            {required: true, message: '负责人id不能为空', trigger: 'blur'},
            {pattern: '^[0-9]{1,20}$', message: '只能输入数字，最多20位',trigger: 'blur' },
          ],
          organization_code:[
            {required: true, message: '机构编码不能为空', trigger: 'blur'},
          ],
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
        // this.$root.Bus.$emit("Modify-click",messages)

        var that = this;
        for(var p in messages[0]){
          if(that.InstitutionsBj.hasOwnProperty(p)){
            that.InstitutionsBj[p] = messages[0][p];
            that.InstitutionsBj.status = that.InstitutionsBj.status.toString();
            that.InstitutionsBj.id = that.InstitutionsBj.id.toString();
          }
        }
        this.createModel.Modifyshow = true;
      },
      //权限按钮
      permissionsBtn(msg){
        var messages = [msg,'组织机构']
        // this.$root.Bus.$emit("Permissions-click",messages)
        this.createModel.treePermissions = true;
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
      },
      // 取消函数
      handleReset () {
        this.$refs.Institutions.resetFields();
        this.createModel.show=false;
      },
      // 管理确定函数
      modifyConfirmBtn(name){
        var that = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            Api.updateUserGroup({
              usergroup_name:that.InstitutionsBj.usergroup_name,
              organization_code:that.InstitutionsBj.organization_code,
              userGroupId:parseInt(that.InstitutionsBj.id),
              remarks:that.InstitutionsBj.remarks,
              status:parseInt(that.InstitutionsBj.status),
            }).then(res=>{
              if (res && res.code == 0) {
                that.$Message.success("修改用户组成功，即将刷新");
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
      modalConfirmBtns(name){
        var that = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            var datas = that.Institutions;
            datas.status = parseInt(datas.status);
            console.log(datas)
            Api.createUserGroup(datas).then(res=>{
              if (res && res.code == 0) {
                that.$Message.success("注册组织机构成功，即将刷新");
                console.log(res)
                that.$refs.Institutions.resetFields();
                that.getTableData();
                that.createModel.show=false;
              }else {
                that.$Message.error(res.msg ? res.msg : "注册失败");
                that.$refs.Institutions.resetFields();
                that.createModel.show=false;
              }
            })
          } else {
            this.$Message.error('表单验证未通过，请重新输入');
          }
        })
      }
    },
    created() {
      this.getTableData();
      // Api.getLeaderUserList().then(res=>{
      //       console.log(res)
      //   this.headPeople = res.data.data
      //     }).catch(error => {
      //       console.log('查负责人错误');
      //     })
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
