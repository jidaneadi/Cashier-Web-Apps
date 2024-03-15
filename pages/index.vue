<template>
  <v-row justify="center" align="center">
    <v-col cols="6" sm="6" md="6" lg="6" xl="6">
      <v-card class="mx-auto" max-width="500px" color="#FAFAFA">
        <v-col class="px-10">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-col class="d-flex justify-center" fab>
              <v-img src="img/logo.jpg" class="rounded-image" max-width="140px" max-height="102px" />
            </v-col>
            <v-text-field v-model="form.email" :rules="emailRules" label="E-mail" hint="Contoh: example@gmail.com"
              required solo @click="isErr = false"></v-text-field>
            <v-text-field v-model="form.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules"
              :type="show1 ? 'text' : 'password'" name="input-10-1" @click:append="show1 = !show1"
              hint="Minimal 8 karakter" label="Password" solo required @click="isErr = false" />
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="onSubmit">
              Login
            </v-btn>
            <v-btn color="error" class="mr-4" @click="reset">
              Reset
            </v-btn>
          </v-form>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  middleware: [ 'unauth'],
  layout: 'auth',
  data() {
    return {
      message: '',
      isErr: false,
      isTrue: false,
      show1: false,
      valid: true,
      layout: 'auth',
      name: 'IndexPage',
      form: {
        email: '',
        password: '',
      },
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password berisi minimal 8 karakter',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail tidak valid',
      ],
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    onSubmit() {
      this.$store.dispatch('auth/login', this.form)
        .then((data) => {
          console.log(data.message)
            console.log(data.role)
          if (data.message.role == "admin") {
            window.location.href = '/dashboard'
          }
        }).catch((err) => {
          console.log(err)
          // this.isErr = true
          // if (err.response.data.msg == 'Email not found' || err.response.data.msg == 'Password Failed' ) { this.message = "E-mail tidak ditemukan atau password salah!"}
          // if (err.response.data.msg == 'Email required') {this.message = "E-mail tidak boleh kosong"}
          // if(err.response.data.msg == 'Password required') {this.message = "Password tidak boleh kosong"}
        });
    },
  },
}
</script>
<style>
.rounded-image {
  border-radius: 50%; /* Membuat gambar menjadi lingkaran */
}
</style>

