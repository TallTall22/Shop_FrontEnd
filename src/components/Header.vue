<script setup>
import { ref , onMounted, onUnmounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useUserStore } from '../stores/user';


const userStore = useUserStore();
const authToken = localStorage.getItem('authToken');

const user = ref('');
const error = ref('');
const isMobile = ref(false);

const handleLogout = () => {
  localStorage.removeItem('authToken');
};

const handleResize = () => {
  isMobile.value = window.innerWidth <= 864;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const fetchUserData = async () => {
  try {
    await userStore.getUser(authToken);
    user.value = userStore.userData;
  } catch (err) {
    error.value = err;
  }
};
fetchUserData()
</script>
<template>
<div v-if="!isMobile" class="">
  <header>
    <nav class="nav nav-first">
        <ul class="nav-list" >
          <li class="nav-item">     
            <RouterLink to="/problem" class="nav-link">問題反映</RouterLink>
          </li>
          <li class="nav-item">     
            <RouterLink to="/popular" class="nav-link">人氣商品</RouterLink>
          </li>
          <li class="nav-item" >    
            <RouterLink to="/favorite" class="nav-link">收藏</RouterLink>
          </li>
        </ul>
      </nav>
    <RouterLink to="/" class="navbar-brand">SHO</RouterLink>
    <nav class="nav nav-second">
      <ul class="nav-list" >
        <li v-if="user.isAdmin" class="nav-item">     
            <RouterLink to="/admin" class="nav-link">後台</RouterLink>
        </li>
        <li v-if="!user.isAdmin" class="nav-item">     
          <RouterLink to="/cart" class="nav-link">購物車</RouterLink>
        </li>
        <li v-if="!user.isAdmin" class="nav-item">     
            <RouterLink to="/order" class="nav-link">購買紀錄</RouterLink>
          </li>
        <li v-if="!authToken" class="nav-item" >    
          <RouterLink to="/login" class="nav-link">登入</RouterLink>
        </li>
        <li v-if="authToken" class="nav-item" >    
          <a href="/" class="nav-link" @click="handleLogout">登出</a>
        </li>
      </ul>
    </nav>  
  </header>
</div>

  <div v-if="isMobile" class="">
    <header>
      <input class="navbar-toggle" type="checkbox" name="" id="navbar-toggle">
      <RouterLink to="/" class="navbar-brand">SHO</RouterLink>
      <nav class="nav nav-first">
          <ul class="nav-list" >
            <li class="nav-item">     
              <RouterLink to="/problem" class="nav-link">問題反映</RouterLink>
            </li>
            <li class="nav-item">     
              <RouterLink to="/popular" class="nav-link">人氣商品</RouterLink>
            </li>
            <li class="nav-item" >    
              <RouterLink to="/favorite" class="nav-link">收藏</RouterLink>
            </li>
          <li v-if="user.isAdmin" class="nav-item">     
              <RouterLink to="/admin" class="nav-link">後台</RouterLink>
          </li>
          <li v-if="!user.isAdmin" class="nav-item">     
            <RouterLink to="/cart" class="nav-link">購物車</RouterLink>
          </li>
          <li v-if="!user.isAdmin" class="nav-item">     
              <RouterLink to="/order" class="nav-link">購買紀錄</RouterLink>
            </li>
          <li v-if="!authToken" class="nav-item" >    
            <RouterLink to="/login" class="nav-link">登入</RouterLink>
          </li>
          <li v-if="authToken" class="nav-item" >    
            <a href="/" class="nav-link" @click="handleLogout">登出</a>
          </li>
        </ul>
      </nav>  
      <label for='navbar-toggle' class="navbar-toggle-label">
        <span class="hamburger"></span>
      </label>
      </header>
    </div>
</template>
<style lang="scss" scoped>
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
  .navbar-brand{
      align-items: center;
      text-decoration: none;
      color: var(--major);
      font-weight: 600;
      font-size: 2.5rem;
    }
  .nav{
    width: 100%;
    .nav-list{
      width: 100%;
      display: flex;
      justify-content:space-evenly;
      .nav-item{
        padding-left: 1.2rem;
        
        .nav-link{
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

@media screen and (max-width:864px) {
  header{
    position: relative;
    .nav {
          position: absolute;
          top: 100%;
          width:100%;
          background-color: var(--major);
          box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);          
          transition: transform 0.3s ease-out;
          transform-origin:top ;
          transform:scale(1,0);
          .nav-list{
            display: flex;
            flex-direction: column;
            .nav-item {
            margin:1.4rem 0;
            text-align: center;
            opacity: 0;
            .nav-link{
              all:unset;
              font-size: 1.2rem;
              color: rgb(210, 210, 210);
              cursor: pointer;
            }
          }
          }
          
        }
        .navbar-toggle {
          display: none;  
          &:checked~.nav{
          transform: scale(1, 1);
          }
          &:checked~.nav .nav-item{
          transition:opacity 0.2s ease-out 0.15s;
          opacity: 1;
          }
        }
        .navbar-toggle-label{
          position: absolute;
          top:0;
          bottom:0;
          right:7.5%;
          display: flex;
          align-items: center;
          .hamburger{
            position: relative;
            width: 30px;
            height: 3px;
            background: var(--major);
            &::before{
              content:'';
              position: absolute;
              left: 0;
              bottom: 8px;
              width: 30px;
              height: 3px;
              background: var(--major);
            }
            &::after{
              content:'';
              position: absolute;
              left: 0;
              top: 8px;
              width: 30px;
              height: 3px;
              background: var(--major);
            }
          }
        }
  }
}
</style>