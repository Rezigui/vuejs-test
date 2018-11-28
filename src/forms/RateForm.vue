<template>
  <div>
    <a-modal
        :title="`Rate ${company}`"
        :visible="visible"
        :okText="successModalButton"
        @ok="handleOk"
        @cancel="handleCancel"
      >
      <a-form :autoFormCreate="(form)=>{this.form = form}">
        <a-form-item
          label='Name'
          fieldDecoratorId="username"
          :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your name' }]}">
          <a-input placeholder='Please input your name' @change="this.isUpdating" />
        </a-form-item>
        <a-form-item label="Comment" fieldDecoratorId="comment">
          <a-input type='textarea'/>
        </a-form-item>
        <a-form-item style="text-align: center">
          <a-rate v-model='rate.rate' allowHalf/>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-icon @click="displayModal" type="star"/>
  </div>
</template>

<script>
export default {
  name: 'rateform',
  props: {
    company: String,
  },
  computed: {
    getRandomGeo() {
      return {
        lng: (Math.random() * (180 + 180) - 180).toFixed(3) * 1,
        lat: (Math.random() * (90 + 90) - 90).toFixed(3) * 1,
      };
    },
  },
  methods: {
    displayModal() {
      this.visible = true;
    },
    handleOk() {
      const self = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          this.rate.username = values.username;
          this.rate.comment = values.comment;
          this.rate.geo = this.getRandomGeo;
          this.$store.dispatch('addRate', { vm: self, rate: this.rate });
          this.visible = false;
          this.rate = {
            rate: 1,
            company: this.company,
            status: 0,
            geo: { lat: 0, long: 0 },
          };
          this.$notification.open({
            message: 'Rate',
            description: 'Your Vote was save with Success, your vote will be validate by an admin',
          });
        }
      });
    },
    handleCancel() {
      this.visible = false;
    },
    isUpdating(e) {
      this.successModalButton = this.$store.getters.getRates(this.company).filter(c => c.username === e.target.value).length > 0 ? 'Update' : 'Rate';
    },
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      successModalButton: 'Rate',
      rate: {
        username: '',
        rate: 1,
        comment: '',
        company: this.company,
        status: 0,
        geo: {
          lat: 0,
          long: 0,
        },
      },
      displayRate: false,
    };
  },
};
</script>

<style scoped>
.modal-mask {
  position: absolute;
  background: #000;
  top: 30%;
  width: 300px;
}
.modal {
  display: block;
}
</style>
