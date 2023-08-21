<script setup>
import { getLinePayConfirmAsync } from '../api/cart';
const { getOrder,getLinePayConfirmErrorMsg, getLinePayConfirm }=getLinePayConfirmAsync()
const authToken=localStorage.getItem('authToken')
const currentUri = window.location.href;

// 創建 URL 物件來解析 URI
const url = new URL(currentUri);

// 使用 URL 物件的 searchParams 屬性獲取查詢參數
const transactionId = url.searchParams.get('transactionId');
const orderId = url.searchParams.get('orderId');
const LinePayasync = async () => {
  await getLinePayConfirm({ authToken, transactionId, orderId })
  window.location.href = '/'
}
LinePayasync()
</script>
<template>
<h2 v-if="!getOrder">付款中...</h2>
<div v-if="getOrder" class="success">
  <h2>交易成功</h2>
</div>
</template>
<style lang="scss" scoped >
  h2{
    text-align: center;
  }
  .success{
    h2{
      color: #1eb100;
    }
  }
</style>