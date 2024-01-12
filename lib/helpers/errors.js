const CustomError = class extends Error { };
const createCustomError = ({ statusCode }) => class extends CustomError {
  constructor(message, originalError) {
    super(message);
    this.statusCode = statusCode;
    this.originalError = originalError;
    Error.captureStackTrace(this, this.constructor);
  }
};

module.exports = {
  CustomError,
  ArgumentError: createCustomError({ statusCode: 500 }),
  ValidationError: createCustomError({ statusCode: 400 }),
  InternalError: createCustomError({ statusCode: 500 }),
  NotFoundError: createCustomError({ statusCode: 404 }),
  UnauthorizedError: createCustomError({ statusCode: 401 }),
  UnauthenticatedError: createCustomError({ statusCode: 401 }),
  TimeoutError: createCustomError({ statusCode: 408 }),
};
