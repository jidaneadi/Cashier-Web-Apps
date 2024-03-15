<template>
  <div class="pa-6">
    <TableDataKaryawanComponents />
  </div>
</template>
<script>
import TableDataKaryawanComponents from '~/components/DataKaryawanComponents/Table/TableDataKaryawanComponents.vue';

export default {
  middleware: ['auth'],
  data() {
    return {};
  },
  components: { TableDataKaryawanComponents }
}
</script>
