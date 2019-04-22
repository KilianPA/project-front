<template>
  <div>
    <div class="title-login text-center">
      Se Connecter
    </div>
    <div class="container-login-image">
      <img class="img-created-user" src="~assets/login.png"/>
    </div>
    <q-card class="container-login-input q-pa-md q-ma-md">
      <q-input :error="$v.form.email.$error" type="email" stack-label="Email" v-model="form.email"/>
      <q-input :error="$v.form.password.$error" type="password" stack-label="Mot de passe" v-model="form.password" />
      <q-btn :loading="loading" @click="submitLogin" color="primary" :to="{name: 'users.login'}" class="full-width q-pa-md q-mt-xl" label="Se connecter"/>
    </q-card>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'UserLogin',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false
    }
  },
  validations: {
    form: {
      email: {required, email},
      password: {required}
    }
  },
  methods: {
    submitLogin () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Merci de vérifier que tous les champs sont bien renseignés')
      } else {
        var that = this
        this.loading = true
        this.$axios({
          method: 'post',
          url: process.env.API + 'login',
          data: {email: this.form.email, password: this.form.password}
        }).then(response => {
          that.loading = false
          if (response.status === 200) {
            that.$q.localStorage.set('token', response.data.access_token)
            that.$router.push({ name: 'app.home' })
          }
        })
      }
    }
  }
}
</script>
<style scoped>
  .title-login {
    margin-top: 35px;
    font-size:35px;
    color: #2196f3;
  }
  .input {
    margin-top: 15px;
    padding: 10px;
    border: solid #f3f3f3 1px;
    background: #fbfbfb;
  }
  .container-login-input {
    background: white;
  }
</style>
