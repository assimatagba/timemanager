import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import app from './app';
import clock from "./clock";
import users from "./users";
import workingTime from "./workingTime";

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    auth,
    clock,
    users,
    workingTime,
  },
  strict: debug
});
