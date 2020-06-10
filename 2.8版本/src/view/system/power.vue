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
<!--    下面是创建权限弹出层-->
    <Modal class="ws-modal qs" v-model="createModel.show" class-name="vertical-center-modal" @on-cancel="handleReset('permission')">
      <div slot="header" class="fs18">
        创建权限
      </div>
      <div class="modal-content creatmodel">
        <div class="minH">
          <Form :rules="rulePermissions" :model="permission" class="pl30 pr30 pt20" :label-width="80" ref="permission">
            <FormItem label="权限名称" prop="power_name">
              <Input v-model="permission.power_name"></Input><p class="WenZi">2到12个中文字</p>
            </FormItem>
            <FormItem label="权限描述" prop="power_describe">
              <Input v-model="permission.power_describe"></Input><p class="WenZi">长度2-125个字符</p>
            </FormItem>
            <FormItem label="权限编码" prop="power_code">
              <Input v-model="permission.power_code"></Input>
            </FormItem>
            <FormItem label="权限类型">
              <RadioGroup v-model="permission.power_type">
                <Radio label="1">菜单</Radio>
                <Radio label="2">功能按钮</Radio>
                <Radio label="3">文件</Radio>
                <Radio label="4">页面元素</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="状态">
              <RadioGroup v-model="permission.status">
                <Radio label="0">失效</Radio>
                <Radio label="1">有效</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </div>
      </div>
      <div slot="footer" class="clearfix">
        <div class="pull-right clearfix">
          <a class="ws-confirm-btn" @click="modalConfirmBtn('permission')" :style="{marginRight:'10px'}">确定</a>
          <a class="ws-cancel-btn" @click="handleReset('permission')">取消</a>
        </div>
      </div>
    </Modal>
    <!--      下面是注册弹出层,先注释-->
