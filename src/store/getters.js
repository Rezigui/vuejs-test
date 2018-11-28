const getters = {
  getCompanies(state) {
    const companies = (company = false) => {
      const name = company === '' ? false : company;
      const comp = state.companies.length > 0 ? state.companies : [];
      const result = name ? comp.filter(c => c.name === name) : comp;
      return result.length === 1 ? result[0] : result;
    };

    return companies;
  },
  getRates(state) {
    const rates = (company = false) => {
      const name = company === '' ? false : company;
      return name ? state.rates.filter(c => c.company === name) : state.rates;
    };

    return rates;
  },
};

export default getters;
