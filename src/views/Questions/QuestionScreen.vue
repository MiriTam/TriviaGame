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
 * Method updates the user's answers.
 * @param {string} answer 
 * @param {number} index 
 */
const handleAnswer = (correct_answer, answer, index) => {
    answers[index] = {
        correct_answer: correct_answer,
        given_answer: answer
    }
    if (answers.length == 10) {
        answered = allQuestionsAnswered()
        if (answered) {
            this.$forceUpdate()
        }
    }
}

/**
 * Method updates the stored answers and pushes the results route.
 */
const submitAnswers = async () => {
    if (!allQuestionsAnswered()) {
        alert("Thou did not answer every question, my liege. Are thou not as quiztastic as thou sayeth?")
        return
    }
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
 <main class="container">
    <h1 class="title">
        Quiz 
    </h1>
    <h2 class="sub-title">
        Thine quiz, my liege.
    </h2>
    <ol class="question-list">
        <QuestionDisplay 
         v-for="(value, index) in questions" 
         :question="value" 
         :index="index"
         @answerGiven="handleAnswer"
         class="display"
        />
    </ol>
    <button 
        class="play-button"
        v-on:click="submitAnswers"
    >
        Complete Quiz
    </button>
 </main>
</template>