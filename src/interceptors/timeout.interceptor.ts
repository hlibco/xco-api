import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    return call$.pipe(timeout(25000));
  }
}
