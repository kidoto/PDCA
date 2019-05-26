<template>
<div id="top">
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <div id="nav">
      </div>
      <div id="title">
        PDCA
      </div>
      <div id="substitle">
        <ruby>
          P　D　C　A
          <rt>Plan Delay Cancel Apologize</rt>
        </ruby>
      </div>
      <div id="description">
        回していますか？
        <br />
        計画倒れになったもの、
        <br />
        遅延しているもの、
        <br />
        中止になったもの、
        <br />
        真摯に謝罪しましょう。
      </div>
      <Pdca></Pdca>
      <div>
        <router-link to="/list">みんなのPDCAを見る</router-link>
        <router-link to="/login">ログイン</router-link>
        <a href="https://twitter.com/intent/tweet?hashtags=hoge&target=_blank">リンクテキスト</a>
        <br />

      </div>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
'user strict'
import firebase from 'firebase'
import Pdca from '@/components/Pdca.vue'
let store = "";

export default {
  mounted: function() {
    store = firebase.firestore();
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
  components: {
    Pdca
  },
  data() {
    return {
      plan: "",
      delay: "",
      cancel: "",
      apologize: ""
    }
  }
}
</script>
<style>
#title {
  font-family: 'PT Serif', serif;
  font-size: 36px;
  padding: 30px;
}

a {
  font: 20px;
  font-weight: bold;
  margin: 5px;
}

ul li {
  list-style: none;
}
</style>
