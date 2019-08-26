<!--CategoriesCreate.vue-->
<template>
  <div id="categories-create">
    <h2 class="title">{{id ? '编辑':'新建'}}书籍分类</h2>
    <div class="form-container">
      <el-form @submit.native.prevent="saveData('categoryForm')" label-width="100px" ref="categoryForm" :model="categoryData" :rules="rules">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="categoryData.name"></el-input>
        </el-form-item>
        <el-form-item label="分类封面" prop="coverImg">
          <el-upload class="avatar-uploader" :show-file-list="false" :action="`${$http.defaults.baseURL}/category/uploadImg`" :on-success="handleAvatarSuccess">
            <img v-if="categoryData.coverImg" :src="categoryData.coverImg" class="avatar" alt>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="success" native-type="submit">提交</el-button>
          <el-button @click="cancelModifyCategory" v-if="id">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'categoriesCreate',
  props: {
    id: { type: String }
  },
  data () {
    const nameValidate = (rule, value, callback) => {
      value === ''
        ? callback(new Error('请输入分类名称'))
        : callback()
    }
    const coverImgValidate = (rule, value, callback) => {
      value === ''
        ? callback(new Error('请上传分类封面图'))
        : callback()
    }
    return {
      // 分类名称 - 分类图片
      categoryData: {
        name: '',
        coverImg: ''
      },
      //  规则
      rules: {
        name: [
          { validator: nameValidate, trigger: 'blur' }
        ],
        coverImg: [
          { validator: coverImgValidate, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // 获取初始data数据
    this.originalValue = this.$options.data()
  },
  methods: {
    // 保存数据
    saveData (formName) {
      this.$refs[formName].validate(res => {
        if (res) {
          if (this.id) {
            this.$http.post('/category/update', this.categoryData).then(res => {
              if (res.data) {
                this.$message({ type: 'success', message: res.data.msg })
                this.categoryData = this.originalValue.categoryData
                this.$refs[formName].resetFields()
                this.$router.push('/categories/list')
              }
            })
          } else {
            this.$http.post('/category/create', this.categoryData)
              .then(res => {
                if (res.data) {
                  this.$message({ type: 'success', message: res.data.msg })
                  this.categoryData = this.originalValue.categoryData
                  this.$refs[formName].resetFields()
                  this.$router.push('/categories/list')
                }
              })
          }
        }
      })
    },
    // 图片上传完成
    handleAvatarSuccess (res) {
      if (res.data.url) {
        this.$refs['categoryForm'].clearValidate('coverImg')
        this.categoryData.coverImg = res.data.url
      }
    },
    // 获取单个分类的信息
    getCategoryItem () {
      this.$http.get(`/category/detail?id=${this.id}`)
        .then(({ data }) => {
          if (data.err_code === 0) {
            this.categoryData = Object.assign(this.categoryData, data.data)
          }
        })
    },
    // 取消修改分类信息
    cancelModifyCategory () {
      this.$router.push('/categories/list')
    }
  },
  created () {
    this.id && this.getCategoryItem()
  },
  beforeRouteLeave (to, from, next) {
    this.categoryData = this.originalValue.categoryData
    next()
  }
}
</script>

<style lang="scss" scoped>
  @import "../css/commonMixin.scss";
.title {
  text-decoration: underline;
}

.form-container {
  .el-form {
    @include widthAndMinWidth(60%,500px);
    /* avatar */
    .el-upload {
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
        width: 160px;
        height: 190px;
        display: block;
      }
    }
    .el-input {
      @include widthAndMinWidth()
    }
  }
}
</style>
