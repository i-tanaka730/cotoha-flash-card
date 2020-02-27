<template>
  <div class="container">
    <div>
<!--{{ users[0].id }},{{ users[0].name }}-->
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.id }},{{ user.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const url = 'https://jsonplaceholder.typicode.com/users'

export default {
  asyncData ({ params }) {  //コンポーネントを初期化する前に非同期処理を行えるようにするメソッド
    return axios.get(url) //apiからのデータ取得をリクエスト
      .then((res) => {  //thenはレスポンスを受け取った段階で呼ばれるメソッド(res)にはレスポンスデータが入っている
        return { users: res.data } //res.dataにはjsonオブジェクトが入っている
      })
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
