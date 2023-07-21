<script setup>
  import { ref } from 'vue';
import {getViewsProducts} from '../api/product'
  import { RouterLink, useRouter } from 'vue-router';
  const { products,categories, pagination, productsErrorMsg, getProducts } = getViewsProducts()
  const router=useRouter()
  const categoryId =ref('')
  const page=ref(1) 
  const goProductPage=(id)=>{
    router.push(`/products/${id}`)
  }

  const handleChangeCategoryId=(id)=>{
    categoryId.value=id
    page.value=1
    getProducts({ categoryId: categoryId.value, page: page.value })
  }

  const handleChangePage = async (pageNumber) => {
    page.value = pageNumber
    getProducts({ categoryId: categoryId.value, page: page.value })
    window.scrollTo(0, 0)
  }

  const handlePrevPage=async()=>{
    page.value= pagination.prev
    getProducts({ categoryId: categoryId.value, page: page.value })
    window.scrollTo(0, 0)
  }

  const handleNextPage=async()=>{
    page.value= pagination.next
    getProducts({ categoryId: categoryId.value, page: page.value })
    window.scrollTo(0, 0)
  }

  const isCurrnetPage = (pageNumber) => {
  return page.value === pageNumber;
};

  const isActive = (id) => {
  return categoryId.value === id;
};
  getProducts({ categoryId:categoryId.value, page:page.value})
  
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
        <button class="btn favorite-btn">收藏</button>
        <button class="btn cart-btn">加入購物車</button>
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

</style>
