<script setup>
import { getGoogleLogin } from '../api/user'

// 從 API 中取得 Google 登入相關資訊
const { token, LoginErrorMsg, GoogleLogin } = getGoogleLogin()

// 取得當前的 URI
const currentUri = window.location.href;

// 創建 URL 物件來解析 URI
const url = new URL(currentUri);

// 使用 URL 物件的 searchParams 屬性獲取查詢參數
const codeParam = url.searchParams.get('code');

// 定義 Google 登入的異步函式
const googleLoginAsync = async () => {
  // 執行 Google 登入，使用 code 參數
  await GoogleLogin(codeParam)

  // 將取得的 token 儲存到本地儲存中
  localStorage.setItem('authToken', token.value)

  // 重新導向到首頁
  window.location.href = '/'
}

// 執行 Google 登入
googleLoginAsync()
</script>

<template>
  <h2>登入中...</h2>
</template>

<style></style>
