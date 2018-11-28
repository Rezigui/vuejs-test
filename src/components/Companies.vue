<template>
  <div>
    companies listing
    <a-row>

      <a-col  :xs="{ span: 24 }" :sm="{ span: 16 }" :md="{ span: 8 }" :lg="{ span: 6 }"
              v-for="company in getCompanies()" :key="company.name" style="padding: 10px">
        <company v-bind:name="company.name" v-bind:src="company.src"></company>
      </a-col>
    </a-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Company from '@/components/Company.vue';

export default {
  name: 'companies',
  components: { Company },
  computed: {
    ...mapGetters(['getCompanies']),
  },
};
</script>

<style scoped>

</style>
