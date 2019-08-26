<!--CategoriesCreate.vue-->
<template>
  <div id="admin-list">
    <h2 class="title">管理员列表</h2>
    <el-table :data="adminInfo" border>
      <el-table-column prop="_id" label="管理员ID" align="center" width="220"></el-table-column>
      <el-table-column prop="username" label="管理员名称" align="center"> </el-table-column>
      <el-table-column  label="操作" align="center">
        <template slot-scope="data">
          <el-button type="info" @click="editAdminUserItem(data.row)">编辑</el-button>
          <el-button type="danger" @click="delAdminUserItem(data.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'adminList',
  data () {
    return {
      // 分类-数据
      adminInfo: []
    }
  },
  mounted () {
    this.getAdminInfo()
  },
  methods: {
    // 获取 --- 分类数据列表
    getAdminInfo () {
      this.$http('/admin_user/list').then(({ data }) => {
        if (data.err_code === 0) {
          this.adminInfo = data.data
        }
      })
    },
    // 删除 --- 分类单项
    delAdminUserItem (data) {
      this.$confirm('是否删除该管理员？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        type: 'warning'
      }).then(() => {
        this.$http.post('/admin_user/del', { id: data._id })
          .then(res => {
            console.log(res.data)
            if (res.data.err_code === 0) {
              this.$message({ type: 'success', message: res.data.msg })
              this.getAdminInfo()
            }
          })
      })
    },
    // 编辑 --- 分类单项
    editAdminUserItem (data) {
      this.$router.push(`/admin/edit/${data._id}`)
    }
  }
}
</script>

<style lang="scss" scoped>

  #admin-list{
    .title{
      text-decoration: underline;
    }
  }

</style>
