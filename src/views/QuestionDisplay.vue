<script setup>

defineProps({
    question: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(["answerGiven"])

/**
 * Method takes in an array and one string of potential answers,
 * then returns a list of all options.
 * @param {array} incorrect_options 
 * @param {string} correct_option 
 */
const getAlternatives = (incorrect_options, correct_option) => {
    let alternatives = Object.values(incorrect_options)
    alternatives.push(correct_option)
    return shuffle(alternatives)
}

/**
 * Method used to shuffle an array.
 * @param {array} array 
 */
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i+1));
        [array[i], array[r]] = [array[r], array[i]];
    }
    return array
}

/**
 * Method used to pass the user's answer up to the parent component.
 * @param {string} answer 
 * @param {string} correct_answer 
 * @param {number} index 
 */
const answerGiven = (answer, correct_answer, index) => {
    if (answer === correct_answer) {
        emit("answerGiven", true, index)
    } else {
        emit("answerGiven", false, index)
    }
}

</script>

<template>
 <li>
           <p>
              {{question.question}} 
           </p>
           <button 
            class="bg-indigo-500 text-white p-3 rounded"  
            v-for="alternative in getAlternatives(question.incorrect_answers, question.correct_answer)" 
            v-on:click="answerGiven(alternative, question.correct_answer, index)"
           >
            {{alternative}}
           </button>
  </li>
</template>