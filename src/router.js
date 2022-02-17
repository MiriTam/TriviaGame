import { createRouter, createWebHistory } from "vue-router"
import StartScreen from "./views/StartScreen.vue"

const routes = [{
    path: "/",
    component: StartScreen
}]

export default createRouter({
    history: createWebHistory(),
    routes
})