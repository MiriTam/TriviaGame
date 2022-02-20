import { createRouter, createWebHistory } from "vue-router"
import store from "./store"
import QuestionScreen from "./views/QuestionScreen.vue"
import TriviaGame from "./views/TriviaGame.vue"


/**
 * Method used to redirect the user to the start screen
 * if they are not logged in.
 */
const authGuard = (_to, _from, next) => {
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
        next("/trivia")
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
        beforeEnter: authGuard
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})