import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/admin',
      name:'admin',
      component:()=>import('../views/Admin/AdminData.vue')
    },
    {
      path:'/admin/products/create',
      name:'createProduct',
      component:()=>import('../views/Admin/AdminCreateProduct.vue')
    },
    {
      path:'/admin/products/edit/:id',
      name:'editProduct',
      component:()=>import('../views/Admin/AdminEditProduct.vue')
    },
    {
      path:'/admin/products/:id',
      name:'Adminproduct',
      component:()=>import('../views/Admin/AdminProduct.vue')
    },
    {
      path:'/login',
      name:'login',
      component:()=>import('../views/LoginView.vue')
    },
    {
      path:'/register',
      name:'register',
      component:()=>import('../views/RegisterView.vue')
    },
    {
      path:'/products/:id',
      name:'product',
      component:()=>import('../views/ProductView.vue')
    },
    {
      path:'/cart',
      name:'cart',
      component:()=>import('../views/CartView.vue')
    },
    {
      path:'/favorite',
      name:'favorite',
      component:()=>import('../views/FavoriteView.vue')
    },
    {
      path:'/order',
      name:'order',
      component:()=>import('../views/OrderView.vue')
    },
    {
      path:'/popular',
      name:'popular',
      component:()=>import('../views/PopularView.vue')
    },
    {
      path:'/:domain(.*)*',
      name:"error",
      component:()=>import('../views/ErrorView.vue')
    }
  ]
})

export default router
