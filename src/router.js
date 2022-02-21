import { createRouter, createWebHistory } from "vue-router"
import store from "./store"
import QuestionScreen from "./views/QuestionScreen.vue"
import TriviaSelector from "./views/TriviaSelector.vue"
import TriviaGame from "./views/TriviaGame.vue"

/**
 * Method used to redirect the user to the start screen
 * if they are not logged in.
 */
const triviaGuard = (_to, _from, next) => {
    if (!store.state.user) {
        next("/")
    } else {
        next()
    }
}

/**
 * Method used to ensure the user is redirected if they go
 * to the login page while they are already logged in. 
 */
const loginGuard = (_to, _from, next) => {
    if (store.state.user) {
        if (store.state.questions) {
            next("/trivia")
        } else {
            next("/selection")
        }
    } else {
        next()
    }
}

const routes = [
    {
        path: "/",
        component: TriviaGame,
        beforeEnter: loginGuard
    },
    {
        path: "/trivia",
        component: QuestionScreen,
        beforeEnter: triviaGuard
    },
    {
        path: "/selection",
        component: TriviaSelector,
        beforeEnter: triviaGuard
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})