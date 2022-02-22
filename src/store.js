import { createStore } from "vuex";
import { apiGetQuestions } from "./api/questions";
import { apiGetUser, apiRegisterUser, apiUpdateUserHighscore } from "./api/users"

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

/**
 * Method gets the questions from local storage.
 * @returns 
 */
const initQuestions = () => {
    const storedQuestions = localStorage.getItem("trivia-questions")
    if (!storedQuestions) {
        return null
    } else {
        return JSON.parse(storedQuestions)
    }
}

/**
 * Method gets the answers from local storage.
 * @returns 
 */
const initAnswers = () => {
    const storedAnswers = localStorage.getItem("trivia-answers")
    if (!storedAnswers) {
        return null
    } else {
        return JSON.stringify(storedAnswers)
    }
}

/**
 * Method gets the trivia selection from local storage.
 * @returns 
 */
const initSelection = () => {
    const storedSelection = localStorage.getItem("trivia-selection")
    if (!storedSelection) {
        return null
    } else {
        return JSON.parse(storedSelection)
    }
}

/**
 * Method gets the current score from local storage.
 * @returns 
 */
const initScore = () => {
    const storedScore = localStorage.getItem("trivia-score")
    if (!storedScore) {
        return null
    } else {
        return JSON.stringify(storedScore)
    }
}

export default createStore({
    state: {
        user: initUser(),
        questions: initQuestions(),
        answers: initAnswers(),
        score: initScore(),
        selection: initSelection()
    },
    mutations: {
        setUser: (state, user) => {
            state.user = user
        },
        setQuestions: (state, questions) => {
            state.questions = questions
        },
        setAnswers: (state, answers) => {
            state.answers = answers
        },
        setSelection: (state, selection) => {
            state.selection = selection
        },
        setScore: (state, score) => {
            state.score = score
        }
    },
    actions: {
        /**
         * Method saves the user in local storage. 
         * @returns 
         */
        async loginUser({commit}, {username}) {
            try {
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
                    const selection = {
                        category: category,
                        difficulty: difficulty,
                        questionType: questionType
                    }
                    commit("setSelection", selection)
                    localStorage.setItem("trivia-selection", JSON.stringify(selection))
                    return null
                }
            } catch (error) {
                return error.message
            }
        },

        /**
         * Method stores the user's score and answers and updates their highscore. 
         * @returns 
         */
        async setTriviaAnswers({commit}, {answers, user}) {
            // Calculate score
            let score = 0
            answers.forEach(answer => {
                if (answer.correct_answer === answer.given_answer) {
                    score += 10
                }
            });

            // Store answers and current score in local storage.
            commit("setAnswers", answers)
            commit("setScore", score)
            localStorage.setItem("trivia-answers", JSON.stringify(answers))
            localStorage.setItem("trivia-score", JSON.stringify(score))

            // Send update to API.
            if (score > user.highScore) {
                const response = await apiUpdateUserHighscore(user, score)
                if (response.ok) {
                    return null
                } else {
                    return response
                }
            }
            return null
        },

        /**
         * Method resets the trivia score and answers to null.
         */
        resetAnswers({commit}) {
            commit("setAnswers", null)
            commit("setScore", null)
            localStorage.removeItem("trivia-answers")
            localStorage.removeItem("trivia-score")
        },

        /**
         * Method resets the quiz data stored in local storage. 
         */
        resetQuiz({commit}) {
            commit("setAnswers", null)
            commit("setScore", null)
            commit("setQuestions", null)
            commit("setSelection", null)
            localStorage.removeItem("trivia-answers")
            localStorage.removeItem("trivia-score")
            localStorage.removeItem("trivia-questions")
            localStorage.removeItem("trivia-selection")
        },

        /**
         * Method sets all data in local storage to null. 
         */
        reset({commit}) {
            commit("setUser", null)
            commit("setAnswers", null)
            commit("setScore", null)
            commit("setQuestions", null)
            commit("setSelection", null)
            localStorage.clear()
        }
    }
})