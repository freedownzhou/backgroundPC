<template>
  <div class="mix-page list-page box-shadow">
    <h4 class="title-bar clearfix">
      <p class="title pull-left">结算模块</p>
      <div class="extra pull-right">
        <a class="clearfix pl5 pr5 theme-btn-color pull-left lh18">
          <i class="pull-left iconfont icon-addto fs14"></i>
          <p class="pull-left ml5 fs12">创建</p>
        </a>
        <a class="clearfix pl15 pr15 theme-btn-f7f pull-left lh18 ml10">
          <i class="pull-left iconfont icon-shuaxin fs12"></i>
          <p class="pull-left ml8 fs12">刷新</p>
        </a>
      </div>
    </h4>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableLoading: false,
      page: {
        count: 0,
        page: 1,
        limit: 10
      }
    };
  },
  methods: {
    // 分页
    pageChange(page) {
      this.page.page = page;
      //this.getTableData();
    },
    // 分页条数
    sizeChange(size) {
      this.page.limit = size;
      //this.getTableData();
    },
    // 分页：显示条数
    limitChange(limit) {
      this.page.limit = limit;
      //this.getTableData();
    },
    //管理
    manageBtn() {
      this.ejectModel.title = "管理";
      this.ejectModel.show = true;
    },
    modalConfirmBtn() {},
    modalCancelBtn() {
      this.ejectModel.show = !this.ejectModel.show;
    }
  },
  created() {},
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
</style>
