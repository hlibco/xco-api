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
import { SummaryRequestVm, SummaryResponseVm } from './vm';
import { QueryDto } from './dto/query.dto';

@ApiUseTags('providers')
@ApiBearerAuth()
@Controller('/providers')
export class ProviderController {
  constructor(private providerService: ProviderService) {}

  @Get()
  @UseInterceptors(AuthInterceptor)
  @ApiOperation({
    title:
      'Provider Summary for the Top 100 Diagnosis Related Groups (DRG) - Limited to 50 records',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Provider Sumary Found',
    isArray: true,
    type: SummaryResponseVm,
  })
  async summaryForTheTop100DRG(
    @Query() query: QueryDto,
  ): Promise<SummaryResponseVm[]> {
    const criteria = new SummaryRequestVm(query);
    const providers = await this.providerService.summaryForTheTop100DRG(
      criteria,
    );
    return providers.map(
      provider => new SummaryResponseVm(provider, query.fields),
    );
  }
}
