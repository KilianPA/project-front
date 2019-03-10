<template>
  <div>
      <div class="container-title-top-create-user">
          <div class="row title-create-user">
              {{ title }}
          </div>
          <div class="row title-create-user-sub">
              {{ titleSub }}
          </div>
      </div>
      <div class="row container-img-create-user justify-center">
          <img class="img-create-user" :src="currentPanel < 2 ? './assets/love.png' : './assets/music.png' "/>
          <!--<img class="img-create-user" src="img/women.png"/>-->
      </div>
      <div class="q-pa-sm q-mb-xl fixed-bottom" id="container-create-user">
          <q-card class="q-pa-md q-card-create-user">
              <div class="row" v-if="currentPanel > 0">
                  <q-icon @click.native="backPanel" class="q-pa-sm" size="18px" name="arrow_back_ios"/>
                  <div class="label-back-create-user"> Retour </div>
              </div>
                  <div v-if="currentPanel === 0" class="container-part-1" key="panel-0">
                      <q-input class="input-create-user" color="inputColor" hide-underline :before="[{icon: 'account_circle'}]" :value="form.surname" placeholder="Prénom"/>
                      <q-input class="input-create-user" color="inputColor" hide-underline :before="[{icon: 'account_circle'}]" :value="form.name" placeholder="Nom"/>
                      <q-input class="input-create-user" color="inputColor" type="email" hide-underline :before="[{icon: 'email'}]" :value="form.email" placeholder="Email"/>
                      <q-input class="input-create-user" color="inputColor" hide-underline :before="[{icon: 'map'}]" :value="form.city" placeholder="Ville">
                          <q-autocomplete
                                  @search="search"
                                  :min-characters="3"
                                  @selected="selected"
                          />
                      </q-input>

                      <q-datetime :before="[{icon: 'cake'}]" class="input-create-user" v-model="form.datetime" hide-underline type="date" placeholder="Date de naissance" />
                  </div>
                  <div v-if="currentPanel === 1" class="container-part-1" key="panel-2">
                      <q-select
                              class="input-create-user"
                              v-model="form.gender"
                              float-label="Vous êtes ?"
                              radio
                              :options="genderList"
                              hide-underline
                      />
                      <q-select
                              multiple
                              class="input-create-user"
                              v-model="form.orientation"
                              float-label="Vous recherchez ?"
                              radio
                              :options="genderList"
                              hide-underline
                      />
                  </div>
                  <div v-if="currentPanel === 2" class="container-part-1" key="panel-3">
                      <q-input @input="searchSpotify(form.music.artist, 'artist', 'artist')" class="input-create-user" color="inputColor" hide-underline :before="[{icon: 'album'}]" placeholder="Votre artiste" v-model="form.music.artist"/>
                      <q-item v-if="artistChoose">
                          <!--{{item.images ? item.images : ''}}-->
                          <q-item-side>
                              <q-item-tile avatar>
                                  <img :src="artistChoose.images.length ? artistChoose.images[0].url : './assets/cd.png'">
                              </q-item-tile>
                          </q-item-side>
                          <q-item-main :label="artistChoose.name" />
                      </q-item>
                      <q-input @input="searchSpotify(form.music.song1, 'track', 'song1')" class="input-create-user" color="inputColor" hide-underline :before="[{icon: 'audiotrack'}]" placeholder="Votre artiste" v-model="form.music.song1"/>
                      <q-item v-if="song1Choose" multiline>
                          <!--{{ item }}-->
                          <!--{{item.images ? item.images : ''}}-->
                          <q-item-side>
                              <q-item-tile avatar>
                                  <img :src="song1Choose.album ? song1Choose.album.images[0].url : './assets/cd.png'">
                              </q-item-tile>
                          </q-item-side>
                          <q-item-main
                                  :label="song1Choose.name"
                                  label-lines="2"
                                  :sublabel="song1Choose.artists[0].name"
                          />
                      </q-item>
                      <q-input @input="searchSpotify(form.music.song2, 'track', 'song2')" class="input-create-user" color="inputColor" hide-underline :before="[{icon: 'audiotrack'}]" placeholder="Votre artiste" v-model="form.music.song2"/>
                      <q-item v-if="song2Choose" multiline>
                          <!--{{ item }}-->
                          <!--{{item.images ? item.images : ''}}-->
                          <q-item-side>
                              <q-item-tile avatar>
                                  <img :src="song2Choose.album ? song2Choose.album.images[0].url : './assets/cd.png'">
                              </q-item-tile>
                          </q-item-side>
                          <q-item-main
                                  :label="song2Choose.name"
                                  label-lines="2"
                                  :sublabel="song2Choose.artists[0].name"
                          />
                      </q-item>
                      <q-input @input="searchSpotify(form.music.song3, 'track', 'song3')" class="input-create-user" color="inputColor" hide-underline :before="[{icon: 'audiotrack'}]" placeholder="Votre artiste" v-model="form.music.song3"/>
                      <q-item v-if="song3Choose" multiline>
                          <!--{{ item }}-->
                          <!--{{item.images ? item.images : ''}}-->
                          <q-item-side>
                              <q-item-tile avatar>
                                  <img :src="song3Choose.album ? song3Choose.album.images[0].url : './assets/cd.png'">
                              </q-item-tile>
                          </q-item-side>
                          <q-item-main
                                  :label="song3Choose.name"
                                  label-lines="2"
                                  :sublabel="song3Choose.artists[0].name"
                          />
                      </q-item>
                  </div>
                  <div class="q-pt-md">
                    <q-btn @click="submitCreate" class="full-width" color="primary" label="Continuer"/>
                  </div>
          </q-card>
              <spotify-search/>
      </div>
  </div>
</template>

<script>
import { filter } from 'quasar'
import SpotifySearch from '../Spotify/SpotifySearch'
export default {
  name: 'UserCreate',
  components: { SpotifySearch },
  data () {
    return {
      form: {
        name: '',
        surname: '',
        email: '',
        datetime: '',
        city: '',
        gender: '',
        orientation: [],
        music: {
          artist: '',
          song1: '',
          song2: '',
          song3: ''
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
  methods: {
    submitCreate () {
      this.currentPanel++
    },
    backPanel () {
      this.currentPanel--
    },
    search (terms, done) {
      setTimeout(() => {
        done(filter(terms, {field: 'value', list: this.cities}))
      }, 1000)
    },
    selected (item) {
      this.form.city = item.value
    },
    getCities () {
      var cities = require('./ressources/cities.json')
      var that = this
      cities.forEach(function (city) {
        if (!that.villes.includes(city.name)) {
          that.villes.push(city.name)
        }
      })
    },
    searchSpotify (q, type, key) {
      var data = {q: q, type: type, key: key}
      if (q) {
        this.$store.dispatch('spotify/addSearch', data)
      } else {
        this.$store.dispatch('spotify/addSearch', {})
      }
    }
  },
  mounted () {
    this.getCities()
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
        padding: 10px;
        border: solid #f3f3f3 1px;
        background: #fbfbfb;
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
        margin-top: 15px;
    }
    .label-back-create-user {
        line-height: 3;
    }
    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .3s ease;
    }
    .component-fade-enter, .component-fade-leave-to {
        opacity: 0;
    }
</style>
