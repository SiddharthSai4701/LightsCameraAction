const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const movieRouter = require('../../routes/movie.routes');
const movieModel = require('../../models/movie.model');

let app;
let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    app = express();
    app.use(express.json());
    app.use('/mba/api/v1/movies', movieRouter);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await movieModel.deleteMany({});
});

describe('Movie API Endpoints', () => {

    const validMovie = {
        name: 'Inception',
        description: 'A mind-bending thriller about dreams within dreams',
        cast: ['Leonardo DiCaprio', 'Ellen Page', 'Tom Hardy'],
        trailerUrl: 'https://example.com/inception-trailer',
        language: ['English'],
        releaseDate: '2010-07-16',
        director: 'Christopher Nolan',
        releaseStatus: 'RELEASED'
    };

    describe('POST /mba/api/v1/movies', () => {
        it('should create a new movie and return 201', async () => {
            const response = await request(app)
                .post('/mba/api/v1/movies')
                .send(validMovie);

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data.name).toBe('Inception');
            expect(response.body.data.movieID).toBeDefined();
        });

        it('should return 400 when required fields are missing', async () => {
            const response = await request(app)
                .post('/mba/api/v1/movies')
                .send({ name: 'Incomplete Movie' });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should return 400 when cast is not an array', async () => {
            const response = await request(app)
                .post('/mba/api/v1/movies')
                .send({
                    ...validMovie,
                    cast: 'Leonardo DiCaprio'
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /mba/api/v1/movies/:id', () => {
        it('should return movie when found', async () => {
            const createResponse = await request(app)
                .post('/mba/api/v1/movies')
                .send(validMovie);

            const movieID = createResponse.body.data.movieID;

            const response = await request(app)
                .get(`/mba/api/v1/movies/${movieID}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.name).toBe('Inception');
        });

        it('should return 404 when movie not found', async () => {
            const response = await request(app)
                .get('/mba/api/v1/movies/nonexistent-id');

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.err).toBe('No movie found with this ID');
        });
    });

    describe('PUT /mba/api/v1/movies/:id', () => {
        it('should update movie and return 200', async () => {
            const createResponse = await request(app)
                .post('/mba/api/v1/movies')
                .send(validMovie);

            const movieID = createResponse.body.data.movieID;

            const response = await request(app)
                .put(`/mba/api/v1/movies/${movieID}`)
                .send({ name: 'Inception - Directors Cut' });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.name).toBe('Inception - Directors Cut');
        });

        it('should return 404 when movie not found', async () => {
            const response = await request(app)
                .put('/mba/api/v1/movies/nonexistent-id')
                .send({ name: 'Updated Name' });

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });

        it('should not allow updating movieID', async () => {
            const createResponse = await request(app)
                .post('/mba/api/v1/movies')
                .send(validMovie);

            const originalMovieID = createResponse.body.data.movieID;

            const response = await request(app)
                .put(`/mba/api/v1/movies/${originalMovieID}`)
                .send({ movieID: 'hacked-id', name: 'Updated Name' });

            expect(response.status).toBe(200);
            expect(response.body.data.movieID).toBe(originalMovieID);
        });
    });

    describe('DELETE /mba/api/v1/movies/:id', () => {
        it('should delete movie and return 200', async () => {
            const createResponse = await request(app)
                .post('/mba/api/v1/movies')
                .send(validMovie);

            const movieID = createResponse.body.data.movieID;

            const response = await request(app)
                .delete(`/mba/api/v1/movies/${movieID}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);

            const getResponse = await request(app)
                .get(`/mba/api/v1/movies/${movieID}`);

            expect(getResponse.status).toBe(404);
        });

        it('should return 404 when movie not found', async () => {
            const response = await request(app)
                .delete('/mba/api/v1/movies/nonexistent-id');

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });
    });

});
