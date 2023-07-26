<script setup>
import { ref , watchEffect  } from 'vue'
import { useRoute } from 'vue-router';
import { getAdminEditProducts,putAdminProduct } from '../../api/admin';

const route = useRoute();
const id = route.params.id;
const { product, categories, productErrorMsg, getProduct }=getAdminEditProducts(id)
const { putProductErrorMsg, putProduct }=putAdminProduct()
const authToken = localStorage.getItem('authToken')

const name = ref('');
const price = ref('');
const description = ref('');
const quantity = ref('');
const image = ref('');
const categoryId = ref('');
const isSelling = ref('');

const handleProduct = async (e) => {
  e.preventDefault()
  if (name.value.trim() !== '') {
    const result = await putProduct({id:id , name: name.value, price: price.value, description: description.value, quantity: quantity.value, image: image.value, categoryId: categoryId.value, isSelling: isSelling.value, authToken });
    if (result) {
      name.value = '';
      price.value = '';
      description.value = '';
      quantity.value = '';
      categoryId.value = '';
      isSelling.value = '';
      image.value = '';
      window.location.href='/admin'
    }
  }
}
getProduct(authToken)

watchEffect(() => {
  if (product.value) {
    name.value = product.value.name;
    price.value = product.value.price;
    description.value = product.value.description;
    quantity.value = product.value.quantity;
    categoryId.value = product.value.categoryId;
    isSelling.value = product.value.isSelling;
  }
});
</script>

<template>
  <h1>新增商品</h1>

  <form @submit="handleProduct" enctype="multipart/form-data">
    <div class="inputGroupWrapper">

      <!--name-->
      <div class="inputGroup">
      <label for="name">商品名</label>
      <input v-model="name" name="name" type="text"  placeholder="請輸入商品名">
    </div>

    <!--price-->
    <div class="inputGroup">
      <label for="price">商品價格</label>
      <input v-model="price" name="price" type="text" placeholder="請輸入商品價格">
    </div>

    <!--quantity-->
    <div class="inputGroup">
      <label for="quantity">商品庫存</label>
      <input v-model="quantity" name="quantity" type="text" placeholder="請輸入商品庫存">
    </div>

    <!--Category-->
    <div class="inputGroup">
      <label for="categoryId">商品種類</label>
      <select v-model="categoryId" name="categoryId" id="">
        <option value="" disabled>請選擇商品種類</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
    </div>

    <!--isSelling-->
    <div class="inputGroup">
      <label for="isSelling">是否上架</label>
      <select v-model="isSelling" name="isSelling" id="">
        <option value="" disabled>請選擇是否上架</option>
        <option value=1>上架</option>
        <option value=0>不上架</option>
      </select>
    </div>

    <!--image-->
    <div class="inputGroup">
      <label for="image">商品相片</label>
      <input name="image" type="file" placeholder="請輸入商品名">
    </div>

    <!--description-->
    <div class="inputGroup">
      <label for="description">商品描述</label>
      <textarea v-model="description" name="description" rows="3" placeholder="請輸入商品名">
      </textarea>
    </div>
    <div class="buttonGroup">
        <button type="submit">儲存</button>
        <a href="/admin">取消</a>
      </div>
    </div>
    
  </form>
</template>
<style lang="scss" scoped>
form{
    background-color: #fff;
    width:100%;
    margin-top: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    .inputGroupWrapper{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .inputGroup{
      width: 50%;
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
      font-size: 1.5rem;
      input{
        margin-top: 10px;
        height: 1.8rem;
        font-size: 1rem;
      }
      select{
        margin-top: 10px;
        height: 1.8rem;
        font-size: 1rem;
      }
      textarea{
        margin-top: 10px;
      }
    }
    .buttonGroup{
      width: 50%;
      display: flex;
      justify-content: space-evenly;
    }
    }
  }
</style>