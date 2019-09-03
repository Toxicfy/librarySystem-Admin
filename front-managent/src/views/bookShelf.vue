<!--CategoriesCreate.vue-->
<template>
  <div id="book-shelf">
    <h2 class="title">我的书架</h2>
    <div class="books-list">
      <el-card v-for="(item,index) in bookshelfData" :key="index">
        <div class="description"><span>{{item.name}}</span></div>
        <el-image class="cover-image" :src="item.coverImg" ></el-image>
        <div class="operate-tool">
          <el-button type="danger" icon="el-icon-delete" circle size="small" @click="delCategoryItem(item)"></el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { notify } from '../utils/index'

export default {
  name: 'categoriesList',
  data () {
    return {
      // 分类-数据
      bookshelfData: []
    }
  },
  mounted () {
    this.getBookShelf()
  },
  methods: {
    getBookShelf () {
      this.$http('/user/shelf').then(({ data }) => {
        if (data.err_code === 0) {
          this.bookshelfData = data.data.bookshelf
          console.log(this.bookshelfData)
        }
      })
    },
    delCategoryItem (data) {
      this.$confirm('是否将书籍移出书架？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        type: 'warning'
      }).then(() => {
        this.$http.post('/user/removeShelf', { id: data._id })
          .then(res => {
            console.log(res.data)
            if (res.data.err_code === 0) {
              notify(this, res.data.msg)
              this.getBookShelf()
            }
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #book-shelf{
    .title{
      text-decoration: underline;
    }
    .books-list{
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
