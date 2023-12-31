<script setup>
import { ref } from 'vue'
import { getCartAsync, patchCartAsync, deleteCartAsync, putOrderAsync, postOrderAsync } from '../api/cart'
import { useRouter } from 'vue-router';

// 從 API 中取得購物車相關資訊
const { order, carts, cartMsg, amountData, getCartErrorMsg, getCart } = getCartAsync()
const { patchCartMsg, patchCartErrorMsg, patchCart } = patchCartAsync()
const { deleteCartErrorMsg, deleteCart } = deleteCartAsync()
const { putOrderErrorMsg, putOrder } = putOrderAsync()
const { postOrderErrorMsg, postOrder } = postOrderAsync()

// 創建相關的 ref 變數
const step = ref(1)
const amount = ref('')
const paidMethod = ref('')
const name = ref('')
const address = ref('')
const phone = ref('')
const email = ref('')
const cardNumber1 = ref('')
const cardNumber2 = ref('')
const cardNumber3 = ref('')
const validDate = ref('')
const cvc = ref('')

// 初始化 router
const router = useRouter()

// 創建 showErrorModal 的 ref 變數，用於顯示錯誤提示視窗
const showErrorModal = ref(false)

// 從本地儲存中獲取驗證令牌
const authToken = localStorage.getItem('authToken')

// 如果沒有驗證令牌，重新導向到登入頁面
if (!authToken) {
  router.push('/login')
}

// 處理增加商品數量
const handlePluseQuantity = async ({ productId, cartId, quantity }) => {
  const res = await patchCart({ authToken, productId, cartId, quantity })
}

// 處理減少商品數量
const handleMinusQuantity = async ({ productId, cartId, quantity }) => {
  const res = await patchCart({ authToken, productId, cartId, quantity })
}

// 刪除購物車商品
const handleDeleteCart = async ({ cartId }) => {
  await deleteCart({ authToken, cartId })
}

// 進入第二步
const handleForSecondStep = () => {
  amount.value = amountData.value
  step.value += 1
}

// 進入第三步
const handleForThirdStep = () => {
  if (!paidMethod.value) return showErrorModal.value = true
  step.value += 1
}

// 回到前一步
const handleMinusStep = () => {
  step.value -= 1
}

// 檢查訂單資訊並提交訂單
const handleCheckOrder = async ({ orderId }) => {
  if (!paidMethod.value || !amount.value || !name.value || !address.value || !phone.value || !email.value) return showErrorModal.value = true
  if (paidMethod.value === '信用卡' && (!cardNumber1.value || !cardNumber2.value || !cardNumber3.value || !validDate.value || !cvc.value)) return showErrorModal.value = true
  const res = await putOrder({ authToken: authToken, orderId, paidMethod: paidMethod.value, amount: Number(amount.value), phone: phone.value, address: address.value, name: name.value })
  if (res) {
    router.push('/')
  }
}

// Line Pay 處理
const handleLinePay = async ({ orderId }) => {
  if (!paidMethod.value || !amount.value || !name.value || !address.value || !phone.value || !email.value) return showErrorModal.value = true
  const res = await putOrder({ authToken: authToken, orderId, paidMethod: paidMethod.value, amount: Number(amount.value), phone: phone.value, address: address.value, name: name.value })
  const linePayRes = await postOrder({ authToken: authToken, orderId })
  if (linePayRes) {
    window.location.href = linePayRes.paidUrl
  }
}

// 關閉錯誤提示視窗
const closeErrorModal = () => {
  showErrorModal.value = false
}

