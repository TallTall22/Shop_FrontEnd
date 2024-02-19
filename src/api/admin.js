import axios from 'axios'
import { ref } from 'vue'

const baseUrl='https://test-shops.com/api'

export const getAdminUsers=()=>{
  const userData=ref([])
  const usersErrorMsg=ref('')
  const getUser=async(authToken)=>{
    try{
      const res=await axios.get(baseUrl+'/admin/users',{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
    userData.value=res.data.users
    }catch(err){
      usersErrorMsg.value=err
    }
  }
  
  return {userData,usersErrorMsg,getUser}
}

export const getAdminProducts=()=>{
  const sellingProductsData=ref([])
  const unsellingProductsData=ref([])
  const productsErrorMsg=ref('')
  const getProducts=async(authToken)=>{
    try{
      const res=await axios.get(baseUrl+'/admin/products',{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
    sellingProductsData.value=res.data.sellingProducts
    unsellingProductsData.value=res.data.unsellingProducts
    }catch(err){
      productsErrorMsg.value=err
    }
  }
  
  return {sellingProductsData,unsellingProductsData,productsErrorMsg,getProducts}
}

export const getAdminProduct=()=>{
  const product=ref([])
  const productErrorMsg=ref('')
  const getProduct=async({id,authToken})=>{
    try{
      const res=await axios.get(baseUrl+`/admin/products/${id}`,{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
    product.value=res.data.product
    }catch(err){
      productErrorMsg.value=err
    }
  }

  return {product,productErrorMsg,getProduct}
}

export const getAdminCreateProducts=()=>{
  const categoriesData=ref([])
  const productsErrorMsg=ref('')
  const getCategories=async(authToken)=>{
    try{
      const res=await axios.get(baseUrl+'/admin/products/create',{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
    categoriesData.value=res.data.categories
    }catch(err){
      productsErrorMsg.value=err
    }
  }

  return {categoriesData,productsErrorMsg,getCategories}
}

export const postAdminProduct=()=>{
  const ProductErrorMsg=ref('')
  const postProduct=async({name,price,description,quantity,image,categoryId,isSelling,authToken})=>{
    try{
      const res=await axios.post(baseUrl+'/admin/products',{name,price,description,quantity,image,categoryId,isSelling},{
      headers:{
        "Content-Type":'multipart/form-data',
        Authorization:'Bearer '+ authToken
      }
    })
      return res.data
    }catch(err){
      ProductErrorMsg.value=err
    }
  }

  return {ProductErrorMsg,postProduct}
}

export const getAdminEditProducts=(id)=>{
  const product=ref([])
  const categories=ref([])
  const productErrorMsg=ref('')
  const getProduct=async(authToken)=>{
    try{
      const res=await axios.get(baseUrl+`/admin/products/${id}/edit`,{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
    product.value=res.data.product
    categories.value=res.data.categories
    }catch(err){
      productErrorMsg.value=err
    }
  }

  return {product,categories,productErrorMsg,getProduct}
}

export const putAdminProduct=()=>{
  const putProductErrorMsg=ref('')
  const putProduct=async({id,name,price,description,quantity,image,categoryId,isSelling,authToken})=>{
    try{
      const res=await axios.put(baseUrl+`/admin/products/${id}`,{name,price,description,quantity,image,categoryId,isSelling},{
      headers:{
        "Content-Type":'multipart/form-data',
        Authorization:'Bearer '+ authToken
      }
    })
      return res.data
    }catch(err){
      putProductErrorMsg.value=err
    }
  }
  
  return {putProductErrorMsg,putProduct}
}

export const patchAdminProduct=()=>{
  const patchProductErrorMsg=ref('')
  const patchProduct=async({id,isSelling,authToken})=>{
    try{
      const res=await axios.patch(baseUrl+`/admin/products/${id}`,{isSelling},{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
      return res.data
    }catch(err){
      patchProductErrorMsg.value=err
    }
  }
    return {patchProductErrorMsg,patchProduct}
}

export const deleteAdminProduct=()=>{
  const deleteProductErrorMsg=ref('')
  const deleteProduct=async(payload)=>{
    try{
      const {id,authToken}=payload
      const res=await axios.delete(baseUrl+`/admin/products/${id}`,{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
      return res.data
    }catch(err){
      deleteProductErrorMsg.value=err
    }
  }
    return {deleteProductErrorMsg,deleteProduct}
}

export const getAdminCategories=()=>{
  const categoriesData=ref([])
  const categoriesErrorMsg=ref('')
  const getCategories=async(authToken)=>{
    try{
      const res=await axios.get(baseUrl+'/admin/categories',{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
      categoriesData.value=res.data.categories
    }catch(err){
      categoriesErrorMsg.value=err
    }
  }
  
  return {categoriesData,categoriesErrorMsg,getCategories}
}

export const postAdminCategories=()=>{
  const postCategoriesErrorMsg=ref('')
  const postCategories=async({category,authToken})=>{
    try{
      const res=await axios.post(baseUrl+'/admin/categories',{name:category},{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
      return res.data
    }catch(err){
      postCategoriesErrorMsg.value=err
    }
  }
  
  return {postCategoriesErrorMsg,postCategories}
}

export const getAdminOrders=()=>{
  const ordersData=ref([])
  const ordersErrorMsg=ref('')
  const getOrders=async(authToken)=>{
    try{
      const res=await axios.get(baseUrl+'/admin/orders',{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
      ordersData.value=res.data.orders
    }catch(err){
      ordersErrorMsg.value=err
    }
  }
  
  return {ordersData,ordersErrorMsg,getOrders}
}

export const patchAdminOrders=()=>{
  const patchOrderErrorMsg=ref('')
  const patchOrder=async({id,isSent,authToken})=>{
    try{
      const res=await axios.patch(baseUrl+`/admin/orders/${id}`,{isSent},{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
      return res.data
    }catch(err){
      patchOrderErrorMsg.value=err
    }
  }
  
  return {patchOrderErrorMsg,patchOrder}
}

