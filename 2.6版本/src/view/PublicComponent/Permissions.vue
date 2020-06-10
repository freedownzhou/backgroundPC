<template>
  <Modal class="ws-modal" v-model="createModel.show" class-name="vertical-center-modal" :mask-closable="false">
    <div slot="header" class="fs18">
      编辑{{createModel.title}}权限
    </div>
      <Tree :data="data4" show-checkbox multiple></Tree>
    <div slot="footer" class="clearfix">
      <div class="pull-right clearfix">
        <a class="ws-confirm-btn btn-disabled" @click="modalConfirmBtn" :style="{marginRight:'10px'}">确定</a>
        <a class="ws-cancel-btn" @click="handleReset()">取消</a>
      </div>
    </div>
  </Modal>
</template>

<script>
// <!--  权限组件-->
    export default {
        name: "Permissions",
      data(){
          return{
            createModel: {
              show: false,
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
            ]
          }
      },
      methods:{
        // 确定函数
        modalConfirmBtn(){
          this.$router.go(0)
        },
        // 取消函数
        handleReset () {
          this.createModel.show=false;
        }

      },
      created() {
      },
      mounted() {
        var that = this;
        this.$root.Bus.$on("Permissions-click", messages=>{
          this.createModel.title = messages[1];
          this.createModel.show = true;
          console.log(messages)
        })
      }
    }
</script>

<style scoped>

</style>
