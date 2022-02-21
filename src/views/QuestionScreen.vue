<script setup>
import { computed } from "vue"
import { useStore } from "vuex"

const store = useStore()
const user = computed(() => store.state.user)
const questions = computed(() => store.state.questions)

</script>

<template>
 <h1>
     Trivia 
 </h1>
 <h2>
     {{user}}
 </h2>
 <p>{{questions}}</p>
</template>