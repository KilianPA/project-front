<template>
  <div>
      <spotify-search/>
      <div class="container-title-top-create-user">
          <div class="row title-create-user">
              {{ title }}
          </div>
          <div class="row title-create-user-sub">
              {{ titleSub }}
          </div>
      </div>
      <div class="q-pa-sm q-mb-xl" id="container-create-user">
          <q-card class="q-pa-md q-card-create-user">
              <div class="row container-img-create-user justify-center">
                  <!--<img class="img-create-user" :src="currentPanel < 2 ? './assets/love.png' : './assets/music.png' "/>-->
                  <!--<img class="img-create-user" src="img/women.png"/>-->
                  <input style="display:none" type="file" @change="detectPhoto" accept="image/*" id="cameraInput">
                  <br><img @click="clickInput" id="myImg" :src="imgUrl ? imgUrl : './assets/emptyPicture.png'">
              </div>
              <div class="col-xs-12 container-title">
                  Vos informations
              </div>
                      <q-input class="input-create-user" color="inputColor"  :before="[{icon: 'account_circle'}]" v-model="form.surname" float-label="Prénom" :error="$v.form.surname.$error"/>
                      <q-input class="input-create-user" color="inputColor"  :before="[{icon: 'account_circle'}]" v-model="form.name" float-label="Nom" :error="$v.form.name.$error" />
                      <q-input class="input-create-user" color="inputColor" type="email"  :before="[{icon: 'email'}]" v-model="form.email" float-label="Email" :error="$v.form.email.$error"/>
                      <q-input class="input-create-user" color="inputColor" type="password"  :before="[{icon: 'visibility'}]" v-model="form.password" float-label="Mot de passe" :error="$v.form.password.$error"/>
                      <q-input autocomplete="new-password" class="input-create-user" color="inputColor"  :before="[{icon: 'map'}]" v-model="form.city" float-label="Ville" :error="$v.form.city.$error" >
                          <!--<q-autocomplete-->
                                  <!--@search="search"-->
                                  <!--:min-characters="1"-->
                                  <!--@selected="selected"-->
                          <!--/>-->
                      </q-input>

                      <q-datetime :before="[{icon: 'cake'}]" class="input-create-user" v-model="form.birthday"  type="date" float-label="Date de naissance" :error="$v.form.birthday.$error"/>
                      <q-select
                              class="input-create-user"
                              v-model="form.gender"
                              float-label="Vous êtes ?"
                              radio
                              :options="genderList"
                              :error="$v.form.gender.$error"
                      />
                      <q-select
                              multiple
                              class="input-create-user"
                              v-model="form.orientation"
                              float-label="Vous recherchez ?"
                              radio
                              :options="genderList"
                              :error="$v.form.orientation.$error"
                      />
              <div class="col-xs-12 container-title">
                  Musique
              </div>
              <div class="row">
                      <div class="col-xs-10">
                          <q-input @focus="focusDiv('inputArtist')" id="inputArtist" @input="searchSpotify(form.music.artist, 'artist', 'artist')" class="input-create-user" color="inputColor"  :before="[{icon: 'album'}]" float-label="Votre artiste" v-model="form.music.artist" :error="$v.form.music.a.$error"/>
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
                      <q-input @focus="focusDiv('inputSong1')" id="inputSong1" autocomplete="new-password" @input="searchSpotify(form.music.song1, 'track', 'song1')" class="input-create-user" color="inputColor"  :before="[{icon: 'audiotrack'}]" float-label="Une chanson" v-model="form.music.song1" :error="$v.form.music.s1.$error"/>
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
                                  <!--<q-item-main-->
                                          <!--:label="song1Choose.name"-->
                                          <!--label-lines="2"-->
                                          <!--:sublabel="song1Choose.artists[0].name"-->
                                  <!--/>-->
                              </q-item>
                      </div>
                      <div class="col-xs-10">
                          <q-input @focus="focusDiv('inputSong2')" id="inputSong2" autocomplete="new-password" @input="searchSpotify(form.music.song2, 'track', 'song2')" class="input-create-user" color="inputColor"  :before="[{icon: 'audiotrack'}]" float-label="Une chanson" v-model="form.music.song2" :error="$v.form.music.s2.$error"/>
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
                          <q-input @focus="focusDiv('inputSong3')" id="inputSong3" autocomplete="new-password" @input="searchSpotify(form.music.song3, 'track', 'song3')" class="input-create-user" color="inputColor"  :before="[{icon: 'audiotrack'}]" float-label="Une chanson" v-model="form.music.song3" :error="$v.form.music.s3.$error"/>
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
                    <q-btn @click="submitCreate" class="full-width" color="primary" label="Créer le compte"/>
                  </div>
          </q-card>
      </div>
  </div>
</template>

