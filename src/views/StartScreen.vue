<script setup>
import { ref } from 'vue';
import {apiRegisterUser, apiGetUser} from "../api/users";

const username = ref("")

/**
 * Method used to get a user from the server when 
 * the user input their username.
 */
const onSubmit = async () => {
    // Get user from server
    let user = await apiGetUser(username.value)

    // If user does not exist, create it then 
    // get it from the server.
    if (user.length == 0) {
        await apiRegisterUser(username.value)
        user = await apiGetUser(username.value)
    }
    console.log(user)
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