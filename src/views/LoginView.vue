<script setup>
  import { ref } from 'vue';
  import { loginAsync } from '../api/user';
  import { useRouter } from 'vue-router';
  const { loginErrorMsg, login }=loginAsync()
  const router=useRouter()
  const account=ref('')
  const password=ref('')
  const showErrorModal = ref(false)

  const handleLogin=async(e)=>{
    try{
      e.preventDefault()
    const data=await login({account:account.value,password:password.value})
    if(data.status==='success'){
      const token=data.data.token
      localStorage.setItem('authToken',token)
      account.value=''
      password.value=''
      window.location.href='/'
    }
    }catch{
      showErrorModal.value=true
    }
    
  }

  const handleGoogleLogin=()=>{
    window.location.href='http://localhost:3001/api/auth/google'
  }

    const closeErrorModal=()=>{
    showErrorModal.value=false
  }
</script>
<template>
<div class="login-container">
    <h1>登入</h1>
  <form @submit="handleLogin">
    <div class="input-group-wrapper">
      <div class="input-group">
        <label for="account">帳號</label>
        <input v-model="account" name="account" type="text" required>
      </div>
      <div class="input-group">
        <label for="password">密碼</label>
        <input v-model="password" name="password" type="password" required>
    </div>
    <div class="button-group">
      <button type="submit">登入</button>
      <button @click="handleGoogleLogin" class="google-login-button" type="button">使用Google帳號登入</button>
      <p>第一次來嗎? <a href="/register">註冊</a></p>
    </div>
    </div>   
  </form>
</div>

<!--Modal-->
  <div class="error-modal-container" v-if="showErrorModal">
      <div class="error-modal">
        <h2>登入失敗</h2>
        <button @click="closeErrorModal">關閉</button>
      </div>
    </div>
</template>
<style lang="scss" scoped>
.login-container{
  width:50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 5px solid #381c1c;
  border-radius: 6px;
  background-color: #fff;
  padding: 1rem;
  margin: 2rem auto;
  h1{
    margin-top: 30px;
    color:var(--major);
    font-weight: bold;
  }
  form{
    background-color: #fff;
    width:100%;
    margin-top: 2rem;
    padding-bottom: 2rem;
    .input-group-wrapper{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .input-group{
      width: 50%;
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      font-size: 1.5rem;
      input{
        margin-top: 10px;
        height: 1.8rem;
        font-size: 1rem;
      }
    }
    .button-group{
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      button{
        margin-bottom: 1rem;
        padding: 0.2rem;
        background-color: var(--major);
        color: #fff;
        cursor: pointer;
      }
      .google-login-button{
        background-color: #2352b9;
      }
    }
  }
  }
}

.error-modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
.error-modal {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  max-width: 400px;
  padding: 4rem;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  h2{
    margin-bottom: 1rem;
  }
}
}
</style>