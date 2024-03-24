<template>
  <div>
    <v-alert border="left" color="#C8A8D6" class="text-subtitle-3 font-weight-bold  white--text">
      Pengajuan Surat Pengantar KTP
    </v-alert>
    <CardGrafik />
  </div>
</template>
<script>
import CardGrafik from '../components/HomeComponents/Card/CardHome.vue';

export default {
  middleware: ["auth"],
  components: { CardGrafik }
}
</script>
