import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CredentialDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly username!: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly password!: string;
}
