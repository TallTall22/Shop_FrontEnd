<script setup>
  import { ref } from 'vue';
  import { registerAsync } from '../api/user';
  import { useRouter } from 'vue-router';
  const { registerErrorMsg, register }=registerAsync()

  const name = ref('')
  const gender = ref('')
  const email = ref('')
  const account = ref('')
  const phone = ref('')
  const address = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const showErrorModal=ref(false)
  const router=useRouter()

  const handleRegister=async(e)=>{
    try{
      e.preventDefault()
    const data=await register({ name:name.value, gender:gender.value, email:email.value, password:password.value, phone:phone.value, address:address.value, account:account.value, confirmPassword:confirmPassword.value })
    if(data.status==='success'){
      router.push('/login')
    }
    }catch{
      showErrorModal.value=true
    }
  }

  const closeErrorModal=()=>{
    showErrorModal.value=false
  }

</script>
<template>
  <div class="register-container">
    <h1>註冊</h1>
    <form @submit="handleRegister">
      <div class="input-group-wrapper">
        <div class="input-group">
            <label for="name">名字</label>
            <input v-model="name" name="name" type="text">
          </div>
          <div class="input-group">
            <label for="gender">性別</label>
            <select v-model="gender" name="gender" id="">
              <option value="" disabled>請選擇</option>
              <option value="男">男</option>
              <option value="女">女</option>
              <option value="其他">其他</option>
              <option value="不願透漏">不願透漏</option>
            </select>
          </div>
          <div class="input-group">
            <label for="email">電子信箱 (必填)</label>
            <input v-model="email" name="email" type="text" required>
          </div>
          <div class="input-group">
            <label for="account">帳號 (必填)</label>
            <input v-model="account" name="account" type="text" required>
          </div>
          <div class="input-group">
            <label for="phone">電話/手機</label>
            <input v-model="phone" name="phone" type="text" >
          </div>
        <div class="input-group">
          <label for="address">地址</label>
          <input v-model="address" name="address" type="text" >
        </div>
        <div class="input-group">
          <label for="password">密碼 (必填)</label>
          <input v-model="password" name="password" type="password" required>
        </div>
        <div class="input-group">
            <label for="confirmPassword">確認密碼 (必填)</label>
            <input v-model="confirmPassword" name="confirmPassword" type="password" required>
        </div>
      </div>
      <div class="button-group">
            <button type="submit">註冊</button>
            <p>已經有帳號了嗎? <a href="/login">登入</a></p>
          </div>
    </form>
  </div>

  <!--Modal-->
  <div class="error-modal-container" v-if="showErrorModal">
    <div class="error-modal">
      <h2>註冊失敗</h2>
      <button @click="closeErrorModal">關閉</button>
    </div>
  </div>
</template>
<style lang="scss">
.register-container {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 5px solid #381c1c;
  border-radius: 6px;
  background-color: #fff;
  padding: 1rem;
  margin: 2rem auto;

  h1 {
    margin-top: 30px;
    color: var(--major);
    font-weight: bold;
  }

  form {
    background-color: #fff;
    width: 100%;
    margin-top: 2rem;
    padding-bottom: 2rem;

    .input-group-wrapper {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;

      .input-group {
        width: 40%;
        margin-bottom: 2rem;
        display: flex;
        flex-direction: column;
        font-size: 1.5rem;

        input {
          margin-top: 10px;
          height: 1.8rem;
          font-size: 1rem;
        }
        select{
        margin-top: 10px;
        height: 1.8rem;
        font-size: 1rem;
      }
      }
    }
    .button-group {
        margin:1rem auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        button {
          margin-bottom: 1rem;
          background-color: var(--major);
          width: 50%;
          height: 30px;
          color: #fff;
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