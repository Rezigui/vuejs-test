const mutations = {
  resetState(state) {
    Object.assign(state, {
      companies: [],
      rates: [],
      totalCompanies: 0,
      totalRatings: 0,
    });
  },
  async addCompany(state, obj) {
    const { vm, company } = obj;

    const key = company.name.toLowerCase().split(' ').join('_');
    await vm.iset('companies', key, company);
    state.companies = await vm.iall('companies');

    return state.companies;
  },
  async addRate(state, obj) {
    const { vm, rate } = obj;

    const key = `${rate.company}.${rate.username}`;
    await vm.iset('rates', key, rate);
    state.rates = await vm.iall('rates');

    return state.rates;
  },
  async deleteRate(state, obj) {
    const { vm, rate } = obj;
    const key = `${rate.company}.${rate.username}`;
    await vm.idelete('rates', key, rate);

    state.rates = await vm.iall('rates');
  },
  async init(state, vm) {
    const rates = await vm.iall('rates');
    const companies = await vm.iall('companies');

    state = {
      ...state,
      companies: [...companies],
      rates: [...rates],
    };
  },
  async getAllRates(state, vm) {
    const rates = await vm.iall('rates');
    state.rates = rates;

    return state.rates;
  },
  async getAllCompanies(state, vm) {
    const companies = await vm.iall('companies');

    state.companies = [...companies];

    return state.companies;
  },
  async removeDataFromDatabase(state, vm) {
    await vm.iclear('companies');
    await vm.iclear('rates');
    state = Object.assign(state, {
      companies: [],
      rates: [],
      totalCompanies: 0,
      totalRatings: 0,
    });
  },
  createMockCompanies(state, vm) {
    const data = [
      { name: 'Google', src: 'https://cdn.dribbble.com/users/904380/screenshots/2233565/revised-google-logo.gif' },
      { name: 'DataDog', src: 'https://d3an9kf42ylj3p.cloudfront.net/uploads/2016/10/dd.jpg?x38402' },
      { name: 'Sentry', src: 'https://sentry-brand.storage.googleapis.com/sentry-glyph-black.svg' },
      { name: 'Salesforce', src: 'http://rtbsquare.ciao.jp/wp-content/uploads/2018/06/salesforce.png' },
      { name: 'Docker', src: 'https://i2.wp.com/blog.docker.com/wp-content/uploads/2013/06/Docker-logo-011.png?ssl=1' },
    ];

    data.map(async (c) => {
      const k = c.name.toLocaleLowerCase().split(' ').join('_');
      await vm.iset('companies', k, c);
      return c;
    });

    state.companies = [...state.companies, ...data];
  },
};

export default mutations;
