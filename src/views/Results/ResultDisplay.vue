<script setup>
defineProps({
    answer: {
        type: Object,
        required: true
    },
    question: {
        type: Object,
        required: true
    }
})
</script>

<template>
 <div>
     Answer {{answer}}
 </div>
 <div>
     Question {{question}}
 </div>
 
</template>