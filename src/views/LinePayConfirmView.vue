<script setup>
// 引入相關的模組和函數
import { getLinePayConfirmAsync } from '../api/cart';

// 從 getLinePayConfirmAsync 函數中獲取相關變數和方法
const { getOrder, getLinePayConfirmErrorMsg, getLinePayConfirm } = getLinePayConfirmAsync();

// 從 localStorage 獲取授權令牌
const authToken = localStorage.getItem('authToken');

// 獲取當前的 URI
const currentUri = window.location.href;

// 創建 URL 物件來解析 URI
const url = new URL(currentUri);

// 使用 URL 物件的 searchParams 屬性獲取查詢參數
const transactionId = url.searchParams.get('transactionId');
const orderId = url.searchParams.get('orderId');

// 定義 LinePayasync 函數來處理 Line Pay 確認
const LinePayasync = async () => {
  // 呼叫 getLinePayConfirm 函數來確認交易
  await getLinePayConfirm({ authToken, transactionId, orderId });

  // 確認完成後轉跳至首頁
  window.location.href = '/';
};

// 執行 LinePayasync 函數來進行確認
LinePayasync();
</script>

<template>
  <!-- 顯示交易中或交易成功的提示 -->
  <h2 v-if="!getOrder">付款中...</h2>
  <div v-if="getOrder" class="success">
    <h2>交易成功</h2>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  text-align: center;
}

.success {
  h2 {
    color: #1eb100;
  }
}
</style>
