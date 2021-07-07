import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';

@Catch()
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.code) {
      case 11000:
        response.status(400).json({
          message: `${exception.message.split('collection')[0]}`,
          keys: Object.keys((exception as any).keyPattern),
        });
        break;

      default:
        response.status(status).json(exception.message ? { message: exception.message } : {});
        break;
    }
  }
}
