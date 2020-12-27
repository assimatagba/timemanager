const state = {};
const axios = require("axios");

const actions = {
  CREATE_CLOCK: async function(context, payload) {
    const { data } = payload;
    let result = await axios({
      method: "post",
      url:
        "http://" +
        process.env.VUE_APP_API_HOST +
        ":4000/api/clocks/" +
        data.userId,
      data: { clock: data.clock },
    });
    return result;
  },
  UPDATE_CLOCK: async function(context, payload) {
    let results = await axios({
      method: "put",
      url:
        "http://" +
        process.env.VUE_APP_API_HOST +
        ":4000/api/clocks/" +
        payload.data.clockId,
      data: { clock: payload.data.clock },
    });
    return results;
  },

  GET_CLOCKS_BY_USERID: async function(context, payload) {
    let result = await axios.get(
      "http://" +
        process.env.VUE_APP_API_HOST +
        ":4000/api/clocks/" +
        payload.userId
    );
    return result;
  },

  GET_CLOCK_BETWEEN_TWO_DATES: async function(context, payload) {
    const axios = require("axios");
    let result = await axios.get(
        "http://" +
        process.env.VUE_APP_API_HOST +
        ":4000/api/clocks/betweendates/" +
        payload.id + '?start='+payload.start+'&end='+payload.end

    );
    return result;
  },
};

export default {
  namespaced: true,
  state,
  actions,
};
