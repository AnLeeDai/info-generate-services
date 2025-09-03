interface ApiResponse<T = unknown> {
  statusCode: number;
  success: boolean;
  data: T;
  message: string;
}
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: Record<string, unknown>) => {
        const ctx = context.switchToHttp();
        const res = ctx.getResponse<Response>();
        let message = '';
        let responseData: unknown = data;
        if (data && typeof data === 'object' && 'message' in data) {
          message = String((data as { message: unknown }).message);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { message: _msg, ...rest } = data;
          responseData = rest;
        }
        const response: ApiResponse = {
          statusCode: res.statusCode,
          success: res.statusCode >= 200 && res.statusCode < 300,
          data: responseData,
          message,
        };
        return response;
      }),
    );
  }
}
