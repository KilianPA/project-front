<template>
  <div>
    <q-card class="container-input-edit q-pa-md q-ma-sm">
      <div class="row container-img-create-user justify-center">
        <!--<img class="img-create-user" :src="currentPanel < 2 ? './assets/love.png' : './assets/music.png' "/>-->
        <!--<img class="img-create-user" src="img/women.png"/>-->
        <input style="display:none" type="file" @change="detectPhoto" accept="image/*" id="cameraInput">
        <br><img @click="clickInput" id="myImg" :src="imgUrl ? imgUrl : './assets/emptyPicture.png'">
      </div>
      <div class="col-xs-12 container-title">
        Vos informations
      </div>
      <q-input :before="[{icon: 'account_circle'}]" v-model="form.surname" float-label="Prénom" :error="$v.form.surname.$error"/>
      <q-input  :before="[{icon: 'account_circle'}]" v-model="form.name" float-label="Nom" :error="$v.form.name.$error" />
      <q-input  type="email" :before="[{icon: 'email'}]" v-model="form.email" float-label="Email" :error="$v.form.email.$error"/>
      <q-input type="password" :before="[{icon: 'visibility'}]" v-model="form.password" float-label="Mot de passe" :error="$v.form.password.$error"/>
      <q-input autocomplete="new-password" color="inputColor" :before="[{icon: 'map'}]" :value="form.city" float-label="Ville" :error="$v.form.city.$error"/>
      <q-datetime :before="[{icon: 'cake'}]" v-model="form.birthday" type="date" float-label="Date de naissance" :error="$v.form.birthday.$error"/>
      <q-select
              v-model="form.gender"
              float-label="Vous êtes ?"
              radio
              color="primary"
              :options="genderList"
              :error="$v.form.gender.$error"
      />
      <q-select
              multiple
              v-model="form.orientation"
              float-label="Vous recherchez ?"
              radio
              color="primary"
              :options="genderList"
              :error="$v.form.orientation.$error"
      />
      <div class="container-music row">
        <div class="col-xs-12 container-title">
          Musique
        </div>
        <div class="col-xs-10">
          <q-input @focus="focusDiv('inputArtist')" id="inputArtist" @input="searchSpotify(form.music.artist, 'artist', 'artist')" :before="[{icon: 'album'}]" float-label="Votre artiste" v-model="form.music.artist" :error="$v.form.music.a.$error"/>
        </div>
        <div class="col-xs-2">
          <q-item class="item-img" v-if="artistChoose">
            <q-item-side>
              <q-item-tile avatar>
                <img :src="artistChoose.images.length ? artistChoose.images[0].url : './assets/cd.png'">
              </q-item-tile>
            </q-item-side>
          </q-item>
        </div>
        <div class="col-xs-10">
          <q-input @focus="focusDiv('inputSong1')" id="inputSong1" autocomplete="new-password" @input="searchSpotify(form.music.song1, 'track', 'song1')" :before="[{icon: 'audiotrack'}]" float-label="Votre artiste" v-model="form.music.song1" :error="$v.form.music.s1.$error"/>
        </div>
        <div class="col-xs-2">
          <q-item class="item-img" v-if="song1Choose" multiline>
            <!--{{ item }}-->
            <!--{{item.images ? item.images : ''}}-->
            <q-item-side>
              <q-item-tile avatar>
                <img :src="song1Choose.album ? song1Choose.album.images[0].url : './assets/cd.png'">
              </q-item-tile>
            </q-item-side>
          </q-item>
        </div>
        <div class="col-xs-10">
          <q-input @focus="focusDiv('inputSong2')" id="inputSong2" autocomplete="new-password" @input="searchSpotify(form.music.song2, 'track', 'song2')" :before="[{icon: 'audiotrack'}]" float-label="Votre artiste" v-model="form.music.song2" :error="$v.form.music.s2.$error"/>
        </div>
        <div class="col-xs-2">
          <q-item class="item-img" v-if="song2Choose" multiline>
            <!--{{ item }}-->
            <!--{{item.images ? item.images : ''}}-->
            <q-item-side>
              <q-item-tile avatar>
                <img :src="song2Choose.album ? song2Choose.album.images[0].url : './assets/cd.png'">
              </q-item-tile>
            </q-item-side>
          </q-item>
        </div>
        <div class="col-xs-10">
          <q-input @focus="focusDiv('inputSong3')" id="inputSong3" autocomplete="new-password" @input="searchSpotify(form.music.song3, 'track', 'song3')" :before="[{icon: 'audiotrack'}]" float-label="Votre artiste" v-model="form.music.song3" :error="$v.form.music.s3.$error"/>
        </div>
        <div class="col-xs-2">
          <q-item class="item-img" v-if="song3Choose" multiline>
            <!--{{ item }}-->
            <!--{{item.images ? item.images : ''}}-->
            <q-item-side>
              <q-item-tile avatar>
                <img :src="song3Choose.album ? song3Choose.album.images[0].url : './assets/cd.png'">
              </q-item-tile>
            </q-item-side>
          </q-item>
        </div>
      </div>
      <div class="q-pt-md">
        <q-btn @click="submitCreate" class="full-width" color="primary" label="Mettre à jour"/>
      </div>
    </q-card>
  </div>
</template>

