import axios from 'axios'
import { ref } from 'vue'

const baseUrl='http://localhost:3001'

export const getAdminUser=()=>{
  const data=ref([])
  const errorMsg=ref('')
  const getUser=async()=>{
    try{
      const res=await axios.get(baseUrl+'/admin/users')
    data.value=res.data
    }catch(err){
      errorMsg.value=err
    }
  }
  
  return {data,errorMsg,getUser}
}