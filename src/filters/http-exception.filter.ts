import {
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Catch,
  HttpException,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(err: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    const statusCode = err instanceof HttpException ? err.getStatus() : 500;
    // @TODO Report exception

    let error = err.name;
    let message = err.message;
    let errors;

    if (
      typeof err.response !== 'string' &&
      typeof err.response !== 'undefined'
    ) {
      // Overwrite error
      error = err.response.error || err.response.name || error;

      // Overwrite message
      message = err.response.message || message;

      if (statusCode === HttpStatus.UNAUTHORIZED) {
        message =
          err.response.message ||
          'You do not have permission to access this resource';
      }

      // Overwrite errors
      errors = err.response.errors;
    }

    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      message = error = 'Internal Server Error';
    }

    return res.status(statusCode).json({
      statusCode,
      error,
      message,
      errors,
      timestamp: new Date().toISOString(),
      path: req ? req.url : null,
    });
  }
}
