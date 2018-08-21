import {
  NestInterceptor,
  ExecutionContext,
  HttpStatus,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  async intercept(
    context: ExecutionContext,
    stream$: Observable<any>,
  ): Promise<Observable<any>> {
    const dataOrRequest = context.switchToHttp().getRequest();

    const scheme =
      dataOrRequest.headers.authorization &&
      dataOrRequest.headers.authorization.split(' ')[0];

    if (scheme !== 'Bearer') {
      throw new HttpException(
        'Missing or Malformed Authorization header',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const token = dataOrRequest.headers.authorization.split(' ')[1];
      this.authService.verifyToken(token);
    } catch (err) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return stream$;
  }
}
