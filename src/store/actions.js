const actions = {
  resetState({ commit }) {
    commit('resetState');
  },
  addCompany({ commit }, vm) {
    commit('addCompany', vm);
  },
  addRate({ commit }, rate) {
    commit('addRate', rate);
  },
  deleteRate({ commit }, rate) {
    commit('deleteRate', rate);
  },
  getAllCompanies({ commit }, vm) {
    commit('getAllCompanies', vm);
  },
  getAllRates({ commit }, vm) {
    commit('getAllRates', vm);
  },
  removeDataFromDatabase({ commit }, vm) {
    commit('removeDataFromDatabase', vm);
  },
  createMockCompanies({ commit }, vm) {
    commit('createMockCompanies', vm);
  },
};

export default actions;
