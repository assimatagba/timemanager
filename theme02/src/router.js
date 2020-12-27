import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from './page/LoginPage'
import Signup from './page/SignupPage'
import DefaultContainer from './page/DefaultContainer'
import PageNotFound from './page/PageNotFound'
import Home from './page/Home'
import User from './page/User'
import WorkingTimesPage from "./page/WorkingTimesPage";
import ClockPage from "./page/ClockPage";
import AdminPage from "@/page/AdminPage";

Vue.use(Router);

export const createRouter = (store) => {
    const authenticationGuard = async (to, from, next) => {
        try {
            if (await store.dispatch('auth/CHECK_TOKEN')) {

                await store.dispatch("auth/FETCH_CURRENT_USER", { id: localStorage.getItem('Timemanager_userID') });
                next();
            } else {
                next({ name: 'login', query: { to: to.name } });
            }
        } catch (error) {
            console.error(error.message);
            next({ name: 'login', query: { to: to.name } });
        }
    };

    const router = new Router({
        mode: 'history',
        base: process.env.BASE_URL,
        routes: [
            {
                path: '/login',
                name: 'login',
                component: LoginPage
            },
            {
                path: '/signup',
                name: 'signup',
                component: Signup
            },
            {
                path: '/',
                beforeEnter: authenticationGuard,
                component: DefaultContainer,
                children: [
                    {
                        path: '/',
                        name: 'Home',
                        component: Home
                    }
                ],
            },
            {
                path: '/user/:id',
                beforeEnter: authenticationGuard,
                component: DefaultContainer,
                children: [
                    {
                        path: '/user/:userid',
                        name: 'User',
                        component: User,
                        props: true
                    }
                ],
            },
            {
                path: '/clock/:workingTimeId',
                beforeEnter: authenticationGuard,
                component: DefaultContainer,
                children: [
                    {
                        path: '/clock/:workingTimeId',
                        name: 'ClockPage',
                        component: ClockPage,
                        props: true
                    }
                ],
            },
            {
                path: '/clock/',
                beforeEnter: authenticationGuard,
                component: DefaultContainer,
                children: [
                    {
                        path: '/clock/',
                        name: 'ClockPage',
                        component: ClockPage,
                        props: true
                    }
                ],
            },
            {
                path: '/workingTimes/:userId',
                beforeEnter: authenticationGuard,
                component: DefaultContainer,
                children: [
                    {
                        path: '/workingTimes/:userId',
                        name: 'WorkingTimesPage',
                        component: WorkingTimesPage,
                        props: true
                    }
                ],
            },
            {
                path: '/admin',
                beforeEnter: authenticationGuard,
                component: DefaultContainer,
                children: [
                    {
                        path: '/admin',
                        name: 'AdminPage',
                        component: AdminPage
                    }
                ],
            },
            {
                path: '/manager',
                beforeEnter: authenticationGuard,
                component: DefaultContainer,
                children: [
                    {
                        path: '/manager',
                        name: 'ManagerPage',
                        component: AdminPage
                    }
                ],
            },

            {
                path: '*',
                component: PageNotFound
            }
        ]
    });

    router.beforeEach(async (to, from, next) => {
        /**
         * This route guard ensures that the app is connected to Kuzzle before
         * passing to the next route.
         */
        const offlinePageDelay = 1500;
        return new Promise(resolve => {
            setTimeout(() => {
                if (!store.state.app.online) {
                    store.commit('app/SET_WAITING_FOR_CONNECTION');
                }
            }, offlinePageDelay);
            const onceConnected = () => {
                store.commit('app/SET_ONLINE');
                setTimeout(() => {
                    store.commit('app/UNSET_WAITING_FOR_CONNECTION');
                }, offlinePageDelay);
                // deco reco here

                next();
                return resolve();
            };
            if (!store.state.app.online) {
                // deco reco here
                onceConnected();
            } else {
                onceConnected();
            }
        });
    });

    return router;
};
