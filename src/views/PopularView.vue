<script setup>
// 引入相關的模組和函數
import { useRouter } from 'vue-router';
import {
  getPopularProductAsync,
  getManPopularProductAsync,
  getWomanPopularProductAsync
} from '../api/product';
import { NCard, NTabs, NTabPane, NTable, NButton } from 'naive-ui';

// 從 getPopularProductAsync 函數中獲取相關變數和方法
const { popularProducts, getPopularProductErrorMsg, getPopularProduct } = getPopularProductAsync();

// 從 getManPopularProductAsync 函數中獲取相關變數和方法
const { ManPopularProducts, getManPopularProductErrorMsg, getManPopularProduct } = getManPopularProductAsync();

// 從 getWomanPopularProductAsync 函數中獲取相關變數和方法
const { womanPopularProducts, getWomanPopularProductErrorMsg, getWomanPopularProduct } = getWomanPopularProductAsync();

// 獲取 Vue Router 的實例
const router = useRouter();

// 點擊商品詳細資訊時的處理函數
const handleClickDetail = (id) => {
  router.push(`/products/${id}`);
};

// 呼叫各個函數來獲取相關商品資訊
getPopularProduct();
getManPopularProduct();
getWomanPopularProduct();
</script>

<template>
  <div class="desk">
    <n-card>
      <h2>銷售排行榜</h2>
      <n-tabs type="segment" animated size="small">
        <!-- 全部商品選項 -->
        <n-tab-pane name="all" tab="全部商品">
          <n-table striped>
            <thead>
              <tr>
                <th>排名</th>
                <th>商品編號</th>
                <th>商品名</th>
                <th>種類</th>
                <th>價格</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <!-- 顯示全部商品 -->
              <tr v-for="(product, index) in popularProducts" :key="product.id">
                <td>{{ index + 1 }}</td>
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.Category.name }}</td>
                <td>{{ product.price }}</td>
                <td>
                  <n-button color="#ff69b4" @click="handleClickDetail(product.id)">詳細資訊</n-button>
                </td>
              </tr>
            </tbody>
          </n-table>
        </n-tab-pane>
        <!-- 男性客戶購買選項 -->
        <n-tab-pane name="man" tab="男客戶購買">
          <n-table striped>
            <thead>
              <tr>
                <th>排名</th>
                <th>商品編號</th>
                <th>商品名</th>
                <th>種類</th>
                <th>價格</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <!-- 顯示男性客戶購買的商品 -->
              <tr v-for="(product, index) in ManPopularProducts" :key="product.id">
                <td>{{ index + 1 }}</td>
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.Category.name }}</td>
                <td>{{ product.price }}</td>
                <td>
                  <n-button color="#ff69b4" @click="handleClickDetail(product.id)">詳細資訊</n-button>
                </td>
              </tr>
            </tbody>
          </n-table>
        </n-tab-pane>
        <!-- 女性客戶購買選項 -->
        <n-tab-pane name="woman" tab="女客戶購買">
          <n-table striped>
            <thead>
              <tr>
                <th>排名</th>
                <th>商品編號</th>
                <th>商品名</th>
                <th>種類</th>
                <th>價格</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <!-- 顯示女性客戶購買的商品 -->
              <tr v-for="(product, index) in womanPopularProducts" :key="product.id">
                <td>{{ index + 1 }}</td>
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.Category.name }}</td>
                <td>{{ product.price }}</td>
                <td>
                  <n-button color="#ff69b4" @click="handleClickDetail(product.id)">詳細資訊</n-button>
                </td>
              </tr>
            </tbody>
          </n-table>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
  <div class="mobile">
    <n-card>
      <h2>銷售排行榜</h2>
      <n-tabs type="segment" animated size="small">
        <!-- 全部商品選項 -->
        <n-tab-pane name="all" tab="全部商品">
          <n-table striped>
            <thead>
              <tr>
                <th>排名</th>
                <th>商品名</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <!-- 顯示全部商品 -->
              <tr v-for="(product, index) in popularProducts" :key="product.id">
                <td>{{ index + 1 }}</td>
                <td>{{ product.name }}</td>
                <td>
                  <n-button color="#ff69b4" @click="handleClickDetail(product.id)">詳細資訊</n-button>
                </td>
              </tr>
            </tbody>
          </n-table>
        </n-tab-pane>
        <!-- 男性客戶購買選項 -->
        <n-tab-pane name="man" tab="男客戶購買">
          <n-table striped>
            <thead>
              <tr>
                <th>排名</th>
                <th>商品名</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <!-- 顯示男性客戶購買的商品 -->
              <tr v-for="(product, index) in ManPopularProducts" :key="product.id">
                <td>{{ index + 1 }}</td>
                <td>{{ product.name }}</td>
                <td>
                  <n-button color="#ff69b4" @click="handleClickDetail(product.id)">詳細資訊</n-button>
                </td>
              </tr>
            </tbody>
          </n-table>
        </n-tab-pane>
        <!-- 女性客戶購買選項 -->
        <n-tab-pane name="woman" tab="女客戶購買">
          <n-table striped>
            <thead>
              <tr>
                <th>排名</th>
                <th>商品名</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <!-- 顯示女性客戶購買的商品 -->
              <tr v-for="(product, index) in womanPopularProducts" :key="product.id">
                <td>{{ index + 1 }}</td>
                <td>{{ product.name }}</td>
                <td>
                  <n-button color="#ff69b4" @click="handleClickDetail(product.id)">詳細資訊</n-button>
                </td>
              </tr>
            </tbody>
          </n-table>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>
<style lang="scss" scoped>
.mobile{
  display: none;
}

@media screen and (max-width: 864px) {
  .mobile{
    display: block;
  }
  .desk{
    display: none;
  }
}
</style>
