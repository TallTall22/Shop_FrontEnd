<script setup>
import { useRoute } from 'vue-router';
import { getAdminProduct } from '../../api/admin'

// 從 API 中取得商品資料
const { product, productErrorMsg, getProduct } = getAdminProduct()
const authToken = localStorage.getItem('authToken')

// 使用 Vue Router 中的 useRoute 函式取得當前路由資訊
const router = useRoute()
const id = router.params.id

// 使用 getProduct 函式取得特定商品的資料
getProduct({ id, authToken })
</script>

<template>
  <div class="productWrapper">
    <div class="">
      <!-- 商品圖片 -->
      <img :src="product.image" :alt="product.name">
    </div>
    <div class="info">
      <h2>{{ product.name }}</h2>
      <h4 v-if="product.Category">{{ product.Category.name }}</h4>
      <ul>
        <li>價錢 : {{ product.price }}</li>
        <li>庫存 : {{ product.quantity }}</li>
        <li>狀態 : {{ product.isSelling ? '上架中' : '未上架' }}</li>
        <li>介紹 : {{ product.description }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.productWrapper {
  display: flex;

  img {
    width: 400px;
    height: 300px;
  }

  .info {
    margin-left: 2rem;

    h2 {
      margin-bottom: 0.3rem;
    }

    h4 {
      margin-bottom: 1rem;
    }

    ul {
      li {
        margin-bottom: 0.5rem;
      }
    }
  }
}</style>
