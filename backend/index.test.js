const request = require('supertest');
const express = require('express');
const app = require('./index');
describe('Race API Endpoints', () => {
  beforeAll(() => {
    server = app.listen(12432); // Random number is needed to avoid using same port in different tests if you run in parallel
  });

  afterAll(() => {
    server.close();
  });
  test('GET /api/races should return race data', async () => {
    const response = await request(app).get('/api/races');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 'exampletestdata1',
        name: 'Race 1',
        participants: [
          { lane: '1', name: 'John', rank: '' },
          { lane: '2', name: 'Doe', rank: '' },
          { lane: '3', name: 'Gina', rank: '' },
          { lane: '4', name: 'Linda', rank: '' },
        ],
      },
    ]);
  });

  test('POST /api/race should add a new race', async () => {
    const newRace = {
      id: 'newRace123',
      name: 'Race Test',
      participants: [
        { name: 'Alice', lane: '1', rank: '' },
        { name: 'Bob', lane: '2', rank: '' },
      ],
    };

    const response = await request(app)
      .post('/api/race')
      .send(newRace)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'New newRace Added!' });
  });

  test('POST /api/race should return error for missing fields', async () => {
    const response = await request(app)
      .post('/api/race')
      .send({})
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
  });

  test('PUT /api/race/:id should update an existing race', async () => {
    const updatedRace = {
      id: 'exampletestdata1',
      name: 'Updated Race 1',
      participants: [
        { name: 'John', lane: '1', rank: '1' },
        { name: 'Doe', lane: '2', rank: '2' },
      ],
    };

    const response = await request(app)
      .put('/api/race/exampletestdata1')
      .send(updatedRace)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Updated race successfully' });
  });

  test('PUT /api/race/:id should return 404 if race not found', async () => {
    const response = await request(app)
      .put('/api/race/nonexistent')
      .send({ id: 'nonexistent', name: 'Nonexistent Race' })
      .set('Accept', 'application/json');

    expect(response.status).toBe(404);
  });
});
