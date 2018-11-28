<template>
  <div class="container">
    <h1>Companies</h1>
    <company-form></company-form>
    <hr>
    <companies></companies>
  </div>
</template>

<script>
import Companies from '@/components/Companies.vue';
import CompanyForm from '@/forms/CompanyForm.vue';

export default {
  name: 'companiesViews',
  components: { Companies, CompanyForm },
  data() {
    return {
      displayCompanyForm: false,
    };
  },
};
</script>

<style scoped>

</style>
