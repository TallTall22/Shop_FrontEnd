<script setup>
import { getUserOrderAsync } from '../api/user';
const { userOrders, getUserOrderMsg, getUserOrderErrorMsg, getUserOrder }=getUserOrderAsync()
const authToken=localStorage.getItem('authToken')


getUserOrder({authToken})
</script>
<template>
  <h4 v-if="getUserOrderMsg">{{ getUserOrderMsg }}</h4>
  <div v-if="!getUserOrderMsg" class="order-container">
    <h2>購物紀錄</h2>

    <!--紀錄-->
    <div v-for="userOrder in userOrders" :key="userOrder.id" class="order">
      <div class="title">
        <h3>訂單編號 : {{ userOrder.id }}</h3>
        <div class="order-info">
          <span>訂購時間 : {{userOrder.updatedAt.replace('.000Z',' ').replace('T',' ')}}</span>
          <span>總消費金額 : {{ userOrder.amount }}</span>
          <span v-if="userOrder.isSent">狀態 : 商家已寄出</span>
          <span v-if="!userOrder.isSent">狀態 : 等待商家寄出</span>
        </div>
        
      </div>
      <div  class="content">
        <table>
          <tbody>
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
</template>
<style lang="scss">
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