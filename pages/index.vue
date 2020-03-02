<template>
  <div class="container">
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
      items: []
    }
  },

  async asyncData () {

    try {

      const tokenHeaders = {
        headers:{
          "Content-Type": "application/json"
        }
      }
      const tokenDatas = {
        "grantType": "client_credentials",
        "clientId": "",
        "clientSecret": ""
      }

      let { data } = await axios.post(ACCESS_TOKEN_PUBLISH_URL, tokenDatas, tokenHeaders)

      const parseHeaders = {
        headers:{
          "Content-Type": "application/json",
          "Authorization": "Bearer " + data.access_token
        }
      }

      //const document = "NTTが提供する、自然言語解析APIはCOTOHA APIである。"
      //const document = "関係から特定の属性だけを取り出す演算は射影である。"
      //const document = "ドラえもんの道具のうち、最も人気のあるものはタケコプターである。"
      const document = "受賞する人はi-tanaka730である"

      const parseDatas = {
        "document": document,
        "max_keyword_num": 1
      }

      data = await axios.post(DEVELOPER_API_KEYWORD_URL, parseDatas, parseHeaders)

      // const tokens = Enumerable.from(data.data.result).selectMany(r => r.tokens)
      // const nounObjects = Enumerable.from(tokens).where(t => t.pos == "名詞").toArray()
      // const nouns = Enumerable.from(nounObjects).select(t => t.lemma).toArray()
console.log("-----------------------")
console.log(data)


      return { items : data.data.result }

    } catch (err) {
          console.log("例外発生")
          console.log(err)
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
