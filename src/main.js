import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router.js'
import firebase from 'firebase'
import firebaseConfig from '../config/firebase.env'
import vuetify from 'vuetify'
require('@/assets/ress.css')


Vue.config.productionTip = false

var config = {
  apiKey: firebaseConfig.API_KEY,
  authDomain: firebaseConfig.AUTH_DOMAIN,
  databaseURL: firebaseConfig.DATABASE_URL,
  projectId: firebaseConfig.PROJECT_ID,
  storageBucket: firebaseConfig.STORAGE_BUCKET,
  messagingSenderId: firebaseConfig.MESSAGING_SENDERID
};
firebase.initializeApp(config);

Vue.use(router)
Vue.use(vuetify)

Vue.filter('number_format', function (value) {
    if (! value) { return false; }
    return value.toString().replace( /([0-9]+?)(?=(?:[0-9]{3})+$)/g , '$1,' );
});

new Vue({
  router  ,
  render: h => h(App),
}).$mount('#app')
