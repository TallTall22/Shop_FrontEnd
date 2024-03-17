<script setup>
// 引入必要的模組和函數
import { onMounted, ref } from 'vue';
import { getViewsProducts } from '../api/product';
import { addFavoriteAsync, deleteFavoriteAsync } from '../api/user';
import { postCartAsync } from '../api/cart';
import { RouterLink, useRouter } from 'vue-router';
import { NButton } from 'naive-ui';
import ProductCard from '../components/ProductCard.vue';
import BaseModal from '../components/BaseModal.vue';

// 使用解構賦值從 getViewsProducts 函數中獲取相關變數和方法
const { products, categories, pagination, productsErrorMsg, getProducts } = getViewsProducts();
const { addFavoriteErrorMsg, addFavorite } = addFavoriteAsync();
const { deleteFavoriteErrorMsg, deleteFavorite } = deleteFavoriteAsync();
const { postCartMsg, postCartErrorMsg, postCart } = postCartAsync();

// 初始化相關變數
const router = useRouter();
const categoryId = ref('');
const keyword = ref('');
const order = ref('id');
const minPrice = ref('');
const maxPrice = ref('');
const page = ref(1);
const showErrorModal = ref(false);
const authToken = localStorage.getItem('authToken');

// 跳轉至商品詳細頁面
const goProductPage = (id) => {
  router.push(`/products/${id}`);
};

// 搜尋相關功能
const handleSearch = async () => {
  router.push({ path: '/', query: { keyword: keyword.value,minPrice: minPrice.value, maxPrice: maxPrice.value } });
  page.value = 1;
  await getProducts({ authToken, categoryId: categoryId.value, page: page.value, keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value });
};

// 排序相關功能
const handleSort = async () => {
  router.push({ path: '/', query: { order: order.value } });
  page.value = 1;
  await getProducts({ authToken, categoryId: categoryId.value, page: page.value, keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value });
};

// 商品分類切換相關功能
const handleChangeCategoryId = (id) => {
  categoryId.value = id;
  page.value = 1;
  getProducts({ authToken, categoryId: categoryId.value, page: page.value, keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value });
};

// 判斷商品分類是否為當前選中的分類
const isActive = (id) => {
  return categoryId.value === id;
};

// 收藏相關功能
const handleAddFavorite = async (productId) => {
  if (!authToken) return showErrorModal.value = true;
  const res = await addFavorite({ authToken, productId });
  if (res) {
    getProducts({ authToken, categoryId: categoryId.value, page: page.value, keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value });
  }
};

const handleDeleteFavorite = async (productId) => {
  if (!authToken) return showErrorModal.value = true;
  const res = await deleteFavorite({ authToken, productId });
  if (res) {
    getProducts({ authToken, categoryId: categoryId.value, page: page.value, keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value });
  }
};

// 關閉錯誤訊息 Modal
const closeErrorModal = () => {
  showErrorModal.value = false;
};

// 加入購物車相關功能
const handleCreateCart = async (productId) => {
  if (!authToken) return showErrorModal.value = true;
  const res = await postCart({ authToken, productId });
  if(postCartMsg) return showErrorModal.value = true;
  if (res) {
    getProducts({ authToken, categoryId: categoryId.value, page: page.value, keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value });
  }
};

// 分頁相關功能
const handleChangePage = async (pageNumber) => {
  page.value = pageNumber;
  getProducts({ authToken, categoryId: categoryId.value, page: page.value, keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value });
  window.scrollTo(0, 0);
};

const handlePrevPage = async () => {
  page.value = pagination.prev;
  getProducts({ authToken, categoryId: categoryId.value, page: page.value, keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value });
  window.scrollTo(0, 0);
};

const handleNextPage = async () => {
  page.value = pagination.next;
  getProducts({ authToken, categoryId: categoryId.value, page: page.value, keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value });
  window.scrollTo(0, 0);
};

// 判斷分頁是否為當前頁面
const isCurrnetPage = (pageNumber) => {
  return page.value === pageNumber;
};

// 初始化頁面數據
getProducts({ authToken, categoryId: categoryId.value, page: page.value, keyword: keyword.value, order: order.value, minPrice: minPrice.value, maxPrice: maxPrice.value });
</script>

<template>
  <div class="home-container">
    <div class="category">
      <h2>商品分類</h2>
        <ul>
          <!-- 全部商品分類 -->
          <li>
            <RouterLink :to="{ path: '/', query: { categoryId: '' } }" @click="handleChangeCategoryId('')">全部</RouterLink>
          </li>
          <!-- 循環顯示各分類的連結 -->
          <li v-for="category in categories" :key="category.id">
            <RouterLink :class="{ active: isActive(category.id) }" :to="{ path: '/', query: { categoryId: category.id } }"
              @click="handleChangeCategoryId(category.id)">{{ category.name }}</RouterLink>
          </li>
        </ul>
      </div>
  <!-- 搜尋區塊 -->
  <div class="main-content">
