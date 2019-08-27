import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Login from './views/Login.vue'

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
        { path: '/categories/list', component: () => import('./views/CategoriesList.vue') },
        // book
        { path: '/books/create', component: () => import('./views/BooksCreate.vue') },
        { path: '/books/list', component: () => import('./views/BooksList.vue') },
        { path: '/books/edit/:id', component: () => import('./views/BooksCreate.vue'), props: true },
        //  admin
        { path: '/admin/create', component: () => import('./views/AdminCreate.vue') },
        { path: '/admin/list', component: () => import('./views/Adminlist.vue') },
        { path: '/admin/edit/:id', component: () => import('./views/AdminCreate.vue'), props: true }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
