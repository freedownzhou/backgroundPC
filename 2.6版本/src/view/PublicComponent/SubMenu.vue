<template>
  <Modal class="ws-modal qs" v-model="createModel.show" class-name="vertical-center-modal" @on-cancel="handleReset(FromName)">
    <div slot="header" class="fs18">
      {{createModel.title}}
    </div>
    <div class="modal-content creatmodel">
      <!--        创建菜单-->
      <div class="minH">
        <Form :rules="ruleMenu" :model="MenuSonFrom" class="pl30 pr30 pt20" :label-width="80" ref="MenuSonFrom">
          <FormItem label="名称" prop="menu_name">
            <Input v-model="MenuSonFrom.menu_name"></Input><p class="WenZi">2到12个中文字</p>
          </FormItem>
          <FormItem label="菜单路径" prop="menu_url">
            <Input v-model="MenuSonFrom.menu_url"></Input><p class="WenZi">长度2-125个字符</p>
          </FormItem>
          <!--            <FormItem label="级别" prop="level">-->
          <!--              <i-select v-model.sync="MenuSonFrom.level" style="width:160px" placeholder="请选择机构级别">-->
          <!--                <i-option v-for="(item,index) in 4" :value="item" :key="index">{{ item }}</i-option>-->
          <!--              </i-select>-->
          <!--            </FormItem>-->
          <FormItem label="菜单类型">
            <RadioGroup v-model="MenuSonFrom.menu_type">
              <Radio label="1">导航菜单</Radio>
              <Radio label="2">子页面菜单</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="是否显示">
            <RadioGroup v-model="MenuSonFrom.is_show">
              <Radio label="0">否</Radio>
              <Radio label="1">是</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="状态">
            <RadioGroup v-model="MenuSonFrom.status">
              <Radio label="0">失效</Radio>
              <Radio label="1">有效</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </div>
      <!--        创建菜单结束-->
    </div>
    <div slot="footer" class="clearfix">
      <div class="pull-right clearfix">
        <a class="ws-confirm-btn" @click="modalConfirmBtn(FromName)" :style="{marginRight:'10px'}">确定</a>
        <a class="ws-cancel-btn" @click="handleReset(FromName)">取消</a>
      </div>
    </div>
  </Modal>
</template>

<script>
  import Api from "../../lib/api";
    export default {
        name: "SubMenu",
      inject:['getTableData'],
      data(){
        return{
          FromName:'',
          ModelType:'',
          createModel: {
            show: false,
            title:''
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
          // 创建一级，二级子菜单表内容
          MenuSonFrom:{
            parent_id:'',  //父ID
            menu_name:'', //菜单名称
            menu_url:'',  //菜单url
            menu_type:'2', //菜单类型（1：导航菜单，2：子页面菜单）
            // level:1,     //级别
            is_show:'1',   //是否显示菜单（0：否、1：是）
            status:'1'     //状态（0：失效 、1：有效）
          },
        }
      },
      methods:{
        // 确定函数
        modalConfirmBtn(name){
          var that = this;
          this.$refs[name].validate((valid) => {
            if (valid) {
              if (this.FromName === 'MenuSonFrom'){
                // 当是菜单表时
                var datas = that.MenuSonFrom;
                datas.menu_type = parseInt(datas.menu_type)
                datas.is_show = parseInt(datas.is_show)
                datas.status = parseInt(datas.status)
                datas.parent_id = parseInt(datas.parent_id)
                Api.createMenu(datas).then(res=>{
                  if (res && res.code == 0) {
                    that.$Message.success("创建一级子菜单成功，即将刷新");
                    console.log(res)
                    that.$refs.MenuSonFrom.resetFields();
                    that.getTableData();
                    that.createModel.show=false;
                  }else {
                    that.$Message.error(res.msg ? res.msg : "创建失败");
                    that.$refs.MenuSonFrom.resetFields();
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
          var that = this;
          console.log(this)
        this.$root.Bus.$on("on-Menuclick", msg=>{
          console.log(msg)
          // console.log(that.createModel.show)
          that.createModel.show = true;
          that.ModelType = msg.title;
          if (msg.title == '一级子菜单'){that.createModel.title = '创建一级子菜单';that.FromName = 'MenuSonFrom';that.MenuSonFrom.parent_id = msg.parentId;}
          if (msg.title == '二级子菜单'){that.createModel.title = '创建二级子菜单';that.FromName = 'MenuSonFrom';that.MenuSonFrom.parent_id = msg.parentOneId;}
        })
      }
    }
</script>

<style scoped>

</style>
