<template>
  <!-- ===============Batas Card===================== -->
  <div class="px-0 mx-0">
    <v-row no-gutters>
      <v-col class="d-flex flex-wrap my-2">
        <v-col cols="12" xl="3" lg="3" md="3" sm="6">
          <v-card class="mx-auto" width="400px" height="100px">
            <v-system-bar color="yellow darken-2" height="20px">
              <div class="text-subtitle-2 font-weight-bold white--text text-center">
                Jumlah Transaksi
              </div>
              <v-spacer />
              <div>
                <v-icon dark small color="white">
                  fa-solid fa-shop
                </v-icon>
              </div>
            </v-system-bar>
            <div class="text-subtitle-1 font-weight-bold text-center">
              <v-row no-gutters>
                <v-col cols="7" class="d-flex justify-center align-center">
                  <v-card color="yellow lighten-5" width="135px" height="60px">
                    <v-card-title class="text-subtitle-2 justify-center">
                      {{ dataPenjualan }}
                    </v-card-title>
                  </v-card>
                </v-col>
                <v-col cols="5" class="justify-center">
                  <v-img height="75px" class="" width="100px" src="img/datapenjualan.svg"> </v-img>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="3" sm="6">
          <v-card class="mx-auto" width="400px" height="100px">
            <v-system-bar color="green lighten-1" height="20px">
              <div class="text-subtitle-2 font-weight-bold white--text text-center">
                Total Penjualan
              </div>
              <v-spacer />
              <div>
                <v-icon dark small color="white">
                  fa-solid fa-circle-dollar-to-slot
                </v-icon>
              </div>
            </v-system-bar>
            <div class="text-subtitle-1 font-weight-bold text-center">
              <v-row no-gutters>
                <v-col cols="7" class="d-flex justify-center align-center mx-auto">
                  <v-card color="green lighten-5" width="135px" height="60px">
                    <v-card-title class="text-subtitle-2 justify-center">
                     {{ dataTransaki }}
                    </v-card-title>
                  </v-card>
                </v-col>
                <v-col cols="5" class="justify-center">
                  <v-img height="75px" class="" width="100px" src="img/datatransaksi.svg"> </v-img>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
  </div>
  <!-- ===============Batas Card===================== -->
</template>
<script>

import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      dataPenjualan: '',
      dataTransaki: '',
      diVerifikasi: '',
      diTerbitkan: '',
    }
  },
  created() {
    this.totalPenjualan()
    this.totTransaksi()
  },
  methods: {
    totalPenjualan() {
      this.$axios.$get('/transaksi/')
        .then((response => {
          console.log(response)
          const filteredData = response;
          this.$data.dataPenjualan = filteredData.length

        })).catch((error) => {
          console.log(error.response)
        })
    },
    totTransaksi() {
      this.$axios.$get('/transaksi/')
        .then((response => {
          console.log(response)
          // Inisialisasi totalTransaksi dengan nilai awal 0
          let totalTransaksi = 0;

          // Iterasi melalui setiap objek dalam respons
          response.forEach(transaksi => {
            // Ambil nilai tot_harga dari setiap objek dan tambahkan ke totalTransaksi
            totalTransaksi += parseFloat(transaksi.tot_harga);
          });

          // Simpan totalTransaksi ke dalam data untuk digunakan di template
          this.dataTransaki = totalTransaksi.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });;
          console.log(totalTransaksi);

        })).catch((error) => {
          console.log(error)
        })
    },
  },
  computed: {
    ...mapGetters('auth', {
      user: 'user'
    })
  },
}
</script>
