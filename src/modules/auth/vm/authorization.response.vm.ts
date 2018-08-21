import { ApiModelProperty } from '@nestjs/swagger';

export class AuthorizationResponseVm {
  @ApiModelProperty()
  public readonly authorization: string;

  constructor(authorization: string) {
    this.authorization = authorization;
  }
}
