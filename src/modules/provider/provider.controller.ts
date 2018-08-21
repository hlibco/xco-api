import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';
import { ProviderService } from './provider.service';
import { ProviderFindRequestVm, ProviderFindResponseVm } from './vm';
import { QueryDto } from './dto/query.dto';

@ApiUseTags('providers')
@ApiBearerAuth()
@Controller('/providers')
export class ProviderController {
  constructor(private providerService: ProviderService) {}

  @Get()
  @UseInterceptors(AuthInterceptor)
  @ApiOperation({ title: 'List All Providers' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Providers Found.',
    isArray: true,
    type: ProviderFindResponseVm,
  })
  async find(@Query() query: QueryDto): Promise<ProviderFindResponseVm[]> {
    const criteria = new ProviderFindRequestVm(query);
    const providers = await this.providerService.find(criteria);
    return providers.map(
      provider => new ProviderFindResponseVm(provider, query.fields),
    );
  }
}
