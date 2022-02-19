import { BASE_URL, API_KEY } from "."

/**
 * Method sends a request to the server to create a new user.
 * @param {string} username 
 */
export async function apiRegisterUser(username) {
 fetch(`${BASE_URL}/trivia`, {
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
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not create new user.')
      }
    })
    .then(newUser => {
      return newUser
    })
    .catch(error => {
        return error
    })
}

/**
 * Method sends a request to the server to fetch the user
 * with the given username.
 * @param {string} username 
 * @returns 
 */
export async function apiGetUser(username) {
    try {
        const response = await fetch(`${BASE_URL}/trivia?username=${username}`)
        return await response.json()
    } catch (error) {
        return error
    }
}

