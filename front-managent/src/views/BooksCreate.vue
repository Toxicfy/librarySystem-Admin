<template>
  <div class="books-create">
    <h2 class="title">{{id ? '编辑':'创建'}}书籍信息</h2>
    <div class="form-container">
      <el-form :model="bookData" label-width="100px" @submit.native.prevent="saveBookData" :inline="true">
        <el-form-item label="书籍名称">
          <el-input v-model="bookData.fileName"></el-input>
        </el-form-item>
        <el-form-item label="所属分类">
          <el-select v-model="bookData.categoryId" placeholder="请输入书籍所属分类" value>
            <el-option :label="item.name" :value="item._id" v-for="(item,index) in categoryData"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="书籍作者">
          <el-input v-model="bookData.author"></el-input>
        </el-form-item>
        <el-form-item label="书籍评分" class="rank-container">
          <el-rate v-model="bookData.rank"></el-rate>
          <span v-if="bookData.rank" class="rank-text">{{bookData.rank}}</span>
        </el-form-item>
        <el-form-item label="书籍封面" prop="coverImg" class="upload-img">
          <el-upload class="avatar-uploader" :show-file-list="false"
                     :action="`${$http.defaults.baseURL}/book/uploadImg`" :on-success="handleAvatarSuccess">
            <img v-if="bookData.coverImg" :src="bookData.coverImg" class="avatar" alt>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="书籍简介">
          <el-input type="textarea" :rows="5" v-model="bookData.description"></el-input>
        </el-form-item>
        <el-form-item class="btn-group">
          <el-button native-type="submit" type="success">提交</el-button>
          <el-button type="info" @click="cancelEdit" v-if="id">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Books',
  props: {
    id: { type: String }
  },
  data () {
    return {
      bookData: {
        fileName: '',
        categoryId: '',
        author: '',
        description: '',
        rank: 0,
        coverImg: ''
      },
      categoryData: []
    }
  },
  created () {
    this.getCategories()
    this.id && this.getDetail()
  },
  methods: {
    // 获取书籍分类信息
    getCategories () {
      this.$http('/category/getList').then(({ data }) => {
        if (data.err_code === 0) {
          this.categoryData = data.data
        }
      })
    },
    // 提交书籍信息
    saveBookData () {
      // 编辑
      if (this.id) {
        this.$http.post('/book/edit', this.bookData).then(res => {
          if (res.data.err_code === 0) {
            this.$message({ type: 'success', message: res.data.msg })
            this.$router.push('/books/list')
          }
        })
        return
      }
      // 新建
      this.$http.post('/book/create', this.bookData).then(res => {
        if (res.data.err_code === 0) {
          this.$message({ type: 'success', message: res.data.msg })
          this.$router.push('/books/list')
        }
      })
    },
    // 获取单个书籍信息
    getDetail () {
      this.$http.get('/book/detail', { params: { id: this.id } }).then(res => {
        this.bookData = res.data.data
        this.bookData.categoryId = res.data.data.categoryId._id
        console.log(this.bookData.categoryId)
      })
    },
    // 取消编辑
    cancelEdit () {
      this.$router.push('/books/list')
    },
    // 图片上传完成
    handleAvatarSuccess (res) {
      console.log(res)
      if (res.data.url) {
        // this.$refs['categoryForm'].clearValidate('coverImg')
        this.bookData.coverImg = res.data.url
      }
    }
  },
  beforeRouteLeave (to, form, next) {
    this.bookData = this.$options.data().bookData
    next()
  }
}
</script>

<style lang="scss" scoped>
  @import "../css/commonMixin.scss";

  .books-create {
    .title {
      text-decoration: underline;
    }

    .form-container {
      .el-form {
        @include widthAndMinWidth(60%, 500px);

        .el-input {
          @include widthAndMinWidth();
        }

        .el-textarea {
          @include widthAndMinWidth();
        }

        .el-select {
          @include widthAndMinWidth()
        }

        .rank-container {
          .rank-text{
            margin-left: 20px;
            font-size: 16px;
            font-style: italic;
          }
          .el-rate {
            line-height: 50px;
            float: left;

            .el-rate__icon {
              font-size: 24px !important;
            }
          }
        }
      }
    }
    .upload-img,.btn-group{
      @include widthAndMinWidth(60%, 550px)
    }
    .btn-group{
      margin-left: 100px;
    }

      /* avatar */
    .el-upload {
      @include widthAndMinWidth(60%, 500px);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;

      .avatar-uploader-icon {
        border: 1px dashed #d9d9d9;
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }

      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
</style>
