<script setup>
import { useRouter } from 'vue-router';
import { deleteFavoriteAsync, getFavoriteAsync } from '../api/user';
import { postCartAsync } from '../api/cart';

// 取得收藏商品相關資料
const { favorites, favoriteMsg, getFavoriteErrorMsg, getFavorite } = getFavoriteAsync();

// 刪除收藏商品相關資料
const { deleteFavoriteErrorMsg, deleteFavorite } = deleteFavoriteAsync();

// 購物車相關資料
const { postCartMsg, postCartErrorMsg, postCart } = postCartAsync();

// 路由相關設定
const router = useRouter();
const authToken = localStorage.getItem('authToken');

// 如果未登入，導向登入頁面
if (!authToken) {
  router.push('/login');
}

// 前往商品頁面
const goProductPage = (id) => {
  router.push(`/products/${id}`);
};

// 處理刪除收藏商品
const handleDeleteFavorite = async (productId) => {
  const res = await deleteFavorite({ authToken, productId });
  if (res) {
    getFavorite({ authToken });
  }
};

// 處理新增購物車商品
const handleCreateCart = async (productId) => {
  const res = await postCart({ authToken, productId });
  if (res) {
    getFavorite({ authToken });
  }
};

// 關閉購物車錯誤訊息 Modal
const closeCartErrorModal = () => {
  postCartMsg.value = '';
};

// 取得收藏商品資料
getFavorite({ authToken });
</script>

<template>
  <!-- 收藏商品資訊區域 -->
  <h4 v-if="favoriteMsg">{{ favoriteMsg }}</h4>
  <div v-if="!favoriteMsg" class="card-wrapper">
    <!-- 迴圈顯示收藏商品 -->
    <div v-for="favorite in favorites" :key="favorite.id" class="card">
      <img :src="favorite.image" alt="" @click="goProductPage(favorite.id)">
      <div class="card-body">
        <h2>{{ favorite.name }}</h2>
        <br>
        <h3>$NT {{ favorite.price }}</h3>
        <div class="button-group">
          <!-- 移除收藏按鈕 -->
          <button class="btn unfavorite-btn" @click="handleDeleteFavorite(favorite.id)">移除收藏</button>
          <!-- 加入購物車按鈕 -->
          <button v-if="favorite.quantity > 0" class="btn cart-btn" @click="handleCreateCart(favorite.id)">加入購物車</button>
          <button v-if="favorite.quantity <= 0" class="btn cart-disabled" disabled>加入購物車</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 購物車錯誤訊息 Modal -->
  <div class="error-modal-container" v-if="postCartMsg">
    <div class="error-modal">
      <h2>提醒</h2>
      <p>{{ postCartMsg }}</p>
      <button @click="closeCartErrorModal">關閉</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .card-wrapper{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 1rem;
    .card{
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      margin-bottom: 2rem;
      img{
        width: 360px;
        height: 270px;
        cursor: pointer;
      }
      .card-body{
        padding: 2rem;
        h2{
          margin-bottom: 0.2rem;
        }
        h3{
          height: 2rem;
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
             } 
            .cart-btn{
              background-color: #007bff;
              cursor: pointer;
              &:hover {
            background-color: #0056b3;
          }

          &:active {
            background-color: #003d80;
          }
        }
        .cart-disabled{
          background-color: #5cabff;
        }
        .unfavorite-btn{
          background-color: #ef0101;
          cursor: pointer;
          &:hover {
            background-color: #ac0303;
            }
          &:active {
            background-color: #890404;
            }
        }
        }
      }
    }
  }

  .error-modal-container {
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
.error-modal {
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
}
}
</style>