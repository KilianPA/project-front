<template>
  <div>
    <div class="row">
    </div>
    <q-card v-if="currentUser">
        <q-card-media overlay-position="top">
          <img v-if="avatar" :src="avatar">
        </q-card-media>
        <q-card-title>
          {{ currentUser.name }}
          <div slot="right" class="row items-center">
            <q-icon name="place" /> {{ currentUser.city }}
          </div>
        </q-card-title>
        <q-card-main>
          <p>$・Italian, Cafe</p>
          <p class="text-faded">Small plates, salads & sandwiches in an intimate setting.</p>
        </q-card-main>
        <q-card-separator />
        <q-card-actions class="justify-center">
          <q-btn @click="removeFirstUser" size="25px" color="red" class="margin-right"  round dense icon="close" />
          <q-btn @click="matchWithUser" size="25px" color="primary" round dense icon="favorite" />
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
      avatar: ''
    }
  },
  computed: {
    currentUser () {
      console.log(this.users[0])
      return this.users[0]
    }
  },
  mounted () {
    console.log(this.idUser)
    var that = this
    this.$axios({
      headers: {'Authorization': 'Bearer ' + this.$q.localStorage.get.item('token')},
      method: 'get',
      url: process.env.API + 'users'
    }).then(response => {
      that.users = (response.data)
    })
  },
  methods: {
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
      this.users = this.users.filter(user => user !== this.currentUser)
    },
    matchWithUser () {
      var that = this
      this.$axios({
        headers: {'Authorization': 'Bearer ' + this.$q.localStorage.get.item('token')},
        method: 'post',
        url: process.env.API + 'match',
        data: {
          sender_id: that.idUser,
          receiver_id: that.currentUser.id
        }
      }).then(response => {
        that.removeFirstUser()
      })
    }
  },
  watch: {
    users () {
      if (this.users) {
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
</style>
