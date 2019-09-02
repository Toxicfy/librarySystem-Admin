<template>
  <div class="books-list">
    <h2 class="title">书籍列表</h2>
    <el-table :data="bookList" border>
      <el-table-column prop="_id" label="书籍ID" align="center" width="220"></el-table-column>
      <el-table-column prop="fileName" label="名称" align="center" width="240"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="书籍封面" align="center" prop="coverImg" >
        <template slot-scope="data">
          <img :src="data.row.coverImg"  min-width="70" height="70" alt="coverImg"/>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者" align="center" width='220' :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="rank" label="书籍评分" align="center" ></el-table-column>
      <el-table-column prop="categoryId.name" label="分类名称" align="center"> </el-table-column>
      <el-table-column  label="操作" align="center" width="300">
        <template slot-scope="data">
          <el-button type="warning" @click="addToBookShelf(data.row)">加入书架</el-button>
          <el-button type="info" @click="editBookItem(data.row)">编辑</el-button>
          <el-button type="danger" @click="delBookItem(data.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { notify } from '../utils/index'

export default {
  data () {
    return {
      bookList: []
    }
  },
  created () {
    this.getBookList()
  },
  methods: {
    // 获取图书列表
    getBookList () {
      this.$http('/book/list').then(res => {
        this.bookList = res.data.data
      })
    },
    // 编辑单个书籍信息
    editBookItem (data) {
      this.$router.push(`/books/edit/${data._id}`)
    },
    // 删除单个书籍信息
    delBookItem (data) {
      this.$confirm('是否删除该书籍？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        type: 'warning'
      }).then(() => {
        this.$http.post('/book/del', { id: data._id }).then(res => {
          if (res.data.err_code === 0) {
            notify(this, res.data.msg)
          }
          this.getBookList()
        })
      })
    },
    // 添加书籍到书架
    addToBookShelf (data) {
      this.$http.post('/user/addShelf', { id: data._id }).then(res => {
        if (res.data.err_code === 0) {
          notify(this, res.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.books-list{
  .title{
    text-decoration: underline;
  }
  .el-table{
    box-shadow: 0 0 7px rgba(0,0,0,0.15);
  }
}
</style>
