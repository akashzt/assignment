const request = require('supertest');
const app = require('../app');
const constants = require('../util/constants');

describe('User Controller', () => {
  let createdUserId; 

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ userName: 'testuser5', age: 25, hobbies: ['reading', 'coding'] });

    let responce=JSON.parse(res.text)
    expect(responce.status.code).toBe(constants.response_code.SUCCESS);
    expect(responce.status).toHaveProperty('message', 'Success');  
    expect(responce).toHaveProperty('data');
    expect(responce.data).toHaveProperty('_id');

    createdUserId = responce.data._id; 
    console.log('Created UserId:', createdUserId);
  });

  it('should update an existing user', async () => {
    const res = await request(app)
      .put(`/api/users/${createdUserId}`) // Use the created userId for updating
      .send({ age: 30 });
    let responce=JSON.parse(res.text)

    expect(responce.status.code).toBe(constants.response_code.SUCCESS);
    expect(responce.status).toHaveProperty('message', 'User Updated');
    expect(responce).toHaveProperty('data');
    expect(responce.data).toHaveProperty('_id', createdUserId);
    expect(responce.data).toHaveProperty('age', 30);
  });

  it('should get a user by userId', async () => {
    const res = await request(app)
      .get(`/api/users/${createdUserId}`); // Use the created userId for fetching

      let responce=JSON.parse(res.text)

    expect(responce.status.code).toBe(constants.response_code.SUCCESS);
    expect(responce.status).toHaveProperty('message', 'user get succesfully');
    expect(responce).toHaveProperty('data');
    expect(responce.data).toHaveProperty('_id', createdUserId);
  });

  it('should fetch all users', async () => {
    const res = await request(app)
      .get('/api/users');

      let responce=JSON.parse(res.text)

    expect(responce.status.code).toBe(constants.response_code.SUCCESS);
    expect(responce.status).toHaveProperty('message', 'All users List in database');
    expect(responce).toHaveProperty('data');
    expect(Array.isArray(responce.data)).toBe(true);
  });

  it('should delete a user by userId', async () => {
    const res = await request(app)
      .delete(`/api/users/${createdUserId}`); // Use the created userId for deletion
      let responce=JSON.parse(res.text)

    expect(responce.status.code).toBe(constants.response_code.SUCCESS);
    expect(responce.status).toHaveProperty('message', 'user deleted succesfully');
    expect(responce).toHaveProperty('data');
    expect(responce.data).toHaveProperty('_id', createdUserId);
  });
});
