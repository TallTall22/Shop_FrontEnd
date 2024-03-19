<script setup>
import { ref } from 'vue';
const props=defineProps({
  step:{
    type:Number
  },
  paidMethod:{
    type:String
  },
  nameValue:String,
  emailValue:String,
  phoneValue:String,
  addressValue:String,
  cardNumber1Value:String,
  cardNumber2Value:String,
  cardNumber3Value:String,
  validDateValue:String,
  cvcValue:String
})
const emit = defineEmits([
 'update:name',
 'update:email',
 'update:phone',
 'update:address',
 'update:cardNumber1',
 'update:cardNumber2',
 'update:cardNumber3',
 'update:validDate',
 'update:cvc'
])

const name=ref(props.nameValue)
const email=ref(props.emailValue)
const phone=ref(props.phoneValue)
const address=ref(props.addressValue)
const cardNumber1=ref(props.cardNumber1Value)
const cardNumber2=ref(props.cardNumber2Value)
const cardNumber3=ref(props.cardNumber3Value)
const validDate=ref(props.validDateValue)
const cvc=ref(props.cvcValue)

function updateName(event) {
 name.value = event.target.value;
 emit('update:name', event.target.value)
}

function updateEmail(event) {
  email.value=event.target.value
  emit('update:email',event.target.value)
}

function updatePhone(event) {
  phone.value=event.target.value
  emit('update:phone',event.target.value)
}

function updateAddress(event){
  address.value=event.target.value
  emit('update:address',event.target.value)
}

function updateCardNumber1(event){
  cardNumber1.value=event.target.value
  emit('update:cardNumber1',event.target.value)
}

function updateCardNumber2(event){
  cardNumber2.value=event.target.value
  emit('update:cardNumber2',event.target.value)
}

function updateCardNumber3(event){
  cardNumber3.value=event.target.value
  emit('update:cardNumber3',event.target.value)
}

function updateValidDate(event){
  validDate.value=event.target.value
  emit('update:validDate',event.target.value)
}

function updateCvc(event){
  cvc.value=event.target.value
  emit('update:cvc',event.target.value)
}

</script>
<template>
 <div class="part" dataphase="paidInfo" :step="step">

          <!-- 信用卡付款資訊 -->
          <div v-if="paidMethod === '信用卡'" class="credit-Card">
            <div class="input-group-row">
              <div class="input-group">
                <label for="name">姓名</label>
                <input :value="name" @input="updateName" type="text" name="name" placeholder="張子房">
              </div>
              <div class="input-group">
                <label for="email">電子信箱</label>
                <input :value="email" @input="updateEmail" type="email" name="email" placeholder="example@gmail.com">
              </div>
            </div>
            <div class="input-group-row">
              <div class="input-group">
                <label for="phone">電話</label>
                <input :value="phone" @input="updatePhone" type="text" name="phone" placeholder="0912345678">
              </div>
              <div class="input-group">
                <label for="address">地址</label>
                <input :value="address" @input="updateAddress" type="text" name="address" placeholder="XX市XX區XX路XX號">
              </div>
            </div>
            <div class="input-group-row">
              <div class="input-group cardNumber">
                <label for="cardNumber">卡號</label>
                <div class="">
                  <input :value="cardNumber1" @input="updateCardNumber1" type="text" name="cardNumber" maxlength="4" placeholder="1234"> -
                  <input :value="cardNumber2" @input="updateCardNumber2" type="text" name="cardNumber" maxlength="4" placeholder="1234"> -
                  <input :value="cardNumber3" @input="updateCardNumber3" type="text" name="cardNumber" maxlength="4" placeholder="1234">
                </div>
              </div>
            </div>
            <div class="input-group-row">
              <div class="input-group">
                <label for="validDate">到期日</label>
                <input :value="validDate" @input="updateValidDate" type="text" name="validDate" placeholder="mm/yy">
              </div>
              <div class="input-group">
                <label for="cvc">CVC/CCV</label>
                <input :value="cvc" @input="updateCvc" type="text" name="cvc" maxlength="3" placeholder="123">
              </div>
            </div>
          </div>

          <!-- 貨到付款或 Line Pay 資訊 -->
          <div v-if="paidMethod === '貨到付款' || paidMethod ===  'LinePay'" class="cash-on-delivery">
            <div class="input-group">
              <label for="name">姓名</label>
              <input :value="name" @input="updateName" type="text" name="name">
            </div>
            <div class="input-group">
              <label for="email">電子信箱</label>
              <input :value="email" @input="updateEmail" type="email" name="email">
            </div>
            <div class="input-group">
              <label for="phone">電話</label>
              <input :value="phone" @input="updatePhone" type="text" name="phone">
            </div>
            <div class="input-group">
              <label for="address">地址</label>
              <input :value="address" @input="updateAddress" type="text" name="address">
            </div>
          </div>
        </div>
</template>
<style lang="scss" scoped>
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
</style>