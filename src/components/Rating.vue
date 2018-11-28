<template>
  <div>
    <a-row style="text-align: center">
      <a-divider>Score <span v-if="isRatesDetails && score"> : {{ score }}</span></a-divider>
      <template>
        <a-rate v-model='score' disabled allowHalf/>
      </template>
    </a-row>
    <a-divider />
    <a-row>
      <a-col :span="8">
        <a-badge :count="ratesSuspended" showZero>
          <a href="#" class="sbox">
            <a-icon type="close-circle-o" class="danger"/>
          </a>
        </a-badge>
      </a-col>
      <a-col :span="8">
        <a-badge :count="ratesApprouved" showZero>
          <a href="#" class="sbox">
            <a-icon type="check-circle-o" class="success"/>
          </a>
        </a-badge>
      </a-col>
      <a-col :span="8">
        <a-badge :count="ratesWaiting" showZero>
          <a href="#" class="sbox">
            <a-icon type="exclamation-circle-o" class="warning"/>
          </a>
        </a-badge>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'rating',
  props: {
    company: {
      type: String,
      required: true,
    },
    isRatesDetails: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ratesApprouved() {
      const rates = this.$store.getters.getRates(this.company).filter(r => r.status === 1);
      this.updateScore(rates);
      return rates.length;
    },
    ratesWaiting() {
      return this.$store.getters.getRates(this.company).filter(r => r.status === 0).length;
    },
    ratesSuspended() {
      return this.$store.getters.getRates(this.company).filter(r => r.status === 2).length;
    },
  },
  methods: {
    updateScore(rates) {
      this.count = rates.length;
      this.note = rates.reduce((pv, nv) => pv + (nv.rate || 0), 0);
      const total = this.note / this.count || 0;
      this.score = total === 0 ? 0 : Number(parseFloat(Math.round(total * 100) / 100).toFixed(1));
    },
  },
  data() {
    return {
      score: 0,
      note: 0,
      count: 0,
    };
  },
};
</script>

<style scoped>
  .sbox {
    width: 35px;
    height: 35px;
    /* border-radius: 4px; */
    margin-left: 10px;
    display: inline-block;
  }
  .success {
    color: green;
  }
  .warning {
    color: orange;
  }
  .danger {
    color: red;
  }
  .sbox i {
    font-size: 25px;
  }
</style>
