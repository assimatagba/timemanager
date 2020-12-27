const state = {};
const currentUserId = localStorage.getItem("Timemanager_userID");

const actions = {
  CREATE_USER: async function(context, payload) {
    const axios = require("axios");
    let result = await axios({
      method: "post",
      url: "http://" + process.env.VUE_APP_API_HOST + ":4000/api/users/",
      data: payload.data,
    });
    return result;
  },
  UPDATE_USER: async function(context, payload) {
    const axios = require("axios");
    let result = await axios({
      method: "put",
      url:
        "http://" +
        process.env.VUE_APP_API_HOST +
        ":4000/api/users/" +
        payload.id,
      data: { user: payload.data, currentUserId },
    });

    return result;
  },
  DELETE_USER: async function(context, payload) {
    const axios = require("axios");
    let result = await axios({
      method: "delete",
      url:
        "http://" +
        process.env.VUE_APP_API_HOST +
        ":4000/api/users/" +
        payload.id,
      data: { currentUserId },
    });
    return result;
  },
  GET_USER: async function(context, payload) {
    const axios = require("axios");
    let result = await axios.get(
      "http://" +
        process.env.VUE_APP_API_HOST +
        ":4000/api/users/" +
        payload.userid
    );
    return result;
  },
  GET_ALL_USER: async function() {
    const axios = require("axios");
    let result = await axios.get(
      "http://" + process.env.VUE_APP_API_HOST + ":4000/api/users/"
    );
    return result;
  },
  GET_USER_BY_EMAIL_AND_USERNAME: async function(context, payload) {
    const axios = require("axios");
    let result = await axios.get(
      "http://" +
        process.env.VUE_APP_API_HOST +
        ":4000/api/users?email=" +
        payload.data.email +
        "&username=" +
        payload.data.username
    );
    return result;
  },
};

export default {
  namespaced: true,
  state,
  actions,
};
