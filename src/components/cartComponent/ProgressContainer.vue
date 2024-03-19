<script setup>
defineProps({
  step:{
    type:Number
  }
})
</script>
<template>
  <!-- 進度條容器 -->
    <div class="progress-container">

      <!-- 商品確認階段 -->
      <span class="progress-group" dataphase="product" :step="step">
        <span class="progress-circle">
          <span class="progress-number">1</span>
        </span>
        <div class="progress-text">確認商品</div>
      </span>
      <span class="progress-bar" dataOrder="1" :step="step"></span>

      <!-- 付款方式選擇階段 -->
      <span class="progress-group" dataphase="paidMethod" :step="step">
        <span class="progress-circle">
          <span class="progress-number">2</span>
        </span>
        <span class="progress-text">選擇付款方式</span>
      </span>
      <span class="progress-bar" dataOrder="2" :step="step"></span>

      <!-- 填寫付款資訊階段 -->
      <span class="progress-group" dataphase="paidInfo" :step="step">
        <span class="progress-circle">
          <span class="progress-number">3</span>
        </span>
        <span class="progress-text">填寫付款資訊</span>
      </span>
    </div>
</template>
<style lang="scss" scoped>

%done-phase{
    .progress-circle{
      background-color: #9b1b01;
      .progress-number{
      color: #fff;
      }
    }
  }

  %done-bar{
    border-color: #9b1b01;
  }

.progress-container{
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .progress-group{
        display: flex;
        align-items: center;
        .progress-circle{
          position: relative;
          display: inline-block;
          margin-right: 8px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid #000;
          .progress-number{
            width: inherit;
            height: inherit;
            position: absolute;
            font-size: 12px;
            font-weight: 700;
            line-height: 24px;
            text-align: center;
          }
        }
        .progress-text{
            line-height: 24px;
          }
      }
      .progress-bar{
      border: 1.5px solid #000;
      flex-grow: 1;
      margin: 0 10px;
      }
    }


    .progress-container{
      
      //step=1
      span[step="1"]{
        &[dataphase="product"]{
          @extend %done-phase;
        }
      }

      //step=2
      span[step="2"]{
        &[dataphase="product"],
        &[dataphase="paidMethod"]{
          @extend %done-phase;
        }
        &[dataOrder="1"]{
          @extend %done-bar;
        }
      }

      //step=3
      span[step="3"]{
        &[dataphase="product"],
        &[dataphase="paidMethod"],
        &[dataphase="paidInfo"]{
          @extend %done-phase;
        }
        &[dataOrder="1"],
        &[dataOrder="2"]{
          @extend %done-bar;
        }
      }
    }
</style>