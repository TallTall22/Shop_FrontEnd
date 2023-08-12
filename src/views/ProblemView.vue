<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3001/", { transports: ['websocket'] });
const messages = ref([]);
const temp = ref({ message: '', name: '' });
const authToken=localStorage.getItem('authToken')
const router=useRouter()

if (!authToken) {
    router.push('/login')
}

    socket.on("message", obj => {
        messages.value = obj;
    });

    socket.on("newMessage", obj => {
        messages.value.push(obj);
    });


const sendMessage = () => {
    socket.emit("sendMessage", temp.value);
    temp.value.message = "";
};
</script>

<template>
    <div id="app">
        <ul>
            <li v-for="m in messages" :key="m.id">
                <h4>{{ m.message }}<span>-- {{ m.name }}</span></h4>
            </li>
        </ul>
        <input v-model="temp.message" placeholder="訊息" @keydown.enter="sendMessage" />
        <input v-model="temp.name" placeholder="你是誰？" />
        <button @click="sendMessage">送出</button>
    </div>
</template>
