import { createStore } from "vuex";
import { apiGetQuestions } from "./api/questions";
import { apiGetUser, apiRegisterUser } from "./api/users"

/**
 * Method is used to get the user from local storage.
 * @returns 
 */
const initUser = () => {
    const storedUser = localStorage.getItem("trivia-user")
    if (!storedUser) {
        return null
    } else {
        return JSON.parse(storedUser)
    }
}

const initQuestions = () => {
    const storedQuestions = localStorage.getItem("trivia-questions")
    if (!storedQuestions) {
        return null
    } else {
        return JSON.parse(storedQuestions)
    }
}

export default createStore({
    state: {
        user: initUser(),
        questions: initQuestions()
    },
    mutations: {
        setUser: (state, user) => {
            state.user = user
        },
        setQuestions: (state, questions) => {
            state.questions = questions
        }
    },
    actions: {
        /**
         * Method saves the user in local storage.
         * @param {commit function} param0 
         * @param {username and name of action} param1 
         * @returns 
         */
        async loginUser({commit}, {username, action}) {
            try {
                if (action == "login") {
                    // Get user from server
                    let user = await apiGetUser(username.value)

                    // If user does not exist, create it then 
                    // get it from the server.
                    if (user.length == 0) {
                        await apiRegisterUser(username.value)
                        user = await apiGetUser(username.value)
                    }

                    // Add user to store and local storage.
                    commit("setUser", user)
                    localStorage.setItem("trivia-user", JSON.stringify(user))

                    return null

                } else {
                    throw new Error("loginUser: Wrong action provided. Action: " + action)
                }
            } catch (error) {
                return error.message
            }
        },

        /**
         * Method used to get trivia questions and add them to the store.
         * @returns 
         */
        async getTriviaQuestions({commit}, {category, difficulty, questionType}) {
            try {
                const results = await apiGetQuestions(category, difficulty, questionType)
                if (results.length != 10) {
                    throw new Error("getTriviaQuestions: Could not fetch trivia questions.")
                } else {
                    commit("setQuestions", results)
                    localStorage.setItem("trivia-questions", JSON.stringify(results))
                    return null
                }
            } catch (error) {
                return error.message
            }
        }
    }
})