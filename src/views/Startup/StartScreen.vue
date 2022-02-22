<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const username = ref("")
const emit = defineEmits(["onAuthSuccess"])

/**
 * Method used to get a user from the server when 
 * the user inputs their username.
 */
const onSubmit = async () => {
    const error = await store.dispatch("loginUser", {
        username
    })
    if (error !== null) {
        console.log(error)
    } else {
        emit("onAuthSuccess")
    }
}
</script>

<template>
 <main class="container mx-auto px-4">
  <h1 class="mb-3 text-2xl">Start screen</h1>
  <form @submit.prevent="onSubmit">
       <fieldset class="mb-3 mt-3">
         <label for="username" aria-label="Username" class="block">
             Username
         </label>
         <input 
          type="text" 
          id="username" 
          placeholder="Kari Nordmann" 
          class="border border-slate-300"
          v-model="username"
         >
      </fieldset>
      <button type="submit" class="bg-indigo-500 text-white p-3 rounded">Play now</button>
  </form>
 </main>
</template>