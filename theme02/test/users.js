const axios = require('axios');

const actions = {
    CREATE_USER: async function (data) {
        let result = await axios({
            method: 'post',
            url: 'http://192.168.99.100:4000/api/users/',
            data: data
        });
        return result;
    },
    UPDATE_USER: async function (data) {
        let result = await axios({
            method: 'put',
            url: 'http://192.168.99.100:4000/api/users/'+data.id,
            data: data
        });
        return result;
    },
    DELETE_USER: async function (data) {
        let result = await axios({
            method: 'delete',
            url: 'http://192.168.99.100:4000/api/users/'+data.id,
            data: data
        });
        return result;
    },
    GET_USER: async function (userid) {
        let result = await axios.get('http://192.168.99.100:4000/api/users/'+userid)
        return result;
    },
    GET_USER_BY_EMAIL_AND_USERNAME: async function (email, username) {
        let result = await axios.get('http://192.168.99.100:4000/api/users?email='+email+'&username='+username)
        return result;
    },
};

module.exports = {
    actions
};