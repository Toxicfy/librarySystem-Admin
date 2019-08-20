<!--CategoriesCreate.vue-->
<template>
  <div id="categories-create">
    <h1>创建图书分类</h1>
    <div class="form-container">
        <el-form @submit.native.prevent="saveData('categoryForm')" label-width="100px" ref="categoryForm" :model="categoryData" :rules="rules">
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="categoryData.name"></el-input>
          </el-form-item>
          <el-form-item label="分类封面" prop="coverImg">
            <el-upload class="avatar-uploader" :show-file-list="false"
                    :action="`${$http.defaults.baseURL}/uploadImg`"
                    :on-success="handleAvatarSuccess">
              <img v-if="categoryData.coverImg" :src="categoryData.coverImg" class="avatar" alt>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="info" plain native-type="submit">提交</el-button>
          </el-form-item>
        </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'categoriesCreate',
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
      // console.log(this.$refs[formName].validate(res => res))
      this.$refs[formName].validate(res => {
        console.log(res)
        if (res) {
          this.$http.post('/createCategories', this.categoryData)
            .then(res => {
              if (res.data) {
                this.$message({
                  type: 'success',
                  message: '添加成功！'
                })
                this.categoryData = this.originalValue.categoryData
                this.$refs[formName].resetFields()
                this.$router.push('/categories/list')
              }
            })
        }
      })
    },
    // 图片上传完成
    handleAvatarSuccess (res) {
      if (res.url) {
        this.$refs['categoryForm'].clearValidate('coverImg')
        this.categoryData.coverImg = res.url
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-container{
    .el-form{
      width: 60%;
      min-width: 500px;
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
          width: 178px;
          height: 178px;
          display: block;
        }
      }
    }
  }

</style>
