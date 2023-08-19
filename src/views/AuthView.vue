<script setup>
import { getGoogleLogin } from '../api/user'
const  { token, LoginErrorMsg, GoogleLogin } = getGoogleLogin()

const currentUri = window.location.href;

// 創建 URL 物件來解析 URI
const url = new URL(currentUri);

// 使用 URL 物件的 searchParams 屬性獲取查詢參數
const codeParam = url.searchParams.get('code');
const googleLoginasync =async()=>{
  await GoogleLogin(codeParam)
  localStorage.setItem('authToken', token.value)
  window.location.href='/'
}
googleLoginasync()
</script>
<template>
  <h2>登入中...</h2>
</template>
<style></style>