<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col class="py-2">
        <v-card>
          <v-card-title class="text-h6 font-weight-bold pb-0">
            <v-icon large>mdi-account-multiple-outline</v-icon>
            Data User
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <div>
            <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
              offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="dateRangeText" label="Input tanggal" append-icon="mdi-calendar" readonly
                  v-bind="attrs" v-on="on"  filled></v-text-field>
              </template>
              <v-date-picker v-model="dates" range @input="menu = false"></v-date-picker>
            </v-menu>
            </div>
          </v-card-title>
          <v-card-actions class="pt-0">
            <v-btn color="yellow darken-1" dark small rounded class="mb-2 pa-1" @click="printData">
              <v-icon>fa-solid fa-print</v-icon>
            </v-btn>
          </v-card-actions>
          <v-data-table :headers="headers" :items="filteredTransactions">
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      menu: false,
      dates: ['2024-03-01', '2024-03-31'],
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
        { text: 'Tanggal Transaksi', value: 'updatedAt' },
      ],
      dataTransaksi: [],
      editedIndex: -1,
      defaultItem: {
        id: '',
        nama: '',
        nama_pelanggan: '',
        tot_harga: '',
        pembayaran: '',
        layanan: '',
        updatedAt: ''
      }
    }
  },
  created() {
    this.initialize()
  },
  computed: {
    dateRangeText() {
      return this.dates.join(' - ')
    },
    filteredTransactions() {
      const startDate = new Date(this.dates[0]);
      const endDate = new Date(this.dates[1]);
      return this.dataTransaksi.filter(transaction => {
        const transactionDate = new Date(transaction.updatedAt);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
    }
  },
  methods: {
    initialize() {
      this.$axios.$get('/transaksi/')
        .then((response => {
          console.log(response)
          this.dataTransaksi = response
          // this.$data.dialogAdd = false
        })).catch((error) => {
          console.log(error.response)
        })
    },
    printData() {
      window.print();
    },
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
    searchTransactions() {
      // Here you can implement any additional logic you need for searching transactions
    },

  },
}
</script>
