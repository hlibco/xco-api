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
import {
  SummaryRequestVm,
  SummaryResponseVm,
  SummaryBlobResponseVm,
} from './vm';
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
    type: SummaryBlobResponseVm,
  })
  async summaryForTheTop100DRG(
    @Query() query: QueryDto,
  ): Promise<SummaryBlobResponseVm[]> {
    const criteria = new SummaryRequestVm(query);
    const providers = await this.providerService.summaryForTheTop100DRG(
      criteria,
    );
    return providers.map(
      provider => new SummaryBlobResponseVm(provider, query.fields),
    );
  }

  @Get('/camel-case')
  @UseInterceptors(AuthInterceptor)
  @ApiOperation({
    title: 'Return the content of the `/providers` route in camelCase',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Provider Sumary Found',
    isArray: true,
    type: SummaryResponseVm,
  })
  async normalizedSummaryForTheTop100DRG(
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
