<template>
  <div>
    <a-row class="company-details">
      <a-col :span="6" >
        <company v-bind:name="companyName" v-bind:src="company.src" v-bind:details="true"></company>
      </a-col>
      <a-col :span="16" :offset="2" class="company-comment">
        <a-collapse defaultActiveKey="1" :bordered="false">
          <a-collapse-panel v-for="(rate, index) in rates" :key="index" :style="collapseStyle">
            <template slot="header">
              <b>{{ index }}</b>
            </template>
            <a-list class="demo-loadmore-list" itemLayout="horizontal" :dataSource="rate.list" >

              <a-list-item slot="renderItem" slot-scope="item" class="animated fadeInLeft">
                <a-switch slot="actions"
                          :checked='getStatus(item.status)'
                          @change="update($event, item)">

                  <a-icon type="check" slot="checkedChildren"/>
                  <a-icon type="cross" slot="unCheckedChildren"/>
                </a-switch>

                <a-popconfirm slot="actions"
                      :title="`Do you want delete the ${item.username}'s comment`"
                      @confirm="confirm(item)"
                      okText="Yes" cancelText="No">

                  <a-button type="danger" >Delete</a-button>
                </a-popconfirm>

                <a-list-item-meta :description="item.comment">
                  <a slot="title"><h3>{{item.username}} <a-rate v-model='item.rate' disabled allowHalf/></h3></a>
                  <a-avatar slot="avatar" :src="avatarRandom(item.username)" />
                </a-list-item-meta>

              </a-list-item>
            </a-list>
          </a-collapse-panel>
        </a-collapse>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Company from '@/components/Company.vue';

export default {
  components: { Company },
  methods: {
    star(state, value) {
      return {
        'far fa-star': state > parseInt(value, 10),
        'fas fa-star': parseInt(value, 10) >= state,
      };
    },
    getGeo(geo) {
      return {
        lat: parseFloat(geo.lat),
        lng: parseFloat(geo.long),
      };
    },
    confirm(rate) {
      if (rate.status === 2) {
        const self = this;
        this.$confirm({
          title: 'Are you sure you want to delete this comment?',
          content: 'This actions will be remove the comment from indexedDb',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'Cancel',
          onOk() {
            self.$store.dispatch('deleteRate', { vm: self, rate });
          },
          onCancel() {},
        });
      } else {
        rate.status = 2;
        this.$store.dispatch('addRate', { vm: this, rate });
        this.$notification.open({
          message: 'Safe delete',
          description: 'The vote was safe delete and put on removed section',
        });
      }
    },
    status(value, attempt) {
      return {
        'btn-secondary': value !== attempt,
        'btn-success': attempt === 1 && value === 1,
        'btn-danger': attempt === 2 && value === 2,
      };
    },
    getStatus(status) {
      return status === 1;
    },
    update(value, item) {
      item.status = value ? 1 : 0;
      this.activeTabs = 'approuved';
      this.$store.dispatch('addRate', { vm: this, rate: item });
    },
  },
  computed: {
    company() {
      return this.$store.getters.getCompanies(this.$route.params.company);
    },
    rates() {
      const rates = this.$store.getters.getRates(this.$route.params.company);
      return {
        // <a-icon type="check-circle" />
        Approuved: { list: rates.filter(r => r.status === 1), icon: 'check-circle' },
        Waiting: { list: rates.filter(r => r.status === 0), icon: 'message' },
        Removed: { list: rates.filter(r => r.status === 2), icon: 'minus-circle' },
      };
    },
    avatarRandom() {
      return r => `https://api.adorable.io/avatars/75/${r}.png`;
    },
  },
  data() {
    return {
      activeTabs: 'waiting',
      displayMap: false,
      display: {
        approuved: true,
        waiting: false,
        removed: false,
      },
      companyName: this.$route.params.company,
      collapseStyle: 'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden',
    };
  },
};
</script>

<style scoped>
.company-details {
  text-align: left;
}
</style>
