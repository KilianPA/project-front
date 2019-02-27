<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-drawer
      v-model="leftDrawerOpen"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Menu</q-list-header>
        <q-item :to="{name: 'users'}">
          <q-item-side icon="user" />
          <q-item-main label="Utilisateurs" sublabel="Listes des utilisateurs" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container class="container-page">
      <router-view />
    </q-page-container>
  </q-layout>
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
