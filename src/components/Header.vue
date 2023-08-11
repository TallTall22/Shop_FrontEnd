<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { getUserAsync } from '../api/user';
const { userData, getUserErrorMsg, getUser }=getUserAsync()
const authToken=localStorage.getItem('authToken')

const handleLogout=()=>{
  localStorage.removeItem('authToken')
}

getUser(authToken)
</script>
<template>
  <header>
    <nav class="nav">
        <ul class="navList" >
          <li class="navItem">     
            <RouterLink to="/problem" class="navLink">問題反映</RouterLink>
          </li>
          <li class="navItem">     
            <RouterLink to="/popular" class="navLink">人氣商品</RouterLink>
          </li>
          <li class="navItem" >    
            <RouterLink to="/favorite" class="navLink">收藏</RouterLink>
          </li>
        </ul>
      </nav>
    <RouterLink to="/" class="navbarBrand">SHO</RouterLink>
    <nav class="nav">
      <ul class="navList" >
        <li v-if="userData.isAdmin" class="navItem">     
            <RouterLink to="/admin" class="navLink">後台</RouterLink>
        </li>
        <li v-if="!userData.isAdmin" class="navItem">     
          <RouterLink to="/cart" class="navLink">購物車</RouterLink>
        </li>
        <li v-if="!userData.isAdmin" class="navItem">     
            <RouterLink to="/order" class="navLink">購買紀錄</RouterLink>
          </li>
        <li v-if="!authToken" class="navItem" >    
          <RouterLink to="/login" class="navLink">登入</RouterLink>
        </li>
        <li v-if="authToken" class="navItem" >    
          <a href="/" class="navLink" @click="handleLogout">登出</a>
        </li>
      </ul>
    </nav>
  </header>
</template>
<style lang="scss">
header{
  position: sticky;
  top:0;
  z-index: 999;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  .navbarBrand{
      align-items: center;
      text-decoration: none;
      color: var(--major);
      font-weight: 600;
      font-size: 2.5rem;
    }
  .nav{
    width: 100%;
    .navList{
      width: 100%;
      display: flex;
      justify-content:space-evenly;
      .navItem{
        padding-left: 1.2rem;
        
        .navLink{
          font-size: 1.2rem;
          color:black;
          text-decoration: none;
          &:hover,
          &:focus {
              color: var(--major);
            }
        }
      }
    }
  }
}
</style>