import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        // which is lazy-loaded when the route is visited.
        { path: '/categories/create', component: () => import('./views/CategoriesCreate.vue') },
        { path: '/categories/edit/:id', component: () => import('./views/CategoriesCreate.vue'), props: true },
        { path: '/categories/list', component: () => import('./views/CategoriesList.vue') }
      ]
    }
  ]
})
