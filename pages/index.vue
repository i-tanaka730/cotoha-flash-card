<template>
  <div class="container">
  <b-card tag="article" style="width: 40rem;" class="mb-2">
    <b-button href="#" variant="primary" v-on:click="showAnswer">答え</b-button>
    <b-button href="#" variant="primary" v-on:click="updateQuestion">次の問題</b-button>
    <b-card-text>{{ question }}</b-card-text>
    <b-card-text>{{ answer }}</b-card-text>
  </b-card>
  </div>
</template>

<script>
import axios from 'axios'
import Enumerable from 'linq';

const DEVELOPER_API_BASE_URL = "https://api.ce-cotoha.com/api/dev/nlp/"
const DEVELOPER_API_PARSE_URL = DEVELOPER_API_BASE_URL + "v1/parse"
const DEVELOPER_API_KEYWORD_URL = DEVELOPER_API_BASE_URL + "v1/keyword"
const ACCESS_TOKEN_PUBLISH_URL = "https://api.ce-cotoha.com/v1/oauth/accesstokens"
const MICRO_CMS_QUESTION_URL = "https://cotoha-flash-card.microcms.io/api/v1/question"

const DEVELOPER_API_CRIENT_ID = ""
const DEVELOPER_API_CRIENT_SECRET = ""
const MICRO_CMS_API_KEY = ""

export default {

  data () {
    return {
      question: "",
      answer: ""
    }
  },

  methods: {
    showAnswer: function() {
      this.answer = "adsfafd"
    }
  },

async asyncData () {

    try {
      const questions = await getAllQuestions()
      const question = await getQuestion(questions)
      const token = await getAccessToken()
      const keyword = await getKeyword(question, token)

      return {
        question : question,
        answer : keyword
      }

    } catch (err) {
      console.log("==========例外発生==========")
      console.log(err)
    }
  }
}

async function getAllQuestions()
{
  const questionResult = await axios.get(MICRO_CMS_QUESTION_URL, {
    headers: { "X-API-KEY": MICRO_CMS_API_KEY }
  })

  const questions = Enumerable.from(questionResult.data.contents).select(c => c.question).toArray()
  return questions
}

async function getQuestion(questions)
{
    var index = Math.floor( Math.random() * questions.length );
    console.log(questions[index])
    return questions[index]
}

async function getAccessToken()
{
  const tokenHeaders = {
    headers:{
      "Content-Type": "application/json"
    }
  }

  const tokenDatas = {
    "grantType": "client_credentials",
    "clientId": DEVELOPER_API_CRIENT_ID,
    "clientSecret": DEVELOPER_API_CRIENT_SECRET
  }

  const tokenResult = await axios.post(ACCESS_TOKEN_PUBLISH_URL, tokenDatas, tokenHeaders)
  return tokenResult.data.access_token;
}

async function getKeyword(document, token, keywordNum = 1)
{
  const parseHeaders = {
    headers:{
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  }

  const parseDatas = {
    "document": document,
    "max_keyword_num": keywordNum
  }

  const parseResult = await axios.post(DEVELOPER_API_KEYWORD_URL, parseDatas, parseHeaders)
  return parseResult.data.result[0].form
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
