import { TRIVIA_BASE_URL } from ".";

export async function getQuestions() {
    try {
        const response = await fetch(`${TRIVIA_BASE_URL}amount=10`)
        const {results} = await response.json()
        return results
    } catch (error) {
        return error
    }
}