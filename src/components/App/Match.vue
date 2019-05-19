<template>
  <div>
    <div class="row">
    </div>
    <q-card v-if="users.length">
        <q-card-media overlay-position="top">
          <img v-if="avatar" :src="avatar">
        </q-card-media>
        <q-card-title class="relative-position">
          {{ users[0].name }}
          <div slot="right" class="row items-center">
            <q-icon name="place" /> {{ users[0].city }}
          </div>
           <br>
            <div class="text-age row q-ma-sm">
              <q-icon name="cake"/>
              <div class="q-pl-sm"> {{ getAge(users[0].birthday) }} ans </div>
            </div>
        </q-card-title>
        <q-card-main>
           <div class="music-title q-mb-md">
             <q-icon name="music_note"/> Musique
           </div>
              <q-item v-if="artist">
                <q-item-side :avatar="artist.images[0].url" />
                <q-item-main
                        :label="artist.name"
                        label-lines="1"
                />
              </q-item>
              <q-item multiline v-if="song1">
                <q-item-side :avatar="song1.album.images[0].url" />
                <q-item-main
                        :label="song1.artists[0].name"
                        label-lines="1"
                        :sublabel="song1.name"
                        sublabel-lines="1"
                />
              </q-item>
              <q-item multiline v-if="song2">
                <q-item-side :avatar="song2.album.images[0].url" />
                <q-item-main
                        :label="song2.artists[0].name"
                        label-lines="1"
                        :sublabel="song2.name"
                        sublabel-lines="1"
                />
              </q-item>
              <q-item multiline v-if="song3">
                <q-item-side :avatar="song3.album.images[0].url" />
                <q-item-main
                        :label="song3.artists[0].name"
                        label-lines="1"
                        :sublabel="song3.name"
                        sublabel-lines="1"
                />
              </q-item>
        </q-card-main>
        <q-card-separator />
        <q-card-actions class="justify-center">
          <q-btn @click="removeFirstUser" size="30px" color="red" class="margin-right"  round dense icon="close" />
          <q-btn @click="matchWithUser" size="30px" color="primary" round dense icon="favorite" />
        </q-card-actions>
      </q-card>
  </div>
</template>

<script>
export default {
  name: 'Match',
  props: ['idUser'],
  data () {
    return {
      users: [],
      avatar: '',
      artist: '',
      song1: '',
      song2: '',
      song3: ''
    }
  },
  computed: {
  },
  mounted () {
    var that = this
    this.$axios({
      headers: {'Authorization': 'Bearer ' + this.$q.localStorage.get.item('token')},
      method: 'get',
      url: process.env.API + 'usersMatch/' + this.idUser
    }).then(response => {
      that.users = (response.data)
      that.getMusic()
    })
  },
  methods: {
    getAge (birthday) {
      var today = new Date()
      var birthDate = new Date(birthday)
      var age = today.getFullYear() - birthDate.getFullYear()
      var m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    },
    getPhotoFromFirebase (img) {
      var that = this
      if (img) {
        if (img.includes('firebase')) {
          this.avatar = img
        } else {
          var storageRef = this.$firebase.storage().ref()
          storageRef.child(img).getDownloadURL().then(url => {
            that.avatar = url
          })
        }
      }
    },
    removeFirstUser () {
      this.users = this.users.filter(user => user !== this.users[0])
      this.getMusic()
    },
    getMusic () {
      var that = this
      this.$axios({
        headers: {'Authorization': 'Bearer ' + this.$q.localStorage.get.item('token')},
        method: 'get',
        url: process.env.API + 'music/' + this.users[0].id
      }).then(response => {
        response.data.forEach(data => {
          if (data.field === 'artist') {
            that.artist = JSON.parse(data.music_data)
          }
          if (data.field === 'song1') {
            that.song1 = JSON.parse(data.music_data)
          }
          if (data.field === 'song2') {
            that.song2 = JSON.parse(data.music_data)
          }
          if (data.field === 'song3') {
            that.song3 = JSON.parse(data.music_data)
          }
        })
      })
    },
    matchWithUser () {
      var that = this
      this.$axios({
        headers: {'Authorization': 'Bearer ' + this.$q.localStorage.get.item('token')},
        method: 'post',
        url: process.env.API + 'match',
        data: {
          sender_id: that.idUser,
          receiver_id: that.users[0].id
        }
      }).then(response => {
        that.removeFirstUser()
      })
    }
  },
  watch: {
    users () {
      if (this.users) {
        console.log(this.users[0])
        this.getPhotoFromFirebase(this.users[0].avatar)
      }
    }
  }
}
</script>
<style scoped>
  .margin-right {
    margin-right: 35px !important;
  }
  .music-title {
    font-size: 15px;
    color: grey;
  }
  .text-age {
    font-size: 16px;
    color: grey;
  }
</style>