<div class="classify-container">
  
    <div class="search-container">
      <div class="search">
            <input v-model="keyword" type="text" name="keyword" placeholder="搜尋商品...">
          </div>
          <div class="sort-wrapper">
          <select v-model="order" name="sort" id="" @change="handleSort">
            <option value="id">依商品編號排序</option>
            <option value="price">價格由低至高</option>
            <option value="categoryId">依種類排序</option>
          </select>
        </div>
      <div class="money-wrapper">
        <label class="min-price-label" for="minPrice">金額</label>
        <input v-model="minPrice" type="number" name="minPrice" step="10" min="0" :max="maxPrice" placeholder="最低價">
        <label for="maxPrice">-</label>
        <input v-model="maxPrice" type="number" name="maxPrice" step="10" :min="minPrice" placeholder="最高價">
        <n-button type="info" @click="handleSearch"><i class="fa-solid fa-magnifying-glass"></i></n-button>
      </div>
    </div>
  </div>
  <!-- 商品展示區塊 -->
  <div class="card-wrapper">
    <!-- 顯示無符合搜尋結果的提示 -->
    <h2 v-if="!products[0] && (minPrice || maxPrice || keyword || categoryId)">沒有商品符合您的搜尋結果</h2>
    <!-- 顯示讀取中提示 -->
    <h2 v-if="!products[0] && !minPrice && !maxPrice && !keyword && !categoryId">Loading...</h2>

    <!-- 循環顯示商品卡片 -->
    <div v-for="product in products" :key="product.id">
      <ProductCard :product="product" @go-product-page="goProductPage" @handle-add-favorite="handleAddFavorite(product.id)" @handle-delete-favorite="handleDeleteFavorite(product.id)" @handle-create-cart="handleCreateCart(product.id)"/>
    </div>
  </div>
  <!-- 分頁控制區塊 -->
  <div class="pagination">
    <ul>
      <!-- 顯示上一頁連結 -->
      <li>
        <RouterLink v-if="products[0]" :to="{ path: '/', query: { page: pagination.prev } }" @click="handlePrevPage">上一頁
        </RouterLink>
      </li>
      <!-- 循環顯示分頁數字連結 -->
      <li v-for="page in pagination.pages">
        <RouterLink :class="{ active: isCurrnetPage(page) }" :to="{ path: '/', query: { page: page } }"
          @click="handleChangePage(page)">{{ page }}</RouterLink>
      </li>
      <!-- 顯示下一頁連結 -->
      <li>
        <RouterLink v-if="products[0]" :to="{ path: '/', query: { page: pagination.next } }" @click="handleNextPage">下一頁
        </RouterLink>
      </li>
    </ul>
  </div>
  </div>
  </div>
  
  
  <!-- 錯誤訊息 Modal -->
  <BaseModal v-if="showErrorModal" @close-error-modal="closeErrorModal">
    <div v-if="!postCartMsg" class="">
      <h2>警示</h2>
      <p>請先登入!</p>
    </div>
    <div v-if="postCartMsg" class="">
      <h2>提醒</h2>
      <p>{{ postCartMsg }}</p>
    </div>
  </BaseModal>
</template>


<style lang="scss" scoped>
.home-container{
  display: flex;
  justify-content: space-around;
  .category{
    width: 10%;
    height: inherit;
    border: 1.5px solid rgba(100, 98, 98, 0.5) ;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2{
      text-align: center;
      margin: 1rem;
    }
    ul{
      height: auto;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      li{
          font-size: 1.2rem;
          padding: 0.5rem;
          &:hover{
            background-color: #1a1a1a;
            a{
              color: #fff;
            }
          }
        a{
          text-decoration: none;
          color: var(--major);
          
        }
        .active{
          font-weight: bold;
          color: #2e2828;
        }
      }
    }

  }
  .main-content{
    width: 90%;
    .classify-container{
    margin-left: 1.5rem;
    margin-bottom: 2rem;
    .search-container{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 2rem;
      .search{
        width: 100%;
        margin-bottom: 1rem;
        input{
          width: 80%;
          height: 1.5rem;
        }
      }
      .sort-wrapper{
        width: auto;
        margin-right: 2rem;
        select{
            height: 1.5rem;
        }
      }
      .money-wrapper{
        width:auto;
        
        label{
          font-size: 1rem;
          margin-right: 5px;
        }
        input{
          width: 30%;
          height: 1.5rem;
          margin-right: 5px;
        }
      }
    }
    
  }

  .card-wrapper{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 1rem;
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
  }
}
  

.error-modal-container {
.error-modal {
  h2{
    margin-bottom: 1rem;
  }
  p{
    margin-bottom: 1rem;
  }
}
}

@media screen and (max-width: 864px) {
  .home-container{
    .category {
      display: none;
    ul {
      li {
        text-align: center;
        font-size: 1rem;
      }
    }
  }
  }
  .main-content{
    .classify-container{
    .search-container{
      .search{
        input{
          width: 90%;
        }
      }
      .sort-wrapper{
        margin-bottom: 0.5rem;
        select{
          height: 1.5rem;
        }
      }
      .money-wrapper{
        .min-price-label{
          display: none;
        }
      }
    }
    
  }
}
  
}
</style>
