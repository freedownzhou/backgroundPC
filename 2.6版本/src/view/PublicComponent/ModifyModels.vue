<template>
  <div>
    <Modal class="ws-modal" v-model="createModel.show" class-name="vertical-center-modal" @on-cancel="handleReset(FromName)">
      <div slot="header" class="fs18">
        {{createModel.title}}
      </div>
      <div class="modal-content creatmodel">

        <!--        编辑管理员-->
        <div v-if="ModelType == '管理员'">
         <Form :rules="rulePhoneFrom" :model="userFrom" class="pl30 pr30" :label-width="80" ref="userFrom">
           <FormItem label="用户ID" prop="id">
             <Input v-model="userFrom.id" disabled></Input>
           </FormItem>
           <FormItem label="用户名" prop="user_name">
             <Input v-model="userFrom.user_name"></Input><p class="WenZi">2到15个中文字</p>
           </FormItem>
            <FormItem label="昵称" prop="nickname">
              <Input v-model="userFrom.nickname"></Input><p class="WenZi">最多35个字符</p>
            </FormItem>
            <FormItem label="电子邮箱" prop="email">
              <Input v-model="userFrom.email" placeholder="输入邮箱"></Input>
            </FormItem>
           <FormItem class="no-margin-b" prop="mobile" label="手机号">
             <Input type="text" v-model="userFrom.mobile" style="width:250px"/>
           </FormItem>
            <FormItem label="平台编码" prop="platform_code">
              <Input v-model="userFrom.platform_code" :placeholder='userFrom.platform_code' disabled></Input>
            </FormItem>
            <FormItem label="用户类型">
              <RadioGroup v-model="userFrom.user_type">
                <Radio label="1">平台管理员</Radio>
                <Radio label="2">渠道</Radio>
                <Radio label="3">业务管理员</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="账号类型">
              <RadioGroup v-model="userFrom.account_type">
                <Radio label="1">正式账号</Radio>
                <Radio label="2">测试账号</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="权限类型">
              <RadioGroup v-model="userFrom.power_type">
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
<!--            <FormItem label="密码" prop="user_pwd">-->
<!--              <Input type="password" v-model="userFrom.user_pwd"></Input><p class="WenZi">字母+数字组合（6-20位）</p>-->
<!--            </FormItem>-->
<!--            <FormItem label="确认密码" prop="user_pwdAgin">-->
<!--              <Input type="password" v-model="userFrom.user_pwdAgin"></Input>-->
<!--            </FormItem>-->
          </Form>
          </div>
          <!--        编辑管理员结束-->
          <!--        编辑菜单-->
          <div v-if="ModelType == '菜单'">
            <Form :rules="ruleMenu" :model="MenuFrom" class="pl30 pr30" :label-width="80" ref="MenuFrom">
              <FormItem label="名称" prop="menu_name">
                <Input v-model="MenuFrom.menu_name"></Input><p class="WenZi">2到12个中文字</p>
              </FormItem>
              <FormItem label="菜单路径" prop="menu_url">
                <Input v-model="MenuFrom.menu_url"></Input><p class="WenZi">长度2-125个字符</p>
              </FormItem>
              <FormItem label="级别" prop="level">
                <Input v-model="MenuFrom.level"></Input>
              </FormItem>
              <FormItem label="菜单类型">
                <RadioGroup v-model="MenuFrom.menu_type">
                  <Radio label="1">导航菜单</Radio>
                  <Radio label="2">子页面菜单</Radio>
                </RadioGroup>
              </FormItem>
