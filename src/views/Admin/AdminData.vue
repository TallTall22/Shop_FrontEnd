<script setup>
 import {NCard,NTabs,NTabPane} from 'naive-ui' 
 import {getAdminUser} from '../../composable/admin.js'
 const { data, errorMsg, getUser }=getAdminUser()
 getUser()
</script>
<template>
  <n-card>
    <h1>後台</h1>
    <n-tabs type="line" animated>
      <n-tab-pane name="User" tab="使用者">
        <table>
          <thead>
          <tr >
            <th className='bg-dark text-white' scope='col'>#</th>
            <th className='bg-dark text-white' scope='col'>名字</th>
            <th className='bg-dark text-white' scope='col'>性別</th>
            <th className='bg-dark text-white' scope='col'>電子信箱</th>
          </tr>
        </thead>
        <tbody>
          {
        
            <tr key={id}>
            <th scope='row'>{id}</th>
            <td>{name}</td>
            <td>{content}</td>
            <td>
              {
               lastColumn(isAdmin)
              }
            </td>
          </tr>
        
          }
        
        </tbody>
        </table>
      </n-tab-pane>
      <n-tab-pane name="Product" tab="商品">
        商品
      </n-tab-pane>
      <n-tab-pane name="Category" tab="種類">
        種類
      </n-tab-pane>
      <n-tab-pane name="Order" tab="訂單">
        訂單
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<style></style>
