<template>
  <div>
    <v-data-table :headers="headers" :items="dataKaryawan">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Data Karyawan</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Tambah Data Karyawan</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.nama" label="Nama"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.password" label="Password"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.no_hp" label="Nomor HP"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.alamat" label="Alamat"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                <v-combobox v-model="editedItem.status" label="Status" :items="items"/>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="addKaryawan">
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

    <v-dialog v-model="dialogEdit" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Data Karyawan</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.nama" label="Nama"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.password" label="Password"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.no_hp" label="Nomor HP"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.alamat" label="Alamat"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-combobox v-model="editedItem.status" label="Status" :items="items"/>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogEdit = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="editKaryawan">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
  data: () => ({
    dialog: false,
    dialogEdit: false,
    dialogDelete: false,
    dialogBerhasil:false,
    items:['aktif', 'tidak aktif'],
    headers: [
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Nama', value: 'nama' },
      { text: 'Email', value: 'email' },
      { text: 'Password', value: 'password' },
      { text: 'Nomor HP', value: 'no_hp' },
      { text: 'Alamat', value: 'alamat' },
      { text: 'Status', value: 'status' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    dataKaryawan: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      id_user: '',
      nama: '',
      email: '',
      role:'karyawan',
      password: '',
      no_hp: '',
      alamat: '',
      status: '',
    },
    defaultItem: {
      id: '',
      id_user: '',
      nama: '',
      email: '',
      role:'karyawan',
      password: '',
      no_hp: '',
      alamat: '',
      status: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    reload() {
      window.location.href = '/datakaryawan';
    },

    initialize() {
      this.$axios.$get('/karyawan/')
        .then((response => {
          console.log(response.data)
          this.dataKaryawan = response.data
        })).catch((error) => {
          console.log(error)
        });
    },

    addKaryawan() {
      this.$axios.$post('/karyawan/', this.editedItem)
        .then((response) => {
          console.log(response);
          this.$data.dialogBerhasil = true
          this.$data.dialog = false

        }).catch((error) => {
          console.log(error);
          alert(error.response.data.msg)
        });
    },

    editKaryawan() {
      this.$axios.$put(`/karyawan/${this.editedItem.id_user}`, this.editedItem)
        .then((response) => {
          console.log(response);
          this.$data.dialogBerhasil = true
          this.$data.dialogEdit = false
        }).catch((error) => {
          console.log(error);
          alert(error.response.data.msg)
        });
    },

    editItem(item) {
      this.editedIndex = this.dataKaryawan.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogEdit = true
    },

    deleteItem(item) {
      this.editedIndex = this.dataKaryawan.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.$axios.$delete(`/karyawan/${this.editedItem.id_user}`, this.editedItem)
        .then((response) => {
          console.log(response);
          this.$data.dialogBerhasil = true
          this.$data.dialogDelete = false
        }).catch((error) => {
          console.log(error);
          alert(error.response.data.msg)
        });
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.dataKaryawan[this.editedIndex], this.editedItem)
      } else {
        this.dataKaryawan.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
