<template>
<div id="pdca">
  <button v-on:click="fetch" style="border:solid 1px">fetch</button>
  <button v-on:click="insert(this)" style="border:solid 1px">登録する</button>
  <ul>
    <li>
      <label for="plan">Plan</label><input id="plan" v-model="plan" />
    </li>
    <li>
      <label for="delay">Delay</label><input id="delay" v-model="delay" />
    </li>
    <li>
      <label for="cancel">Cancel</label><input id="cancel" v-model="cancel" />
    </li>
    <li>
      <label for="apologize">Apologize</label><input id="apologize" v-model="apologize" />
    </li>
  </ul>
  <ul id="input">
    <li>
      {{plan}}を計画していましたが、
    </li>
    <li>
      {{delay}}の理由により遅延が発生しているため、
    </li>
    <li>
      {{cancel}}中止させていただきます。
    </li>
    <li>
      {{apologize}}誠に申し訳ありません。
    </li>
    <li>
      <div id="template">
        #PDCA
      </div>
    </li>
  </ul>


</div>
</template>
<script>
'use strict'
import firebase from 'firebase'
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
      if (this.checkForm()) {
        await store.collection('list').add({
          plan: this.plan,
          delay: this.delay,
          cancel: this.cancel,
          apologize: this.apologize
        });
        this.clearAll();
      } else {


        alert(this.errors.join("\r\n"));
      }
    },
    clearAll: function() {
      this.plan = ""
      this.delay = ""
      this.cancel = ""
      this.apologize = ""
    },
    checkForm: function() {
      this.errors = [];

      if (!this.plan) {
        this.errors.push('計画したことは必須です。');
      }
      if (!this.delay) {
        this.errors.push('遅延した理由は必須です。');
      }
      return this.errors.length === 0 ? true : false;
    }
  },
  data() {
    return {
      plan: "",
      delay: "",
      cancel: "",
      apologize: "",
      data: [],
      errors: []
    }
  },
}
</script>
<style>
#pdca ul li label {
  width: 120px;
  float: left;
}

#pdca ul {
  margin: 0 auto;
}

#pdca ul#input {
  border: solid 1px;
  margin: 5px;
}

#pdca ul li {

  margin: 5px 0;
}

#pdca input {
  border: solid 1px;
}
</style>
