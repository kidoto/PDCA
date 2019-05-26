<template>
<div id="list">

  <p>
    みんなのPDCA一覧
  </p>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card v-for="item of data">
        <v-img v-bind:src="require('@/assets/img/sunset.jpg')" aspect-ratio="2.75"></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{showName(item.name)}}</h3>
            <div>
              <ul>
                <li>
                  {{item.plan}}を計画していたが
                </li>
                <li>
                  {{item.delay}}が遅れため
                </li>
              </ul>
            </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">
            <v-img v-bind:src="require('@/assets/svg/awesome.svg')" max-width="16px" height="16px" />
          </v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
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
  methods: {
    showName: function(item) {
      return item !== '' ? item + 'さん' : '';
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
  margin: 3px;
  flex-wrap: wrap;
  float: left;

}
</style>
