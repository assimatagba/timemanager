const state = {
};

const actions = {
    CREATE_WORKING_TIME: async function (context, payload) {
        const axios = require('axios');
        let result = await axios({
            method: 'post',
            url: 'http://'+process.env.VUE_APP_API_HOST+':4000/api/workingtimes/' + payload.data.id,
            data: payload.data
        });
        return result;
    },
    UPDATE_WORKING_TIME: async function (context, payload) {
        const axios = require('axios');
        let result = await axios({
            method: 'put',
            url: 'http://'+process.env.VUE_APP_API_HOST+':4000/api/workingtimes/' + payload.data.id, data: {workingtime: payload.data}
        });
        return result;
    },
    DELETE_WORKING_TIME: async function (context, payload) {
        const axios = require('axios');
        let result = await axios({
            method: 'delete',
            url: 'http://'+process.env.VUE_APP_API_HOST+':4000/api/workingtimes/' + payload.id
        });
        return result;
    },
    // Only admin & manager
    GET_ALL_WORKING_TIME: async function () {
        const axios = require('axios');
        let result = await axios.get('http://'+process.env.VUE_APP_API_HOST+':4000/api/workingtimes/')
        return result;
    },
    GET_ALL_WORKING_TIME_BY_USERID: async function (context, payload) {
        const axios = require('axios');
        let result = await axios.get('http://'+process.env.VUE_APP_API_HOST+':4000/api/workingtimes/user/'+ payload.id)
        return result;
    },
    GET_WORKING_TIME: async function (context, payload) {
        const axios = require('axios');
        let result = await axios.get('http://'+process.env.VUE_APP_API_HOST+':4000/api/workingtimes/' + payload.id + '?start='+payload.start+'&end='+payload.end)
        return result;
    },
    GET_ONE_WORKING_TIME: async function (context, payload) {
        const axios = require('axios');
        let result = await axios.get('http://'+process.env.VUE_APP_API_HOST+':4000/api/workingtimes/' + payload.id + '/' + payload.workingTimeId);
        return result;
    },
    GET_CURRENT_WORKING_TIME: async function (context, payload) {
        const axios = require('axios');
        let result = await axios.get('http://'+process.env.VUE_APP_API_HOST+':4000/api/workingtimes/current/' + payload.id);
        return result;
    },
    GET_NEXT_WORKING_TIME: async function (context, payload) {
        const axios = require('axios');
        let result = await axios.get('http://'+process.env.VUE_APP_API_HOST+':4000/api/workingtimes/next/' + payload.id);
        return result;
    }
};

export default {
    namespaced: true,
    state,
    actions
};