<script setup>
import { useRouter } from 'vue-router';
import { deleteFavoriteAsync, getFavoriteAsync } from '../api/user';
import { postCartAsync } from '../api/cart';
import BaseModal from '../components/BaseModal.vue'

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
          <i class="fa-solid fa-heart btn unfavorite-btn" @click="handleDeleteFavorite(favorite.id)"></i>
          <!-- 加入購物車按鈕 -->
          <i v-if="favorite.quantity > 0" class="fa-solid fa-cart-shopping btn cart-btn" @click="handleCreateCart(favorite.id)"></i>
          <i v-if="favorite.quantity <= 0" class="fa-solid fa-cart-shopping btn" disabled></i>
        </div>
      </div>
    </div>
  </div>

  <!-- 購物車錯誤訊息 Modal -->
  <BaseModal v-if="postCartMsg" @close-error-modal="closeCartErrorModal">
    <h2>提醒</h2>
    <p>{{ postCartMsg }}</p>
  </BaseModal>
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
  }

.error-modal-container {
  .error-modal {
  h2{
    margin-bottom: 1rem;
  };
  p{
    margin-bottom: 1rem;
  }
}
}
</style>