import axios from 'axios'
import { reactive, ref } from 'vue'

const baseUrl='http://localhost:3001/api'

export const getViewsProducts=()=>{
  const products=ref([])
  const categories=ref([])
  const pagination=reactive({
    totalPage:0,
    pages:[],
    currentPage:1,
    prev:1,
    next:2
  })
  const productsErrorMsg=ref('')
  const getProducts=async(payload)=>{
    try{
      const {authToken,categoryId,page}=payload
      const res=await axios.get(baseUrl+'/products',{
          headers:{
            Authorization:'Bearer '+ authToken
          },
          params:{
            categoryId:categoryId,
            page:page
          }
      })
      products.value=res.data.data
      categories.value=res.data.categories
      Object.assign(pagination, res.data.pagination)
    }
    catch(err){
      productsErrorMsg.value=err
    }
  }
  return {products,categories,pagination,productsErrorMsg,getProducts}
}

export const getViewsProduct=()=>{
  const product=ref([])
  const productErrorMsg=ref('')
  const getProduct=async(payload)=>{
    try{
      const {id,authToken}=payload
      const res=await axios.get(baseUrl+`/products/${id}`,{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
      product.value=res.data.product
    }
    catch(err){
      productErrorMsg.value=err
    }
  }
  return {product,productErrorMsg,getProduct}
}