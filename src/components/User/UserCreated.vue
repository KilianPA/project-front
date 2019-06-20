<template>
  <div>
    <div class="text-center">
      <img class="img-created-user" src="~assets/userCreated.png"/>
    </div>
    <div class="text-userCreated text-center">
      Votre compte à bien été créé
    </div>
    <div class="q-pa-sm">
      <q-btn color="primary" :to="{name: 'users.login'}" class="full-width q-pa-md q-mt-xl" label="Se connecter"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCreated'
}
</script>
<style lang="stylus">
  body {
    background: #f5f5f5 !important;
  }
  .img-created-user {
    display: block;
    margin: auto;
    width: 72%;
    margin-top: 100px;
  }
  .text-userCreated {
    padding:10px;
    color: #2196f3;
    font-size:20px;
  }
</style>
