<!--CategoriesCreate.vue-->
<template>
  <div id="categories-list">
    <h1>分类列表</h1>
  </div>
</template>

<script>
export default {
  name: 'categoriesList',
  data () {
    return {}
  },
  mounted () {
    this.getCategories()
  },
  methods: {
    getCategories () {
      this.$http('/getCategories').then(res => {
        console.log(res)
      })
    }
  }
}
</script>