<script>
import {date, QSpinnerGears, LocalStorage} from 'quasar'
import {required, email} from 'vuelidate/lib/validators'
// import SpotifySearch from '../Spotify/SpotifySearch'
// const mustBeTrue = (value) => value === true
export default {
  name: 'UserEdit',
  data () {
    return {
      form: {
        id: '',
        name: '',
        password: '',
        surname: '',
        email: '',
        birthday: '',
        city: '',
        avatar: '',
        gender: '',
        orientation: [],
        music: {
          artist: '',
          a: false,
          song1: '',
          s1: false,
          song2: '',
          s2: false,
          song3: '',
          s3: false
        }
      },
      imgUrl: '',
      firebase: '',
      genderList: [
        {
          label: 'Homme',
          value: 'Homme'
        },
        {
          label: 'Femme',
          value: 'Femme'
        },
        {
          label: 'Autre',
          value: 'Autre'
        }
      ]
    }
  },
  validations: {
    form: {
      name: {required},
      email: { required, email },
      surname: {required},
      password: {required},
      birthday: {required},
      city: {required},
      gender: {required},
      orientation: {required},
      music: {
        a: {},
        s1: {},
        s2: {},
        s3: {}
      }
    }
  },
  computed: {
    artistChoose () {
      return this.$store.getters['spotify/formArtist']
    },
    song1Choose () {
      return this.$store.getters['spotify/formSong1']
    },
    song2Choose () {
      return this.$store.getters['spotify/formSong2']
    },
    song3Choose () {
      return this.$store.getters['spotify/formSong3']
    }
  },
  mounted () {
    if (this.$router.history.current.params.id) {
      this.$q.loading.show({
        message: 'Récupération de vos informations',
        spinner: QSpinnerGears,
        spinnerSize: 100 // in pixels
      })
      this.getDataUser()
    } else {
      this.$router.push({name: 'index'})
    }
  },
  methods: {
    getDataUser () {
      var that = this
      this.$axios({
        headers: {'Authorization': 'Bearer ' + LocalStorage.get.item('token')},
        method: 'get',
        url: process.env.API + 'users/' + this.$router.history.current.params.id
      }).then(response => {
        var data = (response.data)
        that.form.birthday = data.birthday
        that.form.city = data.city
        that.form.email = data.email
        that.form.name = data.name
        that.form.surname = data.surname
        that.form.gender = data.gender
        that.form.orientation = (JSON.parse(data.orientation))
        if (data.avatar) {
          that.getPhotoFromFirebase(data.avatar)
        } else {
          that.$q.loading.hide()
        }
      })
    },
    getPhotoFromFirebase (img) {
      var that = this
      if (img.includes('firebase')) {
        that.imgUrl = (img)
        that.form.avatar = img
        that.$q.loading.hide()
      } else {
        var storageRef = this.$firebase.storage().ref()
        storageRef.child(img).getDownloadURL().then(url => {
          that.imgUrl = (url)
          that.form.avatar = url
          that.$q.loading.hide()
        })
      }
    },
    detectPhoto (evt) {
      this.imgUrl = (URL.createObjectURL(evt.target.files[0]))
    },
    uploadPhoto () {
      this.$q.loading.show({
        message: 'Mise à jour de votre compte',
        spinner: QSpinnerGears,
        spinnerSize: 100 // in pixels
      })
      var that = this
      if (this.form.avatar !== this.imgUrl) {
        if (document.querySelector('input[type="file"]').files[0]) {
          var file = document.querySelector('input[type="file"]').files[0]
          var img = document.querySelector('img')
          let r = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '.jpeg'
          var storageRef = this.$firebase.storage().ref()
          var ref = storageRef.child(r)
          img.src = URL.createObjectURL(file)
          console.log(URL.createObjectURL(file))
          ref.put(file).then(function (snapshot) {
            that.form.music.song1 = that.song1Choose
            that.form.music.song2 = that.song2Choose
            that.form.music.song3 = that.song3Choose
            that.form.avatar = r
            that.form.birthday = date.formatDate(that.form.birthday, 'YYYY-MM-D')
            that.form.orientation = JSON.stringify(that.form.orientation)
            that.updateUser(that.form)
          })
        } else {
          that.form.music.song1 = that.song1Choose
          that.form.music.song2 = that.song2Choose
          that.form.music.song3 = that.song3Choose
          that.form.avatar = that.imgUrl
          that.form.birthday = date.formatDate(that.form.birthday, 'YYYY-MM-D')
          that.form.orientation = JSON.stringify(that.form.orientation)
          that.updateUser(that.form)
        }
      }
    },
    updateUser (value) {
      value.id = this.$router.history.current.params.id
      value.orientation = JSON.stringify(value.orientation)
      this.$axios({
        headers: {'Authorization': 'Bearer ' + LocalStorage.get.item('token')},
        method: 'put',
        url: process.env.API + 'users',
        data: value
      }).then(response => {
        if (response.status === 200) {
          this.$q.loading.hide()
          this.$router.push({name: 'app.home'})
        }
      })
    },
    submitCreate () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Merci de vérifier que tous les champs sont bien renseignés ')
      } else {
        this.uploadPhoto()
      }
    },
    clickInput () {
      document.getElementById('cameraInput').click()
    }
  }
}
</script>
<style scoped>
  .container-input-edit {
    background: white;
  }
  .container-title {
    padding-top: 24px;
    font-size: 14px;
    color: #b7b7b7;
  }
  #myImg {
    height: 120px;
    display: block;
    border-radius: 120px;
  }
</style>
