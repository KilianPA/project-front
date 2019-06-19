<template>
  <div>
    <div class="full-width shadow-1 q-pa-sm q-mb-sm container-back row">
      <div class="col-xs-1">
        <q-icon @click.native="back" class="cursor-pointer" size="28px" name="keyboard_arrow_left"/>
      </div>
      <div v-if="receiverData.surname" class="col-xs-11" :style="{paddingTop: '5px'}">
        <strong>
          {{ receiverData.surname + ' ' + receiverData.name}}
        </strong>
      </div>
    </div>
    <div class="container-messages q-ma-md">
      <transition-group name="slide-fade">
          <q-chat-message
                  v-for="(message, index) in dataMessages"
                  :avatar="message.senderId === user.id ? avatar.sender : avatar.receiver"
                  :key="index"
                  :name="message.senderId === user.id ? user.surname : receiverData.surname"
                  :text="[message.message]"
                  :sent="message.senderId === user.id"
          />
      </transition-group>
    </div>
    <div class="fixed-bottom container-send-bottom row">
      <div class="col-xs-10">
        <q-input v-on:keyup.enter="submitMessage" v-model="inputValue"/>
      </div>
      <div class="col-xs-2 text-center">
        <q-icon @click.native="submitMessage" class="icon-send" size="25px" color="primary" name="send"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data () {
    return {
      inputValue: '',
      dataMessages: [],
      user: '',
      messagesKey: [],
      receiverData: [],
      avatar: {
        sender: '',
        receiver: ''
      }
    }
  },
  mounted () {
    if (!this.$router.history.current.params.receiverId) {
      this.$router.push({name: 'app.home'})
    }
    var that = this
    this.user = this.$q.localStorage.get.item('user')
    that.getPhotoFromFirebase(this.user.avatar, 'sender')
    var database = this.$firebase.database()
    var chatMessages = database.ref('messages')
    chatMessages.on('value', function (snapshot) {
      snapshot.forEach(childSnapshot => {
        if (!that.messagesKey.includes(childSnapshot.key)) {
          if ((childSnapshot.val().senderId === that.user.id && childSnapshot.val().receiverId === that.$router.history.current.params.receiverId) || (childSnapshot.val().receiverId === that.user.id && childSnapshot.val().senderId === that.$router.history.current.params.receiverId)) {
            that.messagesKey.push(childSnapshot.key)
            that.dataMessages.push(childSnapshot.val())
          }
        }
      })
    })
    this.getDataUser()
  },
  methods: {
    back () {
      this.$router.push({name: 'app.home'})
    },
    getDataUser () {
      var that = this
      this.$axios({
        headers: {'Authorization': 'Bearer ' + this.$q.localStorage.get.item('token')},
        method: 'get',
        url: process.env.API + 'users/' + this.$router.history.current.params.receiverId
      }).then(response => {
        that.receiverData = response.data
        that.getPhotoFromFirebase(response.data.avatar, 'receiver')
      })
    },
    submitMessage () {
      var that = this
      if (this.inputValue.length) {
        this.$firebase.database().ref('messages/').push({
          message: that.inputValue,
          senderId: that.user.id,
          receiverId: that.$router.history.current.params.receiverId
        })
      }
      this.inputValue = ''
    },
    getPhotoFromFirebase (img, val) {
      var that = this
      if (img) {
        if (img.includes('firebase')) {
          this.avatar[val] = img
        } else {
          var storageRef = this.$firebase.storage().ref()
          storageRef.child(img).getDownloadURL().then(url => {
            that.avatar[val] = url
          })
        }
      }
    }
  },
  watch: {
    dataMessages () {
      window.scrollTo(0, document.body.scrollHeight)
    }
  }
}
</script>
<style lang="stylus">
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
  .container-send-bottom {
    background: white;
    height: auto;
    padding-left:8px;
    padding-right:8px;
    padding-bottom:8px;
  }
  .container-messages {
    margin-bottom: 50px;
  }
  .icon-send {
    margin-top: 14px;
    font-size: 23px;
  }
  .container-back {
    background: white;
  }
  .cursor-pointer {
    cursor:pointer;
  }
</style>
