<template>
  <div>
    <q-card>
      <q-card-title>
        Liste des utilisateurs
        <q-btn :to="{name: 'users.create'}" label="Ajouter un utilisateur"></q-btn>
      </q-card-title>
        <div class="container-users-list">
          <q-list separator>
            <q-item v-for="(user, index, key) in listUsers" :key="key">
              <router-link :to="{name: 'users.edit', params: {id: user.id}}">
                {{ user.name }}
              </router-link>
            </q-item>
          </q-list>
        </div>
    </q-card>

  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      url: 'http://localhost:8000/api/',
      listUsers: []
    }
  },
  methods: {
    getAllUsers () {
      this.listUsers = [{
        'id': 1,
        'name': 'Dr. Arvid Heathcote DVM',
        'email': 'ines47@friesen.com',
        'email_verified_at': null,
        'created_at': '2019-01-29 15:44:06',
        'updated_at': '2019-01-29 15:44:06'
      }, {
        'id': 2,
        'name': 'Sierra Marquardt',
        'email': 'jaquelin.cartwright@balistreri.com',
        'email_verified_at': null,
        'created_at': '2019-01-29 15:44:08',
        'updated_at': '2019-01-29 15:44:08'
      }, {
        'id': 3,
        'name': 'Prof. Milo Hermann',
        'email': 'josefina94@hotmail.com',
        'email_verified_at': null,
        'created_at': '2019-01-29 15:44:09',
        'updated_at': '2019-01-29 15:44:09'
      }, {
        'id': 4,
        'name': 'Riley Hamill',
        'email': 'ora59@gmail.com',
        'email_verified_at': null,
        'created_at': '2019-01-29 15:44:10',
        'updated_at': '2019-01-29 15:44:10'
      }, {
        'id': 5,
        'name': 'Santina Bosco',
        'email': 'tgrant@kuhlman.com',
        'email_verified_at': null,
        'created_at': '2019-01-29 15:44:10',
        'updated_at': '2019-01-29 15:44:10'
      }, {
        'id': 6,
        'name': 'Dr. Sydnie Jacobson',
        'email': 'kristy85@yahoo.com',
        'email_verified_at': null,
        'created_at': '2019-01-29 15:44:11',
        'updated_at': '2019-01-29 15:44:11'
      }, {
        'id': 7,
        'name': 'Olin Blanda',
        'email': 'mayert.ezequiel@johnston.com',
        'email_verified_at': null,
        'created_at': '2019-01-29 15:44:11',
        'updated_at': '2019-01-29 15:44:11'
      }, {
        'id': 8,
        'name': 'Michel',
        'email': 'Michel',
        'email_verified_at': null,
        'created_at': '2019-01-29 15:55:54',
        'updated_at': '2019-01-29 15:55:54'
      }]
      // var that = this
      // this.$axios.get(this.url + 'users').then(function (response) {
      //   if (response.status === 200) {
      //     that.listUsers = response.data
      //   }
      // })
    }
  },
  mounted () {
    this.getAllUsers()
  }
}
</script>
<style>
  a {
    text-decoration: none;
    color:black;
  }
</style>
