<script setup>
import { useStore } from 'vuex';
import { computed } from "vue"
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useStore()
const user = computed(() => store.state.user)
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
 * Method used to submit the input form to be handled by store actions,
 * then push the questions route.
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
        router.push("/questions")
    }
}
</script>

<template>
<main class="container">
    <h1 class="title">Pleasure to serve thine quiz needs {{user[0].username}}, the quiztastic.</h1>
    <p class="sub-title">What manner of quiz would thou liketh?</p>
    <form @submit.prevent="onSubmit">
     <fieldset class="trivia-selection-field">
         <label class="dropdown-label">
             Ye Old Category
         </label>
         <select @change="setCategory" class="dropdown">
             <option value="any">Surprise Me</option>
             <option value="9">General Knowledge</option>
             <option value="10">Entertainment: Books</option>
             <option value="11">Entertainment: Film</option>
             <option value="12">Entertainment: Music</option>
             <option value="13">Entertainment: Musicals and Theatres</option>
             <option value="14">Entertainment: Television</option>
             <option value="15">Entertainment: Video Games</option>
             <option value="16">Entertainment: Board Games</option>
             <option value="17">Science and Nature</option>
             <option value="18">Science: Computers</option>
             <option value="19">Science: Mathematics</option>
             <option value="20">Mythology</option>
             <option value="21">Sports</option>
             <option value="22">Geography</option>
             <option value="23">History</option>
             <option value="24">Politics</option>
             <option value="25">Art</option>
             <option value="26">Celebrities</option>
             <option value="27">Animals</option>
             <option value="28">Vehicles</option>
             <option value="29">Entertainment: Comics</option>
             <option value="30">Science: Gadgets</option>
             <option value="31">Entertainment: Japanese Manga and Anime</option>
             <option value="32">Entertainment: Cartoons and Animations</option>
         </select>
     </fieldset>
     <fieldset class="trivia-selection-field">
         <label class="dropdown-label">
             Ye Old Difficulty level
         </label>
         <select @change="setDifficulty" class="dropdown">
             <option value="any">Any difficulty</option>
             <option value="easy">Easy</option>
             <option value="medium">Medium</option>
             <option value="hard">Hard</option>
         </select>
     </fieldset>
     <fieldset class="trivia-selection-field">
         <label class="dropdown-label">
             Ye Old Question Type
         </label>
         <select @change="setQuestionType" class="dropdown">
             <option value="any">Any</option>
             <option value="multiple">Multiple Choice</option>
             <option value="boolean">True or False</option>
         </select>
     </fieldset>
      <button type="submit" class="play-button">Quiz me!</button>
    </form>
</main>
</template>