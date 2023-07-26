<script setup>
  import { onMounted, ref } from 'vue';
  import {getViewsProducts} from '../api/product'
  import { addFavoriteAsync, deleteFavoriteAsync } from '../api/user'
  import { postCartAsync } from '../api/cart';
  import { RouterLink, useRouter } from 'vue-router';
   import {NButton} from 'naive-ui'
  const { products,categories, pagination, productsErrorMsg, getProducts } = getViewsProducts()
  const { addFavoriteErrorMsg, addFavorite }=addFavoriteAsync()
  const { deleteFavoriteErrorMsg, deleteFavorite }=deleteFavoriteAsync()
  const { postCartMsg,postCartErrorMsg, postCart }=postCartAsync()

  const router=useRouter()
  const categoryId =ref('')
  const keyword=ref('')
  const order=ref('')
  const minPrice=ref('')
  const maxPrice=ref('')
  const page=ref(1) 
  const showErrorModal = ref(false)
  const authToken=localStorage.getItem('authToken')

  const goProductPage=(id)=>{
    router.push(`/products/${id}`)
  }

  //search
  const handleSearchName = async() => {
  router.push({ path: '/', query: { keyword: keyword.value} })
  page.value = 1
  await getProducts({ authToken, categoryId: categoryId.value, page: page.value,keyword:keyword.value, order: order.value,minPrice:minPrice.value,maxPrice:maxPrice.value })
}

  const handleSearchMoney = async () => {
  router.push({ path: '/', query: { minPrice: minPrice.value,maxPrice:maxPrice.value } })
  page.value = 1
  await getProducts({ authToken, categoryId: categoryId.value, page: page.value, keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value })
}

  const handleSort = async () => {
  router.push({ path: '/', query: { order:order.value } })
  page.value = 1
  await getProducts({ authToken, categoryId: categoryId.value, page: page.value, keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value })
}

  //category
  const handleChangeCategoryId=(id)=>{
    categoryId.value=id
    page.value=1
    getProducts({ authToken, categoryId: categoryId.value, page: page.value, keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value })
  }

  const isActive = (id) => {
  return categoryId.value === id;
};

  //favorite
  const handleAddFavorite=async(productId)=>{
    if(!authToken) return showErrorModal.value=true
    const res=await addFavorite({authToken,productId})
    if(res){
    getProducts({ authToken, categoryId: categoryId.value, page: page.value , keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value })
    }
  }
  
  const handleDeleteFavorite=async(productId)=>{
    if(!authToken) return showErrorModal.value=true
    const res=await deleteFavorite({authToken,productId})
    if(res){
    getProducts({ authToken, categoryId: categoryId.value, page: page.value, keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value })
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
    getProducts({ authToken, categoryId: categoryId.value, page: page.value, keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value })
    }
  }

  const closeCartErrorModal=()=>{
    postCartMsg.value=''
  }

  //pagination
  const handleChangePage = async (pageNumber) => {
    page.value = pageNumber
    getProducts({ authToken, categoryId: categoryId.value, page: page.value, keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value })
    window.scrollTo(0, 0)
  }

  const handlePrevPage=async()=>{
    page.value= pagination.prev
    getProducts({ authToken, categoryId: categoryId.value, page: page.value , keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value })
    window.scrollTo(0, 0)
  }

  const handleNextPage=async()=>{
    page.value= pagination.next
    getProducts({ authToken, categoryId: categoryId.value, page: page.value, keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value })
    window.scrollTo(0, 0)
  }

  const isCurrnetPage = (pageNumber) => {
  return page.value === pageNumber;
};

  
  getProducts({authToken, categoryId:categoryId.value, page:page.value, keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value })
  </script>

<template>
  <div class="classify-container">
    <div class="search-container">
      <div class="sort-wrapper">
          <label for="sort">排序</label>
        <select v-model="order" name="sort" id="" @change="handleSort">
          <option value="id">商品編號</option>
          <option value="price">價格</option>
          <option value="categoryId">種類</option>
        </select>
        </div>
      <div class="search">
        <input v-model="keyword" type="text" name="keyword">
        <n-button type="info" @click="handleSearchName">搜尋</n-button>
      </div>
      <div class="money-wrapper">
        <label for="minPrice">金額</label>
        <input v-model="minPrice" type="number" name="minPrice" step="10" min="0" :max="maxPrice">
        <label for="maxPrice">-</label>
        <input v-model="maxPrice" type="number" name="maxPrice" step="10" :min="minPrice">
        <n-button type="info" @click="handleSearchMoney">搜尋</n-button>
      </div>
    </div>  
    <div class="">
      <ul>
      <li>
        <RouterLink :to="{ path: '/', query: { categoryId:''} }" @click="handleChangeCategoryId('')">全部</RouterLink>
      </li>
      <li v-for="category in categories" :key="category.id">
        <RouterLink :class="{active: isActive(category.id) }" :to="{ path: '/', query: { categoryId:category.id } }" @click="handleChangeCategoryId(category.id)">{{ category.name }}</RouterLink>
      </li>
    </ul>
    </div>
  </div>
<div class="card-wrapper">
    <h2 v-if="!products[0]">沒有商品符合您的搜尋結果</h2>
    <div v-for="product in products" :key="product.id" class="card">
     <img  :src="product.image" alt="" @click="goProductPage(product.id)">
    <div class="card-body">
      <h2>{{ product.name }}</h2>
      <p>{{ product.Category.name }}</p>
      <br>
      <h3>$NT {{ product.price }}</h3>
      <div class="button-group">
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
      <RouterLink v-if="products[0]" :to="{ path: '/', query: { page:pagination.prev } }" @click="handlePrevPage">上一頁</RouterLink>
    </li>
    <li v-for="page in pagination.pages" >
      <RouterLink :class="{active: isCurrnetPage(page)}" :to="{ path: '/', query: { page: page } }" @click="handleChangePage(page)">{{ page }}</RouterLink>
    </li>
    <li>
      <RouterLink v-if="products[0]" :to="{ path: '/', query: { page: pagination.next } }" @click="handleNextPage">下一頁</RouterLink>
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

<style lang="scss" scoped>
  .classify-container{
    margin-bottom: 2rem;
    .search-container{
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 2rem;
      .search{
        width: 50%;
        input{
          width: 80%;
          height: 1.5rem;
          margin-right: 5px;
        }
      }
      .sort-wrapper{
        width: 10%;
        label{
          font-size: 1rem;
        }
        select{
            height: 1.5rem;
            margin-right: 5px;
            margin-left: 5px;
        }
      }
      .money-wrapper{
        width:35%;
        label{
          font-size: 1rem;
        }
        input{
          width: 30%;
          height: 1.5rem;
          margin-right: 5px;
          margin: 0 5px;
        }
      }
    }
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
        width: 400px;
        height: 300px;
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
