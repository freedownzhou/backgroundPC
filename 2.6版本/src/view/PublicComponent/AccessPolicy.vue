<template>
  <div>
    <Modal class="ws-modal" v-model="createModel.show" class-name="vertical-center-modal" @on-cancel="handleReset('Permission')" width="720">
      <div slot="header" class="fs18">
        {{createModel.title}}
      </div>
      <div class="modal-content creatmodel">
        <div class="ws-modal-tips-bar clearfix mb20">
          <i class="iconfont icon-sigh pull-left no-cursor"></i>
          <p class="pull-left ml10" style="width:90%">添加权限策略后，该菜单即具有该条策略的权限，同一条授权策略不能被重复添加。</p>
        </div>
        <Row type="flex" justify="space-between" class="code-row-bg AP_Row">
          <Col span="9" style="border: 1px solid #e1e6eb;height: 315px">
            <p class="row_p">创建权限策略</p>
            <Form :rules="ruleMenu" :model="Permission" :label-width="80" ref="Permission" class="mt15">
              <!--        创建菜单权限表-->
              <div>
                <FormItem label="权限名称" prop="Permission_name" class="mt45">
                  <Input v-model="Permission.Permission_name"></Input><p class="WenZi">长度2到15个中文字</p>
                </FormItem>
                <FormItem label="权限编码" prop="AccessCode" class="mt45">
                  <Input v-model="Permission.AccessCode"></Input><p class="WenZi">输入1-25个大小写英文字母</p>
                </FormItem>
                <FormItem label="权限叙述" prop="AccessAccount" class="mt45 mb40"><p class="WenZi">长度最多225个字符</p>
                  <Input v-model="Permission.AccessAccount" placeholder="输入邮箱"></Input>
                </FormItem>
              </div>
              <!--        创建菜单权限表结束-->
            </Form>
          </Col>
          <Col span="4">
            <Row type="flex" justify="center"  align="middle" style="height: 100%;text-align: center">
              <Col span="24"><Button type="primary" @click="creatMenuQ('Permission')">创建</Button></Col>
            </Row>
          </Col>
          <Col span="9" style="border: 1px solid #e1e6eb;height: 315px;overflow:auto">
            <p class="row_p" style="border-bottom: 1px solid #e1e6eb;">已创建权限策略</p>
            <div class="list_box" v-for="(item,index) in MenuPreview" :key="index">
              <p class="ml10">{{item.Permission_name}}</p>
              <p class="ml10">{{item.AccessAccount}}</p>
              <Icon type="md-close-circle" class="icon-ps" @click="p_index=index;modal2=true;"/>
            </div>
          </Col>
        </Row>
      </div>
      <div slot="footer" class="clearfix">
        <div class="pull-right clearfix">
          <a class="ws-confirm-btn" @click="modalConfirmBtn('Permission')" :style="{marginRight:'10px'}">确定</a>
          <a class="ws-cancel-btn" @click="handleReset('Permission')">取消</a>
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
  </div>
</template>

<script>
    export default {
        name: "AccessPolicy",
        data(){
          return{
            p_index:0,
            modal2:false,
            ModelType:'',
            createModel: {
              show: false,
              title:''
            },
            //创建菜单权限预览
            MenuPreview:[{Permission_name:'查询 【select】',AccessAccount:'用于查询企单（单票）发票开具信息',AccessCode:'ZZ'},{Permission_name:'查询2 【select】',AccessAccount:'用于查询5企单（单票）发票开具信息',AccessCode:'ZlZ'}],
            // 创建菜单权限表规则
            ruleMenu:{
              Permission_name:[
                {required: true, message: '名称不能为空', trigger: 'blur'},
                {pattern: '^([\u4E00-\\uFA29]){2,30}$', message: '菜单名称输入有误',trigger: 'blur' },
              ],
              AccessCode:[
                {required: true, message: '编码不能为空', trigger: 'blur'},
                {pattern: '^[A-Za-z]{1,25}$', message: '编码格式输入有误',trigger: 'blur' },
              ],
              AccessAccount:[
                {required: true, message: '描述不能为空', trigger: 'blur'},
                {pattern: '^([\u4E00-\\uFA29]|[\\uE7C7-\\uE7F3]|[a-zA-Z0-9_]){1,225}$', message: '描述输入有误',trigger: 'blur' },
              ]
            },
            // 创建菜单权限表内容
            Permission:{
              Permission_name:'', //权限名称
              AccessCode:'',//权限编码
              AccessAccount:'',//权限叙述
            },
          }
        },
      methods:{
          // 确认删除该权限
        del(){
          this.modal2 = false;
          console.log(this.MenuPreview[this.p_index])
        },
        // 确定函数
        modalConfirmBtn(name){
          alert(name)
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.$Message.success('Success!');
              this.$router.go(0)
            } else {
              this.$Message.error('表单验证未通过，请重新输入');
            }
          })
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
        // 取消函数
        handleReset (name) {
          this.$refs[name].resetFields();
          this.createModel.show=false;
        }
      },
      mounted() {
        var that = this;
        this.$root.Bus.$on("MenuP-click", messages=>{
          this.createModel.show = true;
          console.log(messages)
          this.ModelType = messages[1];
          this.createModel.title = '编辑菜单权限策略'
        })
      }
    }
</script>

<style scoped>
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
  .WenZi{
    position: absolute;
    top: 30px;
    color: #7f7f7f;
    font-size: 10px;
  }
</style>
