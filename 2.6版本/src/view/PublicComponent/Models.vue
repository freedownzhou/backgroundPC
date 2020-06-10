<template>
<div>
  <Modal class="ws-modal qs" v-model="createModel.show" class-name="vertical-center-modal" @on-cancel="handleReset(FromName)">
    <div slot="header" class="fs18">
      {{createModel.title}}
    </div>
    <div class="modal-content creatmodel">
      <div v-if="ModelType == '管理员'" class="minH">
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
<!--        创建管理员结束-->
<!--        创建菜单-->
        <div v-if="ModelType == '菜单'" class="minH">
          <Form :rules="ruleMenu" :model="MenuFrom" class="pl30 pr30 pt20" :label-width="80" ref="MenuFrom">
            <FormItem label="名称" prop="menu_name">
              <Input v-model="MenuFrom.menu_name"></Input><p class="WenZi">2到12个中文字</p>
            </FormItem>
            <FormItem label="菜单路径" prop="menu_url">
              <Input v-model="MenuFrom.menu_url"></Input><p class="WenZi">长度2-125个字符</p>
            </FormItem>
<!--            <FormItem label="级别" prop="level">-->
<!--              <i-select v-model.sync="MenuFrom.level" style="width:160px" placeholder="请选择机构级别">-->
<!--                <i-option v-for="(item,index) in 4" :value="item" :key="index">{{ item }}</i-option>-->
<!--              </i-select>-->
<!--            </FormItem>-->
            <FormItem label="菜单类型">
              <RadioGroup v-model="MenuFrom.menu_type">
                <Radio label="1">导航菜单</Radio>
                <Radio label="2">子页面菜单</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="是否显示">
              <RadioGroup v-model="MenuFrom.is_show">
                <Radio label="0">否</Radio>
                <Radio label="1">是</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="状态">
              <RadioGroup v-model="MenuFrom.status">
                <Radio label="0">失效</Radio>
                <Radio label="1">有效</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </div>
<!--        创建菜单结束-->
<!--        创建角色-->
        <div v-if="ModelType == '角色'" class="minH">
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
      <!--        创建角色结束-->
      <!--        创建组织机构-->
      <div v-if="ModelType == '组织机构'" class="minH">
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
      <!--        创建组织机构结束-->
      <!--      创建权限机构-->
      <div v-if="ModelType == '权限'" class="minH">
        <Form :rules="rulePermissions" :model="permission" class="pl30 pr30 pt20" :label-width="80" ref="permission">
          <FormItem label="权限名称" prop="power_name">
            <Input v-model="permission.power_name"></Input><p class="WenZi">2到12个中文字</p>
          </FormItem>
          <FormItem label="权限描述" prop="power_describe">
            <Input v-model="permission.power_describe"></Input><p class="WenZi">长度2-125个字符</p>
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
      <!--        创建权限结束-->
    </div>
    <div slot="footer" class="clearfix">
      <div class="pull-right clearfix">
        <a class="ws-confirm-btn" @click="modalConfirmBtn(FromName)" :style="{marginRight:'10px'}">确定</a>
        <a class="ws-cancel-btn" @click="handleReset(FromName)">取消</a>
      </div>
    </div>
  </Modal>
</div>
</template>

<script>
  import Api from "../../lib/api";
    export default {
      inject:['getTableData'],
        name: "Models",
      data(){
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
          return{
            FromName:'',
            ModelType:'',
            createModel: {
              show: false,
              title:''
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
            // 创建菜单规则
            ruleMenu:{
              menu_name:[
                {required: true, message: '名称不能为空', trigger: 'blur'},
                {pattern: '^([\u4E00-\\uFA29]|[\\uE7C7-\\uE7F3]|[a-zA-Z0-9_]){2,30}$', message: '菜单名称输入有误',trigger: 'blur' },
              ],
              menu_url:[
                {required: true, message: '路径不能为空', trigger: 'blur'},
                {pattern: '^[A-Za-z0-9_\\-/]{2,125}$', message: '路径输入有误',trigger: 'blur' },
              ],
            },
            // 创建角色规则
            ruleRole:{
              role_name:[
                {required: true, message: '名称不能为空', trigger: 'blur'},
                {pattern: '^([\u4E00-\\uFA29]|[\\uE7C7-\\uE7F3]|[a-zA-Z0-9_]){2,30}$', message: '菜单名称输入有误',trigger: 'blur' },
              ],
            },
            // 创建用户组规则
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
            // 创建菜单表内容
            MenuFrom:{
              menu_name:'', //菜单名称
              menu_url:'',  //菜单url
              menu_type:'1', //菜单类型（1：导航菜单，2：子页面菜单）
              // level:1,     //级别
              is_show:'1',   //是否显示菜单（0：否、1：是）
              status:'1'     //状态（0：失效 、1：有效）
            },
            // 创建角色表内容
            RoleFrom:{
              role_name:'',    //角色名字
              status:'1'     //状态（0：失效 、1：有效）
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
            //创建权限内容
            permission:{
              power_name:'',
              power_type:'4',
              power_describe:'',
              platform_code:'bbbbbbbbA',
              status:'1',
            }
          }
      },
      methods:{
          // 确定函数
        modalConfirmBtn(name){
          var that = this;
          this.$refs[name].validate((valid) => {
            if (valid) {
              // 当是管理员表时
              if (this.FromName === 'userFrom') {
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
                // 当是角色表时
              }else if (this.FromName === 'RoleFrom') {
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
              }else if (this.FromName === 'MenuFrom'){
                // 当是菜单表时
                var datas = that.MenuFrom;
                datas.menu_type = parseInt(datas.menu_type)
                datas.is_show = parseInt(datas.is_show)
                datas.status = parseInt(datas.status)
                Api.createMenu(datas).then(res=>{
                  if (res && res.code == 0) {
                    that.$Message.success("注册角色成功，即将刷新");
                    console.log(res)
                    that.$refs.MenuFrom.resetFields();
                    that.getTableData();
                    that.createModel.show=false;
                  }else {
                    that.$Message.error(res.msg ? res.msg : "注册失败");
                    that.$refs.MenuFrom.resetFields();
                    that.createModel.show=false;
                  }
                })
              } else if (this.FromName === 'Institutions'){
                // 当是组织机构表时
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
              } else if (this.FromName === 'permission'){
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
              }
            } else {
              this.$Message.error('表单验证未通过，请重新输入');
            }
          })
        },
        // 取消函数
        handleReset (name) {
          this.$refs[name].resetFields();
          this.createModel.show=false;
        }
      },
      mounted() {
        this.$root.Bus.$on("on-click", msg=>{
          this.createModel.show = true;
          this.ModelType = msg;
          if (msg == '管理员'){this.createModel.title = '创建管理员';this.FromName = 'userFrom'}
          if (msg == '角色'){this.createModel.title = '创建角色';this.FromName = 'RoleFrom'}
          if (msg == '菜单'){this.createModel.title = '创建菜单';this.FromName = 'MenuFrom'}
          if (msg == '组织机构'){this.createModel.title = '创建组织机构';this.FromName = 'Institutions'}
          if (msg == '权限'){this.createModel.title = '创建权限';this.FromName = 'permission'}
        })
      }
    }
</script>

<style scoped>
  .minH{
    max-height: 420px;
    overflow: auto;

  }
.WenZi{
  position: absolute;top: 2px;left: 160px;color: #7f7f7f;
}
</style>
