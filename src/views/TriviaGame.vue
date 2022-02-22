<script setup>
import { useRouter } from 'vue-router';
import StartScreen from './Startup/StartScreen.vue';

const router = useRouter()

const handleLogin = () => {
    router.push("/selection")
}
</script>

<template>
 <main>
     <StartScreen @onAuthSuccess="handleLogin" />
 </main>
</template>