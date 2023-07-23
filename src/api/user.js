import axios from 'axios'
import { ref } from 'vue'

const baseUrl='http://localhost:3001/api'

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