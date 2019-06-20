<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: true
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
  .container-page {
    width:1200px;
    margin:auto;
    padding:10px;
  }
</style>
