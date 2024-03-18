<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app color="#A25ABF">
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider/>
      <v-list nav dense>
        <v-list-item color="white" v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="onLogout" >
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="text-body-1 black--text">HANACIK</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <FooterComponents />
  </v-app>
</template>

<script>
import FooterComponents from '~/components/GlobalComponents/footerComponents.vue';
import * as Cookies from 'js-cookie'
export default {
  name: "DefaultLayout",
  data() {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-home",
          title: "Dashboard",
          to: "/dashboard",
        },
        {
          icon: "mdi-account",
          title: "Data Karyawan",
          to: "/datakaryawan",
        },
        {
          icon: "mdi-food",
          title: "Data Produk",
          to: "/dataproduk",
        },
        {
          icon: "mdi-folder",
          title: "Data Transaksi",
          to: "/datatransaksi",
        },
      ],
      right: true,
      // title: "Vuetify.js",
    };
  },
  methods:{
    onLogout(){
      Cookies.remove('token')
      window.location.href = '/'
    }
  },
  components: { FooterComponents }
}
</script>
