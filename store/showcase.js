export const state = () => ({
  currentIndex: 0,
  status: ''
});

export const getters = {
  getCurrentIndex: (state) => {
    return state.currentIndex;
  },
}

export const mutations = {
  setCurrentIndex: (state, payload) => {
    state.currentIndex = payload;
  },
}