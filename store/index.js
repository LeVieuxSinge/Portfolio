export const state = () => ({
  lang: 'eng',
});

export const getters = {
  getLanguage: (state) => {
    return state.lang;
  },
}

export const mutations = {
  setLanguage: (state, payload) => {
    state.lang = payload;
  },
}