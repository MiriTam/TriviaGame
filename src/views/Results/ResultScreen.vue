<script setup>
import { useStore } from "vuex"
import { computed } from "vue"
import ResultDisplay from "./ResultDisplay.vue";

const store = useStore()
const answers = computed(() => store.state.answers)
const questions = computed(() => store.state.questions)
const score = computed(() => store.state.score)

const getQuestion = (index, listOfQuestions) => {
    return listOfQuestions[index]
}

</script>

<template>
 <h1>
     Results
 </h1>
  <p>
      Your total score is {{score}}
  </p>
  <ResultDisplay 
   v-for="(answer, index) in answers" 
   :answer="answer"
   :question="getQuestion(index, questions)"
 />
</template>