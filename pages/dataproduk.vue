<template>
  <div class="pa-6">
    <TableDataProduk />
  </div>
</template>
<script>
import TableDataProduk from '../components/DataProdukComponents/Table/TableDataProduk.vue';


export default {

  middleware: ['auth'],
  // data() {

  // },
  components: { TableDataProduk }
}
</script>
