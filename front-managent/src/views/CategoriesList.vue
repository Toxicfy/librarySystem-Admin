<!--CategoriesCreate.vue-->
<template>
  <div id="categories-list">
    <h2 class="title">书籍分类列表</h2>
    <div class="categoryList">
      <el-card v-for="(item,index) in categoryData" :key="index">
        <div class="description"><span>{{item.name}}</span></div>
        <el-image class="cover-image" :src="item.coverImg" fit="cover"></el-image>
        <div class="operate-tool">
          <el-button type="info" icon="el-icon-edit" circle size="small"  @click="editCategoryItem(item)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="small" @click="delCategoryItem(item)"></el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'categoriesList',
  data () {
    return {
      // 分类-数据
      categoryData: []
    }
  },
  mounted () {
    this.getCategories()
  },
  methods: {
    // 获取 --- 分类数据列表
    getCategories () {
      this.$http('/category/getCategories').then(({ data }) => {
        if (data.err_code === 0) {
          this.categoryData = data.data
        }
      })
    },
    // 删除 --- 分类单项
    delCategoryItem (data) {
      this.$confirm('是否删除该书籍分类？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        type: 'warning'
      }).then(() => {
        this.$http.post('/category/delCategory', { id: data._id })
          .then(res => {
            console.log(res.data)
            if (res.data.err_code === 0) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              this.getCategories()
            }
          })
      })
    },
    // 编辑 --- 分类单项
    editCategoryItem (data) {
      console.log(data._id)
      this.$router.push(`/categories/edit/${data._id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  #categories-list{
    .title{
      text-decoration: underline;
    }
    .categoryList{
      display: flex;
      .el-card{
        display: flex;
        justify-content: center;
        min-width: 150px;
        border-radius: 16px;
        margin: 20px;
        .cover-image{
          margin: 10px 0 15px;
          border-radius: 4px;
          display: block;
          height: 180px;
          width: 160px;
          cursor: pointer;
        }
        .description{
          text-align: center;
          cursor: pointer;
          span{
            text-decoration: underline;
          }
        }
        .operate-tool{
          text-align: center;
        }
      }
    }
  }

</style>
