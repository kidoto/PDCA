<template>
<div id="login">
  <span v-if="isLogin.uid!=null">ようこそ、{{isLogin.displayName}} さん
    <img v-bind:src="isLogin.photoURL" />
  </span>
  <span v-else>
    <button type="button" v-on:click="login">login</button>
  </span>
</div>
</template>
<script>
'use strict'
import firebase from 'firebase'

export default {
  data() {
    return {
      user: {},
      isLogin: '',
    }
  },
  methods: {
    login: async function() {
      await firebase.auth().onAuthStateChanged(user => {
        // ログイン状態ならuserが取得できる
        this.isLogin = user ? user : {};
      });
      if (!this.isLogin) {
        const provider = new firebase.auth.TwitterAuthProvider()
        await firebase.auth().signInWithPopup(provider);
      }
    },
  },
  mounted: async function() {
    await firebase.auth().onAuthStateChanged(user => {
      // ログイン状態ならuserが取得できる
      this.isLogin = user ? user : {};
    });
    if (!this.isLogin) {
      const provider = new firebase.auth.TwitterAuthProvider()
      await firebase.auth().signInWithPopup(provider);
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
</style>
