<template>
  <div class="home-page">
    <div class="row">
      <div class="col-xs-12">
        <img class="responsive-img" src="~assets/logo.png"/>
      </div>
      <div class="col-xs-12 container-title-home text-center">
        Tindify
      </div>
      <div class="col-xs-12 container-title-sub-home text-center">
        Faites des recontres en musique
      </div>
      <div class="col-xs-12 container-button q-pa-sm q-mt-xl">
        <q-btn color="primary" :to="{name: 'users.login'}" class="full-width q-pa-md q-mt-md" label="Se connecter"/>
        <q-btn color="secondary" :to="{name: 'users.create'}" class="full-width q-pa-md q-mt-md" label="Créer un compte"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
  },
  mounted () {
  }
}
</script>
<style>
  body {
    background: #f5f5f5 !important;
  }
  .responsive-img {
    display: block;
    width:100px;
    height:100px;
    margin:auto;
    border-radius: 15px;
  }
  .home-page {
    margin-top: 80px;
  }
  .container-title-home {
    padding-top:45px;
    font-size:50px;
  }
  .container-title-sub-home {
    padding-top: 10px;
    color:#2196f3;
    font-size:15px;
  }
  container-button {
    margin-bottom: 30px !important;
  }
</style>
