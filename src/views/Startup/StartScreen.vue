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
 <main class="container">
  <h1 class="title">
      Welcome Honoured Quizhead!
  </h1>
  <h2 class="sub-title">
      Pray, what is thine name?
  </h2>
  <form @submit.prevent="onSubmit">
       <fieldset class="username-input">
         <label for="username" aria-label="Username" class="block">
             Thou may call me
         </label>
         <input 
          type="text" 
          id="username" 
          placeholder="Kari Nordmann" 
          class="border border-slate-300"
          v-model="username"
         >
         <label>, the quiztastic</label>
      </fieldset>
      <button type="submit" class="play-button">Playeth now</button>
  </form>
 </main>
</template>