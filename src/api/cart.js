import axios from 'axios'
import { reactive, ref } from 'vue'

const baseUrl='https://test.test-shops.com/api'

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
  const order=ref('')
  const carts=ref({})
  const amountData=ref(0)
  const cartMsg=ref('')
  const getCart=async(payload)=>{
    try{
      const {authToken}=payload
      const res=await axios.get(baseUrl+'/carts',{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
      order.value=res.data.order
      carts.value=res.data.carts
      cartMsg.value=res.data.message
      amountData.value=res.data.amount
    }catch(err){
      getCartErrorMsg.value=err
    }
  }

  return {order,carts,cartMsg,amountData,getCartErrorMsg,getCart}
}

export const patchCartAsync=()=>{
  const patchCartErrorMsg=ref('')
  const patchCartMsg=ref('')
  const patchCart=async(payload)=>{
    try{
      const {authToken,productId,cartId,quantity}=payload
      const res=await axios.patch(baseUrl+`/carts/${cartId}`,{productId,quantity},{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
      patchCartMsg.value=res.data.message
    }catch(err){
      patchCartErrorMsg.value=err
    }
  }

  return {patchCartMsg,patchCartErrorMsg,patchCart}
}

export const deleteCartAsync=()=>{
  const deleteCartErrorMsg=ref('')
  const deleteCart=async(payload)=>{
    try{
      const {authToken,cartId}=payload
      const res=await axios.delete(baseUrl+`/carts/${cartId}`,{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
      return res.data
    }catch(err){
      deleteCartErrorMsg.value=err
    }
  }

  return {deleteCartErrorMsg,deleteCart}
}

export const putOrderAsync=()=>{
  const putOrderErrorMsg=ref('')
  const putOrder=async(payload)=>{
    try{
      const {authToken,orderId,amount,paidMethod,phone,address,name}=payload
      const res=await axios.put(baseUrl+`/carts/${orderId}`,{amount,paidMethod,phone,address,name},{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
      return res.data
    }catch(err){
      putOrderErrorMsg.value=err
    }
  }

  return {putOrderErrorMsg,putOrder}
}

export const postOrderAsync=()=>{
  const postOrderErrorMsg=ref('')
  const postOrder=async(payload)=>{
    try{
      const {authToken,orderId}=payload
      const res=await axios.post(baseUrl+'/carts/linePay',{orderId},{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
      return res.data
    }catch(err){
      postOrderErrorMsg.value=err
    }
  }

  return {postOrderErrorMsg,postOrder}
}

export const getLinePayConfirmAsync=()=>{
  const getOrder=ref('')
  const getLinePayConfirmErrorMsg=ref('')
  const getLinePayConfirm=async(payload)=>{
    try{
      const {authToken,transactionId,orderId}=payload
      const res=await axios.get(baseUrl+'/carts/linePay/confirm',{
        headers:{
          Authorization:'Bearer '+ authToken
        },
        params:{
            transactionId,
            orderId
          }
      })
      getOrder.value=res.data.order
    }catch(err){
      getLinePayConfirmErrorMsg.value=err
    }
  }

  return {getOrder,getLinePayConfirmErrorMsg,getLinePayConfirm}
}
