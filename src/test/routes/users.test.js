const request = require('supertest');
const buildApp = require('../../app');
const pool = require('../../pool');
const UserRepo = require('../../repos/user-repo');

beforeAll(() => {

    //connecting test script to test DB
    return pool.connect({

        host: 'localhost',
        port: 5432,
        database: 'socialnetwork2nodeAPI-test',
        user: 'un',
        password: 'pw'
    });

});

afterAll(() => { 

    return pool.close();

});

it ('create a user',async() =>{
    const startingCount = await UserRepo.count();
   
    
    await request(buildApp())
    .post('/users')
    .send({username:'testuser', bio:'test bio'})
    .expect(200);

    const finishCount = await UserRepo.count();
    expect(finishCount - startingCount).toEqual(1);

});