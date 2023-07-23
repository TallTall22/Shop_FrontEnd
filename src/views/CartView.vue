<script setup>
import { ref} from 'vue'
import {getCartAsync} from '../api/cart'
const { carts, cartMsg, amount, getCartErrorMsg, getCart }= getCartAsync()
const step=ref('')
const authToken=localStorage.getItem('authToken')


getCart({ authToken })
</script>
<template>
  <h4 v-if="cartMsg"></h4>
  <div class="cart" v-if="!cartMsg">
    <div class="progress-container">
      <span class="progress-group" dataphase="product" :step="step">
        <span class="progress-circle">
          <span class="progress-number">1</span>
        </span>
        <span class="progress-text">確認商品</span>
      </span>
      <span class="progress-bar" dataOrder="1"></span>
      <span class="progress-group" dataphase="paidMethod" :step="step">
        <span class="progress-circle">
          <span class="progress-number">2</span>
        </span>
        <span class="progress-text">選擇付款方式</span>
      </span>
      <span class="progress-bar" dataOrder="2"></span>
      <span class="progress-group" dataphase="paidInfo" :step="step">
        <span class="progress-circle">
          <span class="progress-number">3</span>
        </span>
        <span class="progress-text">填寫付款資訊</span>
      </span>
    </div>
    <div class="form-container">
      <form>
        <div class="product" :step="step">
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
        <div class="paidMethod" :step="step">
          <label > 
            <input type="radio" name="paidMethod" value="信用卡">
            使用信用卡付款
          </label>
          <label > 
            <input type="radio" name="paidMethod" value="貨到付款">
            貨到付款
          </label>
        </div>
        <div class="paidInfo" :step="step">
          <div class="credit-Card">
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
          <div class="cash-on-delivery">
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
        <button>下一頁</button>
      </div>
      <div class="button-group" dataphase="paidMethod" :step="step">
        <button>上一頁</button>
        <button>下一頁</button>
      </div>
      <div class="button-group" dataphase="paidInfo" :step="step">
        <button>上一頁</button>
        <button>完成訂單</button>
      </div>
    </div>
  </div>
</template>
<style>

</style>