<template>
  <div class="container">
    <div>
      {{ items }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const url = 'https://jsonplaceholder.typicode.com/users'
const DEVELOPER_API_BASE_URL = "https://api.ce-cotoha.com/api/dev/nlp/"
const DEVELOPER_API_PARSE_URL = DEVELOPER_API_BASE_URL + "v1/parse"
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
          "Content-Type": "application/json"
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

      const parseDatas = {
        "sentence": "僕は今プログラミングをしています"
      }

      data = await axios.post(DEVELOPER_API_PARSE_URL, parseDatas, parseHeaders)

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
