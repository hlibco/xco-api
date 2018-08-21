import { ApiModelProperty } from '@nestjs/swagger';
import { Provider } from '../provider.entity';
import { toCamelCase } from '../../../utils/format';

export class ProviderFindResponseVm {
  @ApiModelProperty()
  public readonly id?: number;

  @ApiModelProperty()
  public readonly drgDefinition?: string;

  @ApiModelProperty()
  public readonly name?: string;

  @ApiModelProperty()
  public readonly streetAddress?: string;

  @ApiModelProperty()
  public readonly city?: string;

  @ApiModelProperty()
  public readonly state?: string;

  @ApiModelProperty()
  public readonly zipCode?: string;

  @ApiModelProperty()
  public readonly hospitalReferralRegionDescription?: string;

  @ApiModelProperty()
  public readonly totalDischarges?: number;

  @ApiModelProperty()
  public readonly averageCostCharges?: number;

  @ApiModelProperty()
  public readonly averageTotalPayments?: number;

  @ApiModelProperty()
  public readonly averageMedicarePayments?: number;

  @ApiModelProperty({ type: String, format: 'date-time' })
  public readonly createdAt?: Date;

  @ApiModelProperty({ type: String, format: 'date-time' })
  public readonly updatedAt?: Date;

  constructor(provider: Provider, fields?: string) {
    if (typeof fields === 'undefined') {
      return provider;
    }
    const clone = { ...provider };
    const props = fields.split(',').map(toCamelCase) || [];

    Object.keys(clone).forEach(key => {
      if (!!~props.indexOf(key)) {
        this[key] = clone[key];
      }
    });
  }
}