<!--    <Models></Models>-->
    <!--      下面是菜单权限弹出层-->
    <Modal class="ws-modal" v-model="createModel.permissionsShow" class-name="vertical-center-modal" @on-cancel="powerReset('Permission')" width="720">
      <div slot="header" class="fs18">
        {{createModel.title}}
      </div>
      <div class="modal-content creatmodel">
        <div class="ws-modal-tips-bar clearfix mb20">
          <i class="iconfont icon-sigh pull-left no-cursor"></i>
          <p class="pull-left ml10" style="width:90%">添加权限策略后，该菜单即具有该条策略的权限，同一条授权策略不能被重复添加。</p>
        </div>
        <Row type="flex" justify="space-between" class="code-row-bg AP_Row">
          <Col span="9" style="border: 1px solid #e1e6eb;height: 315px;overflow: auto;">
            <p class="row_p">创建权限策略</p>
            <div class="list_box" v-for="(item,index) in MenuPreview" :key="index" @click="chooseLeft(item,index)">
              <p class="ml10">{{item.Permission_name}}</p>
              <p class="ml10">{{item.AccessAccount}}</p>
            </div>
            <!--            <Form :rules="ruleMenu" :model="Permission" :label-width="80" ref="Permission" class="mt15">-->
            <!--              &lt;!&ndash;        创建菜单权限表&ndash;&gt;-->
            <!--              <div>-->
            <!--                <FormItem label="权限名称" prop="Permission_name" class="mt45">-->
            <!--                  <Input v-model="Permission.Permission_name"></Input><p class="WenZi">长度2到15个中文字</p>-->
            <!--                </FormItem>-->
            <!--                <FormItem label="权限编码" prop="AccessCode" class="mt45">-->
            <!--                  <Input v-model="Permission.AccessCode"></Input><p class="WenZi">输入1-25个大小写英文字母</p>-->
            <!--                </FormItem>-->
            <!--                <FormItem label="权限叙述" prop="AccessAccount" class="mt45 mb40"><p class="WenZi">长度最多225个字符</p>-->
            <!--                  <Input v-model="Permission.AccessAccount" placeholder="输入邮箱"></Input>-->
            <!--                </FormItem>-->
            <!--              </div>-->
            <!--              &lt;!&ndash;        创建菜单权限表结束&ndash;&gt;-->
            <!--            </Form>-->
          </Col>
          <Col span="4">
            <Row type="flex" justify="center"  align="middle" style="height: 100%;text-align: center;display: none;">
              <Col span="24"><Button type="primary" @click="creatMenuQ('Permission')">创建</Button></Col>
            </Row>
          </Col>
          <Col span="9" style="border: 1px solid #e1e6eb;height: 315px;overflow:auto">
            <p class="row_p" style="border-bottom: 1px solid #e1e6eb;">已创建权限策略</p>
            <div class="list_box" v-for="(item,index) in MenuContent" :key="index">
              <p class="ml10">{{item.Permission_name}}</p>
              <p class="ml10">{{item.AccessAccount}}</p>
              <Icon type="md-close-circle" class="icon-ps" @click="p_index=index;modal2=true;"/>
            </div>
          </Col>
        </Row>
      </div>
      <div slot="footer" class="clearfix">
        <div class="pull-right clearfix">
          <a class="ws-confirm-btn" @click="PowerConfirmBtn('Permission')" :style="{marginRight:'10px'}">确定</a>
          <a class="ws-cancel-btn" @click="powerReset('Permission')">取消</a>
        </div>
      </div>
    </Modal>
    <!--    确认删除弹出框-->
    <Modal v-model="modal2" width="360" class="sc_sure">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>是否确定删除此权限</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long  @click="del">删除</Button>
      </div>
    </Modal>
    <AccessPolicy></AccessPolicy>
    <!--      这是管理弹出层-->
    <Modal class="ws-modal" v-model="createModel.Modifyshow" class-name="vertical-center-modal" @on-cancel="handleResetModify('permissionBj')">
      <div slot="header" class="fs18">
        编辑
      </div>
      <div class="modal-content creatmodel">
        <div class="minH">
          <Form :rules="rulePermissionsBj" :model="permissionBj" class="pl30 pr30" :label-width="80" ref="permissionBj">
            <FormItem label="权限名称" prop="power_name">
              <Input v-model="permissionBj.power_name"></Input><p class="WenZi">2到12个中文字</p>
            </FormItem>
            <FormItem label="权限描述" prop="describe">
              <Input v-model="permissionBj.describe"></Input><p class="WenZi">长度2-125个字符</p>
            </FormItem>
            <FormItem label="权限类型">
              <RadioGroup v-model="permissionBj.power_type">
                <Radio label="1">菜单</Radio>
                <Radio label="2">功能按钮</Radio>
                <Radio label="3">文件</Radio>
                <Radio label="4">页面元素</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="平台编码" prop="platform_code">
              <Input v-model="permissionBj.platform_code" :placeholder='permissionBj.platform_code' disabled></Input>
            </FormItem>
            <FormItem label="权限编码" prop="power_code">
              <Input v-model="permissionBj.power_code" :placeholder='permissionBj.power_code'></Input>
            </FormItem>
            <FormItem label="状态">
              <RadioGroup v-model="permissionBj.status">
                <Radio label="0">失效</Radio>
                <Radio label="1">有效</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </div>
      </div>
      <div slot="footer" class="clearfix">
        <div class="pull-right clearfix">
          <a class="ws-confirm-btn" @click="modifyConfirmBtn('permissionBj')" :style="{marginRight:'10px'}">确定</a>
          <a class="ws-cancel-btn" @click="handleResetModify('permissionBj')">取消</a>
        </div>
      </div>
    </Modal>
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
        p_index:0,
        modal2:false,
        // 创建菜单权限表内容
        Permission:{
          Permission_name:'', //权限名称
          AccessCode:'',//权限编码
          AccessAccount:'',//权限叙述
        },
        //可以创建权限内容,通过接口获得
        MenuContent:[

        ],
        //创建菜单权限预览
        MenuPreview:[{Permission_name:'查询 【select】',AccessAccount:'用于查询企单（单票）发票开具信息',AccessCode:'ZZ'},{Permission_name:'查询2 【select】',AccessAccount:'用于查询5企单（单票）发票开具信息',AccessCode:'ZlZ'}],
        createModel: {
          show: false,
          Modifyshow:false,
          permissionsShow:false,
          title:''
        },
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
            title: "权限编码",
            key: "power_code",
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
        // 创建权限规则
        rulePermissions:{
          power_name:[
            {required: true, message: '名称不能为空', trigger: 'blur'},
            {pattern: '^([\u4E00-\\uFA29]|[\\uE7C7-\\uE7F3]|[a-zA-Z0-9_]){2,30}$', message: '权限名称输入有误',trigger: 'blur' },
          ],
          power_describe:[
            {required: true, message: '描述不能为空', trigger: 'blur'},
            {pattern: '^.{2,225}$', message: '描述输入有误',trigger: 'blur' },
          ],
          power_code:[
            {required: true, message: '权限编码不能为空', trigger: 'blur'},
          ],
        },
        //创建权限内容
        permission:{
          power_name:'',
          power_type:'4',
          power_describe:'',
          platform_code:'bbbbbbbbA',
          status:'1',
          power_code:'',
        },
        //编辑权限内容
        permissionBj:{
          powerId:'',
          power_name:'',
          power_type:'4',
          describe:'',
          platform_code:'',
          status:'1',
          power_code:'',
        },
        // 权限规则
        rulePermissionsBj:{
          power_name:[
            {required: true, message: '名称不能为空', trigger: 'blur'},
            {pattern: '^([\u4E00-\\uFA29]|[\\uE7C7-\\uE7F3]|[a-zA-Z0-9_]){2,30}$', message: '权限名称输入有误',trigger: 'blur' },
          ],
          describe:[
            {required: true, message: '描述不能为空', trigger: 'blur'},
            {pattern: '^.{2,225}$', message: '描述输入有误',trigger: 'blur' },
          ],
          power_code:[
            {required: true, message: '描述不能为空', trigger: 'blur'},
          ],
          platform_code:[
            {required: true, message: '编码不能为空', trigger: 'blur'},
            {pattern: '^[A-Za-z]{1,20}$', message: '编码输入有误',trigger: 'blur' },
          ]
        },
      };
    },
    methods: {
      // 权限确定函数
      PowerConfirmBtn(name){
        alert('调用接口');
        // var that = this;
        // Api.createUser(that.userFrom).then(res=>{
        //   console.log(res)
        //   if (res && res.code == 0) {
        //     that.$Message.success("注册管理员成功，即将刷新");
        //     that.reload();
        //   }else {
        //     that.$Message.error(res.msg ? res.msg : "注册失败");
        //     that.$refs.from1.resetFields();
        //     that.createModel.show=false;
        //   }
        // })
      },
      powerReset (name) {
        // this.$refs[name].resetFields();
        this.createModel.permissionsShow=false;
      },
      //创建菜单权限函数
      creatMenuQ(name){
        let that =this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            // 判断是否已经有重复的权限
            // let pd =  this.MenuPreview.some( item => {console.log(item.AccessCode)});
            let pd =  this.MenuPreview.some( item => {
              console.log(item)
              return item.AccessCode === that.Permission.AccessCode||item.Permission_name === that.Permission.Permission_name});
            alert(pd)
            if (pd){
              this.$Message.error('有匹配到已有重复的权限，无法添加');
            }else {
              this.MenuPreview.push(this.Permission)
            }
          } else {
            this.$Message.error('表单验证未通过，请重新输入');
          }
        })
      },
      // 确认删除该权限
      del(){
        this.modal2 = false;
        console.log(this.MenuPreview[this.p_index])
        this.MenuContent.splice(this.p_index,1);
      },
      //左边权限点击事件
      chooseLeft(item,index){
        console.log(item)
        var hasPower = this.MenuContent.includes(item);
        if (hasPower) {
          this.$Message.error('有匹配到已有重复的权限，无法添加');
          return false;
        }else {
          this.MenuContent.push(item);
        }
        // this.MenuPreview.splice(index,1);
      },
      // 确定函数
      modalConfirmBtn(name){
        var that = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            // 当是权限表时
            that.permission.status = parseInt(that.permission.status)
            that.permission.power_type = parseInt(that.permission.power_type)
            Api.createPower(that.permission).then(res=>{
              if (res && res.code == 0) {
                that.$Message.success("创建权限成功，即将刷新");
                console.log(res)
                that.$refs.permission.resetFields();
                that.getTableData();
                that.createModel.show=false;
              }else {
                that.$Message.error(res.msg ? res.msg : "注册失败");
                that.$refs.permission.resetFields();
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
        // this.$root.Bus.$emit("Modify-click",messages)

        var that = this;
        for(var p in messages[0]){
          that.permissionBj.describe = messages[0].power_describe;
          that.permissionBj.powerId = messages[0].id;
          if(that.permissionBj.hasOwnProperty(p)){
            that.permissionBj[p] = messages[0][p];
            that.permissionBj.power_type = that.permissionBj.power_type.toString();
            that.permissionBj.status = that.permissionBj.status.toString();
          }
        }
        this.createModel.Modifyshow = true;
      },
      modalCancelBtn(){
        this.ejectModel.show = !this.ejectModel.show;
      },
      //菜单权限按钮事件
      MenuPermissions(value){
        // this.$root.Bus.$emit("MenuP-click",value)

        this.createModel.permissionsShow = true;
        this.createModel.title = '编辑菜单权限策略'
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
      },

      // 管理确定函数
      modifyConfirmBtn(name){
        var that = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            that.permissionBj.status = parseInt(that.permissionBj.status)
            that.permissionBj.power_type = parseInt(that.permissionBj.power_type)
            console.log(that.permissionBj)
            Api.updatePower(that.permissionBj).then(res=>{
              if (res && res.code == 0) {
                that.$Message.success("修改权限成功，即将刷新");
                console.log(res)
                that.$refs.permissionBj.resetFields();
                that.getTableData();
                that.createModel.Modifyshow=false;
              }else {
                that.$Message.error(res.msg ? res.msg : "修改失败");
                that.$refs.permissionBj.resetFields();
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
  .icon-ps{
    position: absolute;
    right: 8px;
    top: 25px;
    font-size: 13px;
    cursor: pointer;
  }
  .list_box{
    border-bottom: 1px solid #e1e6eb;
    min-height: 54px;
    padding: 10px;
    color: #495060;
    position: relative;
  }
  .row_p{
    height: 40px;
    line-height: 40px;
    background-color: #f5f6fa;
    text-indent: 10px;
    font-size: 12px;
  }
</style>
