import axios from 'axios'

export default class CotohaApi {

  DEVELOPER_API_KEYWORD_URL = "https://api.ce-cotoha.com/api/dev/nlp/v1/keyword"
  ACCESS_TOKEN_PUBLISH_URL = "https://api.ce-cotoha.com/v1/oauth/accesstokens"

  constructor(crientId, crientSecret) {
    this.crientId = crientId
    this.crientSecret = crientSecret
  }

  async getAccessToken() {
    const tokenHeaders = {
      headers:{
        "Content-Type": "application/json"
      }
    }

    const tokenDatas = {
      "grantType": "client_credentials",
      "clientId": this.crientId,
      "clientSecret": this.crientSecret
    }
  
    const tokenResult = await axios.post(this.ACCESS_TOKEN_PUBLISH_URL, tokenDatas, tokenHeaders)
    const accessToken = tokenResult.data.access_token
    return accessToken
  }
  
  async getKeyword(document, keywordNum = 1) {
    const token = await this.getAccessToken()

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
  
    const parseResult = await axios.post(this.DEVELOPER_API_KEYWORD_URL, parseDatas, parseHeaders)
    const keyword = parseResult.data.result[0].form
    return keyword
  } 
}