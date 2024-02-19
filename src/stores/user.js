import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
const baseUrl='https://test-shops.com/api'

export const useUserStore = defineStore('user', () => {
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
})
