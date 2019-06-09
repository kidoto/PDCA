<template>
<div id="list">

  <p>
    みんなのPDCA一覧
  </p>
  <v-container fluid grid-list-sm>
    <v-layout row　wrap>
      <v-flex xs12 sm6 lg2 offset-lg3 v-for="(item, index) of data">
        <v-card>
          <v-img v-if="index % 2 == 0" v-bind:src="require('@/assets/img/sunrise.jpg')" aspect-ratio="2.75"></v-img>
          <v-img v-if="index % 2 != 0" v-bind:src="require('@/assets/img/sunset.jpg')" aspect-ratio="2.75"></v-img>
          <v-layout align-center>

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
          </v-layout>

          <v-card-actions>
            <v-btn flat color="orange">
              <v-img v-bind:src="require('@/assets/svg/awesome.svg')" max-width="16px" height="16px" v-on:click="onAwesome(item)" />
            </v-btn>
            {{item.awesome | number_format}}
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
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
          console.log(doc.id);
          let fetchedData = doc.data();
          fetchedData.id = doc.id
          this.data.push(fetchedData);
        })
      })
  },
  methods: {
    showName: function(item) {
      return item !== '' ? item + ' さん' : 'no name さん';
    },
    onAwesome: async function(item) {
      store = firebase.firestore();
      let database = store.collection('list').doc(item.id)
      await database.update({
        awesome: item.awesome++
      }).then(() => {
        item.awesome++;
      })
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

.v-card {
  height: 100%;
  position: relative;
}

.v-card-actions {
  position: absolute;
  bottom: 0;
  margin-bottom: 15px;
}
</style>
