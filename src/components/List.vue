<template>
<div id="list">
  <v-container>
    <v-flex xs12>
      <p>
        みんなのPDCA一覧
      </p>
      <ul>
        <div id="card" v-for="item of data">
          {{item.name}}さん
          <li>
            {{item.plan}}を計画していたが
          </li>
          <li>
            {{item.delay}}が遅れため
          </li>
        </div>
      </ul>
    </v-flex>
  </v-container>
</div>
</template>
<script>
'use strict'
import firebase from 'firebase'
let store = "";

export default {
  mounted: async function() {
    store = firebase.firestore();
    let database = await store.collection('list')
      .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // 取得したドキュメントで何かやる
          console.log(doc.data());
          this.data.push(doc.data());
        })
      })
  },
  data() {
    return {
      user: {},
      isLogin: '',
      data: []
    }
  }

}
</script>
<style>
a {
  font: 20px;
  font-weight: bold;
  margin: 5px;
}

#flex {
  display: flex;
}

#card {
  border: solid 1px;
  margin: 3px;
  flex-wrap: wrap;
  float: left;

}

@media screen and (min-width:480px) {

  #card {
    border: solid 1px;
    margin: 3px;
    flex-wrap: wrap;
    float: left;
    width: 30%;
  }

}
</style>
