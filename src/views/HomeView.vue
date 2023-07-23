<script setup>
  import { ref } from 'vue';
  import {getViewsProducts} from '../api/product'
  import { addFavoriteAsync, deleteFavoriteAsync } from '../api/user'
  import { postCartAsync } from '../api/cart';
  import { RouterLink, useRouter } from 'vue-router';
  const { products,categories, pagination, productsErrorMsg, getProducts } = getViewsProducts()
  const { addFavoriteErrorMsg, addFavorite }=addFavoriteAsync()
  const { deleteFavoriteErrorMsg, deleteFavorite }=deleteFavoriteAsync()
  const { postCartMsg,postCartErrorMsg, postCart }=postCartAsync()

  const router=useRouter()
  const categoryId =ref('')
  const page=ref(1) 
  const showErrorModal = ref(false)
  const authToken=localStorage.getItem('authToken')

  const goProductPage=(id)=>{
    router.push(`/products/${id}`)
  }

  //category
  const handleChangeCategoryId=(id)=>{
    categoryId.value=id
    page.value=1
    getProducts({ authToken, categoryId: categoryId.value, page: page.value })
  }

  const isActive = (id) => {
  return categoryId.value === id;
};

  //favorite
  const handleAddFavorite=async(productId)=>{
    if(!authToken) return showErrorModal.value=true
    const res=await addFavorite({authToken,productId})
    if(res){
    getProducts({ authToken, categoryId: categoryId.value, page: page.value })
    }
  }
  
  const handleDeleteFavorite=async(productId)=>{
    if(!authToken) return showErrorModal.value=true
    const res=await deleteFavorite({authToken,productId})
    if(res){
    getProducts({ authToken, categoryId: categoryId.value, page: page.value })
    }
  }
  const closeErrorModal = () => {
  showErrorModal.value = false
}

  //cart
  const handleCreateCart=async(productId)=>{
    if (!authToken) return showErrorModal.value = true
    const res=await postCart({authToken, productId })
    if (res) {
    getProducts({ authToken, categoryId: categoryId.value, page: page.value })
    }
  }

  const closeCartErrorModal=()=>{
    postCartMsg.value=''
  }

  //pagination
  const handleChangePage = async (pageNumber) => {
    page.value = pageNumber
    getProducts({ authToken, categoryId: categoryId.value, page: page.value })
    window.scrollTo(0, 0)
  }

  const handlePrevPage=async()=>{
    page.value= pagination.prev
    getProducts({ authToken, categoryId: categoryId.value, page: page.value })
    window.scrollTo(0, 0)
  }

  const handleNextPage=async()=>{
    page.value= pagination.next
    getProducts({ authToken, categoryId: categoryId.value, page: page.value })
    window.scrollTo(0, 0)
  }

  const isCurrnetPage = (pageNumber) => {
  return page.value === pageNumber;
};

  
  getProducts({authToken, categoryId:categoryId.value, page:page.value})
  
  </script>

<template>
  <div class="listWrapper">
    <ul>
      <li>
        <RouterLink :to="{ path: '/', query: { categoryId:''} }" @click="handleChangeCategoryId('')">全部</RouterLink>
      </li>
      <li v-for="category in categories" :key="category.id">
        <RouterLink :class="{active: isActive(category.id) }" :to="{ path: '/', query: { categoryId:category.id } }" @click="handleChangeCategoryId(category.id)">{{ category.name }}</RouterLink>
      </li>
    </ul>
  </div>
<div class="cardWrapper">
    <div v-for="product in products" :key="product.id" class="card">
     <img  :src="product.image" alt="" @click="goProductPage(product.id)">
    <div class="cardBody">
      <h2>{{ product.name }}</h2>
      <p>{{ product.Category.name }}</p>
      <br>
      <h3>$NT {{ product.price }}</h3>
      <div class="buttonGroup">
        <button v-if="!product.isFavorited" class="btn favorite-btn" @click="handleAddFavorite(product.id)">收藏</button>
        <button v-if="product.isFavorited" class="btn unfavorite-btn" @click="handleDeleteFavorite(product.id)">移除收藏</button>
        <button class="btn cart-btn" @click="handleCreateCart(product.id)">加入購物車</button>
      </div>
    </div>
  </div>
</div>
<div class="pagination">
  <ul>
    <li>
      <RouterLink :to="{ path: '/', query: { page:pagination.prev } }" @click="handlePrevPage">上一頁</RouterLink>
    </li>
    <li v-for="page in pagination.pages" >
      <RouterLink :class="{active: isCurrnetPage(page)}" :to="{ path: '/', query: { page: page } }" @click="handleChangePage(page)">{{ page }}</RouterLink>
    </li>
    <li>
      <RouterLink :to="{ path: '/', query: { page: pagination.next } }" @click="handleNextPage">下一頁</RouterLink>
    </li>
  </ul>
</div>

  <!--Modal-->
      <div class="error-modal-container" v-if="showErrorModal">
        <div class="error-modal">
          <h2>警示</h2>
          <p>請先登入!</p>
          <button @click="closeErrorModal">關閉</button>
        </div>
      </div>

      <div class="error-modal-container" v-if="postCartMsg">
          <div class="error-modal">
            <h2>提醒</h2>
            <p>{{ postCartMsg }}</p>
            <button @click="closeCartErrorModal">關閉</button>
          </div>
        </div>
</template>

<style lang="scss">
  .listWrapper{
    margin-bottom: 2rem;
    ul{
      display: flex;
      justify-content: space-around;
      li{
        a{
          text-decoration: none;
          color: var(--major);
          &:hover{
            font-weight: bold;
            color: #2e2828;
          }
        }
        .active{
          font-weight: bold;
          color: #2e2828;
        }
      }
    }
  }

  .cardWrapper{
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
        cursor: pointer;
      }
      .cardBody{
        padding: 2rem;
        h2{
          margin-bottom: 0.2rem;
        }
        .buttonGroup{
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
        .favorite-btn{
          background-color: #397e3c;
          &:hover {
            background-color: #2a5f2d;
            }
          &:active {
            background-color: #1f4721;
            }
        }
        .unfavorite-btn{
          background-color: #ef0101;
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

  .pagination {
  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 0;

    li {
      margin: 0 5px;

      a {
        display: block;
        padding: 5px 10px;
        text-decoration: none;
        color: #333;
        border: 1px solid #ccc;
        border-radius: 5px;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: var(--major);
          color: #fff;
        }

      }
      .active{
        background-color: #054ab8;
        color: #fff;
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
  p{
    margin-bottom: 1rem;
  }
}
}

</style>
