import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Testing Main endpoint', () => {
  it('should expect response to be 200', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
