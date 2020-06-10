<template>
  <div class="mix-page list-page box-shadow">
    <div>
      <h4 class="title-bar clearfix">
        <p class="title pull-left">菜单列表</p>
        <div class="extra pull-right">
          <a class="clearfix pl5 pr5 theme-btn-color pull-left lh18" @click="modelType('菜单')">
            <i class="pull-left iconfont icon-addto fs14"></i>
            <p class="pull-left ml5 fs12">创建菜单</p>
          </a>
          <a class="clearfix pl15 pr15 theme-btn-f7f pull-left lh18 ml10" @click="refreshBtn">
            <i class="pull-left iconfont icon-shuaxin fs12"></i>
            <p class="pull-left ml8 fs12">刷新</p>
          </a>
        </div>
      </h4>
      <div class="condition-bar pt15 pb15">
        <Input v-model="keyword" style="width:160px;" placeholder="姓名 | 电话号码" />
        <a class="theme-btn-color pl20 pr20 ml10" @click="searchStart">搜索</a>
        <a class="theme-btn-color-frame pl20 pr20 ml10" @click="searchRemove">重置</a>
      </div>
      <Tag class="mb10" type="dot" closable @on-close="handleClose" color="primary" v-for="(item,index) in parentIdList" :key="index" :name="index" >{{item.title}}</Tag>
      <div>
        <Table :loading="tableLoading" :columns="tableFormat" :data="tableData"></Table>
      </div>
      <div class="clearfix">
        <div class="clearfix pt30 pb30 pull-right">
          <Page
            class="pull-left"
            :total="page.count"
            :current="page.page"
            :page-size="page.limit"
            show-elevator
            show-sizer
            size="small"
            @on-change="pageChange"
            @on-page-size-change="sizeChange"
          ></Page>
          <div class="page-number pull-left lh24 ml20">
            共：
            <span>{{page.count}}&nbsp;&nbsp;</span>条数据
          </div>
        </div>
      </div>
    </div>
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <!--Modal begin-->
<!--    创建菜单弹出层-->
    <Modal class="ws-modal qs" v-model="createModel.show" class-name="vertical-center-modal" @on-cancel="handleReset('MenuFrom')">
      <div slot="header" class="fs18">
        创建菜单
      </div>
      <div class="modal-content creatmodel">
        <div class="minH">
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
      </div>
      <div slot="footer" class="clearfix">
        <div class="pull-right clearfix">
          <a class="ws-confirm-btn" @click="modalConfirmBtn('MenuFrom')" :style="{marginRight:'10px'}">确定</a>
          <a class="ws-cancel-btn" @click="handleReset('MenuFrom')">取消</a>
        </div>
      </div>
    </Modal>
    <!--      下面是注册弹出层，先注释-->
