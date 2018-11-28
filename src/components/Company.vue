<template>
  <div>
    <a-card hoverable style="width: 100%" class="scard">
      <img v-bind:src="src" slot="cover" />
      <a-card-meta description="">
        <h2 slot="title">{{ name }}</h2>
      </a-card-meta>

      <template class="ant-card-actions" slot="actions" v-if="!details">
        <rate-form v-bind:company="name"></rate-form>
        <router-link :to="{ name: 'details', params: { company: name }}">
          <a-icon type="plus-circle" />
        </router-link>
      </template>
      <rating v-bind:company="name" v-bind:isRatesDetails="details"></rating>
    </a-card>
  </div>

</template>

<script>
import Rating from '@/components/Rating.vue';
import RateForm from '@/forms/RateForm.vue';

export default {
  name: 'company',
  components: { Rating, RateForm },
  props: {
    name: String,
    src: String,
    details: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.scard img {
  height: 200px;
}
</style>
