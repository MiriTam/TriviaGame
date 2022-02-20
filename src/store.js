import { createStore } from "vuex";
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

export default createStore({
    state: {
        user: initUser()
    },
    mutations: {
        setUser: (state, user) => {
            state.user = user
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
                    throw new Error("registerUser: Wrong action provided. Action: " + action)
                }
            } catch (error) {
                return error.message
            }
        }
    }
})