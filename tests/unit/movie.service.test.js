const movieService = require('../../services/movie.service');
const movieModel = require('../../models/movie.model');

jest.mock('../../models/movie.model');

describe('Movie Service', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createMovie', () => {
        it('should create and return a movie on success', async () => {
            const movieData = {
                movieID: 'test-uuid',
                name: 'Inception',
                description: 'A mind-bending thriller',
                cast: ['Leonardo DiCaprio'],
                trailerUrl: 'https://example.com/trailer',
                releaseDate: new Date('2010-07-16'),
                director: 'Christopher Nolan'
            };

            movieModel.create.mockResolvedValue(movieData);

            const result = await movieService.createMovie(movieData);

            expect(movieModel.create).toHaveBeenCalledWith(movieData);
            expect(result).toEqual(movieData);
        });

        it('should return error object on validation error', async () => {
            const validationError = new Error('Validation failed');
            validationError.name = 'ValidationError';
            validationError.errors = {
                name: { message: 'Name is required' },
                description: { message: 'Description is required' }
            };

            movieModel.create.mockRejectedValue(validationError);

            const result = await movieService.createMovie({});

            expect(result).toEqual({
                err: 'Name is required, Description is required',
                status: 422
            });
        });

        it('should throw non-validation errors', async () => {
            const dbError = new Error('Database connection failed');
            movieModel.create.mockRejectedValue(dbError);

            await expect(movieService.createMovie({})).rejects.toThrow('Database connection failed');
        });
    });

    describe('getMovieById', () => {
        it('should return movie when found', async () => {
            const movie = {
                movieID: 'test-uuid',
                name: 'Inception'
            };

            movieModel.findOne.mockResolvedValue(movie);

            const result = await movieService.getMovieById('test-uuid');

            expect(movieModel.findOne).toHaveBeenCalledWith({ movieID: 'test-uuid' });
            expect(result).toEqual(movie);
        });

        it('should return 404 error when movie not found', async () => {
            movieModel.findOne.mockResolvedValue(null);

            const result = await movieService.getMovieById('nonexistent-id');

            expect(result).toEqual({
                err: 'No movie found with this ID',
                status: 404
            });
        });
    });

    describe('updateMovieById', () => {
        it('should update and return movie on success', async () => {
            const updatedMovie = {
                movieID: 'test-uuid',
                name: 'Inception Updated',
                description: 'Updated description'
            };

            movieModel.findOneAndUpdate.mockResolvedValue(updatedMovie);

            const result = await movieService.updateMovieById('test-uuid', { name: 'Inception Updated' });

            expect(movieModel.findOneAndUpdate).toHaveBeenCalledWith(
                { movieID: 'test-uuid' },
                expect.any(Object),
                { new: true, runValidators: true }
            );
            expect(result).toEqual(updatedMovie);
        });

        it('should return 404 error when movie not found', async () => {
            movieModel.findOneAndUpdate.mockResolvedValue(null);

            const result = await movieService.updateMovieById('nonexistent-id', { name: 'Test' });

            expect(result).toEqual({
                err: 'No movie found with this ID to update',
                status: 404
            });
        });

        it('should return error object on validation error', async () => {
            const validationError = new Error('Validation failed');
            validationError.name = 'ValidationError';
            validationError.errors = {
                description: { message: 'Description too short' }
            };

            movieModel.findOneAndUpdate.mockRejectedValue(validationError);

            const result = await movieService.updateMovieById('test-uuid', { description: 'x' });

            expect(result).toEqual({
                err: 'Description too short',
                status: 422
            });
        });

        it('should throw non-validation errors', async () => {
            const dbError = new Error('Database error');
            movieModel.findOneAndUpdate.mockRejectedValue(dbError);

            await expect(movieService.updateMovieById('test-uuid', {})).rejects.toThrow('Database error');
        });
    });

    describe('deleteMovieById', () => {
        it('should delete and return movie on success', async () => {
            const deletedMovie = {
                movieID: 'test-uuid',
                name: 'Inception'
            };

            movieModel.findOneAndDelete.mockResolvedValue(deletedMovie);

            const result = await movieService.deleteMovieById('test-uuid');

            expect(movieModel.findOneAndDelete).toHaveBeenCalledWith({ movieID: 'test-uuid' });
            expect(result).toEqual(deletedMovie);
        });

        it('should return 404 error when movie not found', async () => {
            movieModel.findOneAndDelete.mockResolvedValue(null);

            const result = await movieService.deleteMovieById('nonexistent-id');

            expect(result).toEqual({
                err: 'No movie found with this ID to delete',
                status: 404
            });
        });
    });

});
