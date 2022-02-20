<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import { getQuestions } from "../api/questions"

let questions = []
const store = useStore()
const user = computed(() => store.state.user)

const getTriviaQuestions = async () => {
    const response = await getQuestions()
    if (response.length == 10) {
        questions = response
    } else {
        console.log("Did not fetch trivia questions.")
    }
}

getTriviaQuestions()
</script>

<template>
 <h1>
     Trivia 
 </h1>
 <h2>
     {{user}}
 </h2>
</template>