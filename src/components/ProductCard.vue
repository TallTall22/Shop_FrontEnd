<script setup>
defineEmits(['go-product-page','handle-add-favorite','handle-delete-favorite','handle-create-cart'])
defineProps({
  product:{
    type:Object
  }
})
</script>
<template>
  <div class="card" :style="{ opacity: product.quantity <= 0 ? 0.5 : 1 }">
      <img :src="product.image" alt="" @click="$emit('go-product-page')">
      <div class="card-body">
        <h2>{{ product.name }}</h2>
        <p>{{ product.Category.name }}</p>
        <br>
        <h3>$NT {{ product.price }}</h3>
        <h2 v-if="product.quantity <= 0" class="sold-out-text">售完</h2>
        <div class="button-group">
          <!-- 根據商品狀態顯示不同按鈕 -->
          <i v-if="!product.isFavorited" class="fa-regular fa-heart btn favorite-btn" @click="$emit('handle-add-favorite')"></i>
          <i v-if="product.isFavorited" class="fa-solid fa-heart btn unfavorite-btn" @click="$emit('handle-delete-favorite')"></i>
          <i v-if="product.quantity > 0" class="fa-solid fa-cart-shopping btn cart-btn" @click="$emit('handle-create-cart')"></i>
          <i v-if="product.quantity <= 0" class="fa-solid fa-cart-shopping btn" disabled></i>
        </div>
      </div>
    </div>
</template>
<style lang="scss" scoped>
  .card{
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      margin-bottom: 2rem;
      img{
        max-width: 320px;
        max-height: 240px;
        cursor: pointer;
      }
      .card-body{
        padding: 1.5rem;
        h2{
          margin-bottom: 0.2rem;
        }
        h3{
          height: 2rem;
        }
        .sold-out-text{
          text-align: end;
          color: #ac0303;
        }
        .button-group{
          display: flex;
          justify-content: flex-end;
          .btn {
              display: inline-block;
              padding: 5px 5px;
              font-size: 20px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
             } 
            .cart-btn{
              &:hover {
                transform: scale(1.2);
              }
              &:active {
                color: #003d80;
              }
          }
        .favorite-btn{
          &:hover {
            transform: scale(1.2);
            }
        }
        .unfavorite-btn{
          color: #ef0101;
          &:hover {
            color: #ac0303;
            }
          &:active {
            color: #890404;
            }
        }
        }
      }
    }
</style>