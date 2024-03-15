<template>
  <div class="pa-6">
    <TableDataTransaksi />
  </div>
</template>
<script>
import TableDataTransaksi from '../components/DataTransaksiComponents/Table/TableDataTransaksi.vue';

export default {
  middleware: ["auth"],
  components: { TableDataTransaksi }
}
</script>
