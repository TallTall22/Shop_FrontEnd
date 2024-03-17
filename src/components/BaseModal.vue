<script setup>
  defineEmits(['close-error-modal'])
</script>
<template>
  <div class="error-modal-container">
    <div class="error-modal">
      <slot />
      <button @click="$emit('close-error-modal')">關閉</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
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
}
}
</style>