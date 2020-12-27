var workingTime = require('./workingTime');
var clock = require('./clock');
var users = require('./users');

var assert = require('assert');

describe('workingTime', () =>  {
    describe('get ALL', () =>  {
        it('status 200', async function() {
            const result = await workingTime.actions.GET_WORKING_TIME(1);
            assert.equal(result.status, 200);
        });

        it('verify same data', async function() {
            const result = await workingTime.actions.GET_WORKING_TIME(1);
            assert.equal(result.data.data[0].id, 1);
            assert.equal(result.data.data[0].user_id, 1);
            assert.equal(result.data.data[0].start, '2020-10-01T12:15:31');
            assert.equal(result.data.data[0].end, '2020-10-01T12:15:30');
        });
    });

    describe('get ONE', () =>  {
        it('status 200', async function() {
            const result = await workingTime.actions.GET_ONE_WORKING_TIME(1,1);
            assert.equal(result.status, 200);
        });

        it('verify same data', async function() {
            const result = await workingTime.actions.GET_ONE_WORKING_TIME(1,1);
            assert.equal(result.data.data[0].id, 1);
            assert.equal(result.data.data[0].user_id, 1);
            assert.equal(result.data.data[0].start, '2020-10-01T12:15:31');
            assert.equal(result.data.data[0].end, '2020-10-01T12:15:30');
        });
    });

    describe('create workingTime', () =>  {
        it('status 201', async function() {
            let data = {
                "workingtime": {
                    "start": "2020-10-21 12:15:31",
                    "end": "2020-10-21 12:15:30"
                },
                id: 1
            };
            const result = await workingTime.actions.CREATE_WORKING_TIME(data);
            assert.equal(result.status, 201);
        });
    });

    describe('update workingTime', () =>  {
        it('status 200', async function() {
            let data = {
                "workingtime": {
                    "start": "2020-10-21 12:15:32",
                    "end": "2020-10-21 12:15:30"
                },
                id: 2
            };
            const result = await workingTime.actions.UPDATE_WORKING_TIME(data);
            assert.equal(result.status, 200);
        });
    });

    // FONCTIONNE MAIS ON DOIT REMPLACER PAR UN ID EXISTANT A CHAQUE LANCEMENT DE TEST

    // describe('delete workingTime', () =>  {
    //     it('status 200', async function() {
    //         let data = {
    //             "workingtime": {
    //                 "start": "2020-10-21 12:15:32",
    //                 "end": "2020-10-21 12:15:30"
    //             },
    //             id: 8
    //         };
    //         const result = await workingTime.actions.DELETE_WORKING_TIME(data);
    //         assert.equal(result.status, 204);
    //     });
    // });
});

describe('clocks', () =>  {

    describe('create clock', () =>  {
        it('status 201', async function() {
            let data = {
                "clock": {
                    "time": "2020-10-01 12:15:30",
                    "status": true
                },
                id: 1
            };
            const result = await clock.actions.CREATE_CLOCK(data);
            assert.equal(result.status, 201);
        });
    });

    describe('get clocks by userid', () =>  {
        it('status 200', async function() {
            const result = await clock.actions.GET_CLOCK(1);
            assert.equal(result.status, 200);
        });

        it('verify same data', async function() {
            const result = await clock.actions.GET_CLOCK(1);
            assert.equal(result.data.data[0].id, 1);
            assert.equal(result.data.data[0].status, true);
            assert.equal(result.data.data[0].time, '2020-10-01T12:15:30');
            assert.equal(result.data.data[0].user_id, 1);
        });
    });

});

describe('users', () =>  {
    describe('get user by id', () =>  {
        it('status 200', async function() {
            const result = await users.actions.GET_USER(1);
            assert.equal(result.status, 200);
        });

        it('verify same data', async function() {
            const result = await users.actions.GET_USER(1);
            assert.equal(result.data.data.id, 1);
            assert.equal(result.data.data.email, "test@test.fr");
            assert.equal(result.data.data.username, 'test');
        });
    });

    describe('get user by email and username', () =>  {
        it('status 200', async function() {
            const result = await users.actions.GET_USER_BY_EMAIL_AND_USERNAME("test@test.fr","test");
            assert.equal(result.status, 200);
        });

        it('verify same data', async function() {
            const result = await users.actions.GET_USER_BY_EMAIL_AND_USERNAME("test@test.fr","test");
            assert.equal(result.data.data[0].id, 1);
            assert.equal(result.data.data[0].email, "test@test.fr");
            assert.equal(result.data.data[0].username, 'test');
        });
    });

    describe('create users', () =>  {
        it('status 201', async function() {
            let data = {
                "user": {
                    "username": "test4",
                    "email": "test@test.test"
                }
            };
            const result = await users.actions.CREATE_USER(data);
            assert.equal(result.status, 201);
        });
    });

    describe('update users', () =>  {
        it('status 200', async function() {
            let data = {
                "user": {
                    "username": "test",
                    "email": "test@test.fr"
                },
                id: 1
            };
            const result = await users.actions.UPDATE_USER(data);
            assert.equal(result.status, 200);
        });
    });

    // FONCTIONNE MAIS ON DOIT REMPLACER PAR UN ID EXISTANT A CHAQUE LANCEMENT DE TEST

    // describe('delete users', () =>  {
    //     it('status 200', async function() {
    //         let data = {
    //             "workingtime": {
    //                 "start": "2020-10-21 12:15:32",
    //                 "end": "2020-10-21 12:15:30"
    //             },
    //             id: 8
    //         };
    //         const result = await users.actions.DELETE_USER(data);
    //         assert.equal(result.status, 204);
    //     });
    // });
});