import axios from 'axios'
import { reactive, ref } from 'vue'

const baseUrl='https://test.just-for-test-shop.de/api'

export const  loginAsync=()=>{
  const loginErrorMsg=ref('')
  const login=async(payload)=>{
    try{
      const {account,password}=payload
      const res=await axios.post(baseUrl+'/users/signin',{account,password})
      return res.data
    }catch(err){
      loginErrorMsg.value=err
    }
  }

  return {loginErrorMsg,login}
}

export const  registerAsync=()=>{
  const registerErrorMsg=ref('')
  const register=async(payload)=>{
    try{
      const {name,gender,email,password,phone,address,account,confirmPassword}=payload
      const res=await axios.post(baseUrl+'/users/signup',{name,gender,email,password,phone,address,account,confirmPassword})
      return res.data
    }catch(err){
      registerErrorMsg.value=err
    }
  }

  return {registerErrorMsg,register}
}

export const getUserAsync=()=>{
  const userData=ref('')
  const getUserErrorMsg=ref('')
  const getUser=async(authToken)=>{
    try{
      const res=await axios.get(baseUrl+'/users/',{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
      userData.value=res.data.user
    }catch(err){
      getUserErrorMsg.value=err
    }
  }
  return {userData,getUserErrorMsg,getUser}
}

export const addFavoriteAsync=()=>{
  const addFavoriteErrorMsg=ref('')
  const addFavorite=async(payload)=>{
    try{
      const {authToken,productId}=payload
      const res=await axios.post(baseUrl+'/users/favorites',{productId},{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
      return res.data
    }catch(err){
      addFavoriteErrorMsg.value=err
    }
  }
  return {addFavoriteErrorMsg,addFavorite}
}

export const deleteFavoriteAsync=()=>{
  const deleteFavoriteErrorMsg=ref('')
  const deleteFavorite=async(payload)=>{
    try{
      const {authToken,productId}=payload
      const res=await axios.delete(baseUrl+`/users/favorites/${productId}`,{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
      return res.data
    }catch(err){
      deleteFavoriteErrorMsg.value=err
    }
  }
  return {deleteFavoriteErrorMsg,deleteFavorite}
}

export const getFavoriteAsync=()=>{
  const getFavoriteErrorMsg=ref('')
  const favorites=ref('')
  const favoriteMsg=ref('')
  const getFavorite=async(payload)=>{
    try{
      const {authToken}=payload
      const res=await axios.get(baseUrl+'/users/favorites',{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
      favorites.value=res.data.FavoritedProduct
      favoriteMsg.value=res.data.message
    }catch(err){
      getFavoriteErrorMsg.value=err
    }
  }
  return {favorites,favoriteMsg,getFavoriteErrorMsg,getFavorite}
}

export const getUserOrderAsync=()=>{
  const getUserOrderErrorMsg=ref('')
  const userOrders=ref('')
  const getUserOrderMsg=ref('')
  const getUserOrder=async(payload)=>{
    try{
      const {authToken}=payload
      const res=await axios.get(baseUrl+'/users/orders',{
        headers:{
          Authorization:'Bearer '+ authToken
        }
      })
      userOrders.value=res.data.orders
      getUserOrderMsg.value=res.data.message
    }catch(err){
      getUserOrderErrorMsg.value=err
    }
  }
  return {userOrders,getUserOrderMsg,getUserOrderErrorMsg,getUserOrder}
}