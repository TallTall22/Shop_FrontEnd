<script setup>
 import { ref } from 'vue'
 import { useRouter } from 'vue-router';
 import {getAdminCreateProducts,postAdminProduct} from '../../api/admin.js'
 const { categoriesData, productsErrorMsg, getCategories }=getAdminCreateProducts()
 const { ProductErrorMsg, postProduct }=postAdminProduct()
 const authToken=localStorage.getItem('authToken')
 const name=ref('')
 const price=ref('')
 const description=ref('')
 const quantity=ref('')
 const image=ref('')
 const imageInput=ref(null)
 const categoryId=ref('')
 const isSelling=ref('')
 const router = useRouter()

 const handleChangeImage=()=>{
  const selectedFile=imageInput.value.files[0]
  if(selectedFile){
    image.value=selectedFile
  }
 }

const handleProduct = async (e) => {
    e.preventDefault()
  if (name.value.trim() !== '') {
    const result = await postProduct({name:name.value, price:price.value, description:description.value, quantity:quantity.value,image:image.value, categoryId:categoryId.value, isSelling:isSelling.value, authToken });
    if (result) {
      name.value = '';
      price.value = '';
      description.value = '';
      quantity.value = '';
      categoryId.value = '';
      isSelling.value = '';
      image.value = '';
      await router.push({path:'/admin'})
    }
  }
}
 getCategories(authToken)


</script>

<template>
  <h1>新增商品</h1>

  <form @submit="handleProduct" enctype="multipart/form-data" >
    <div class="inputGroupWrapper">

      <!--name-->
    <div class="inputGroup">
      <label for="name">商品名</label>
      <input v-model="name" name="name" type="text" placeholder="請輸入商品名">
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

    <!--category-->
    <div class="inputGroup">
      <label for="categoryId">商品種類</label>
      <select  v-model="categoryId" name="categoryId" id="">
        <option value="" disabled>請選擇商品種類</option>
        <option v-for="category in categoriesData" :key="category.id" :value="category.id">{{ category.name }}</option>
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
      <input  name="image" ref="imageInput" @change="handleChangeImage" type="file" placeholder="請輸入商品名">
    </div>

    <!--description-->
    <div class="inputGroup">
      <label for="description">商品介紹</label>
      <textarea v-model="description" name="description" rows="3" placeholder="請輸入商品介紹">
      </textarea>
      
    </div>
    <div class="buttonGroup">
      <button type="submit">新增</button>
      <a href="/admin">取消</a>
    </div>
    
    </div>
    
  </form>  
</template>
<style lang="scss">
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