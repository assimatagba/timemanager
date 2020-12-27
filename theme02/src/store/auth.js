const state = {
  currentUser: null,
};

const axios = require("axios");

const getters = {
  currentUser: (state) => state.currentUser,
  currentUsername: (state) =>
    state.currentUser ? state.currentUser.username : null,
  currentUserId: (state) => (state.currentUser ? state.currentUser.id : null),
  currentUserRole: (state) =>
    state.currentUser ? state.currentUser.role : null,
};

const actions = {
  LOGIN: async (context, payload) => {
    const axios = require("axios");
    const { data } = payload;
    let result = await axios({
      method: "post",
      url: "http://" + process.env.VUE_APP_API_HOST + ":4000/api/sign_in/",
      data: { email: data.email, password: data.password },
    });
    return result;
  },
  SIGN_UP: async function(context, payload) {
    let result = await axios({
      method: "post",
      url: "http://" + process.env.VUE_APP_API_HOST + ":4000/api/sign_up/",
      data: payload,
    });
    return result;
  },
  CHECK_TOKEN: async (/*{  dispatch , getters } */) => {
    let expToken = localStorage.getItem("Timemanager_expiration");
    if (expToken) {
      if (expToken * 1000 > new Date().getTime()) return true;
      else return false;
    } else {
      return false;
    }
  },
  FETCH_CURRENT_USER: async ({ commit }, payload) => {
    let res = await axios.get(
      "http://" + process.env.VUE_APP_API_HOST + ":4000/api/users/" + payload.id
    );
    commit("SET_CURRENT_USER", res.data.data);
  },
  LOG_OUT: async ({ commit }) => {
    localStorage.clear();
    commit("UNSET_CURRENT_USER");
  },
};

const mutations = {
  SET_CURRENT_USER: (state, user) => {
    state.currentUser = user;
  },
  UNSET_CURRENT_USER: (state) => {
    state.currentUser = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
