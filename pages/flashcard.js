import axios from 'axios'
import Enumerable from 'linq'

export default class FlashCard {

  MICRO_CMS_QUESTION_URL = "https://cotoha-flash-card.microcms.io/api/v1/question"

  constructor(microCmsKey) {
    this.microCmsKey = microCmsKey
  }

  async getAllQuestions() {
    const apiHeaders = {
      headers:{
        "X-API-KEY": this.microCmsKey
      }
    }

    const questionResult = await axios.get(this.MICRO_CMS_QUESTION_URL, apiHeaders)
    const contents = Enumerable.from(questionResult.data.contents)
    const questions = contents.select(c => c.question).toArray()
    return questions
  }
  
  getQuestionAtRandom(questions) {
    const index = Math.floor(Math.random() * questions.length)
    return questions[index]
  }
  
  convertEmoticonQuestion(question, answer) {
    const emoticonQuestion = question.replace(answer, "＼(^o^)／")
    return emoticonQuestion
  }
}