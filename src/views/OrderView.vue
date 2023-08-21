<script setup>
// 引入相關的模組和函數
import { useRouter } from 'vue-router';
import { getUserOrderAsync } from '../api/user';

// 從 getUserOrderAsync 函數中獲取相關變數和方法
const { userOrders, getUserOrderMsg, getUserOrderErrorMsg, getUserOrder } = getUserOrderAsync();

// 獲取 Vue Router 的實例
const router = useRouter();

// 從本地儲存中獲取授權令牌
const authToken = localStorage.getItem('authToken');

// 若未登入，導向登入頁面
if (!authToken) {
  router.push('/login');
}

// 呼叫 getUserOrder 函數來獲取使用者的購物紀錄
getUserOrder({ authToken });
</script>

<template>
  <div class="order-container">
    <!-- 若有購物紀錄訊息，顯示之 -->
    <h4 v-if="getUserOrderMsg">{{ getUserOrderMsg }}</h4>
    <!-- 若無購物紀錄訊息，顯示購物紀錄 -->
    <div v-if="!getUserOrderMsg">
      <h2>購物紀錄</h2>
      <!-- 顯示各筆購物紀錄 -->
      <div v-for="userOrder in userOrders" :key="userOrder.id" class="order">
        <!-- 標題區域 -->
        <div class="title">
          <h3>訂單編號 : {{ userOrder.id }}</h3>
          <div class="order-info">
            <span>訂購時間 : {{ userOrder.updatedAt.replace('.000Z', ' ').replace('T', ' ') }}</span>
            <span>總消費金額 : {{ userOrder.amount }}</span>
            <span>付款方式 : {{ userOrder.paidMethod }}</span>
            <span v-if="userOrder.isSent">狀態 : 商家已寄出</span>
            <span v-if="!userOrder.isSent">狀態 : 等待商家寄出</span>
          </div>
        </div>
        <!-- 內容區域，顯示訂單明細 -->
        <div class="content">
          <table>
            <tbody>
              <!-- 顯示各項訂單明細 -->
              <tr v-for="carts in userOrder.carts" :key="carts.id">
                <td>商品編號 : {{ carts.Product.id }}</td>
                <td>商品名 : {{ carts.Product.name }}</td>
                <td>購買數量 : {{ carts.quantity }}</td>
                <td>花費 : {{ carts.Product.price * carts.quantity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .order-container{
    h2{
      text-align: center;
    }
    .order{
      margin-top: 2rem;
      border-radius: 10px;
      background-color: #fff;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
      .title{
        padding: 1rem;
        background-color: #d5d4d4;
        h3{
          margin-bottom: 0.5rem;
        }
        .order-info{
          display: flex;
          justify-content: space-around;
        }
      }
      .content{
        padding: 1rem;
        table{
          width: 100%;
          tr{
          width: 100%;
          border: 1px solid #000;
          td{
          padding:1rem;
        }
        }
        }
      }
    }
  }
</style>