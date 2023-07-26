<script setup>
import {useRouter} from 'vue-router'
import {getPopularProductAsync,getManPopularProductAsync,getWomanPopularProductAsync} from '../api/product'
import { NCard, NTabs, NTabPane, NTable, NButton } from 'naive-ui'
const { popularProducts, getPopularProductErrorMsg, getPopularProduct }= getPopularProductAsync()
const { ManPopularProducts, getManPopularProductErrorMsg, getManPopularProduct }=getManPopularProductAsync()
const { womanPopularProducts, getWomanPopularProductErrorMsg, getWomanPopularProduct }=getWomanPopularProductAsync()

const router=useRouter()

const handleClickDetail=(id)=>{
  router.push(`/products/${id}`)
}

getPopularProduct()
getManPopularProduct()
getWomanPopularProduct()
</script>
<template>
  <n-card>
    <h2>銷售排行榜</h2>
      <n-tabs type="segment" animated size="large">
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
              <tr v-for="(product,index) in popularProducts" :key="product.id">
                <td>{{ index+1 }}</td>
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
        <n-tab-pane name="man" tab="男性客戶購買">
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
        <n-tab-pane name="woman" tab="女性客戶購買">
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
</template>
<style lang="scss" scoped>

</style>