<script setup>
import { useRouter } from 'vue-router';
import StartScreen from './StartScreen.vue';

const router = useRouter()

const handleLogin = () => {
    console.log("user logged in")
    router.push("/selection")
}
</script>

<template>
 <main>
     <StartScreen @onAuthSuccess="handleLogin" />
 </main>
</template>