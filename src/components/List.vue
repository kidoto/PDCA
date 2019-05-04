<template>
<div id="list">
  <button v-on:click="fetch" style="border:solid 1px">fetch</button>
  <button v-on:click="insert" style="border:solid 1px">登録する</button>

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
  methods: {
    fetch: async function() {
      let database = await store.collection('list')
        //        .where("plan", "==", "plan")
        .get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // 取得したドキュメントで何かやる
            console.log(doc.data())
          })
        })
    },
    insert: async function() {
      await store.collection('list').add({
        plan: this.plan,
        delay: this.delay,
        cancel: this.cancel,
        apologize: this.apologize
      });
      this.clearAll();
    },
    clearAll: function() {
      this.plan = ""
      this.delay = ""
      this.cancel = ""
      this.apologize = ""
    }
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
