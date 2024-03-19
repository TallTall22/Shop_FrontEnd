<script setup>
import { ref } from 'vue';

const props=defineProps({
  step: {
    type: Number
  },
  modelValue: String
});

const paidMethod = ref(props.modelValue);
const emit=defineEmits(['update:modelValue']);

function updatePaidMethod(value) {
 paidMethod.value = value;
 emit('update:modelValue', value);
}
</script>
<template>
  <div class="part" dataphase="paidMethod" :step="step">
    <label class="paidMethod">
      <input :value=paidMethod @input="updatePaidMethod('信用卡')" type="radio" name="paidMethod" >
      使用信用卡付款
    </label>
    <label class="paidMethod">
      <input :value="paidMethod" @input="updatePaidMethod('貨到付款')" type="radio" name="paidMethod">
      貨到付款
    </label>
    <label class="paidMethod">
      <input :value="paidMethod" @input="updatePaidMethod('LinePay')" type="radio" name="paidMethod">
      Line Pay
    </label>
  </div>
</template>
<style lang="scss" scoped>
.paidMethod{
   border: 1px solid #000;
   padding: 2rem 0;
   background-color: #fff;
   margin-bottom: 1rem;
}
</style>