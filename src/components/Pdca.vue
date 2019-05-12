<template>
<div id="pdca">
  <button v-on:click="fetch" style="border:solid 1px">fetch</button>
  <button v-on:click="insert(this)" style="border:solid 1px">登録する</button>
  <ul>
    <li>
      <label for="name">名前</label><input id="name" v-model="name" placeholder="input your name." />
    </li>
    <li>
      <label for="plan"><span id="require">*</span>Plan</label><input id="plan" v-model="plan" />
    </li>
    <li>
      <label for="delay"><span id="require">*</span>Delay</label><input id="delay" v-model="delay" />
    </li>
    <li>
      <label for="cancel">Cancel</label><input id="cancel" v-model="cancel" />
    </li>
    <li>
      <label for="apologize">Apologize</label><input id="apologize" v-model="apologize" />
    </li>
  </ul>
  <div id="requireNav">
    <span id="require">*</span>は入力必須
  </div>
  <ul id="input">
    <li>
      {{plan}}を計画していましたが、
    </li>
    <li>
      {{delay}}が遅れているため、
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
  <button id="regist" v-on:click="insert(this)" type="submit">この内容で登録</button>
  <button id="loginRegist" v-on:click="loginInsert(this)" type="submit">Twitterアカウントでログインして登録</button>
  <button v-bind:disabled="isProcessing" v-on:click="kk">button</button>
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
          name: this.name,
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
      this.name = ""
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
    },
    kk: function() {
      console.log(1)
    }
  },
  data() {
    return {
      name: "",
      plan: "",
      delay: "",
      cancel: "",
      apologize: "",
      isProcessing: false,
      data: [],
      errors: []
    }
  },
}
</script>
<style>
#regist,
#loginRegist {
  background-color: #89c3eb;
  border: solid 1px;
  box-shadow: 1px 1px;
  border-radius: 15px;
  padding: 4px;
  color: #ffffff
}

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
  text-align: center;

}

#pdca ul li label {
  position: relative;
  left: 10%;
}

#pdca input {
  border: solid 1px;
}

#require {
  color: #e2041b;
  margin: 0px 3px 0px 0px;
}

#requireNav {
  font-size: 70%;
  text-align: left;
  margin: 0px 3px 0px 0px;
}

@media screen and (min-width:480px) {

  /*　画面サイズが480pxからはここを読み込む　*/
  #pdca input {
    border: solid 10px;
  }

  #pdca ul li label {
    position: relative;
    left: 20%;
  }

}
</style>
