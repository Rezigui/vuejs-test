<template>
  <div class="hello">
    <hr>
    <h2>{{ msg }}</h2>
    <hr>
    <a-row>
      <a-button type="danger" v-on:click="removeDatabase">Clear Data From Indexedb</a-button>
      <a-divider></a-divider>
      <a-button type="primary" v-on:click="setCompaniesOnDatabase">Put Some Example Companies on database</a-button>
    </a-row>
    <hr>
    <a-row style="text-align: left">
      <a-col :span="24">
        <a-divider>Description of the project</a-divider>
        <br>
        <p>
          This application was made with Vuejs, Vuex and Indexedb the Browser database. <br>
          The Ui theme is Ant Design For vue. <br>

          <a-divider>You can in this test project</a-divider>
          1 - Create a company with the name and the logo url <br>
          2 - Note the company, but the note cannot be integrate in the score calculate before it's validation <br>
              the comment can had 3 status, Waiting, Validate (approuved), Removed ("safe delete" the comment can be remove from Indexedb only if it's in this section)
        </p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  methods: {
    removeDatabase() {
      this.$store.dispatch('removeDataFromDatabase', this);
    },
    setCompaniesOnDatabase() {
      this.$store.dispatch('createMockCompanies', this);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
