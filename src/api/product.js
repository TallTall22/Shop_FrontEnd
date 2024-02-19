import axios from 'axios'
import { reactive, ref } from 'vue'

const baseUrl='https://test-shops.com/api'

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
      const {authToken,categoryId,page,order,keyword,minPrice,maxPrice}=payload
      const res=await axios.get(baseUrl+'/products',{
          headers:{
            Authorization:'Bearer '+ authToken
          },
          params:{
            categoryId:categoryId,
            order,
            keyword,
            minPrice,
            maxPrice,
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
  const isFavorited=ref(false)
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
      isFavorited.value=res.data.isFavorited
    }
    catch(err){
      productErrorMsg.value=err
    }
  }
  return {product,isFavorited,productErrorMsg,getProduct}
}

export const getPopularProductAsync=()=>{
  const popularProducts=ref([])
  const getPopularProductErrorMsg=ref('')
  const getPopularProduct=async()=>{
    try{
      const res=await axios.get(baseUrl+'/products/populars')
      popularProducts.value=res.data.products
    }
    catch(err){
      getPopularProductErrorMsg.value=err
    }
  }
  return {popularProducts,getPopularProductErrorMsg,getPopularProduct}
}

export const getManPopularProductAsync=()=>{
  const ManPopularProducts=ref([])
  const getManPopularProductErrorMsg=ref('')
  const getManPopularProduct=async()=>{
    try{
      const res=await axios.get(baseUrl+'/products/populars/man')
      ManPopularProducts.value=res.data.products
    }
    catch(err){
      getManPopularProductErrorMsg.value=err
    }
  }
  return {ManPopularProducts,getManPopularProductErrorMsg,getManPopularProduct}
}

export const getWomanPopularProductAsync=()=>{
  const womanPopularProducts=ref([])
  const getWomanPopularProductErrorMsg=ref('')
  const getWomanPopularProduct=async()=>{
    try{
      const res=await axios.get(baseUrl+'/products/populars/woman')
      womanPopularProducts.value=res.data.products
    }
    catch(err){
      getWomanPopularProductErrorMsg.value=err
    }
  }
  return {womanPopularProducts,getWomanPopularProductErrorMsg,getWomanPopularProduct}
}