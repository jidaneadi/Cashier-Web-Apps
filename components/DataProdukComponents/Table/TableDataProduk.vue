<template>
  <div>
    <v-data-table :headers="headers" :items="dataProduk">
      <template v-slot:item.jns_produk="{ item }">
          <v-chip :color="getColor(item.jns_produk)" dark>
            {{ item.jns_produk }}
          </v-chip>
        </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Data Produk</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <!-- Dialog Add -->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Tambah Produk</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.nama_produk" :rules="rules.nama_produk"
                        label="Nama Produk"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.harga" :rules="rules.harga" prefix="Rp." label="Harga"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-combobox v-model="editedItem.jns_produk" :rules="rules.jns_produk" label="Jenis Produk"
                        :items="items"></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.keterangan" :rules="rules.keterangan"
                        label="Keterangan"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="addProduk">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>

    <!-- Dialog Edit -->
    <v-dialog v-model="dialogEdit" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Tambah Data Masyarakat</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.nama_produk" :rules="rules.nama_produk"
                  label="Nama Produk"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.harga" :rules="rules.harga" prefix="Rp." label="Harga"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-combobox v-model="editedItem.jns_produk" :rules="rules.jns_produk" label="Jenis Produk"
                  :items="items"></v-combobox>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.keterangan" :rules="rules.keterangan" label="Keterangan"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogEdit = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="editProduk">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog Hapus -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Anda yakin menghapus produk ini dari daftar menu?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteProduk">OK</v-btn>
          <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancel</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog Berhasil -->
    <v-dialog v-model="dialogBerhasil" persistent max-width="290">
      <v-card>
        <v-card-text align="center">
          <h2 class="pt-4 pb-2 black--text font-weight-bold">SUKSES!!!</h2>
        </v-card-text>
        <v-card-text align="center"><v-btn class="mx-2" fab dark large color="green">
            <v-icon x-large dark>
              mdi-checkbox-marked-circle
            </v-icon>
          </v-btn>
        </v-card-text>
        <v-card-actions>
          <v-btn block color="green darken-1" class="white--text" @click="reload">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      dialogEdit: false,
      dialogDelete: false,
      dialogBerhasil: false,
      items: ['paket cripy', 'paket penyetan', 'saus spesial', 'mie pedas', 'menu satuan', 'menu sayur', 'minuman varian rasa', 'menu lain-lain', 'minuman'],
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Nama Produk', value: 'nama_produk' },
        { text: 'Harga', value: 'harga' },
        { text: 'Jenis Produk', value: 'jns_produk' },
        { text: 'Keterangan', value: 'keterangan' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      rules: {
        nama_produk: [
          v => !!v || 'Nama produk tidak boleh kosong',
        ],
        harga: [
          v => !!v || 'Harga tidak boleh kosong',
        ],
        jns_produk: [
          v => !!v || 'Jenis produk tidak boleh kosong',
        ],
        keterangan: [
          v => !!v || 'Keterangan tidak boleh kosong',
        ],
      },
      dataProduk: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        nama_produk: '',
        harga: '',
        jns_produk: '',
        keterangan: '',
      },
      defaultItem: {
        id: '',
        nama_produk: '',
        harga: '',
        jns_produk: '',
        keterangan: '',
      },
    }
  },

  // watch: {
  //   dialog(val) {
  //     val || this.close()
  //   },
  //   dialogDelete(val) {
  //     val || this.closeDelete()
  //   },
  // },

  created() {
    this.initialize()
  },

  methods: {
    getColor(jns_produk) {
      if (jns_produk === "paket crispy") return 'blue'
      else if (jns_produk === "paket penyetan") return 'brown'
      else if (jns_produk === "saus spesial") return 'red'
      else if (jns_produk === "mie pedas") return 'deep-orange'
      else if (jns_produk === "menu satuan") return 'amber'
      else if (jns_produk === "menu sayur") return 'green'
      else if (jns_produk === "minuman varian rasa") return 'lime'
      else if (jns_produk === "menu lain-lain") return 'indigo'
      else if (jns_produk === "minuman") return 'cyan'
      else return 'red'
    },

    reload() {
      window.location.href = '/dataproduk';
    },
    initialize() {
      this.$axios.$get('/product/')
        .then((response => {
          console.log(response)
          this.dataProduk = response
        })).catch((error) => {
          console.log(error.response.data.msg)
          alert(error.response.data.msg)
        });
    },

    addProduk() {
      this.$axios.$post('/product/', this.editedItem)
        .then((response) => {
          console.log(response);
          this.$data.dialogBerhasil = true
          this.$data.dialog = false

        }).catch((error) => {
          console.log(error.response.data.msg)
          alert(error.response.data.msg);
        });
    },

    editProduk() {
      this.$axios.$put(`/product/${this.editedItem.id}`, this.editedItem)
        .then((response) => {
          console.log(response);
          this.$data.dialogBerhasil = true
          this.$data.dialogEdit = false
        }).catch((error) => {
          console.log(error.response.data.msg)
          alert(error.response.data.msg);
        });
    },

    deleteProduk() {
      this.$axios.$delete(`/product/${this.editedItem.id}`, this.editedItem)
        .then((response) => {
          console.log(response);
          this.$data.dialogBerhasil = true
          this.$data.dialogDelete = false
        }).catch((error) => {
          console.log(error.response.data.msg)
          alert(error.response.data.msg);
        });
    },

    editItem(item) {
      this.editedIndex = this.dataProduk.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogEdit = true
    },

    deleteItem(item) {
      this.editedIndex = this.dataProduk.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
  },
}
</script>
