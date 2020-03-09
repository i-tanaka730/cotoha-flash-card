<template>
  <div class="container">
    <b-card tag="article" style="width: 30rem;" class="mb-2">
      <h2><b-badge variant="success">COTOHA FLASH CARD</b-badge></h2>
      <br/>
      <b-card-text>{{ question }}</b-card-text>
      <br/>
      <b-dropdown variant="success" id="dropdown-1" text="答え" class="m-md-2">
        <b-dropdown-item>{{ answer }}</b-dropdown-item>
      </b-dropdown>
      <b-button variant="success" v-on:click="nextQuestion">次の問題</b-button>
    </b-card>
  </div>
</template>

<script>

import CotohaApi from './cotoha'
import FlashCard from './flashcard'

const MICRO_CMS_API_KEY = "**********"
const DEVELOPER_API_CRIENT_ID = "**********"
const DEVELOPER_API_CRIENT_SECRET = "**********"

const cotohaApi = new CotohaApi(DEVELOPER_API_CRIENT_ID, DEVELOPER_API_CRIENT_SECRET)
const flashCard = new FlashCard(MICRO_CMS_API_KEY)

export default {

  async asyncData () {
    const questions = await flashCard.getAllQuestions()
    const question = flashCard.getQuestionAtRandom(questions)
    const answer = await cotohaApi.getKeyword(question)
    const emoticonQuestion = flashCard.convertEmoticonQuestion(question, answer)

    return {
      questions : questions,
      question : emoticonQuestion,
      answer : answer
    }
  },

  methods: {
    nextQuestion: async function() {
      const question = flashCard.getQuestionAtRandom(this.questions)
      const answer = await cotohaApi.getKeyword(question)
      const emoticonQuestion = flashCard.convertEmoticonQuestion(question, answer)

      this.question = emoticonQuestion
      this.answer = answer
    }
  }
}

</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
