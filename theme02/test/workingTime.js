const axios = require('axios');

const actions = {
    CREATE_WORKING_TIME: async function (data) {
        let result = await axios({
            method: 'post',
            url: 'http://192.168.99.100:4000/api/workingtimes/'+data.id,
            data: data
        });
        return result;
    },
    UPDATE_WORKING_TIME: async function (data) {
        let result = await axios({
            method: 'put',
            url: 'http://192.168.99.100:4000/api/workingtimes/'+data.id,
            data: data
        });
        return result;
    },
    DELETE_WORKING_TIME: async function (data) {
        let result = await axios({
            method: 'delete',
            url: 'http://192.168.99.100:4000/api/workingtimes/'+data.id,
            data: data
        });
        return result;
    },
    GET_WORKING_TIME: async function (id) {
        let result = await axios.get('http://192.168.99.100:4000/api/workingtimes/'+id+'?start=2020-10-01 12:15:30&end=2020-10-01 12:15:30')
        return result;
    },
    GET_ONE_WORKING_TIME: async function(userId, workingTimeId) {
        let result = await axios.get('http://192.168.99.100:4000/api/workingtimes/'+userId+'/'+workingTimeId);
        return result;
    }
};

module.exports = {
    actions
};