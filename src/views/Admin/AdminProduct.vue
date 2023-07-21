<script setup>
  import { useRoute } from 'vue-router';
  import {getAdminProduct} from '../../api/admin'
  const { product, productErrorMsg, getProduct }=getAdminProduct()
  const router=useRoute()
  const id=router.params.id
  getProduct(id)
</script>

<template>
  <div class="productWrapper">
  <div class="">
    <img :src="product.image" :alt="product.name">
  </div>
  <div class="info">
    <h2>{{ product.name }}</h2>
    <h4>{{ product.Category.name }}</h4>
    <ul>
      <li>價錢 : {{product.price}}</li>
      <li>庫存 : {{product.quantity}}</li>
      <li>狀態 : {{ product.isSelling?'上架中':'未上架' }}</li>
      <li>介紹 : {{ product.description }}</li>
    </ul>
  </div>
  </div>
  
</template>

<style lang="scss">
  .productWrapper{
    display: flex;
    .info{
      margin-left: 2rem;
      h2{
        margin-bottom: 0.3rem;
      }
      h4{
        margin-bottom: 1rem;
      }
      ul{
        li{
          margin-bottom: 0.5rem;
        }
      }
    }
  }
</style>
