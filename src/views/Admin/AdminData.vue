<script setup>
import { ref } from 'vue'
import { NCard, NTabs, NTabPane, NTable, NButton, NSpace } from 'naive-ui'
import {
  getAdminUsers, getAdminProducts, getAdminCategories,
  getAdminOrders, postAdminCategories, patchAdminProduct,
  patchAdminOrders, deleteAdminProduct
} from '../../api/admin.js'
import { useRouter } from 'vue-router';

// 從 API 中取得資料
const { userData, usersErrorMsg, getUser } = getAdminUsers()
const { sellingProductsData, unsellingProductsData, productsErrorMsg, getProducts } = getAdminProducts()
const { categoriesData, categoriesErrorMsg, getCategories } = getAdminCategories()
const { ordersData, ordersErrorMsg, getOrders } = getAdminOrders()
const { postCategoriesErrorMsg, postCategories } = postAdminCategories()
const { patchProductErrorMsg, patchProduct } = patchAdminProduct()
const { patchOrderErrorMsg, patchOrder } = patchAdminOrders()
const { deleteProductErrorMsg, deleteProduct } = deleteAdminProduct()

// 取得驗證令牌
const authToken = localStorage.getItem('authToken')

// 使用 Vue Router
const router = useRouter()

// 定義新的商品種類
const newCategory = ref('')

// 處理新增種類
const handleCategory = async () => {
  if (newCategory.value.trim() !== '') {
    const result = await postCategories(newCategory.value);
    if (result) {
      newCategory.value = '';
      getCategories(authToken)
    }
  }
}

// 處理商品下架
const handlePatchProduct = async (id) => {
  await patchProduct({ id, authToken })
  getProducts(authToken)
}

// 處理商品刪除
const handleDeleteProduct = async (id) => {
  await deleteProduct({ id, authToken })
  getProducts(authToken)
}

// 處理訂單寄出
const handlePatchOrder = async (id) => {
  await patchOrder({ id, authToken, isSent: true })
  getOrders(authToken)
}

// 導航到新增商品頁面
const goCreateProductPage = () => {
  router.push('/admin/products/create')
}

// 導航到編輯商品頁面
const goEditProductPage = (id) => {
  router.push(`/admin/products/edit/${id}`)
}

// 導航到商品詳細頁面
const goProductPage = (id) => {
  router.push(`/admin/products/${id}`)
}

// 取得使用者、商品和訂單資料
getUser(authToken)
getProducts(authToken)
getCategories(authToken)
getOrders(authToken)
</script>

<template>
  <n-card>
    <h1>後台</h1>

    <!-- 使用者 -->
    <n-tabs type="line" defaultValue="Product" animated>
      <n-tab-pane name="User" tab="使用者">
        <n-table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>名字</th>
              <th>性別</th>
              <th>電子信箱</th>
              <th>身分</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in userData" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.gender }}</td>
              <td>{{ user.email }}</td>
              <td v-if="user.isAdmin">商家</td>
              <td v-if="!user.isAdmin">顧客</td>
            </tr>
          </tbody>
        </n-table>
      </n-tab-pane>

      <!-- 商品 -->
      <n-tab-pane name="Product" tab="商品">
        <n-button class="createdButton" type="info" @click="goCreateProductPage">新增商品</n-button>
        <n-tabs>
          <n-tab-pane name="sellingProduct" tab="上架中">
            <n-table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>商品名</th>
                  <th>種類</th>
                  <th>金額</th>
                  <th>庫存數</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in sellingProductsData" :key="product.id">
                  <td>{{ product.id }}</td>
                  <td>{{ product.name }}</td>
                  <td>{{ product.Category.name }}</td>
                  <td>{{ product.price }}</td>
                  <td>{{ product.quantity }}</td>
                  <td>
                    <n-space>
                      <n-button class="m-2" type="success" @click="goEditProductPage(product.id)">編輯</n-button>
                      <n-button color="#8a2be2" @click="goProductPage(product.id)">詳細資訊</n-button>
                      <n-button ghost color="#ff69b4" @click="handlePatchProduct(product.id)">下架</n-button>
                      <n-button type="error" @click="handleDeleteProduct(product.id)">刪除</n-button>
                    </n-space>
                  </td>
                </tr>
              </tbody>
            </n-table>
          </n-tab-pane>
          <n-tab-pane name="unsellingProduct" tab="未上架">
            <n-table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>商品名</th>
                  <th>種類</th>
                  <th>金額</th>
                  <th>庫存數</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in unsellingProductsData" :key="product.id">
                  <td>{{ product.id }}</td>
                  <td>{{ product.name }}</td>
                  <td>{{ product.Category.name }}</td>
                  <td>{{ product.price }}</td>
                  <td>{{ product.quantity }}</td>
                  <td>
                    <n-space>
                      <n-button class="m-2" type="success" @click="goEditProductPage(product.id)">編輯</n-button>
                      <n-button color="#8a2be2" @click="goProductPage(product.id)">詳細資訊</n-button>
                      <n-button ghost color="#ff69b4" @click="handlePatchProduct(product.id)">上架</n-button>
                      <n-button type="error" @click="handleDeleteProduct(product.id)">刪除</n-button>
                    </n-space>
                  </td>
                </tr>
              </tbody>
            </n-table>
          </n-tab-pane>
        </n-tabs>
      </n-tab-pane>

      <!-- 商品種類 -->
      <n-tab-pane name="Category" tab="種類">
        <input v-model="newCategory" name="name" type="text" placeholder="新增種類...">
        <n-button class="createdButton" type="info" @click="handleCategory">新增種類</n-button>
        <n-table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>名稱</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categoriesData" :key="category.id">
              <td>{{ category.id }}</td>
              <td>{{ category.name }}</td>
            </tr>
          </tbody>
        </n-table>
      </n-tab-pane>

      <!-- 訂單 -->
      <n-tab-pane name="Order" tab="訂單">
        <n-table striped>
          <thead>
            <tr>
              <th>訂單編號</th>
              <th>客戶</th>
              <th>總額</th>
              <th>付款方式</th>
              <th>是否付款</th>
              <th>狀態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in ordersData" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.User.name }}</td>
              <td>{{ order.amount }}</td>
              <td>{{ order.paidMethod }}</td>
              <td v-if="order.isPaid">已付款</td>
              <td v-if="!order.isPaid">未付款</td>
              <td v-if="!order.isCheck">訂單未成立</td>
              <td v-if="order.isCheck && !order.isSent">未寄出</td>
              <td v-if="order.isCheck && order.isSent">已寄出</td>
              <td v-if="order.isCheck && !order.isSent">
                <n-button color="#ff69b4" @click="handlePatchOrder(order.id)">寄出</n-button>
              </td>
              <td v-if="order.isCheck && order.isSent">
                <n-button ghost color="#ff69b4" disabled>已寄出</n-button>
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<style scoped>
.createdButton {
  margin: 1.5rem 1rem;
}
</style>