<!--    <Models></Models>-->
    <!--      下面是菜单权限弹出层，先注释-->
    <!--      <AccessPolicy></AccessPolicy>-->
    <!--      这是管理弹出层-->
    <Modal class="ws-modal" v-model="createModel.Modifyshow" class-name="vertical-center-modal" @on-cancel="handleResetModify('MenuFromBj')">
      <div slot="header" class="fs18">
        编辑1
      </div>
      <div class="modal-content creatmodel">
        <!--        编辑菜单-->
        <div>
          <Form :rules="ruleMenuBj" :model="MenuFromBj" class="pl30 pr30" :label-width="80" ref="MenuFromBj">
            <FormItem label="名称" prop="menu_name">
              <Input v-model="MenuFromBj.menu_name"></Input><p class="WenZi">2到12个中文字</p>
            </FormItem>
            <FormItem label="菜单路径" prop="menu_url">
              <Input v-model="MenuFromBj.menu_url"></Input><p class="WenZi">长度2-125个字符</p>
            </FormItem>
            <FormItem label="级别" prop="level">
              <Input v-model="MenuFromBj.level"></Input>
            </FormItem>
            <FormItem label="菜单类型">
              <RadioGroup v-model="MenuFromBj.menu_type">
                <Radio label="1">导航菜单</Radio>
                <Radio label="2">子页面菜单</Radio>
                   </RadioGroup>
            </FormItem>
            <!--              <FormItem label="平台编码" prop="platform_code">-->
            <!--                <Input v-model="MenuFromBj.platform_code" :placeholder='MenuFromBj.platform_code' disabled></Input>-->
            <!--              </FormItem>-->
            <FormItem label="是否显示">
              <RadioGroup v-model="MenuFromBj.is_show">
                <Radio label="0">否</Radio>
                <Radio label="1">是</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="状态">
              <RadioGroup v-model="MenuFromBj.status">
                <Radio label="0">失效</Radio>
                <Radio label="1">有效</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </div>
      </div>
      <div slot="footer" class="clearfix">
        <div class="pull-right clearfix">
          <a class="ws-confirm-btn" @click="modifyConfirmBtn('MenuFromBj')" :style="{marginRight:'10px'}">确定</a>
          <a class="ws-cancel-btn" @click="handleResetModify('MenuFromBj')">取消</a>
        </div>
      </div>
    </Modal>
    <ModifyModels></ModifyModels>
    <!--      权限弹出层-->
    <Modal class="ws-modal" v-model="createModel.treePermissions" class-name="vertical-center-modal" :mask-closable="false">
      <div slot="header" class="fs18">
        编辑菜单权限
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
import Models from "../PublicComponent/Models.vue";
import Permissions from "../PublicComponent/Permissions.vue";
import ModifyModels from "../PublicComponent/ModifyModels.vue";
import expandRow from "../PublicComponent/table-expand.vue";
import AccessPolicy from "../PublicComponent/AccessPolicy.vue";
import Api from "../../lib/api"; // 导入我们的api接口
export default {
  // name: "MenuContent"
  components: { Models, expandRow, ModifyModels, AccessPolicy, Permissions },
  provide() {
    return {
      getTableData: this.getTableData
    };
  },
  data() {
    return {
      statusData: {
        is_show_0: "否",
        is_show_1: "是",
        menu_type_1: "导航菜单",
        menu_type_2: "子页面菜单",
        status_0: "失效",
        status_1: "有效"
      },
      parentIdList: [],
      tableData: [],
      tableLoading: false,
      page: {
        count: 0,
        page: 1,
        limit: 10
      },
      tableFormat: [
        {
          title: "菜单名称",
          key: "menu_name",
          align: "center"
        },
        {
          title: "ID",
          key: "id",
          align: "center"
        },
        {
          title: "父级ID",
          key: "parent_id",
          align: "center"
        },
        {
          title: "菜单地址",
          key: "menu_url",
          align: "center"
        },
        {
          title: "菜单类型",
          key: "menu_type",
          align: "center",
          render: (h, params) => {
            let that = this;
            let data = params.row;
            var ststus = "menu_type_" + data.menu_type;
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
          title: "级别",
          key: "level",
          align: "center"
        },
        {
          title: "是否显示",
          key: "is_show",
          align: "center",
          render: (h, params) => {
            let that = this;
            let data = params.row;
            var ststus = "is_show_" + data.is_show;
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
          title: "创建时间",
          key: "gmt_create",
          align: "center"
        },
        {
          title: "状态",
          key: "state",
          align: "center",
          render: (h, params) => {
            let that = this;
            let data = params.row;
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
            var data = params.row;
            return h("a", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "#ff6a00"
                  },
                  on: {
                    click: () => {
                      this.manageBtn(data);
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
                    size: "small"
                  },
                  style: {
                    color: "#ff6a00"
                  },
                  on: {
                    click: () => {
                      this.menuPermissions(data);
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
                    size: "small"
                  },
                  style: {
                    color: "#ff6a00"
                  },
                  on: {
                    click: () => {
                      this.menuSon(data);
                    }
                  }
                },
                "子菜单"
              )
            ]);
          }
        }
      ],
      createModel: {
        show: false,
        Modifyshow:false,
        treePermissions:false,
        title:''
      },
      ejectModel: {
        show: false,
        title: ""
      },
      phoneFrom: {
        input: "",
        label: "手机号："
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
      rulePhoneFrom: {
        phone: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ]
      },
      // 搜索条件3个
      keyword: "",
      // 创建菜单表内容
      MenuFrom:{
        menu_name:'', //菜单名称
        menu_url:'',  //菜单url
        menu_type:'1', //菜单类型（1：导航菜单，2：子页面菜单）
        // level:1,     //级别
        is_show:'1',   //是否显示菜单（0：否、1：是）
        status:'1'     //状态（0：失效 、1：有效）
      },
      // 编辑菜单表内容
      MenuFromBj:{
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
      // 編輯菜单规则
      ruleMenuBj:{
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
      ]
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
          }else {
          this.$Message.error('表单验证未通过，请重新输入');
        }
      })},
    // 查内容
    getTableData() {
      let that = this;
      let parentIdList = that.parentIdList;
      Api.getMenuList({
        keyword: that.keyword,
        page: that.page.page,
        limit: that.page.limit,
        parentId: parentIdList.length > 0 ? parentIdList[parentIdList.length - 1].parentId : 0
      })
        .then(res => {
          this.page.count = res.data.count;
          this.tableData = res.data.data;
        })
        .catch(error => {
          console.log("错误");
        });
    },
    // 分页
    pageChange(page) {
      this.page.page = page;
      this.page.page = page;
      this.getTableData();
    },
    // 分页条数
    sizeChange(size) {
      this.page.limit = size;
      this.getTableData();
    },
    // 分页：显示条数
    limitChange(limit) {
      this.page.limit = limit;
      this.getTableData();
    },
    //管理
    manageBtn(msg) {
      var messages = [msg, "菜单"];
      // this.$root.Bus.$emit("Modify-click", messages);

      var that = this;
      for(var p in messages[0]){
        if(that.MenuFromBj.hasOwnProperty(p)){
          that.MenuFromBj[p] = messages[0][p];
          that.MenuFromBj.status = that.MenuFromBj.status.toString();
          that.MenuFromBj.menu_type = that.MenuFromBj.menu_type.toString();
          that.MenuFromBj.is_show = that.MenuFromBj.is_show.toString();
          that.MenuFromBj.level = that.MenuFromBj.level.toString();
        }
      }
      this.createModel.Modifyshow = true;
    },
    modalCancelBtn() {
      this.ejectModel.show = !this.ejectModel.show;
    },
    //菜单权限按钮事件
    menuPermissions(msg) {
      var messages = [msg, "菜单"];
      // this.$root.Bus.$emit("Permissions-click", messages);
      this.createModel.treePermissions = true;
    },
    // 子菜单按钮事件
    menuSon(data) {
      this.parentIdList.push({
        title: data.menu_name + "-子菜单[" + data.id + "]",
        parentId: data.id
      });
      this.getTableData();
    },
    handleClose(event, name) {
      const index = name;
      this.parentIdList.splice(index, this.parentIdList.length - index);
      this.getTableData();
    },
    // 创建按钮函数
    modelType(value) {
      // this.$root.Bus.$emit("on-click", value);
      this.createModel.show = true;
    },
    // 搜索条件重置函数
    searchRemove() {
      this.keyword = "";
    },
    // 搜索函数
    searchStart() {
      this.getTableData();
    },
    // 刷新函数
    refreshBtn() {
      this.getTableData();
    },
    // 管理确定函数
    modifyConfirmBtn(name){
      var that = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          Api.updateMenu({
            status:parseInt(that.MenuFromBj.status),
            is_show:parseInt(that.MenuFromBj.is_show),
            level:parseInt(that.MenuFromBj.level),
            menu_type:parseInt(that.MenuFromBj.menu_type),
            parent_id:parseInt(that.MenuFromBj.parent_id),
            menu_name:that.MenuFromBj.menu_name,
            menu_url:that.MenuFromBj.menu_url,
            menuId:that.MenuFromBj.id,
          }).then(res=>{
            if (res && res.code == 0) {
              that.$Message.success("修改菜单成功，即将刷新");
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
  mounted() {}
};
</script>

<style scoped>
.mix-page.list-page {
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
.ivu-select-selection,
.ivu-select-dropdown {
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
