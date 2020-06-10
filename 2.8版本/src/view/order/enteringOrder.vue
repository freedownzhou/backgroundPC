
<style>
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
.other-function {
  width: 100%;
}
.custom-modal .ivu-checkbox-wrapper {
  width: 100px;
  margin-right: 0;
  margin-left: 18px;
  margin-bottom: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.custom-modal .ivu-radio {
  margin-right: 6px;
}
.custom-export-column {
  max-height: 300px;
  overflow-y: auto;
}
</style>
<template>
  <div>
    <div class="mix-page list-page box-shadow" >
      <h4 class="title-bar clearfix">
        <p class="title pull-left">录单数据列表</p>
        <div class="extra pull-right">
          <a class="clearfix pl8 pr8 theme-btn-color pull-left lh18" @click="creatingUserBtn">
            <i class="pull-left iconfont icon-addto fs14"></i>
            <p class="pull-left ml5 fs12">创建用户</p>
          </a>
          <a class="clearfix pl15 pr15 theme-btn-f7f pull-left lh18 ml10" @click="refreshBtn">
            <i class="pull-left iconfont icon-shuaxin fs12"></i>
            <p class="pull-left ml8 fs12">刷新</p>
          </a>
        </div>
      </h4>
      <div class="condition-bar pt15 pb15 clearfix">
        <Form :model="searchFrom" ref="searchFrom" class="pull-left" inline>
          <FormItem class="no-margin-b">
            <Select v-model="searchFrom.user_type" placeholder="请选择用户类型" :style="{width:'160px'}">
              <Option value>不选择</Option>
              <Option
                v-for="(item,index) in userTypeList"
                :key="index"
                :value="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem class="no-margin-b">
            <i-select
              v-model="searchFrom.account_status"
              placeholder="请选择账号状态"
              :style="{width:'160px'}"
            >
              <Option value>不选择</Option>
              <Option
                v-for="(item,index) in userTypeList"
                :key="index"
                :value="item.value"
              >{{ item.label }}</Option>
            </i-select>
          </FormItem>
          <FormItem class="no-margin-b">
            <Input
              type="text"
              v-model="searchFrom.keyword"
              placeholder="批单号/编号 | 保单号 | 被保人 | 下单用户 | 方案名称"
              :style="{width:'300px'}"
            />
          </FormItem>
        </Form>
        <div class="pull-left">
          <a @click="searchBtn" class="theme-btn-color pt6 pb6 pl20 pr20">搜索</a>
          <a @click="resetBtn" class="theme-btn-color-frame pt6 pb6 pl20 pr20 ml10">重置</a>
        </div>
      </div>
      <div class="other-function clearfix pt10 pb10">
        <div class="pull-right">
          <a class="txt-color-189" @click="customColumn">
            <i class="iconfont icon-install fs12 mr5"></i>定制列
          </a>
          <a class="txt-color-189 ml10" @click="customExportBtn">
            <i class="iconfont icon-export fs12 mr5"></i>导出
          </a>
        </div>
      </div>
      <!--    表格位置-->
      <div>
        <Table :loading="tableLoading" :columns="tableFormat" :data="tableData"></Table>
      </div>
      <div class="clearfix pt20">
        <a class="clearfix pl15 pr15 theme-btn-f7f pull-left lh18" @click="refreshBtn">
          <i class="pull-left iconfont icon-shuaxin fs12"></i>
          <p class="pull-left ml8 fs12">刷新</p>
        </a>
        <div class="clearfix pb30 pull-right">
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
      <!--Modal begin-->
      <Modal
        class="ws-modal"
        v-model="ejectModel.show"
        class-name="vertical-center-modal"
        :mask-closable="false"
      >
        <div slot="header" class="fs18">{{ejectModel.title}}</div>
        <div class="modal-content">
          <div class="ws-modal-tips-bar clearfix mb20">
            <i class="iconfont icon-sigh pull-left no-cursor"></i>
            <p class="pull-left ml10" style="width:80%">注意：手机号将用于短信通知。</p>
          </div>
          <Form :model="phoneFrom" class="pl30 pr30">
            <FormItem class="no-margin-b" prop="phone" :label="phoneFrom.label">
              <Input
                type="text"
                v-model="phoneFrom.input"
                style="width:250px"
                placeholder="请输入手机号"
              />
            </FormItem>
          </Form>
        </div>
        <div slot="footer" class="clearfix">
          <div class="pull-right clearfix">
            <a
              class="ws-confirm-btn btn-disabled"
              @click="customColumnConfirm"
              :style="{marginRight:'10px'}"
            >确定</a>
            <a class="ws-cancel-btn" @click="modalCancelBtn()">取消</a>
          </div>
        </div>
      </Modal>

      <Modal
        class="ws-modal custom-modal"
        v-model="customColumnModal.show"
        class-name="vertical-center-modal"
        :mask-closable="false"
        width="650"
      >
        <div slot="header" class="fs18">{{customColumnModal.title}}</div>
        <div class="modal-content">
          <Checkbox-group v-model="customColumnModal.checkeds">
            <Checkbox
              v-for="(item,index) in tableFormatArray"
              v-bind:key="index"
              :label="item.key"
            >{{item.title}}</Checkbox>
          </Checkbox-group>
          <div class="mt20 fs14 txt-color-333">
            <p class="ml10">选择定制类型：</p>
            <div class="mt10">
              <RadioGroup v-model="customColumnModal.radio" style="padding-left:20px">
                <div class="clearfix">
                  <Radio class="pull-left" label="1">储存此次选择</Radio>
                  <span
                    class="pull-left fs12 txt-color-666 ml10"
                  >注：选择此项，浏览器会保存此次选择（浏览器清除缓存后失效），下次默认使用此选择。</span>
                </div>
                <div class="clearfix mt10">
                  <Radio class="pull-left" label="2">仅使用一次</Radio>
                  <span class="pull-left fs12 txt-color-666 ml22">注：选择此项，则选择一次有效，下次将使用系统默认或者已储存的显示列。</span>
                </div>
                <div class="clearfix mt10">
                  <Radio class="pull-left" label="3">使用并清除储存</Radio>
                  <span
                    class="pull-left fs12 txt-color-666 ml22"
                  >注：选择此项，则选择一次有效并清除系统储存，下次将使用系统默认显示列。</span>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <div slot="footer" class="clearfix">
          <div class="pull-right clearfix">
            <a
              :class="customColumnModal.checkeds.length > 0 ? '': 'btn-disabled'"
              class="ws-confirm-btn"
              @click="customColumnConfirm"
              :style="{marginRight:'10px'}"
            >确定</a>
            <a class="ws-cancel-btn" @click="customColumnModal.show = false">取消</a>
          </div>
        </div>
      </Modal>
      <!-- 导出数据 -->
      <Modal
        class="ws-modal"
        v-model="dataExportModel.show"
        class-name="vertical-center-modal"
        :mask-closable="false"
      >
        <div slot="header" class="fs18">{{dataExportModel.title}}</div>
        <div class="modal-content">
          <div :model="dataExportModel" class="clearfix">
            <div class="pull-left" style="width:50%">
              <div class="dataexport-title">导出范围</div>
              <RadioGroup
                v-model="dataExportModel.export"
                @on-change="checkExportGroupChange"
                :style="{paddingLeft:'20px'}"
              >
                <Radio style="display:block" class="mt10" label="1">导出全部</Radio>
                <Radio style="display:block" class="mt10" label="2">导出选中</Radio>
              </RadioGroup>
              <div class="dataexport-title mt10">翻译列头</div>
              <RadioGroup v-model="dataExportModel.translation" class="pl20 mt10">
                <Radio label="1">是</Radio>
                <Radio label="2">否</Radio>
              </RadioGroup>
            </div>
            <div class="pull-right" style="width:50%">
              <div>
                <Checkbox
                  :indeterminate="dataExportModel.indeterminate"
                  :value="dataExportModel.checkAll"
                  @click.prevent.native="handleCheckAll"
                >自定义导出列：</Checkbox>
              </div>
              <Checkbox-group
                v-model="dataExportModel.checkeds"
                @on-change="checkAllGroupChange"
                class="pl30 custom-export-column"
              >
                <Checkbox
                  v-for="(item,index) in tableFormat"
                  v-show="item.check"
                  :label="item.key"
                  v-bind:key="index"
                  style="display:block"
                  class="mt10"
                >{{item.title}}</Checkbox>
              </Checkbox-group>
            </div>
          </div>
        </div>
        <div slot="footer" class="clearfix">
          <div class="pull-right clearfix">
            <a class="ws-confirm-btn" @click="dataExportConfirm" :style="{marginRight:'10px'}">确定</a>
            <a class="ws-cancel-btn" @click="dataExportModel.show = false">取消</a>
          </div>
        </div>
      </Modal>
    </div>
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import tableFormat from "@/table_format/ludan";
import tableData from "@/view/order/tableData";
export default {
  data() {
    return {
      authorityData: {
        update: true
      },
      searchFrom: {
        user_type: "",
        account_status: "",
        keyword: ""
      },
      dataRansition: {
        issuing_type_0: "待出单",
        issuing_type_1: "线下出单",
        issuing_type_2: "线上出单",
        state_01: "待录单,#ff9900", // 黄色
        state_02: "待出单,#ff9900", // 黄色
        state_03: "已出单,#19be6b", // 绿色
        state_09: "已到期,#ed4014", // 红色
        state_10: "已退保,#ed4014", // 红色
        state_11: "已冻结,#ed4014", // 红色
        e_state_04: "待发邮件,#ff9900", // 黄色
        e_state_05: "已发邮件,#2d8cf0", // 蓝色
        audit_state_01: "审核通过,#19be6b", // 绿色
        audit_state_02: "待审核,#ff9900", // 黄色
        audit_state_03: "待修改,#5cadff", // 浅蓝色
        audit_state_01: "审核通过,#19be6b", // 绿色
        audit_state_04: "待审核(已修改),#ff9900", // 黄色
        voucher_audit_state_00: "待支付,#ff9900", // 黄色
        voucher_audit_state_01: "已支付,#19be6b", // 绿色
        voucher_audit_state_02: "支付待审核,#ff9900", // 黄色
        voucher_audit_state_03: "支付待修改,#ed4014" // 红色
      },
      userTypeList: [
        {
          value: "beijing",
          label: "北京市"
        },
        {
          value: "shanghai",
          label: "上海市"
        },
        {
          value: "shenzhen",
          label: "深圳市"
        },
        {
          value: "hangzhou",
          label: "杭州市"
        },
        {
          value: "nanjing",
          label: "南京市"
        },
        {
          value: "chongqing",
          label: "重庆市"
        }
      ],
      tableData: tableData,
      tableLoading: false,
      page: {
        count: 0,
        page: 1,
        limit: 10
      },
      tableFormatArray: {},
      tableFormat: [],
      ejectModel: {
        show: false,
        title: ""
      },
      customColumnModal: {
        show: false,
        title: "定制显示列",
        checkeds: [],
        radio: "2",
        cookieKey: "FbqAjyYBBNbq"
      },
      phoneFrom: {
        input: "",
        label: "手机号："
      },
      dataExportModel: {
        show: false,
        title: "导出数据",
        export: "1",
        translation: "1",
        checkAll: false,
        checkeds: [],
        indeterminate: true,
        columnCount: 0
      },
      btn_jump: true // 按钮跳转后不显示表格
    };
  },
  methods: {
    //刷新
    refreshBtn() {
      alert("刷新");
    },
    //创建用户
    creatingUserBtn() {
      alert("创建用户");
    },
    //搜索
    searchBtn() {
      alert("搜索");
    },
    //重置
    resetBtn() {
      alert("重置");
    },
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
    // 初始化tabelFormat数据
    initTabelFormat(columnData) {
      let that = this;
      let tableFormat = that.tableFormatArray;
      let customTableFormat = [];
      let cookieKey = that.customColumnModal.cookieKey;

      if (columnData.length == 0) {
        columnData = [];
        let cookieValue = that.Util.getCookieItem(cookieKey);
        if (cookieValue) {
          columnData = cookieValue.split(",");
        } else {
          tableFormat.forEach(element => {
            if (element.show) {
              columnData.push(element.key);
              customTableFormat.push(element);
            }
          });
        }
      }

      if (customTableFormat.length == 0 && columnData.length > 0) {
        tableFormat.forEach(element => {
          columnData.forEach(el2 => {
            if (element.key === el2) {
              customTableFormat.push(element);
              return;
            }
          });
        });
      }

      that.tableFormat = customTableFormat;
      if (that.customColumnModal.radio === "1") {
        that.Util.setCookieItem(cookieKey, columnData.join(","));
      }
    },
    // 定制列Modal显示
    customColumn() {
      let that = this;
      let checkeds = [];
      that.tableFormat.forEach(element => {
        if (element.check) {
          checkeds.push(element.key);
        }
      });
      that.customColumnModal.checkeds = checkeds;
      that.customColumnModal.columnData = [];
      that.customColumnModal.show = true;
      that.customColumnModal.redio = "2";
    },
    // 定制列Modal提交
    customColumnConfirm() {
      let that = this;
      that.initTabelFormat(that.customColumnModal.checkeds);
      if (that.customColumnModal.radio === "3") {
        that.Util.removeCookieItem(that.customColumnModal.cookieKey);
      }
      that.customColumnModal.show = false;
    },
    // 导出modal
    customExportBtn() {
      let that = this;
      let checkeds = [];
      that.tableFormat.forEach(element => {
        if (element.check) {
          checkeds.push(element.key);
        }
      });
      that.dataExportModel.checkeds = checkeds;
      that.dataExportModel.allCheckeds = checkeds;
      that.dataExportModel.show = true;
      that.dataExportModel.columnCount = checkeds.length;
      that.dataExportModel.indeterminate = false;
      that.dataExportModel.checkAll = true;
    },
    //确定导出 弹框
    dataExportConfirm() {
      let that = this;
      let columnArray = [];
      let checkeds = that.dataExportModel.checkeds;
      that.tableFormat.forEach(element => {
        checkeds.forEach(el2 => {
          if (element.key == el2) {
            let exportData = {
              title: element.title,
              key: element.key
            };
            columnArray.push(exportData);
          }
        });
      });
      let data = {
        translation: that.dataExportModel.translation,
        headers: columnArray
      };
      console.log(data);
    },
    checkExportGroupChange(val) {
      let that = this;
      if (val === "1") {
        that.dataExportModel.checkAll = true;
        that.dataExportModel.indeterminate = false;
        that.dataExportModel.checkeds = that.dataExportModel.allCheckeds;
      }
    },
    //自定义导出列 按钮
    handleCheckAll() {
      let that = this;
      that.dataExportModel.export = "2";
      if (that.dataExportModel.indeterminate) {
        that.dataExportModel.checkAll = false;
      } else {
        that.dataExportModel.checkAll = !this.dataExportModel.checkAll;
      }
      that.dataExportModel.indeterminate = false;
      if (that.dataExportModel.checkAll) {
        that.dataExportModel.checkeds = that.dataExportModel.allCheckeds;
        that.dataExportModel.export = "1";
      } else {
        that.dataExportModel.checkeds = [];
      }
    },
    checkAllGroupChange(data) {
      let that = this;
      let columnCount = that.dataExportModel.columnCount;
      if (data.length === columnCount) {
        that.dataExportModel.indeterminate = false;
        that.dataExportModel.checkAll = true;
        that.dataExportModel.export = "1";
      } else if (data.length > 0) {
        that.dataExportModel.indeterminate = true;
        that.dataExportModel.checkAll = false;
        that.dataExportModel.export = "2";
      } else {
        that.dataExportModel.indeterminate = false;
        that.dataExportModel.checkAll = false;
        that.dataExportModel.export = "2";
      }
    },
    // 查看按钮跳转函数
    orderDetail(order) {
      console.log("methode的", order);
      console.log(this.Util);
      this.Util.setItem("orderDetails", JSON.stringify(order));
      this.$router.push({
        path: "ludanDetails"
      });
    }
  },
  watch: {
    $route(now, old) {
      if (now.path !== "/ludan") {
        console.log(now.path);
        this.btn_jump = false;
      } else {
        console.log(now.path);
        this.btn_jump = true;
      }
    }
  },
  created() {
    this.tableFormatArray = tableFormat.X100122(this);
    let data = [];
    this.initTabelFormat(data);
    if (this.$route.path !== "/ludan") {
      this.btn_jump = false;
    }
  },
  mounted() {}
};
</script>
