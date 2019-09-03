import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Login from './views/Login.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/bookShelf',
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
        { path: '/admin/list', component: () => import('./views/AdminList.vue') },
        { path: '/admin/edit/:id', component: () => import('./views/AdminCreate.vue'), props: true },
        //  bookShelf
        { path: '/bookShelf', component: () => import('./views/bookShelf.vue') }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        notRequireAuth: true
      },
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.notRequireAuth) {
    next()
  } else {
    if (token) {
      next()
    } else {
      // notify(Vue.prototype, '用户授权无效，请重新登录', 'info')
      router.push('/login')
    }
  }
})

export default router
