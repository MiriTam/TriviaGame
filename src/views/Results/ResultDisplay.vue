<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

defineProps({
    answer: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
})

const store = useStore()
const questions = computed(() => store.state.questions)
</script>

<template>
 <li>
    <p class="question">
      {{questions[index].question}} 
    </p>
    <p 
     class="answer" 
    >
      Correct answer was: {{answer.correct_answer}}
    </p>
    <p
     v-bind:class=" answer.correct_answer === answer.given_answer ? 'correct' : 'wrong' " 
    >
      Thine answer was: {{answer.given_answer}}
    </p>
 </li>
</template>