<!--              <FormItem label="平台编码" prop="platform_code">-->
<!--                <Input v-model="MenuFrom.platform_code" :placeholder='MenuFrom.platform_code' disabled></Input>-->
<!--              </FormItem>-->
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
          <!--        编辑菜单结束-->
          <!--        编辑角色-->
          <div v-if="ModelType == '角色'">
            <Form :rules="ruleRole" :model="RoleFrom" class="pl30 pr30" :label-width="80" ref="RoleFrom">
              <FormItem label="角色名称" prop="role_name">
                <Input v-model="RoleFrom.role_name"></Input><p class="WenZi">2到12个中文字</p>
              </FormItem>
              <FormItem label="ID" prop="id">
                <Input v-model="RoleFrom.id" disabled></Input>
              </FormItem>
              <FormItem label="状态">
                <RadioGroup v-model="RoleFrom.status">
                  <Radio label="0">失效</Radio>
                  <Radio label="1">有效</Radio>
                </RadioGroup>
              </FormItem>
            </Form>
          </div>
        <!--        编辑角色结束-->
        <!--        编辑组织机构-->
        <div v-if="ModelType == '组织机构'">
          <Form :rules="ruleInstitutions" :model="Institutions" class="pl30 pr30" :label-width="85" ref="Institutions">
            <FormItem label="机构名" prop="usergroup_name">
              <Input v-model="Institutions.usergroup_name"></Input><p class="WenZi">2到15个中文字</p>
            </FormItem>
            <FormItem label="负责人ID" prop="id">
              <Input v-model="Institutions.id"></Input>
            </FormItem>
            <FormItem label="机构编码" prop="organization_code">
              <Input v-model="Institutions.organization_code"></Input>
            </FormItem>
            <FormItem label="备注" prop="remarks">
              <Input v-model="Institutions.remarks" :placeholder='Institutions.remarks' type="textarea"></Input>
            </FormItem>
            <FormItem label="状态">
              <RadioGroup v-model="Institutions.status">
                <Radio label="0">禁用</Radio>
                <Radio label="1">启用</Radio>
                <Radio label="2">冻结</Radio>
                <Radio label="3">失效</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </div>
        <!--        编辑组织机构结束-->
        <!--      编辑权限机构-->
        <div v-if="ModelType == '权限'" class="minH">
          <Form :rules="rulePermissions" :model="permission" class="pl30 pr30" :label-width="80" ref="permission">
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
            <FormItem label="平台编码" prop="platform_code">
              <Input v-model="permission.platform_code" :placeholder='MenuFrom.platform_code' disabled></Input>
            </FormItem>
            <FormItem label="状态">
              <RadioGroup v-model="permission.status">
                <Radio label="0">失效</Radio>
                <Radio label="1">有效</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </div>
        <!--        编辑权限结束-->
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
    name: "ModifyModels",
    data(){
      // // 密码验证
      // const validatePass = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入密码'));
      //   } else {
      //     let patrn=/^(\w){6,20}$/;
      //     if (!patrn.exec(value)) {
      //       callback(new Error('密码格式错误'));
      //     }
      //     callback();
      //   }
      // };
      // const validatePassCheck = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请确认您的密码'));
      //     console.log(typeof this.userFrom.mobile)
      //   } else if (value !== this.userFrom.user_pwd) {
      //     callback(new Error('2次输入密码不一致!'));
      //   } else {
      //     callback();
      //   }
      // };
      return{
        FromName:'',
        ModelType:'',
        createModel: {
          show: false,
          title:''
        },
        // 管理员规则
        rulePhoneFrom:{
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
        // 菜单规则
        ruleMenu:{
          menu_name:[
            {required: true, message: '名称不能为空', trigger: 'blur'},
            {pattern: '^([\u4E00-\\uFA29]|[\\uE7C7-\\uE7F3]|[a-zA-Z0-9_]){2,30}$', message: '菜单名称输入有误',trigger: 'blur' },
          ],
          menu_url:[
            {required: true, message: '路径不能为空', trigger: 'blur'},
            {pattern: '^[A-Za-z0-9_\\-/]{2,125}$', message: '路径输入有误',trigger: 'blur' },
          ],
          level:[
            {required: true, message: '级别不能为空', trigger: 'blur'},
          ]
        },
        // 角色规则
        ruleRole:{
          role_name:[
            {required: true, message: '名称不能为空', trigger: 'blur'},
            {pattern: '^([\u4E00-\\uFA29]|[\\uE7C7-\\uE7F3]|[a-zA-Z0-9_]){2,30}$', message: '菜单名称输入有误',trigger: 'blur' },
          ],
        },
        // 用户组规则
        ruleInstitutions:{
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
        // 权限规则
        rulePermissions:{
          power_name:[
            {required: true, message: '名称不能为空', trigger: 'blur'},
            {pattern: '^([\u4E00-\\uFA29]|[\\uE7C7-\\uE7F3]|[a-zA-Z0-9_]){2,30}$', message: '权限名称输入有误',trigger: 'blur' },
          ],
          power_describe:[
            {required: true, message: '描述不能为空', trigger: 'blur'},
            {pattern: '^.{2,225}$', message: '描述输入有误',trigger: 'blur' },
          ],
          platform_code:[
            {required: true, message: '编码不能为空', trigger: 'blur'},
            {pattern: '^[A-Za-z]{1,20}$', message: '编码输入有误',trigger: 'blur' },
          ]
        },
        // 编辑管理员表内容
        userFrom:{
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
        // 编辑菜单表内容
        MenuFrom:{
          id:0,
          parent_id:'', //菜单父id
          menu_name:'', //菜单名称
          menu_url:'',  //菜单url
          menu_type:'1', //菜单类型（1：导航菜单，2：子页面菜单）
          level:'1',     //级别
          is_show:'1',   //是否显示菜单（0：否、1：是）
          // platform_code:'bbbbbbbbbbbbbbb',   //平台编码
          status:'1'     //状态（0：失效 、1：有效）
        },
        // 编辑角色表内容
        RoleFrom:{
          id: '',     // ID
          role_name:'',    //角色名字
          status:'1'     //状态（0：失效 、1：有效）
        },
        // 编辑用户组表内容
        Institutions:{
          usergroup_name:'',    //用户组名
          organization_code:'',   //机构编码
          id:'',  //机构负责人用户id
          level:'',         //级别
          remarks:'',     //备注
          status:'1',     //状态（0：禁用 、1：启用、2：冻结、3：失效）
        },
        //编辑权限内容
        permission:{
          id:'',
          power_name:'',
          power_type:'4',
          power_describe:'',
          platform_code:'',
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
            if (this.FromName === 'userFrom') {
              var datas = {
                userType : parseInt(that.userFrom.user_type),
                mobile : that.userFrom.mobile,
                userPwd:  that.userFrom.user_pwd,
                userId : parseInt(that.userFrom.id),
                userName : that.userFrom.user_name,
                nickname : that.userFrom.nickname,
                email : that.userFrom.email,
                status : parseInt(that.userFrom.status),
                powerType : parseInt(that.userFrom.power_type),
                accountType : parseInt(that.userFrom.account_type),
              }
              Api.updateUser(datas).then(res=>{
                if (res && res.code == 0) {
                  that.$Message.success("修改管理员成功，即将刷新");
                  that.getTableData();
                  that.createModel.show=false;
                }else {
                  that.$Message.error(res.msg ? res.msg : "修改失败");
                  that.createModel.show=false;
                }
              })
            }else if (this.FromName === 'RoleFrom') {
              // that.RoleFrom.status = parseInt(that.RoleFrom.status)
              console.log(that.RoleFrom)
              Api.updateRole({
                roleId:that.RoleFrom.id,
                role_name:that.RoleFrom.role_name,
                status:that.RoleFrom.status,
              }).then(res=>{
                if (res && res.code == 0) {
                  that.$Message.success("修改用户成功，即将刷新");
                  that.getTableData();
                  that.createModel.show=false;
                }else {
                  that.$Message.error(res.msg ? res.msg : "修改失败");
                  that.createModel.show=false;
                }
              })
            }else if (this.FromName === 'MenuFrom'){
              Api.updateMenu({
                status:parseInt(that.MenuFrom.status),
                is_show:parseInt(that.MenuFrom.is_show),
                level:parseInt(that.MenuFrom.level),
                menu_type:parseInt(that.MenuFrom.menu_type),
                parent_id:parseInt(that.MenuFrom.parent_id),
                menu_name:that.MenuFrom.menu_name,
                menu_url:that.MenuFrom.menu_url,
                menuId:that.MenuFrom.id,
              }).then(res=>{
                if (res && res.code == 0) {
                  that.$Message.success("修改菜单成功，即将刷新");
                  that.getTableData();
                  that.createModel.show=false;
                }else {
                  that.$Message.error(res.msg ? res.msg : "修改失败");
                  that.createModel.show=false;
                }
              })
            } else if (this.FromName === 'Institutions'){
              Api.updateUserGroup({
                usergroup_name:that.Institutions.usergroup_name,
                organization_code:that.Institutions.organization_code,
                userGroupId:parseInt(that.Institutions.id),
                remarks:that.Institutions.remarks,
                status:parseInt(that.Institutions.status),
              }).then(res=>{
                if (res && res.code == 0) {
                  that.$Message.success("修改用户组成功，即将刷新");
                  that.getTableData();
                  that.createModel.show=false;
                }else {
                  that.$Message.error(res.msg ? res.msg : "修改失败");
                  that.createModel.show=false;
                }
              })
            } else if (this.FromName === 'permission'){
              that.permission.status = parseInt(that.permission.status)
              that.permission.power_type = parseInt(that.permission.power_type)
              console.log(that.permission)
              Api.updatePower({
                powerId:that.permission.id,
                power_name:that.permission.power_name,
                power_type:that.permission.power_type,
                power_describe:that.permission.power_describe,
                platform_code:that.permission.platform_code,
                status:that.permission.status,
              }).then(res=>{
                if (res && res.code == 0) {
                  that.$Message.success("修改权限成功，即将刷新");
                  console.log(res)
                  that.$refs.permission.resetFields();
                  that.getTableData();
                  that.createModel.show=false;
                }else {
                  that.$Message.error(res.msg ? res.msg : "修改失败");
                  that.$refs.permission.resetFields();
                  that.createModel.show=false;
                }
              })
            }
          } else {
            this.$Message.error('表单验证未通过，请重新输入');
            return false;
          }
        })
      },
      // 取消函数
      handleReset (name) {
        console.log(name)
        this.$refs[name].resetFields();
        this.createModel.show=false;
      }
    },
    mounted() {
      var that = this;
      this.$root.Bus.$on("Modify-click", messages=>{
        console.log(messages)
        this.createModel.show = true;
        this.ModelType = messages[1];
        this.createModel.title = '编辑'
        // 显示初始值
        for(var p in messages[0]){
          // 判断若是有这个属性值便赋值上去
          if (this.ModelType == '管理员') {
          if(that.userFrom.hasOwnProperty(p)){
            that.userFrom[p] = messages[0][p];
            that.FromName = 'userFrom';
            that.userFrom.user_type = that.userFrom.user_type.toString()
            that.userFrom.account_type = that.userFrom.account_type.toString()
            that.userFrom.power_type = that.userFrom.power_type.toString()
            that.userFrom.status = that.userFrom.status.toString()
            that.userFrom.id = that.userFrom.id.toString()
            that.userFrom.mobile = that.userFrom.mobile.toString()
          }
            }else if (this.ModelType == '菜单') {
            this.FromName = 'MenuFrom'
            if(that.MenuFrom.hasOwnProperty(p)){
              that.MenuFrom[p] = messages[0][p];
              that.MenuFrom.status = that.MenuFrom.status.toString();
              that.MenuFrom.menu_type = that.MenuFrom.menu_type.toString();
              that.MenuFrom.is_show = that.MenuFrom.is_show.toString();
              that.MenuFrom.level = that.MenuFrom.level.toString();
            }
          }else if (this.ModelType == '角色') {
            if(that.RoleFrom.hasOwnProperty(p)){
              that.RoleFrom[p] = messages[0][p];
              that.FromName = 'RoleFrom';
              that.RoleFrom.status = that.RoleFrom.status.toString()
            }
          }else if (this.ModelType == '组织机构') {
            this.FromName = 'Institutions'
            if(that.Institutions.hasOwnProperty(p)){
              that.Institutions[p] = messages[0][p];
              that.Institutions.status = that.Institutions.status.toString();
              that.Institutions.menu_type = that.Institutions.menu_type.toString();
              that.Institutions.id = that.Institutions.id.toString();
            }
          }else if (this.ModelType == '权限') {
            this.FromName = 'permission'
            if(that.permission.hasOwnProperty(p)){
              that.permission[p] = messages[0][p];
              that.permission.power_type = that.permission.power_type.toString();
              that.permission.status = that.permission.status.toString();
            }
          }
        }
      })
    }
  }
</script>

<style scoped>
  .WenZi{
    position: absolute;top: 2px;left: 160px;color: #7f7f7f;
  }
</style>
