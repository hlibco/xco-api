import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class QueryDto {
  @ApiModelPropertyOptional({
    description: 'The maximum number of Total Discharges',
  })
  readonly max_discharges?: number;

  @ApiModelPropertyOptional({
    description: 'The minimum number of Total Discharges',
  })
  readonly min_discharges?: number;

  @ApiModelPropertyOptional({
    description: 'The maximum Average Covered Charges',
  })
  readonly max_average_covered_charges?: number;

  @ApiModelPropertyOptional({
    description: 'The minimum Average Covered Charges',
  })
  readonly min_average_covered_charges?: number;

  @ApiModelPropertyOptional({
    description: 'The maximum Average Medicare Payment',
  })
  readonly max_average_medicare_payments?: number;

  @ApiModelPropertyOptional({
    description: 'The minimum Average Medicare Payment',
  })
  readonly min_average_medicare_payments?: number;

  @ApiModelPropertyOptional({
    description: 'The exact state that the provider is from',
  })
  readonly state?: string;

  @ApiModelPropertyOptional({
    description: 'Comma separated list of attributes allowed in the response',
    example: 'name,city,state,streetAddress',
  })
  readonly fields?: string;
}
