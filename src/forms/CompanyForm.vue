<template>
  <div>
    <a-modal title="Create a new Company"
        :visible="visible"
        @ok="handleOk"
        @cancel="handleCancel"
        okText="Add">
      <a-form :autoFormCreate="(form)=>{this.form = form}">
        <a-form-item
          label='Name'
          fieldDecoratorId="name"
          :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input a company name' }]}">
          <a-input placeholder='Please input a company name'/>
        </a-form-item>
        <a-form-item
          label='Logo Company url'
          fieldDecoratorId="url"
          :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input a url logo' }, {type: 'url', message: 'you must be set a valid url'}]}">
          <a-input placeholder='Please input a company name'/>
        </a-form-item>
        <a-form-item label="Description" fieldDecoratorId="description">
          <a-input type='textarea'/>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-button type="primary" @click="visible = true">Add A New Company</a-button>
  </div>
</template>

<script>
export default {
  name: 'companyform',
  methods: {
    handleCancel() {
      this.visible = false;
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch('addCompany', {
            vm: this,
            company: {
              name: values.name,
              src: values.url,
              description: values.description,
            },
          });
          this.visible = false;
          this.$notification.open({
            message: 'New Company',
            description: 'The new company was added you can now note it.',
          });
        }
      });
    },
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      company: {
        name: 'Company Name',
        src: 'Image',
      },
    };
  },
};
</script>

<style scoped>
</style>
