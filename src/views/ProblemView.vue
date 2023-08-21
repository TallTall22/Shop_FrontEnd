<script setup>
// 引入相關的模組和函數
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { io } from 'socket.io-client';
import { useUserStore } from '../stores/user';

// 建立 Socket.io 連接
const socket = io("wss://test.just-for-test-shop.de/", { transports: ['websocket'] });

// 使用 useUserStore 從 store 中獲取使用者資料
const userStore = useUserStore();

// 從本地存儲中取得授權令牌
const authToken = localStorage.getItem('authToken');

// 獲取 Vue Router 的實例
const router = useRouter();

// 定義響應式變數和物件
const error = ref('');
const messages = ref([]);
const temp = ref({ message: '', name: '' });

// 如果沒有授權令牌，導向登入頁面
if (!authToken) {
    router.push('/login');
}

// 設定 socket 監聽事件
socket.on("message", obj => {
    messages.value = obj;
});

socket.on("newMessage", obj => {
    messages.value.push(obj);
});

// 從 store 中獲取使用者資料並設定 temp 物件中的 name
const fetchUserData = async () => {
    try {
        await userStore.getUser(authToken);
        temp.value.name = userStore.userData.account;
    } catch (err) {
        error.value = err;
    }
};
fetchUserData();

// 處理送出訊息的函數
const handleSendMessage = () => {
    if (!temp.value.message) return;
    socket.emit("sendMessage", temp.value);
    temp.value.message = "";
};
</script>

<template>
    <!-- 聊天室介面 -->
    <h2>問題反映區</h2>
    <div class="chat-container">
        <!-- 訊息列表 -->
        <ul>
            <li v-for="m in messages" :key="m.id" class="message-wrapper">
                <div v-if="m.message"
                    :class="{ 'chat-message': true, 'own-message': m.name === userStore.userData.account, 'seller-user': m.name === 'seller001' }">
                    <h4 class="name">{{ m.name }}</h4>
                    <p class="message-content">{{ m.message }}</p>
                </div>
            </li>
        </ul>
        <!-- 輸入訊息框和送出按鈕 -->
        <div class="send-wrapper">
            <input v-model="temp.message" placeholder="訊息" @keydown.enter="handleSendMessage" />
            <button class="send-button" @click="handleSendMessage">送出</button>
        </div>
    </div>
</template>
<style scoped lang="scss">
h2{
    text-align: center;
    margin-bottom: 2rem;
}
.chat-container {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    background-color: #c3c3c3;
    border-radius: 8px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    ul {
    width: 100%;
    list-style-type: none;
    padding: 0;
    margin-bottom: 2rem;
    .message-wrapper{
    display: flex;
    flex-direction: column;
    .chat-message {
        align-self: flex-start;
        margin-bottom: 10px;
        }
        .name {
            margin: 0;
            font-size: 16px;
            color: #333;
        }

        .message-content {
            margin: 5px 0;
            background-color: #7a5fb8;
            text-align: center;
            border-radius: 4px;
            padding: 10px;
            font-size: 14px;
            color: #ffffff;
        }
    
    .own-message {
    align-self: flex-end;

    .name {
    text-align: right;
    }

    .message-content {
        text-align: right;
        }
    }
    .seller-user{
        .name{
            color: #a30183;
        }

        .message-content{
            background-color: #ac0a6e;
        }
    }
    }
}
    .send-wrapper{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 20px 0;
        background-color: #f4f4f4;
        border: 1px solid #f4f4f4;
        border-radius: 10px;
        input{
        width: 80%;
        padding: 10px;
        margin-top: 10px;
        border: 1px solid #ddd;
        border-radius: 10px;
    }
    .send-button {
    width: 10%;
    padding: 8px;
    margin-left: 2rem;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
    background-color: #0056b3;
    }
    }
    }
}

</style>
