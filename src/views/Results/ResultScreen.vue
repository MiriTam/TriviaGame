<script setup>
import { useStore } from "vuex"
import { computed } from "vue"
import ResultDisplay from "./ResultDisplay.vue";
import { useRouter } from "vue-router";

const router = useRouter()
const store = useStore()
const answers = computed(() => store.state.answers)
const questions = computed(() => store.state.questions)
const selection = computed(() => store.state.selection)
const score = computed(() => store.state.score)

/**
 * Method returns the question at the given index in the 
 * given question array.
 * @param {number} index 
 * @param {array} listOfQuestions
 */
const getQuestion = (index) => {
    console.log("her", questions.value[index])
    return questions.value[index]
}

/**
 * Method resets the quiz answers and redirects the user to the question
 * page with new questions of the same category, difficulty, and type.
 */
const retry = async () => {
    const error = await store.dispatch("getTriviaQuestions", {
        category: selection.value.category,
        difficulty: selection.value.difficulty,
        type: selection.value.type
    })
    await store.dispatch("resetAnswers")
    if (error !== null) {
        console.log(error)
    } else {
        router.push("/questions")
    }
}

/**
 * Method resets the quiz data and redirects the user to
 * the trivia selection page.
 */
const changeSelection = () => {
    store.dispatch("resetQuiz")
    router.push("/selection")
}

/**
 * Method resets all local data and redirects user to 
 * the start page.
 */
const logout = () => {
    store.dispatch("reset")
    router.push("/")
}

</script>

<template>
 <main class="container">
    <h1 class="title">
       Quiz Results
    </h1>
    <h2 class="sub-title">
       Thou recieved a score of {{score}} out of 100.
    </h2>
    <ul class="question-list">
      <ResultDisplay 
        v-for="(answer, index) in answers" 
        :answer="answer"
        :index="index"
        class="display"
      />
    </ul>
    <button
      class="retry-button"
      v-on:click="retry"
    >
        Playeth once more!
    </button>
    <button
     class="change-button"
     v-on:click="changeSelection"
    >
        Tryeth something else
    </button>
    <button
     class="logout-button"
     v-on:click="logout"
    >
        Finish quiz
    </button>
 </main>
</template>