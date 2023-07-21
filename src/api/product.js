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
      const {categoryId,page}=payload
      const res=await axios.get(baseUrl+'/products',{
          params:{
            categoryId:categoryId,
            page:page
          }
      })
      products.value=res.data.products.rows
      categories.value=res.data.categories
      Object.assign(pagination, res.data.pagination)
    }
    catch(err){
      productsErrorMsg.value=err
    }
  }
  return {products,categories,pagination,productsErrorMsg,getProducts}
}