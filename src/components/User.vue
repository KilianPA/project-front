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
      var that = this
      this.$axios.get(process.env.API + 'users').then(function (response) {
        if (response.status === 200) {
          that.listUsers = response.data
        }
      })
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
