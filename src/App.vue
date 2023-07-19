<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import Header from './components/Header.vue'
  import Footer from './components/Footer.Vue'
</script>

<template>
    <Header></Header>
    <main>
      <RouterView/>
    </main>
    <Footer></Footer>
</template>

<style lang="scss">
  main{
  padding-top: 50px;
  background-color:var(--background-color);
  padding-left:var(--site-edge-margin);
  padding-right: var(--site-edge-margin);
}
</style>
