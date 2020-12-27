const axios = require('axios');

const actions = {
    CREATE_CLOCK: async function (data) {
        let result = await axios({
            method: 'post',
            url: 'http://192.168.99.100:4000/api/clocks/'+data.id,
            data: data
        });
        return result;
    },
    GET_CLOCK: async function (userid) {
        let result = await axios.get('http://192.168.99.100:4000/api/clocks/'+userid)
        return result;
    },
};

module.exports = {
    actions
};