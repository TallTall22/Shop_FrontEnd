<script setup>
import {ref} from 'vue'
import { useRoute } from 'vue-router';
import { getViewsProduct } from '../api/product';
const { product, productErrorMsg, getProduct }=getViewsProduct()
const router = useRoute()
const id = router.params.id
const showQuantityModal=ref(false)
const authToken=localStorage.getItem('authToken')

const openQuantiyModal =()=>{
  showQuantityModal.value=true
}

const closeQuantiyModal=()=>{
  showQuantityModal.value = false
}

getProduct({id, authToken })
</script>
<template>
  <div class="product-container">
    <div class="image-container">
      <img :src="product.image" :alt="product.name">
    </div>
    <div class="info">
      <h2>{{ product.name }}</h2>
      <p>商品編號 : {{ product.id }}</p>
      <hr>
      <ul>
        <li class="price">$NT<span>{{ product.price }}</span></li>
        <li>商品介紹 : {{ product.description }}</li>
      </ul>
      <div class="button-group">
          <button class="btn favorite-btn">收藏</button>
          <button class="btn quantity-btn" @click="openQuantiyModal">查看庫存</button>
          <button class="btn cart-btn">加入購物車</button>
        </div>
    </div>
    </div>

    <!--Modal-->
    <div class="quantity-modal-container" v-if="showQuantityModal">
      <div class="quantity-modal">
        <h2>庫存</h2>
        <p>剩餘 : {{product.quantity}}</p>
        <button @click="closeQuantiyModal">關閉</button>
      </div>
    </div>
</template>
<style lang="scss">
.product-container{
    display: flex;
    width: 100%;
    .info{
      margin-left: 2rem;
      width: 100%;
      h2{
        margin-bottom: 0.3rem;
      }
      p{
        color: #696969;
        margin-bottom: 1rem;
      }
      ul{
        li{
          margin-bottom: 0.5rem;
          span{
            font-size: 2.5rem;
            color: #be1212;
          }
        }
        .price{
          text-align: right;
        }
      }
      .button-group{
          margin-top: 2rem;
          display: flex;
          justify-content: space-around;
          .btn {
              display: inline-block;
              padding: 10px 20px;
              font-size: 16px;
              color: #fff;
              border: none;
              border-radius: 4px;
              cursor: pointer;
             } 
            .cart-btn{
              background-color: #007bff;
              &:hover {
            background-color: #0056b3;
          }
            &:active {
            background-color: #003d80;
          }
        }
        .quantity-btn{
          background-color: #696969;
          &:hover{
            background-color: #595959;
          }
          &:active{
            background-color: #2e2e2e;
          }
        }
        .favorite-btn{
          background-color: #397e3c;
          &:hover {
            background-color: #2a5f2d;
            }
          &:active {
            background-color: #1f4721;
            }
        }
        }
    }
  }

   .quantity-modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
.quantity-modal {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  max-width: 400px;
  padding: 4rem;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  h2{
    margin-bottom: 1rem;
  }
  p{
    margin-bottom: 1rem;
  }
}
}
</style>