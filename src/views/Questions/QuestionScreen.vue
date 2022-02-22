<script setup>
import { computed } from "vue"
import { useRouter } from "vue-router";
import { useStore } from "vuex"
import QuestionDisplay from "./QuestionDisplay.vue"

const router = useRouter()
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

/**
 * Method checks if the user has answered all questions.
 */
const allQuestionsAnswered = () => {
    if (answers.length != 10) return false
    else {
        answers.forEach(answer => {
            if (answer !== true || answer !== false) {
                return false
            }
        })
    }
    return true
}

/**
 * Method updates the stored answers and pushes the results route.
 */
const submitAnswers = async () => {
    if (!allQuestionsAnswered) return
    const error = await store.dispatch("setTriviaAnswers", {
        answers,
        user: user.value[0]
    })
    if (error != null) {
        console.log("error", error)
    } else {
        router.push("/results")
    }
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
     <button 
        class="bg-red-500 text-white p-3 rounded"
        onclick=""
        v-on:click="submitAnswers"
     >
        Complete Quiz
     </button>
 </main>
</template>