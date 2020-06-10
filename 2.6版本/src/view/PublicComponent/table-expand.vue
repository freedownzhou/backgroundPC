<template>
  <div>
    <div v-if="RouterN == '管理员'">
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">用户类型: </span>
        <span class="expand-value" v-if="row.user_type == 1">平台管理员</span>
        <span class="expand-value" v-if="row.user_type == 2">渠道</span>
        <span class="expand-value" v-if="row.user_type == 3">业务员</span>
      </Col>
      <Col span="8">
        <span class="expand-key">平台编码: </span>
        <span class="expand-value">{{ row.platform_code }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <span class="expand-key">账户类型: </span>
        <span class="expand-value" v-if="row.account_type == 1">正式账号</span>
        <span class="expand-value" v-if="row.account_type == 2">测试账号</span>
      </Col>
    </Row>
  </div>
    <div v-if="RouterN == '权限'">
      <Row class="expand-row">
        <Col span="8">
          <span class="expand-key">权限描述: </span>
          <span class="expand-value">{{ row.power_describe }}</span>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
    export default {
        name: "table-expand",
      data(){
          return{
            RouterN:''
          }
      },
        props: {
          row: Object
        },
      created() {
          this.RouterN = this.$route.name
          // console.log(this.$route.name)
      }
    }
</script>

<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