// 取得購物車資料
getCart({ authToken })
</script>
<template>
  <!-- 購物車訊息區域 -->
  <h4 v-if="cartMsg">{{ cartMsg }}</h4>
  <div class="cart" v-if="!cartMsg">

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

    <!-- 表單區域 -->
    <div class="form-container">
      <form>

        <!-- 商品清單部分 -->
        <div class="part" dataphase="product" :step="step">
          <table>
            <thead>
              <tr>
                <th>商品編號</th>
                <th>商品名</th>
                <th>單價</th>
                <th>數量</th>
                <th>總價</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cart in carts" :key="cart.id">

                <!-- 商品資訊 -->
                <td>{{ cart.Product.id }}</td>
                <td>{{ cart.Product.name }}</td>
                <td>{{ cart.Product.price }}</td>
                <td>
                  <button
                    @click="handleMinusQuantity({ productId: cart.Product.id, cartId: cart.id, quantity: cart.quantity - 1 })">-</button>
                  {{ cart.quantity }}
                  <button
                    @click="handlePluseQuantity({ productId: cart.Product.id, cartId: cart.id, quantity: cart.quantity + 1 })">+</button>
                </td>
                <td>{{ cart.Product.price * cart.quantity }}</td>
                <td>
                  <button class="delete" @click="handleDeleteCart({ cartId: cart.id })">刪除</button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- 購物車總金額 -->
          <div class="cart-total">
            <h4>總消費金額：$NT {{ amountData }}</h4>
          </div>
        </div>

        <!-- 付款方式選擇部分 -->
        <div class="part" dataphase="paidMethod" :step="step">
          <label class="paidMethod">
            <input v-model="paidMethod" type="radio" name="paidMethod" value="信用卡">
            使用信用卡付款
          </label>
          <label class="paidMethod">
            <input v-model="paidMethod" type="radio" name="paidMethod" value="貨到付款">
            貨到付款
          </label>
          <label class="paidMethod">
            <input v-model="paidMethod" type="radio" name="paidMethod" value="LinePay">
            Line Pay
          </label>
        </div>

        <!-- 填寫付款資訊部分 -->
        <div class="part" dataphase="paidInfo" :step="step">

          <!-- 信用卡付款資訊 -->
          <div v-if="paidMethod === '信用卡'" class="credit-Card">
            <div class="input-group-row">
              <div class="input-group">
                <label for="name">姓名</label>
                <input v-model="name" type="text" name="name" placeholder="張子房">
              </div>
              <div class="input-group">
                <label for="email">電子信箱</label>
                <input v-model="email" type="email" name="email" placeholder="example@gmail.com">
              </div>
            </div>
            <div class="input-group-row">
              <div class="input-group">
                <label for="phone">電話</label>
                <input v-model="phone" type="text" name="phone" placeholder="0912345678">
              </div>
              <div class="input-group">
                <label for="address">地址</label>
                <input v-model="address" type="text" name="address" placeholder="XX市XX區XX路XX號">
              </div>
            </div>
            <div class="input-group-row">
              <div class="input-group cardNumber">
                <label for="cardNumber">卡號</label>
                <div class="">
                  <input v-model="cardNumber1" type="text" name="cardNumber" maxlength="4" placeholder="1234"> -
                  <input v-model="cardNumber2" type="text" name="cardNumber" maxlength="4" placeholder="1234"> -
                  <input v-model="cardNumber3" type="text" name="cardNumber" maxlength="4" placeholder="1234">
                </div>
              </div>
            </div>
            <div class="input-group-row">
              <div class="input-group">
                <label for="validDate">到期日</label>
                <input v-model="validDate" type="text" name="validDate" placeholder="mm/yy">
              </div>
              <div class="input-group">
                <label for="cvc">CVC/CCV</label>
                <input v-model="cvc" type="text" name="cvc" maxlength="3" placeholder="123">
              </div>
            </div>
          </div>

          <!-- 貨到付款或 Line Pay 資訊 -->
          <div v-if="paidMethod === '貨到付款' || 'LinePay'" class="cash-on-delivery">
            <div class="input-group">
              <label for="name">姓名</label>
              <input v-model="name" type="text" name="name">
            </div>
            <div class="input-group">
              <label for="email">電子信箱</label>
              <input v-model="email" type="email" name="email">
            </div>
            <div class="input-group">
              <label for="phone">電話</label>
              <input v-model="phone" type="text" name="phone">
            </div>
            <div class="input-group">
              <label for="address">地址</label>
              <input v-model="address" type="text" name="address">
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- 下方按鈕 -->
    <div class="progress-button">

      <!-- 商品確認階段按鈕 -->
      <div class="button-group" dataphase="product" :step="step">
        <button disabled>上一頁</button>
        <button class="next" @click="handleForSecondStep">下一頁</button>
      </div>

      <!-- 付款方式選擇階段按鈕 -->
      <div class="button-group" dataphase="paidMethod" :step="step">
        <button @click="handleMinusStep">上一頁</button>
        <button class="next" @click="handleForThirdStep">下一頁</button>
      </div>
      
      <!-- 填寫付款資訊階段按鈕 -->
      <div class="button-group" dataphase="paidInfo" :step="step">
        <button @click="handleMinusStep">上一頁</button>
        <button v-if="paidMethod !== 'LinePay'" class="next"
          @click="handleCheckOrder({ orderId: order.id })">完成訂單</button>
        <button v-if="paidMethod === 'LinePay'" class="Line-pay-button" @click="handleLinePay({ orderId: order.id })">Line
          Pay</button>
      </div>
    </div>
  </div>

  <!-- 錯誤訊息 Modal -->
  <div class="error-modal-container" v-if="showErrorModal">
    <div class="error-modal">
      <h2>警示</h2>
      <p v-if="!paidMethod">請選擇付款方式</p>
      <p v-if="paidMethod">所有資料都必須填寫喔！</p>
      <button @click="closeErrorModal">關閉</button>
    </div>
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
          .delete{
              padding: 10px 20px;
              font-size: 16px;
              color: #fff;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              background-color: #ef0101;
              &:hover {
                background-color: #ac0303;
                }
              &:active {
                background-color: #890404;
              }
            }
          table,th,td{
            border: 1px solid #000;
            text-align:center;
            padding: 1rem;
            flex-wrap: nowrap;
          }
          .cart-total{
            margin-top: 1rem;
            text-align: end;
            font-size: 1.5rem;
            color: var(--major)
          }
          .paidMethod{
            border: 1px solid #000;
            padding: 2rem 0;
            background-color: #fff;
            margin-bottom: 1rem;
          }
          .credit-Card{
              display: flex;
              flex-direction: column;
              flex-wrap: wrap;
              justify-content: space-around;
              align-items: center;
              .input-group-row{
                display: flex;
                justify-content: space-around;
                width: 100%;
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
                }
                .cardNumber{
                  padding-left: 5%;
                  width: 100%;
                }
              }
              }
              .cash-on-delivery{
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
              }
            }
            }
          }
        }
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