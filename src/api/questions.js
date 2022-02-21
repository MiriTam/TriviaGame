import { TRIVIA_BASE_URL } from ".";

/**
 * Method fetches a set of questions from the trivia api.
 * @returns 
 */
export async function apiGetQuestions(category, difficulty, questionType) {
    try {
        // Add user selctions to query.
        let query = "amount=10"
        if (category) {
            query += "&category=" + category
        }
        if (difficulty) {
            query += "&difficulty=" + difficulty
        }
        if (questionType) {
            query += "&type=" + questionType
        }
        const response = await fetch(`${TRIVIA_BASE_URL}${query}`)
        const {results} = await response.json()
        return results
    } catch (error) {
        return error
    }
}