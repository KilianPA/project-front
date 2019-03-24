<template>
  <div>
    <transition name="slide-fade">
    <div v-show="show" class="container-spotify-search" :style="{top: bottom + 'px', width: width + 'px', left: '8px'}">
      <!--{{ dataSpotify }}-->
      <q-list v-if="spotifySearch.type === 'artist'" separator>
      <q-list-header>Artistes</q-list-header>
      <q-item @click.native="addElement(item)"  v-for="(item, index, key) in dataSpotify" :key="key">
        <!--{{item.images ? item.images : ''}}-->
        <q-item-side>
          <q-item-tile avatar>
            <img :src="item.images.length ? item.images[0].url : './assets/cd.png'">
          </q-item-tile>
        </q-item-side>
        <q-item-main :label="item.name" />
      </q-item>
    </q-list>
      <q-list v-else separator>
        <q-list-header>Musique</q-list-header>
        <q-item @click.native="addElement(item)"  v-for="(item, index, key) in dataSpotify" :key="key" multiline>
          <!--{{ item }}-->
          <!--{{item.images ? item.images : ''}}-->
          <q-item-side>
            <q-item-tile avatar>
              <img :src="item.album ? item.album.images[0].url : './assets/cd.png'">
            </q-item-tile>
          </q-item-side>
          <q-item-main
                  :label="item.name"
                  label-lines="2"
                  :sublabel="item.artists ? item.artists[0].name: ''"
          />
        </q-item>
      </q-list>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['type'],
  name: 'SpotifySearch',
  computed: {
    spotifySearch () {
      return this.$store.getters['spotify/spotifySearch']
    },
    currentDiv () {
      return this.$store.getters['spotify/currentDiv']
    }
  },
  data () {
    return {
      q: '',
      bottom: 0,
      width: 0,
      dataSpotify: '',
      show: false
    }
  },
  mounted () {
    console.log(window.innerWidth)
    this.width = window.innerWidth - 16
    // this.$axios.post('https://accounts.spotify.com/api/token', {
    //   headers: {
    //     'Authorization': 'Basic ' + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse('bcff5fae15a147608ddd2b42f3680dbc:03eab36a10c64b81aaa809fbd4f86023')),
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   params: {
    //     grant_type: 'client_credentials'
    //   }
    // }).then(response => {
    //   console.log(response)
    // })
  },
  methods: {
    search () {
      var that = this
      var q = this.spotifySearch.q
      var type = this.spotifySearch.type
      console.log((document.body.querySelector('#' + this.currentDiv).getBoundingClientRect().top) + document.body.querySelector('#' + this.currentDiv).getBoundingClientRect().height + 'px')
      this.bottom = (document.body.querySelector('#' + this.currentDiv).getBoundingClientRect().top) + document.body.querySelector('#' + this.currentDiv).getBoundingClientRect().height
      // this.bottom = (document.body.querySelector('#' + this.currentDiv).getBoundingClientRect().bottom - 280)
      this.$axios.get(process.env.SPOTIFY_URL, {
        headers: {'Authorization': `Bearer ${process.env.SPOTIFY_TOKEN}`},
        params: {
          q: q,
          type: type
        }
      }).then(function (response) {
        if (type === 'artist') {
          that.dataSpotify = (response.data.artists.items)
        } else {
          that.dataSpotify = (response.data.tracks.items)
        }
      })
    },
    addElement (value) {
      var data = { key: this.spotifySearch.key, value: value }
      this.$store.dispatch('spotify/addForm', data)
      this.show = false
    }
  },
  watch: {
    q () {
      if (this.q) {

      }
    },
    spotifySearch () {
      console.log(Object.keys(this.spotifySearch).length)
      if (Object.keys(this.spotifySearch).length) {
        this.show = true
        this.search()
      } else {
        this.show = false
      }
    }
  }
}
</script>
<style lang="stylus">
  .container-spotify-search {
    position: absolute;
    width: 400px;
    height: 280px;
    background: white;
    z-index:10;
    overflow-y: auto;
  }
  .slide-fade-enter-active {
    transition: all .5s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }
</style>
