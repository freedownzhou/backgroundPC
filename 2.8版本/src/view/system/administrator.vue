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
<!--      创建弹出层-->
      <Modal class="ws-modal qs" v-model="createModel.show" class-name="vertical-center-modal" @on-cancel="handleReset('userFrom')">
        <div slot="header" class="fs18">
          创建管理员
        </div>
        <div class="modal-content creatmodel">
          <div class="minH">
            <!--        创建管理员-->
            <Form :rules="rulePhoneFrom" :model="userFrom" class="pl30 pr30 pt20" :label-width="80" ref="userFrom">
              <FormItem label="用户账户" prop="userAccount">
                <Input v-model="userFrom.userAccount"></Input><p class="WenZi">字母+数字组合（6-20位）</p>
              </FormItem>
              <FormItem label="用户名" prop="userName">
                <Input v-model="userFrom.userName"></Input><p class="WenZi">2到15个中文字</p>
              </FormItem>
              <FormItem label="昵称" prop="nickname">
                <Input v-model="userFrom.nickname"></Input><p class="WenZi">最多35个字符</p>
              </FormItem>
              <FormItem label="密码" prop="userPwd" class=" ivu-form-item-required">
                <Input type="password" v-model="userFrom.userPwd"></Input><p class="WenZi">字母+数字组合（6-20位）</p>
              </FormItem>
              <FormItem label="确认密码" prop="user_pwdAgin" class=" ivu-form-item-required">
                <Input type="password" v-model="userFrom.user_pwdAgin"></Input>
              </FormItem>
              <FormItem class="no-margin-b" prop="mobile" label="手机号">
                <Input type="text" v-model="userFrom.mobile" style="width:250px"/>
              </FormItem>
              <br>
              <FormItem label="电子邮箱" prop="email">
                <Input v-model="userFrom.email" placeholder="输入邮箱"></Input>
              </FormItem>
              <FormItem label="用户类型">
                <RadioGroup v-model="userFrom.userType">
                  <Radio label="1">平台管理员</Radio>
                  <Radio label="2">渠道</Radio>
                  <Radio label="3">业务管理员</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="账号类型">
                <RadioGroup v-model="userFrom.accountType">
                  <Radio label="1">正式账号</Radio>
                  <Radio label="2">测试账号</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="权限类型">
                <RadioGroup v-model="userFrom.powerType">
                  <Radio label="0">无权限</Radio>
                  <Radio label="1">角色权限</Radio>
                  <Radio label="2">自定义权限</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="身份状态">
                <RadioGroup v-model="userFrom.status">
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
            <a class="ws-confirm-btn" @click="modalConfirmBtn('userFrom')" :style="{marginRight:'10px'}">确定</a>
            <a class="ws-cancel-btn" @click="handleReset('userFrom')">取消</a>
          </div>
        </div>
      </Modal>
