<script setup>
defineEmits(['handle-minus-quantity','handle-plus-quantity','handle-delete-cart'])
defineProps({
  step:{
    type:Number
  },
  carts:{
    type:Object,
    default:()=>({})
  },
  amountData:{
    type:Number,
    default:""
  }
})
</script>
<template>
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
                  type="button"
                    @click="$emit('handle-minus-quantity', cart)">-</button>
                  {{ cart.quantity }}
                  <button
                    type="button"
                    @click="$emit('handle-plus-quantity',cart)">+</button>
                </td>
                <td>{{ cart.Product.price * cart.quantity }}</td>
                <td>
                  <button type="button" class="delete" @click="$emit('handle-delete-cart',cart)">刪除</button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- 購物車總金額 -->
          <div class="cart-total">
            <h4>總消費金額：$NT {{ amountData }}</h4>
          </div>
        </div>
</template>
<style lang="scss" scoped>
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
          }
</style>