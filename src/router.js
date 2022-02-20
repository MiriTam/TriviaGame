import { createRouter, createWebHistory } from "vue-router"
import StartScreen from "./views/StartScreen.vue"
import QuestionScreen from "./views/QuestionScreen.vue"
import TriviaGame from "./views/TriviaGame.vue"

const routes = [
    {
        path: "/",
        component: TriviaGame
    },
    {
        path: "/trivia",
        component: QuestionScreen
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})