<template>
  <div>
    <div class="container-user-home q-pa-md">
      Bonjour <strong> {{ user.surname }}, </strong>
    </div>
    <q-btn :to="{name: 'users.edit', params: {id: user.id}}" > Editer le compte </q-btn>
    <div class="q-ma-md">
      <q-btn color="red" class="full-width" @click="logout" label="Se Deconnecter" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHome',
  data () {
    return {
      user: ''
    }
  },
  mounted () {
    this.user = this.$q.localStorage.get.item('user')
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
      this.$router.push({name: 'index'})
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
