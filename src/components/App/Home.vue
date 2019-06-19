<template>
  <div>
    <q-tabs @select="currentTab" keep-alive animated swipeable inverted color="primary" align="justify">
      <q-tab default name="chat" slot="title" icon="forum" />
      <q-tab name="match" slot="title" icon="favorite" />
      <q-tab name="setting" slot="title" icon="settings" />
<!--      <q-tab-pane name="home">-->
<!--        <div class="container-user-home q-pa-md">-->
<!--          <div>-->
<!--            <img class="img-created-user round" :src="messageAvatar"/>-->
<!--          </div>-->
<!--          Bonjour <strong> {{ user.surname }}, </strong>-->
<!--        </div>-->
<!--      </q-tab-pane>-->
      <q-tab-pane name="chat">
        <!--{{dataChats}}-->
        <q-list v-if="dataChats.length" highlight>
          <q-list-header>Vos conversations</q-list-header>
          <q-item :to="{name: 'app.chat', params: {receiverId: chat.id}}" v-for="(chat, index) in dataChats" :key="index">
            <q-item-side :avatar="getAvatar(chat.id)" />
            <q-item-main
                    :label="chat.surname + chat.name"
                    label-lines="1"
                    sublabel-lines="2"
            />
          </q-item>
        </q-list>
        <div v-if="!dataChats.length">
          <h4 class="text-center text-grey">
           Aucune conversation
          </h4>
        </div>
      </q-tab-pane>
      <q-tab-pane name="match">
        <match :id-user="user.id" />
      </q-tab-pane>
      <q-tab-pane name="setting">
        <q-btn class="full-width" :to="{name: 'users.edit', params: {id: user.id}}" > Editer le compte </q-btn>
        <q-btn class="full-width q-mt-md" @click="logout" label="Se deconnecter" color="negative"/>
      </q-tab-pane>
    </q-tabs>
  </div>
</template>

<script>
import Match from './Match'
export default {
  name: 'AppHome',
  components: {Match},
  data () {
    return {
      user: '',
      dataChats: [],
      messageAvatar: []
    }
  },
  mounted () {
    this.user = this.$q.localStorage.get.item('user')
    this.getAllChats()
    this.getPhotoFromFirebase(this.user)
  },
  methods: {
    currentTab (evt) {
      if (evt === 'chat') {
        this.getAllChats()
      }
    },
    logout () {
      this.$store.dispatch('auth/logout')
      this.$router.push({name: 'index'})
    },
    getAvatar (id) {
      return this.messageAvatar.filter(obj => obj.id === id)[0] ? this.messageAvatar.filter(obj => obj.id === id)[0].avatar : ''
    },
    getAllChats () {
      console.log('ici')
      var that = this
      this.$axios({
        headers: {'Authorization': 'Bearer ' + this.$q.localStorage.get.item('token')},
        method: 'get',
        url: process.env.API + 'chat/' + that.user.id
      }).then(response => {
        var arr = []
        arr = response.data.isSender
        console.log(arr)
        response.data.isReceiver.forEach(obj => {
          if (arr.filter(data => data.receiver_id !== obj.receiver_id)) {
            arr.push(obj)
          }
        })
        that.getInfoOfUsers(arr)
      })
    },
    getInfoOfUsers (arr) {
      this.dataChats = []
      var arrayId = []
      var that = this
      arr.forEach(data => {
        if (data.sender_id === that.user.id) {
          arrayId.push(data.receiver_id)
        } else {
          arrayId.push(data.sender_id)
        }
      })
      this.$axios({
        headers: {'Authorization': 'Bearer ' + this.$q.localStorage.get.item('token')},
        method: 'post',
        url: process.env.API + 'getusers',
        data: arrayId
      }).then(response => {
        console.log(response.data)
        response.data.forEach(user => {
          if (user) {
            that.getPhotoFromFirebase(user)
            that.dataChats.push(user)
          }
        })
      })
    },
    getPhotoFromFirebase (user) {
      var that = this
      var img = user.avatar
      if (img.includes('firebase')) {
        that.messageAvatar.push({id: user.id, avatar: img})
      } else {
        var storageRef = this.$firebase.storage().ref()
        storageRef.child(img).getDownloadURL().then(url => {
          that.messageAvatar.push({id: user.id, avatar: url})
        })
      }
    }
  }
}
</script>
<style scoped>
  .container-user-home {
    font-size:30px;
    color: #2196f3;
  }
  .round {
    border-radius: 50%;
  }
</style>
