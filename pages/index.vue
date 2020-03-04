<template>
  <div class="container">
    <div>
      <button v-on:click="updateQuestion"></button>
    </div>
    <div>
      {{ items }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Enumerable from 'linq';

const url = 'https://jsonplaceholder.typicode.com/users'
const DEVELOPER_API_BASE_URL = "https://api.ce-cotoha.com/api/dev/nlp/"
const DEVELOPER_API_PARSE_URL = DEVELOPER_API_BASE_URL + "v1/parse"
const DEVELOPER_API_KEYWORD_URL = DEVELOPER_API_BASE_URL + "v1/keyword"
const ACCESS_TOKEN_PUBLISH_URL = "https://api.ce-cotoha.com/v1/oauth/accesstokens"

export default {

  data () {
    return {
      items: [],
      index: 0
    }
  },

  methods: {
    updateQuestion: function(){
      var min = 0 ;
      var max = items.len;
      var a = Math.floor( Math.random() * (max + 1 - min) ) + min ;
      return { index : a }
      //this.message = this.message.split('').reverse().join('');
    }
  },

async asyncData () {

    try {

      const token = await getAccessToken()
      const parse = await getKeyword(token)
      return { items : parse }

    } catch (err) {
      console.log("==========例外発生==========")
      console.log(err)
    }
  }
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
    "clientId": "	",
    "clientSecret": ""
  }

  const tokenResult = await axios.post(ACCESS_TOKEN_PUBLISH_URL, tokenDatas, tokenHeaders)
  return tokenResult.data.access_token;
}

async function getKeyword(token, keywordNum = 1)
{
  const parseHeaders = {
    headers:{
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  }

    const questions = await axios.get('https://cotoha-flash-card.microcms.io/api/v1/question', {
      headers: { 'X-API-KEY': '' }
    })

  const document = questions.data.contents[0].question

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
