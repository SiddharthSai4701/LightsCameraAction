const { makeSuccessResponse, makeErrorResponse } = require('../../utils/response');

describe('Response Utilities', () => {

    describe('makeSuccessResponse', () => {
        it('should return correct structure with provided data and message', () => {
            const data = { id: 1, name: 'Test Movie' };
            const message = 'Movie fetched successfully';

            const result = makeSuccessResponse(data, message);

            expect(result).toEqual({
                err: {},
                data: { id: 1, name: 'Test Movie' },
                message: 'Movie fetched successfully',
                success: true
            });
        });

        it('should use default values when no arguments provided', () => {
            const result = makeSuccessResponse();

            expect(result).toEqual({
                err: {},
                data: {},
                message: 'Successfully processed request',
                success: true
            });
        });
    });

    describe('makeErrorResponse', () => {
        it('should return correct structure with provided error and message', () => {
            const error = 'Validation failed';
            const message = 'Invalid input';

            const result = makeErrorResponse(error, message);

            expect(result).toEqual({
                err: 'Validation failed',
                data: {},
                message: 'Invalid input',
                success: false
            });
        });

        it('should use default values when no arguments provided', () => {
            const result = makeErrorResponse();

            expect(result).toEqual({
                err: {},
                data: {},
                message: 'Something went wrong',
                success: false
            });
        });
    });

});
