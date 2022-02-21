<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import QuestionDisplay from "./QuestionDisplay.vue"

const store = useStore()
const user = computed(() => store.state.user)
const questions = computed(() => store.state.questions)
let answers = []

/**
 * Method updates the user's answers.
 * @param {string} answer 
 * @param {number} index 
 */
const handleAnswer = (answer, index) => {
    answers[index] = answer
}

</script>

<template>
 <h1>
     Trivia 
 </h1>
 <main class="container mx-auto px-4">
     <ul>
         <QuestionDisplay 
          v-for="(value, index) in questions" 
          :question="value" 
          :index="index"
          @answerGiven="handleAnswer"
        />
     </ul>
 </main>
</template>