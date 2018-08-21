import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../global/config.service';
import { Credential } from './credential.entity';
import { CredentialDto } from './dto/credential.dto';
import { User } from '../user/user.entity';

export interface TokenPayload {
  id: number;
  firstName: string;
  lastName?: string;
}

@Injectable()
export class AuthService implements OnModuleInit {
  private secret = 'secretKey';
  private jwtOptions = {
    algorithm: 'HS256',
    expiresIn: '7 days',
    jwtid: 'jsonwebtoken',
  };

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
  ) {}

  async onModuleInit() {
    await this.configService;
  }

  async authenticate(credentialDto: CredentialDto): Promise<User> {
    const credential = await this.credentialRepository.findOne({
      where: {
        deletedAt: null,
        ...credentialDto,
      },
    });

    if (credential && credential.user && credential.user.deletedAt === null) {
      return credential.user;
    }

    throw new UnauthorizedException('Invalid credentials.');
  }

  issueAuthorizationToken(user: User): string {
    const payload: TokenPayload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return this.signToken(payload);
  }

  signToken(payload: object): string {
    return jwt.sign(
      JSON.parse(JSON.stringify(payload)),
      this.secret,
      this.jwtOptions,
    );
  }

  verifyToken(token: string) {
    jwt.verify(token, this.secret);
  }

  decodeAuthorizationToken(token: string): TokenPayload {
    return jwt.decode(token);
  }
}
