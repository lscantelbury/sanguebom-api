import request = require('supertest');

let apiUrl = 'https://api-sanguebom.herokuapp.com'

test('should return a list of users', async () => {
    // Requesting the list of users
    let result = await request(apiUrl).get('/users');

    // Expecting the request to be successful
    expect(result.status).toBe(200);
    
    // Initializing the array of users
    const user:Array<Object> = result.body;

    // Expecting the array to have at least one user
    expect(user.length).toBeGreaterThan(0);

    // Expecting the user to have an id
    expect(user[0]).toHaveProperty('user_id_pk');

    // Expecting the user to have at least 16 properties
    expect(Object.entries(user[0]).length).toBeGreaterThanOrEqual(16);
});

test('should find a user by its index', async () => {
    let user = await request(apiUrl).get('/users/1');

    console.log(user.body);
    expect(user.body).not.toBeNull();
})