<!--      下面是注册弹出层，先注释-->
<!--      <Models></Models>-->
      <!--      这是管理弹出层-->
      <Modal class="ws-modal" v-model="createModel.Modifyshow" class-name="vertical-center-modal" @on-cancel="handleResetModify('userFromBj')">
        <div slot="header" class="fs18">
          编辑
        </div>
        <div class="modal-content creatmodel">
          <!--        编辑管理员-->
          <div>
            <Form :rules="rulePhoneFromBj" :model="userFromBj" class="pl30 pr30" :label-width="80" ref="userFromBj">
              <FormItem label="用户ID" prop="id">
                <Input v-model="userFromBj.id" disabled></Input>
              </FormItem>
              <FormItem label="用户名" prop="user_name">
                <Input v-model="userFromBj.user_name"></Input><p class="WenZi">2到15个中文字</p>
              </FormItem>
              <FormItem label="昵称" prop="nickname">
                <Input v-model="userFromBj.nickname"></Input><p class="WenZi">最多35个字符</p>
              </FormItem>
              <FormItem label="电子邮箱" prop="email">
                <Input v-model="userFromBj.email" placeholder="输入邮箱"></Input>
              </FormItem>
              <FormItem class="no-margin-b" prop="mobile" label="手机号">
                <Input type="text" v-model="userFromBj.mobile" style="width:250px"/>
              </FormItem><br/>
              <FormItem label="平台编码" prop="platform_code">
                <Input v-model="userFromBj.platform_code" :placeholder='userFromBj.platform_code' disabled></Input>
              </FormItem>
              <FormItem label="用户类型">
                <RadioGroup v-model="userFromBj.user_type">
                  <Radio label="1">平台管理员</Radio>
                  <Radio label="2">渠道</Radio>
                  <Radio label="3">业务管理员</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="账号类型">
                <RadioGroup v-model="userFromBj.account_type">
                  <Radio label="1">正式账号</Radio>
                  <Radio label="2">测试账号</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="权限类型">
                <RadioGroup v-model="userFromBj.power_type">
                  <Radio label="0">无权限</Radio>
                  <Radio label="1">角色权限</Radio>
                  <Radio label="2">自定义权限</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="身份状态">
                <RadioGroup v-model="userFromBj.status">
                  <Radio label="0">禁用</Radio>
                  <Radio label="1">启用</Radio>
                  <Radio label="2">冻结</Radio>
                  <Radio label="3">失效</Radio>
                </RadioGroup>
              </FormItem>
              <!--            <FormItem label="密码" prop="user_pwd">-->
              <!--              <Input type="password" v-model="userFrom.user_pwd"></Input><p class="WenZi">字母+数字组合（6-20位）</p>-->
              <!--            </FormItem>-->
              <!--            <FormItem label="确认密码" prop="user_pwdAgin">-->
              <!--              <Input type="password" v-model="userFrom.user_pwdAgin"></Input>-->
              <!--            </FormItem>-->
            </Form>
          </div>
        </div>
        <div slot="footer" class="clearfix">
          <div class="pull-right clearfix">
            <a class="ws-confirm-btn" @click="modifyConfirmBtn('userFromBj')" :style="{marginRight:'10px'}">确定</a>
            <a class="ws-cancel-btn" @click="handleResetModify('userFromBj')">取消</a>
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
        // 密码验证
        const validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            let patrn=/^(\w){6,20}$/;
            if (!patrn.exec(value)) {
              callback(new Error('密码格式错误'));
            }
            callback();
          }
        };
        const validatePassCheck = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请确认您的密码'));
          } else if (value !== this.userFrom.userPwd) {
            callback(new Error('2次输入密码不一致!'));
          } else {
            callback();
          }
        };
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
            Modifyshow:false,
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
          },
          // 创建管理员表内容
          userFrom:{
            user_pwdAgin:'',//确认密码
            userAccount: '',  // 用戶账号
            userType:'1',//用户类型1：平台管理员、2：渠道、3：业务员
            accountType:'1',//账号类型,1正式账号，2测试账号
            powerType:'1',//权限类型：0：无权限 、1：角色权限、2：自定义权限
            mobile:"",//手机号
            userPwd:'',//密码
            userName:'', //用户名称
            nickname:'',//昵称
            email:'',
            status:'1'   //用户身份状态（0：禁用 、1：启用、2：冻结、3：失效）
          },
          // 创建管理员规则
          rulePhoneFrom:{
            userAccount:[
              {required: true, message: '账户不能为空', trigger: 'blur'},
              {pattern: '^[a-zA-Z]([-_a-zA-Z0-9]{6,20})$', message: '昵称输入有误',trigger: 'blur' },
            ],
            mobile: [
              {required: true, message: '手机号不能为空', trigger: 'blur'},
              {pattern: '^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\\d{8}$', message: '请输入正确的手机号',trigger: 'blur' },
            ],
            nickname:[
              {pattern: '^([\u4E00-\\uFA29]|[\\uE7C7-\\uE7F3]|[a-zA-Z0-9_]){1,35}$', message: '昵称输入有误',trigger: 'blur' },
            ],
            email: [
              { type: 'email', message: '不正确的电子邮件格式', trigger: 'blur' }
            ],
            userName: [
              { required: true, message: '用户名不能为空', trigger: 'blur' },
              {pattern: '^[\u4e00-\u9fa5]{2,15}$', message: '用户名输入有误',trigger: 'blur' },
            ],
            userPwd: [
              { validator: validatePass, trigger: 'blur',type:'string' },
            ],
            user_pwdAgin: [
              { validator: validatePassCheck, trigger: 'blur',type:'string' },
            ],
          },
          // 编辑管理员表内容
          userFromBj:{
            id: '',  // 用戶账号
            user_type:'1',//用户类型1：平台管理员、2：渠道、3：业务员
            account_type:'1',//账号类型,1正式账号，2测试账号
            power_type:'1',//权限类型：0：无权限 、1：角色权限、2：自定义权限
            mobile:'',//手机号
            user_account:'',//用户账号
            user_pwd:'',//密码
            user_pwdAgin:'',//确认密码
            user_name:'', //用户名称
            nickname:'',//昵称
            platform_code:'aaaaaaaaaaaaaa',//平台编码，不能改动
            email:'',
            status:'1'   //用户身份状态（0：禁用 、1：启用、2：冻结、3：失效）
          },
          // 編輯管理员规则
          rulePhoneFromBj:{
            mobile: [
              {required: true, message: '手机号不能为空', trigger: 'blur'},
              {pattern: '^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\\d{8}$', message: '请输入正确的手机号',trigger: 'blur' },
              // {type: 'number', trigger: 'blur',message: '请输入正确的手机号'},
            ],
            nickname:[
              {required: true, message: '昵称不能为空', trigger: 'blur'},
              {pattern: '^([\u4E00-\\uFA29]|[\\uE7C7-\\uE7F3]|[a-zA-Z0-9_]){1,35}$', message: '昵称输入有误',trigger: 'blur' },
            ],
            id:[
              {required: true, message: '标识不能为空', trigger: 'blur'},
            ],
            email: [
              { required: true, message: '邮箱不能为空', trigger: 'blur' },
              { type: 'email', message: '不正确的电子邮件格式', trigger: 'blur' }
            ],
            user_name: [
              { required: true, message: '用户名不能为空', trigger: 'blur' },
              {pattern: '^[\u4e00-\u9fa5]{2,15}$', message: '用户名输入有误',trigger: 'blur' },
            ],
            // user_pwd: [
            //   { validator: validatePass, trigger: 'blur',type:'string' },
            // ],
            // user_pwdAgin: [
            //   { validator: validatePassCheck, trigger: 'blur',type:'string' },
            // ],
          },
        };
      },
      methods: {
        // 取消函数
        handleReset (name) {
          this.$refs[name].resetFields();
          this.createModel.show=false;
        },
        // 确定函数
        modalConfirmBtn(name){
          var that = this;
          this.$refs[name].validate((valid) => {
            if (valid) {
              var datas = that.userFrom;
              datas.userType = parseInt(datas.userType)
              datas.status = parseInt(datas.status)
              datas.powerType = parseInt(datas.powerType)
              datas.accountType = parseInt(datas.accountType)
              delete datas.user_pwdAgin
              Api.createUser(datas).then(res=>{
                console.log(res)
                if (res && res.code == 0) {
                  that.$Message.success("注册管理员成功，即将刷新");
                  console.log(res)
                  that.$refs.userFrom.resetFields();
                  that.createModel.show=false;
                }else {
                  that.$Message.error(res.msg ? res.msg : "注册失败");
                  that.$refs.userFrom.resetFields();
                  that.createModel.show=false;
                }
              })
            } else {
              this.$Message.error('表单验证未通过，请重新输入');
            }
          })},
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
          // this.$root.Bus.$emit("Modify-click",messages)

          var that = this;
          for(var p in messages[0]){
            if(that.userFromBj.hasOwnProperty(p)){
              that.userFromBj[p] = messages[0][p];
              that.userFromBj.user_type = that.userFromBj.user_type.toString()
              that.userFromBj.account_type = that.userFromBj.account_type.toString()
              that.userFromBj.power_type = that.userFromBj.power_type.toString()
              that.userFromBj.status = that.userFromBj.status.toString()
              that.userFromBj.id = that.userFromBj.id.toString()
              that.userFromBj.mobile = that.userFromBj.mobile.toString()
            }
          }
          this.createModel.Modifyshow = true;
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
        },
        // 管理确定函数
        modifyConfirmBtn(name){
          var that = this;
          this.$refs[name].validate((valid) => {
            if (valid) {
              var datas = {
                userType : parseInt(that.userFromBj.user_type),
                mobile : that.userFromBj.mobile,
                userPwd:  that.userFromBj.user_pwd,
                userId : parseInt(that.userFromBj.id),
                userName : that.userFromBj.user_name,
                nickname : that.userFromBj.nickname,
                email : that.userFromBj.email,
                status : parseInt(that.userFromBj.status),
                powerType : parseInt(that.userFromBj.power_type),
                accountType : parseInt(that.userFromBj.account_type),
              }
              Api.updateUser(datas).then(res=>{
                if (res && res.code == 0) {
                  that.$Message.success("修改管理员成功，即将刷新");
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
