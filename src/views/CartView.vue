<script setup>
import { ref } from 'vue'
import { getCartAsync, patchCartAsync, deleteCartAsync, putOrderAsync, postOrderAsync } from '../api/cart'
import { useRouter } from 'vue-router';
import BaseModal from '../components/BaseModal.vue';
import ProgressContainer from '../components/cartComponent/ProgressContainer.vue';
import CartProductListPart from '../components/cartComponent/CartProductListPart.vue';
import PaidMethodPart from '../components/cartComponent/PaidMethodPart.vue';
import PaidInfoPart from '../components/cartComponent/PaidInfoPart.vue';
import progressButton from '../components/cartComponent/progressButton.vue';


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
const handlePlusQuantity = async (cart) => {
    const productId=cart.Product.id, cartId= cart.id, quantity= cart.quantity + 1 
  const res = await patchCart({ authToken, productId, cartId, quantity })
  // 找到要增加數量的商品在購物車中的索引
  const index = await carts.value.findIndex(cart => cart.id === cartId);
  // 如果找到了該商品
  if (index !== -1&&carts.value[index].quantity<carts.value[index].Product.quantity) {
    // 直接更新本地購物車中該商品的數量
     carts.value[index].quantity += 1;
     amountData.value+=carts.value[index].Product.price
  }else{
    showErrorModal.value=true
  }
}

// 處理減少商品數量
const handleMinusQuantity = async (cart) => {
  const productId=cart.Product.id, cartId= cart.id, quantity= cart.quantity - 1 
  const res = await patchCart({ authToken, productId, cartId, quantity })
  // 找到要增加數量的商品在購物車中的索引
  const index =await carts.value.findIndex(cart => cart.id === cartId);
  // 如果找到了該商品
  if (index !== -1&&carts.value[index].quantity>1) {
    // 直接更新本地購物車中該商品的數量
    carts.value[index].quantity -= 1;
    amountData.value-=carts.value[index].Product.price
  }else{
    showErrorModal.value=true
  }
}

// 刪除購物車商品
const handleDeleteCart = async (cart) => {
  const cartId=cart.id
  await deleteCart({ authToken, cartId })
  getCart({ authToken })
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
    <ProgressContainer :step="step"/>

    <!-- 表單區域 -->
    <div class="form-container">
      <form>

        <!-- 商品清單部分 -->
        <CartProductListPart 
          :step="step" 
          :carts="carts" 
          :amountData="amountData" 
          @handle-plus-quantity="handlePlusQuantity" 
          @handle-minus-quantity="handleMinusQuantity" 
          @handle-delete-cart="handleDeleteCart" 
        />

        <!-- 付款方式選擇部分 -->
        <PaidMethodPart :step="step" v-model="paidMethod"/>
        
        <!-- 填寫付款資訊部分 -->
        <PaidInfoPart 
          :step="step" 
          :paidMethod="paidMethod"
          v-model:name="name"
          v-model:email="email"
          v-model:phone="phone"
          v-model:address="address"
          v-model:cardNumber1="cardNumber1"
          v-model:cardNumber2="cardNumber2"
          v-model:cardNumber3="cardNumber3"
          v-model:validDate="validDate"
          v-model:cvc="cvc"
        />
      </form>
    </div>

    <!-- 下方按鈕 -->
    <progressButton 
      :step="step" 
      :paidMethod="paidMethod" 
      @handle-for-second-step="handleForSecondStep" 
      @handle-minus-step="handleMinusStep"
      @handle-for-third-step="handleForThirdStep" 
      @handle-check-order="handleCheckOrder({orderId:order.id})" 
      @handle-line-pay="handleLinePay({orderId: order.id })" 
    />
  </div>

  <!-- 錯誤訊息 Modal -->
  <BaseModal v-if="showErrorModal" @close-error-modal="closeErrorModal">
    <h2>警示</h2>
    <p v-if="patchCartMsg">{{ patchCartMsg }}</p>
    <p v-if="!paidMethod&&step===2">請選擇付款方式</p>
    <p v-if="paidMethod">所有資料都必須填寫喔！</p>
  </BaseModal>
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

  .error-modal-container {
  .error-modal {
  h2{
    margin-bottom: 1rem;
  };
  p{
    margin-bottom: 1rem;
  }
}
}

  .cart{
    .form-container{

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