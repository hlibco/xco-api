import {
  Controller,
  Body,
  Post,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CredentialDto } from './dto/credential.dto';
import { AuthorizationResponseVm } from './vm/authorization.response.vm';

@ApiUseTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @ApiOperation({ title: 'Issue an authorization token' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AuthorizationResponseVm,
    description: 'Authorization token',
  })
  async issueToken(
    @Body(new ValidationPipe()) credentialDto: CredentialDto,
  ): Promise<AuthorizationResponseVm> {
    // @TODO Sanitize input
    const user = await this.authService.authenticate(credentialDto);

    const authorization = this.authService.issueAuthorizationToken(user);
    return new AuthorizationResponseVm(authorization);
  }
}
