<template>
  <v-row justify="center">
    <v-col cols="4">
      <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y
        min-width="auto">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-model="dateRangeText" label="Input tanggal" append-icon="mdi-calendar" readonly v-bind="attrs"
            v-on="on" solo></v-text-field>
        </template>
        <v-date-picker v-model="dates" range @input="menu = false"></v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="2">
      <v-btn large color="#66BB6A" class="white--text">
        Search
      </v-btn>
    </v-col>
    <v-col cols="12">
      <v-data-table :headers="headers" :items="dataTransaksi">
        <template v-slot:item.pembayaran="{ item }">
          <v-chip :color="getColorPembayaran(item.pembayaran)" dark>
            {{ item.pembayaran }}
          </v-chip>
        </template>
        <template v-slot:item.layanan="{ item }">
          <v-chip :color="getColorLayanan(item.layanan)" dark>
            {{ item.layanan }}
          </v-chip>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      menu: false,
      dates: ['2019-09-10', '2019-09-20'],
      headers: [
        {
          text: 'ID Transaksi',
          align: 'start',
          value: 'id',
        },
        { text: 'Nama Karyawan', value: 'nama' },
        { text: 'Nama Pelanggan', value: 'nama_pelanggan' },
        { text: 'Pembayaran', value: 'pembayaran' },
        { text: 'Layanan', value: 'layanan' },
        { text: 'Total Harga', value: 'tot_harga' },
        { text: 'Tanggal Transaksi', value: 'updated_at' },
      ],
      dataTransaksi: [
        {
          id: '1',
          nama: 'Annisa Widyaningrum',
          nama_pelanggan: 'Eko Prasetyo',
          pembayaran: 'cash',
          layanan: 'takeway',
          tot_harga: '120.000',
          updated_at: '2019-12-01'
        },
        {
          id: '2',
          nama: 'Iqmal Riffai',
          nama_pelanggan: 'Jokowidodo',
          pembayaran: 'cash',
          layanan: 'makan di tempat',
          tot_harga: '1.200.000',
          updated_at: '2019-12-01'
        },
        {
          id: '3',
          nama: 'Gita Megantara',
          nama_pelanggan: 'Heru',
          pembayaran: 'qris',
          layanan: 'takeway',
          tot_harga: '100.000',
          updated_at: '2019-12-01'
        },
      ]
    }
  },
  computed: {
    dateRangeText() {
      return this.dates.join(' - ')
    },
  },
  methods: {
    getColorPembayaran(pembayaran) {
      if (pembayaran === "cash") return 'green'
      else if (pembayaran === "qris") return 'blue'
      else return 'red'
    },
    getColorLayanan(layanan) {
      if (layanan === "takeway") return 'amber'
      else if (layanan === "makan di tempat") return 'deep-orange'
      else return 'red'
    },
  },
}

</script>
