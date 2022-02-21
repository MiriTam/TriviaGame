<script setup>
import { useStore } from 'vuex';
import { computed } from "vue"

const store = useStore()
const user = computed(() => store.state.user)
const emit = defineEmits(["onTriviaSelectionSuccess"])
let category = null
let difficulty = null
let questionType = null

/**
 * Method used to set the selected trivia category.
 * @param {string} event 
 */
const setCategory = (event) => {
    const selectedCategory = event.target.value
    if (selectedCategory === "0") {
        category = null
    } else {
        category = selectedCategory
    }
}

/**
 * Method used to set the selected difficulty.
 * @param {string} event 
 */
const setDifficulty = (event) => {
    const selectedDifficulty = event.target.value
    if (selectedDifficulty === "any") {
        difficulty = null
    } else {
        difficulty = selectedDifficulty
    }
}

/**
 * Method used to set the selected question type.
 * @param {string} event 
 */
const setQuestionType = (event) => {
    const selectedType = event.target.value
    if (selectedType === "") {
        questionType = null
    } else {
        questionType = selectedType
    }
}

/**
 * Method used to submit the input form to be handled by store actions.
 */
const onSubmit = async () => {
    const error = await store.dispatch("getTriviaQuestions", {
        category,
        difficulty,
        questionType
    })
    if (error !== null) {
        console.log(error)
    } else {
        emit("onTriviaSelectionSuccess")
    }
}
</script>

<template>
<h1>Welcome {{user[0].username}}!</h1>
<p>Please select your trivia.</p>
<form @submit.prevent="onSubmit">
  <select @change="setCategory">
      <option value="any">Surprise Me</option>
      <option value="9">General Knowledge</option>
      <option value="10">Entertainment: Books</option>
      <option value="11">Entertainment: Film</option>
      <option value="12">Entertainment: Music</option>
      <option value="13">Entertainment: Musicals and Theatres</option>
  </select>
  <select @change="setDifficulty">
      <option value="any">Any difficulty</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
  </select>
  <select @change="setQuestionType">
      <option value="any">Any</option>
      <option value="multiple">Multiple Choice</option>
      <option value="boolean">True or False</option>
  </select>
  <button type="submit" class="bg-indigo-500 text-white p-3 rounded">Quiz me!</button>
</form>
</template>