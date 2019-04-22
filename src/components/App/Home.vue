<template>
  <div>
    <q-tabs keep-alive animated swipeable inverted color="primary" align="justify">
      <q-tab default name="home" slot="title" icon="home" />
      <q-tab name="chat" slot="title" icon="forum" />
      <q-tab name="setting" slot="title" icon="settings" />
      <q-tab-pane name="home">
        <div class="container-user-home q-pa-md">
        Bonjour <strong> {{ user.surname }}, </strong>
      </div>
        <q-btn class="full-width" @click="logout" label="Se deconnecter" color="negative"/>
      </q-tab-pane>
      <q-tab-pane name="chat">
        <!--{{dataChats}}-->
        <q-list highlight>
          <q-list-header>Recent chats</q-list-header>
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
          Aucune conversation
        </div>
      </q-tab-pane>
      <q-tab-pane name="setting">
        <q-btn class="full-width" :to="{name: 'users.edit', params: {id: user.id}}" > Editer le compte </q-btn>
      </q-tab-pane>
    </q-tabs>
  </div>
</template>

<script>
export default {
  name: 'AppHome',
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
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
      this.$router.push({name: 'index'})
    },
    getAvatar (id) {
      return this.messageAvatar.filter(obj => obj.id === id)[0] ? this.messageAvatar.filter(obj => obj.id === id)[0].avatar : ''
    },
    getAllChats () {
      var that = this
      this.$axios({
        headers: {'Authorization': 'Bearer ' + this.$q.localStorage.get.item('token')},
        method: 'get',
        url: process.env.API + 'chat/' + this.user.id
      }).then(response => {
        var arr = []
        arr = response.data.isSender
        response.data.isReceiver.forEach(obj => {
          if (arr.filter(data => data.receiver_id !== obj.receiver_id)) {
            arr.push(obj)
          }
        })
        that.getInfoOfUsers(arr)
      })
    },
    getInfoOfUsers (arr) {
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
        response.data.forEach(user => {
          that.getPhotoFromFirebase(user)
          console.log(user.avatar)
        })
        that.dataChats = (response.data)
      })
    },
    getPhotoFromFirebase (user) {
      var that = this
      var img = user.avatar
      console.log('coucou')
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
</style>
