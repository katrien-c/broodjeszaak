<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link to="/order/add">
          <v-list-item-action>
            <v-icon>mdi-baguette</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >
                Bestelling toevoegen
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/order/list">
          <v-list-item-action>
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Lijst bestellingen
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title><router-link to="/" class="toolbar-title">Broodjeszaak</router-link></v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="10" class="text-center">
             <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>Katrien Cogghe &copy; {{year}}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    created () {
      this.year = new Date().getFullYear()
      this.$vuetify.theme.dark = true
    },
  }
</script>

<style lang="scss" scoped>
  .toolbar-title {
      text-decoration: none;
      padding: 1rem;
      color: #fff;
  }
</style>