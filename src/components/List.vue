<template>
<div id="list">
  <p>
    みんなのPDCA一覧
  </p>
  <ul>
    <div id="flex">

      <div id="card" v-for="item of data">
        <li>
          {{item.plan}}
        </li>
        <li>
          {{item.delay}}
        </li>
        <li>
          {{item.cancel}}
        </li>
        <li>
          {{item.apologize}}
        </li>
      </div>
    </div>

  </ul>

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
      //        .where("plan", "==", "plan")
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
  margin: 3px
}
</style>