<script>
import { filter, date, QSpinnerGears } from 'quasar'
import { required, email } from 'vuelidate/lib/validators'
import SpotifySearch from '../Spotify/SpotifySearch'
const mustBeTrue = (value) => value === true
export default {
  name: 'UserCreate',
  components: { SpotifySearch },
  data () {
    return {
      imgUrl: '',
      url: process.env.API + 'users',
      form: {
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
      currentPanel: 0,
      villes: [],
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
        a: {mustBeTrue},
        s1: {mustBeTrue},
        s2: {mustBeTrue},
        s3: {mustBeTrue}
      }

    }
  },
  computed: {
    title () {
      if (this.currentPanel > 1) {
        return 'En avant la musique'
      }
      return 'Bonjour, vous êtes ?'
    },
    titleSub () {
      if (this.currentPanel > 1) {
        return 'Choissisez votre style, 3 de vos musiques préférées et votre artiste préféré'
      }
      return 'Choissisez votre nom, prénom, email et votre date de naissance'
    },
    cities () {
      return this.villes.map(ville => {
        return {
          label: ville,
          value: ville
        }
      })
    },
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
    // this.$axios({
    //   method: 'post',
    //   url: `https://accounts.spotify.com/api/token`,
    //   data: { // in axios data is the body request
    //     grant_type: 'client_credentials'
    //   },
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   auth: {
    //     username: process.env.SPOTIFY_USERNAME,
    //     password: process.env.SPOTIFY_PASSWORD
    //   }
    // }).then(response => {
    //   console.log(response + '')
    // })
  },
  methods: {
    uploadPhoto () {
      this.$q.loading.show({
        message: 'Envoie de votre photo sur le serveur',
        spinner: QSpinnerGears,
        spinnerSize: 100 // in pixels
      })
      var that = this
      if (document.querySelector('input[type="file"]').files[0]) {
        console.log('ici')
        var file = document.querySelector('input[type="file"]').files[0]
        var img = document.querySelector('img')
        let r = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '.jpeg'
        var storageRef = this.$firebase.storage().ref()
        var ref = storageRef.child(r)
        img.src = URL.createObjectURL(file)
        console.log(URL.createObjectURL(file))
        ref.put(file).then(function (snapshot) {
          that.form.music.artist = that.artistChoose
          that.form.music.song1 = that.song1Choose
          that.form.music.song2 = that.song2Choose
          that.form.music.song3 = that.song3Choose
          that.form.avatar = r
          that.form.birthday = date.formatDate(that.form.birthday, 'YYYY-MM-D')
          that.form.orientation = JSON.stringify(that.form.orientation)
          that.createUser(that.form)
        })
      }
    },
    detectPhoto (evt) {
      this.imgUrl = (URL.createObjectURL(evt.target.files[0]))
    },
    submitCreate () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Merci de vérifier que tous les champs sont bien renseignés')
      } else {
        this.uploadPhoto()
      }
    },
    search (terms, done) {
      setTimeout(() => {
        done(filter(terms, {field: 'value', list: this.cities}))
      }, 1000)
    },
    selected (item) {
      this.form.city = item.value
    },
    searchSpotify (q, type, key) {
      var data = {q: q, type: type, key: key}
      if (q) {
        this.$store.dispatch('spotify/addSearch', data)
      } else {
        this.$store.dispatch('spotify/addSearch', {})
      }
    },
    createUser (value) {
      this.$q.loading.show({
        message: 'Création de votre compte',
        spinner: QSpinnerGears,
        spinnerSize: 100 // in pixels
      })
      this.$axios({
        method: 'post',
        url: process.env.API + 'users',
        data: value
      }).then(response => {
        if (response.status === 200) {
          this.$q.loading.hide()
          this.$router.push({name: 'users.created'})
        }
      })
    },
    uploadFile (file, updateProgress) {
      console.log(file)
    },
    async getSignedUrl (file) {
      // const contentType = file.type // To send the correct Content-Type
      // const fileName = file.name // If you want to use this value to calculate the S3 Key.
      console.log(file)
    },
    focusDiv (evt) {
      // console.log(evt)
      this.$store.dispatch('spotify/setCurrentDiv', evt)
    },
    clickInput () {
      document.getElementById('cameraInput').click()
    }
  },
  updated () {
  },
  watch: {
    artistChoose () {
      if (this.artistChoose) {
        this.form.music.artist = this.artistChoose.name
        this.form.music.a = true
      }
    },
    song1Choose () {
      if (this.song1Choose) {
        this.form.music.song1 = this.song1Choose.name
        this.form.music.s1 = true
      }
    },
    song2Choose () {
      if (this.song2Choose) {
        this.form.music.song2 = this.song2Choose.name
        this.form.music.s2 = true
      }
    },
    song3Choose () {
      if (this.song3Choose) {
        this.form.music.song3 = this.song3Choose.name
        this.form.music.s3 = true
      }
    }
  }
}
</script>
<style>
    body {
        background: #f5f5f5 !important;
    }
    .q-card-create-user {
        background: white !important;
    }
    .input-create-user {
        margin-top: 15px;
    }

    .text-inputColor {
        color: #2196f3;
    }
    .bg-inputColor {
        background: #2196f3;
    }

    .title-create-user {
        font-size:30px;
        color:#2196f3;
    }
    .title-create-user-sub {
        padding-top: 15px;
        padding-bottom: 15px;
        color:grey;
        font-size:15px;
    }

    .container-title-top-create-user {
        padding-top: 25px;
        padding-left:15px;
    }
    .img-create-user {
        display: block;
        width: 72%;
        height: 72%;
    }
    .container-img-create-user {
        margin-top: 5px;
    }
    .label-back-create-user {
        line-height: 3;
    }
    .slide-fade-enter-active {
        transition: all .5s ease;
    }
    .slide-fade-leave-active {
        transition: all .1s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to
    {
        transform: translateX(-10px);
        opacity: 0;
    }

    .item-img {
        padding-top: 15px;
    }
    #myImg {
        height: 120px;
        display: block;
        border-radius: 120px;
    }
    .container-title {
        padding-top: 24px;
        font-size: 14px;
        color: #b7b7b7;
    }
</style>
