<script setup>
import { ref} from 'vue'
import {getCartAsync} from '../api/cart'
const { carts, cartMsg, amount, getCartErrorMsg, getCart }= getCartAsync()
const step=ref(1)
const paidMethod=ref('')
const authToken=localStorage.getItem('authToken')

const handlePlusStep=()=>{
  step.value+=1
}

const handleMinusStep = () => {
  step.value -= 1
}

getCart({ authToken })
</script>
<template>
  <h4 v-if="cartMsg">{{cartMsg}}</h4>
  <div class="cart" v-if="!cartMsg">
    <div class="progress-container">
      <span class="progress-group" dataphase="product" :step="step">
        <span class="progress-circle">
          <span class="progress-number">1</span>
        </span>
        <div class="progress-text">確認商品</div>
      </span>
      <span class="progress-bar" dataOrder="1" :step="step"></span>
      <span class="progress-group" dataphase="paidMethod" :step="step">
        <span class="progress-circle">
          <span class="progress-number">2</span>
        </span>
        <span class="progress-text">選擇付款方式</span>
      </span>
      <span class="progress-bar" dataOrder="2" :step="step"></span>
      <span class="progress-group" dataphase="paidInfo" :step="step">
        <span class="progress-circle">
          <span class="progress-number">3</span>
        </span>
        <span class="progress-text">填寫付款資訊</span>
      </span>
    </div>
    <div class="form-container">
      <form>
        <div class="part" dataphase="product" :step="step">
          <table>
            <thead>
              <tr>
                <th>商品編號</th>
                <th>商品名</th>
                <th>單價</th>
                <th>數量</th>
                <th>總價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cart in carts" :key="cart.id">
                <td> {{cart.Product.id}}</td>
                <td> {{cart.Product.name}}</td>
                <td> {{cart.Product.price}}</td>
                <td>
                  <button>-</button> 
                  {{cart.quantity}}
                  <button>+</button>
                </td>
                <td> {{cart.Product.price*cart.quantity}}</td>
              </tr>
            </tbody>
          </table>
          <div class="cart-total">
            <p>總消費金額：{{ amount }}</p>
          </div>
        </div>
        <div class="part" dataphase="paidMethod" :step="step">
          <label > 
            <input v-model="paidMethod" type="radio" name="paidMethod" value="信用卡">
            使用信用卡付款
          </label>
          <label > 
            <input v-model="paidMethod" type="radio" name="paidMethod" value="貨到付款">
            貨到付款
          </label>
        </div>
        <div class="part" dataphase="paidInfo" :step="step">
          <div v-if="paidMethod==='信用卡'" class="credit-Card">
            <div>
              <label for="name">姓名</label>
              <input type="text" name="name">
            </div>
            <div>
              <label for="email">電子信箱</label>
              <input type="email" name="email">
            </div>
            <div>
              <label for="phone">電話</label>
              <input type="text" name="phone">
            </div>
            <div>
              <label for="address">地址</label>
              <input type="text" name="address">
            </div>
            <div>
              <label for="cardNumber">卡號</label>
              <input type="text" name="cardNumber" maxlength="4"> -
              <input type="text" name="cardNumber" maxlength="4"> -
              <input type="text" name="cardNumber" maxlength="4">
            </div>
            <div>
              <label for="validDate">到期日</label>
              <input type="text" name="validDate" placeholder="mm/yy">
            </div>
            <div>
              <label for="cvc">CVC/CCV</label>
              <input type="text" name="cvc" maxlength="3">
            </div>
          </div>
          <div v-if="paidMethod==='貨到付款'" class="cash-on-delivery">
              <div>
                <label for="name">姓名</label>
                <input type="text" name="name">
              </div>
              <div>
                <label for="email">電子信箱</label>
                <input type="email" name="email">
              </div>
              <div>
                <label for="phone">電話</label>
                <input type="text" name="phone">
              </div>
              <div>
                <label for="address">地址</label>
                <input type="text" name="address">
              </div>
          </div>
          <p>應付款項 : {{amount}}</p>
        </div>
      </form>
    </div>
    <div class="progress-button">
      <div class="button-group" dataphase="product" :step="step">
        <button disabled>上一頁</button>
        <button @click="handlePlusStep">下一頁</button>
      </div>
      <div class="button-group" dataphase="paidMethod" :step="step">
        <button @click="handleMinusStep">上一頁</button>
        <button @click="handlePlusStep">下一頁</button>
      </div>
      <div class="button-group" dataphase="paidInfo" :step="step">
        <button @click="handleMinusStep">上一頁</button>
        <button>完成訂單</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
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

  .cart{
    padding: 2rem;
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
    .form-container{
      form{
        .part{
          margin: 2rem auto ;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
      }
    }
  }

  .cart{
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

    .form-container,
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
  }
</style>