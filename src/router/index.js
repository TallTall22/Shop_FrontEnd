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
      name:'product',
      component:()=>import('../views/Admin/AdminProduct.vue')
    }   
  ]
})

export default router
