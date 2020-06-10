<template>
    <div class="mix-page list-page box-shadow">
      <div v-show=all_show>
    <h4 class="title-bar clearfix">
      <p class="title pull-left">菜单列表</p>
      <div class="extra pull-right">
        <a class="clearfix pl5 pr5 theme-btn-color pull-left lh18"  @click="ModelType('菜单')">
          <i class="pull-left iconfont icon-addto fs14"></i>
          <p class="pull-left ml5 fs12">创建菜单</p>
        </a>
        <a class="clearfix pl15 pr15 theme-btn-f7f pull-left lh18 ml10" @click="rold">
          <i class="pull-left iconfont icon-shuaxin fs12"></i>
          <p class="pull-left ml8 fs12">刷新</p>
        </a>
      </div>
    </h4>
    <div class="condition-bar pt15 pb15">
      <Input v-model="conditions" style="width:160px;margin-left: 10px" placeholder="姓名 | 电话号码" />
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
      </div>
      <transition name="component-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    <!--Modal begin-->
      <!--      下面是注册弹出层-->
      <Models></Models>
      <!--      下面是菜单权限弹出层，先注释-->
<!--      <AccessPolicy></AccessPolicy>-->
      <!--      这是管理弹出层-->
      <ModifyModels></ModifyModels>
      <!--      权限弹出层-->
      <Permissions></Permissions>
  </div>
</template>

<script>
    import Models from '../PublicComponent/Models.vue';
    import Permissions from '../PublicComponent/Permissions.vue';
    import ModifyModels from '../PublicComponent/ModifyModels.vue';
    import expandRow from '../PublicComponent/table-expand.vue';
    import AccessPolicy from '../PublicComponent/AccessPolicy.vue';
    import Api from "../../lib/api";      // 导入我们的api接口
    export default {
        // name: "MenuContent"
      components:{Models,expandRow,ModifyModels,AccessPolicy,Permissions},
      provide(){
        return {
          getTableData:this.getTableData
        }
      },
      data() {
        return {
          all_show: true,
          statusData:{
            "is_show_0":"否",
            "is_show_1":"是",
            "menu_type_1":"导航菜单",
            "menu_type_2":"子页面菜单",
            "status_0":"失效",
            "status_1":"有效",
          },
          userTypeList: [
            {
              value: 'beijing',
              label: '北京市'
            },
            {
              value: 'shanghai',
              label: '上海市'
            },
            {
              value: 'shenzhen',
              label: '深圳市'
            },
            {
              value: 'hangzhou',
              label: '杭州市'
            },
            {
              value: 'nanjing',
              label: '南京市'
            },
            {
              value: 'chongqing',
              label: '重庆市'
            }
          ],
          tableData:[],
          tableLoading: false,
          page: {
            count: 0,
            page: 1,
            limit: 10
          },
          tableFormat: [
            //暂且不显示下拉框
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
              title: "菜单名称",
              key: "menu_name",
              align: "center",
            },
            {
              title: "ID",
              key: "id",
              align: "center",
            },
            {
              title: "父级ID",
              key: "parent_id",
              align: "center",
            },
            {
              title: "菜单地址",
              key: "menu_url",
              align: "center",
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
              align: "center",
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
              align: "center",
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
                          this.MenuSon(params.row);
                        }
                      }
                    },
                    "子菜单"
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
        };
      },
      watch:{
        $route(now,old) {
          if(now.path !== "/MenuContent") {
            console.log(now.path)
            this.all_show=false;
          }else{
            console.log(now.path)
            this.all_show=true;
          }
        },
      },
      methods: {
        // 查内容
        getTableData(){
          Api.getMenuList({
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
          var messages = [msg,'菜单']
          this.$root.Bus.$emit("Modify-click",messages)
        },
        modalConfirmBtn(){

        },
        modalCancelBtn(){
          this.ejectModel.show = !this.ejectModel.show;
        },
        //菜单权限按钮事件
        MenuPermissions(msg){
          var messages = [msg,'菜单']
          this.$root.Bus.$emit("Permissions-click",messages)
        },
        // 子菜单按钮事件
        MenuSon(msg){
          this.all_show = false;
          console.log(msg)
          let date1 ={parentId:msg.id,name:msg.menu_name}
          this.$router.push({name: "一级子菜单",params: date1});
        },
        // 创建按钮函数
        ModelType(value){
          this.$root.Bus.$emit("on-click",value)
        },
        // 搜索条件重置函数
        conditionsRemove(){
          this.conditions='';
          this.userTypeModel='';
          this.userTypeModel0='';
        },
        // 搜索函数
        conditionsStart(){
          var that = this;
          Api.getMenuList({
            page:that.page.page,
            limit:that.page.page,
            keyword:that.conditions
          }).then(res=>{
            console.log(res)
            this.tableData = res.data.data
            console.log(this.tableData)
          }).catch(error => {
            console.log('错误');
          })
        },
        // 刷新函数
        rold(){
          console.log('刷新了');
          this.getTableData();
        }
      },
      created() {
        this.getTableData();
        console.log(this.$route.name)
        if(this.$route.name == '菜单'){this.all_show = true}else {this.all_show = false}
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
