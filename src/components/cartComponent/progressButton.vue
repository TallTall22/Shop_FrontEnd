<script setup>
defineEmits(['handle-for-second-step','handle-minus-step','handle-for-third-step','handle-check-order','handle-line-pay'])
defineProps({
  step:{
    type:Number
  },
  paidMethod:{
    type:String
  }
})
</script>
<template>
  <div class="progress-button">

      <!-- 商品確認階段按鈕 -->
      <div class="button-group" dataphase="product" :step="step">
        <button disabled>上一頁</button>
        <button class="next" @click="$emit('handle-for-second-step')">下一頁</button>
      </div>

      <!-- 付款方式選擇階段按鈕 -->
      <div class="button-group" dataphase="paidMethod" :step="step">
        <button @click="$emit('handle-minus-step')">上一頁</button>
        <button class="next" @click="$emit('handle-for-third-step')">下一頁</button>
      </div>
      
      <!-- 填寫付款資訊階段按鈕 -->
      <div class="button-group" dataphase="paidInfo" :step="step">
        <button @click="$emit('handle-minus-step')">上一頁</button>
        <button v-if="paidMethod !== 'LinePay'" class="next"
          @click="$emit('handle-check-order')">完成訂單</button>
        <button v-if="paidMethod === 'LinePay'" class="Line-pay-button" @click="$emit('handle-line-pay')">Line
          Pay</button>
      </div>
    </div>
</template>
<style lang="scss" scoped>
.progress-button{
      .button-group{
        display: flex;
        justify-content: space-around;
        button{
          padding: 10px 20px;
          border-radius: 5px;
        }
        .next{
            border:  none;
              color: #fff;
              background-color: #007bff;
              &:hover {
            background-color: #0056b3;
          }

          &:active {
            background-color: #003d80;
          }
      }
      .Line-pay-button{
        border:  none;
              color: #fff;
              background-color: #10c000;
              &:hover {
            background-color: #119400;
          }

          &:active {
            background-color: #005c05;
          }
      }
      }
    }

    .progress-button{

      //step=1
       div[step="1"]{
        &[dataphase="paidMethod"],
        &[dataphase="paidInfo"]{
          display: none;
        }
      }

      //step=2
      div[step="2"]{
        &[dataphase="product"],
        &[dataphase="paidInfo"]{
          display: none;
        }
      }

      div[step="3"]{
        &[dataphase="product"],
        &[dataphase="paidMethod"]{
          display: none;
        }
      }
    }
</style>