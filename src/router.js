import { createRouter, createWebHistory } from "vue-router"
import store from "./store"
import QuestionScreen from "./views/Questions/QuestionScreen.vue"
import TriviaSelector from "./views/Startup/TriviaSelector.vue"
import TriviaGame from "./views/TriviaGame.vue"
import ResultScreen from "./views/Results/ResultScreen.vue"

/**
 * Method used to ensure the user is redirected if they go
 * to the login page while they are already logged in. 
 */
 const loginGuard = (_to, _from, next) => {
    if (store.state.user) {
        next("/selection")
    } else {
        next()
    }
}

/**
 * Method used to redirect the user to the question screen
 * if they have already selected questions. 
 */
const selectionGuard = (_to, _from, next) => {
    if (store.state.questions) {
        next("/questions")
    } else {
        if (store.state.user) {
            next()
        } else {
            next("/")
        }
    }
}

/**
 * Method used to redirect the user to selection if there
 * are no questions, or to the results if the questions have 
 * already been answered.
 */
const triviaGuard = (_to, _from, next) => {
    if (store.state.answers) {
        next("/results")
    } else if (!store.state.questions) {
        next("/selection")
    } else {
        next()
    }
}

/**
 * Method used to redirect user from the results page if
 * there are no results to show.
 */
const resultGuard = (_to, _from, next) => {
    if (!store.state.answers) {
        next("/questions")
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
        path: "/questions",
        component: QuestionScreen,
        beforeEnter: triviaGuard
    },
    {
        path: "/selection",
        component: TriviaSelector,
        beforeEnter: selectionGuard
    },
    {
        path: "/results",
        component: ResultScreen,
        beforeEnter: resultGuard
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})