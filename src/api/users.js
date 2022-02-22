import { USER_BASE_URL, API_KEY } from "."

/**
 * Method sends a request to the server to create a new user.
 * @param {string} username 
 */
export async function apiRegisterUser(username) {
  try {
    const response = await fetch(`${USER_BASE_URL}/trivia`, {
           method: 'POST',
           headers: {
               'X-API-Key': API_KEY,
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({ 
               username: username, 
               highScore: 0 
           })
       })
       if (!response.ok) {
         throw new Error("Could not register new user.")
       } else {
         return null
       }
  } catch (error) {
    console.log(error.message)
  }
}

/**
 * Method sends a request to the server to fetch the user
 * with the given username.
 * @param {string} username 
 * @returns 
 */
export async function apiGetUser(username) {
    try {
        const response = await fetch(`${USER_BASE_URL}/trivia?username=${username}`)
        return await response.json()
    } catch (error) {
        return error
    }
}

/**
 * Method used to update the user's highscore on the API.
 * @param {number} user
 * @param {number} highScore 
 * @returns 
 */
export async function apiUpdateUserHighscore(user, highScore) {
  try {
    const response = await fetch(`${USER_BASE_URL}/trivia/${user.id}`, {
      method: 'PUT',
      headers: {
          'X-API-Key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          highScore: highScore,
          id: user.id,
          username: user.username
      })
    })
    return await response
  } catch (error) {
    return error.message
  }
}

