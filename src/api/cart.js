import axios from 'axios'
import { reactive, ref } from 'vue'

const baseUrl='http://localhost:3001/api'

export const postCartAsync=()=>{
  const postCartErrorMsg=ref('')
  const postCartMsg=ref('')
  const postCart=async(payload)=>{
    try{
      const {authToken,productId}=payload
      const res=await axios.post(baseUrl+'/carts/create',{productId},{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
      postCartMsg.value=res.data.message
    }catch(err){
      postCartErrorMsg.value=err
    }
  }

  return {postCartMsg,postCartErrorMsg,postCart}
}

export const getCartAsync=()=>{
  const getCartErrorMsg=ref('')
  const carts=ref('')
  const amount=ref('')
  const cartMsg=ref('')
  const getCart=async(payload)=>{
    try{
      const {authToken}=payload
      const res=await axios.get(baseUrl+'/carts',{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
      carts.value=res.data.carts
      cartMsg.value=res.data.message
      amount.value=res.data.amount
    }catch(err){
      getCartErrorMsg.value=err
    }
  }

  return {carts,cartMsg,amount,getCartErrorMsg,getCart}
}

