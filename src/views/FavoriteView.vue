<script setup>
  import { useRouter } from 'vue-router';
  import { deleteFavoriteAsync,getFavoriteAsync } from '../api/user';
  import { postCartAsync } from '../api/cart';
  const { favorites, favoriteMsg, getFavoriteErrorMsg, getFavorite }= getFavoriteAsync()
  const { deleteFavoriteErrorMsg, deleteFavorite } = deleteFavoriteAsync()
  const { postCartMsg, postCartErrorMsg, postCart } = postCartAsync()
  const router=useRouter()
  const authToken=localStorage.getItem('authToken')
  if(!authToken){
    router.push('/login')
  }

  const goProductPage = (id) => {
  router.push(`/products/${id}`)
}

  const handleDeleteFavorite = async (productId) => {
  const res = await deleteFavorite({ authToken, productId })
  if (res) {
    getFavorite({authToken})
  }
}

  const handleCreateCart = async (productId) => {
  const res = await postCart({ authToken, productId })
  if (res) {
    getFavorite({ authToken })
  }
}

const closeCartErrorModal = () => {
  postCartMsg.value = ''
}

getFavorite({authToken})
</script>
<template>
  <h4 v-if="favoriteMsg">{{ favoriteMsg }}</h4>
    <div v-if="!favoriteMsg" class="card-wrapper">
      <div v-for="favorite in favorites" :key="favorite.id" class="card">
       <img  :src="favorite.image" alt="" @click="goProductPage(favorite.id)">
      <div class="card-body">
        <h2>{{ favorite.name }}</h2>
        <br>
        <h3>$NT {{ favorite.price }}</h3>
        <div class="button-group">
          <button class="btn unfavorite-btn" @click="handleDeleteFavorite(favorite.id)">移除收藏</button>
          <button class="btn cart-btn" @click="handleCreateCart(favorite.id)">加入購物車</button>
        </div>
      </div>
    </div>
  </div>

  <!--Modal-->
        <div class="error-modal-container" v-if="postCartMsg">
            <div class="error-modal">
              <h2>提醒</h2>
              <p>{{ postCartMsg }}</p>
              <button @click="closeCartErrorModal">關閉</button>
            </div>
          </div>
</template>
<style lang="scss">

</style>