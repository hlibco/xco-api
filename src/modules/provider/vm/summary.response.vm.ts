import { ApiModelProperty } from '@nestjs/swagger';
import { ProviderSummaryTopDRG } from '../provider-summary-top-drg.entity';
import { toCamelCase } from '../../../utils/format';

export class SummaryResponseVm {
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
  public readonly averageCostCharges?: string;

  @ApiModelProperty()
  public readonly averageTotalPayments?: string;

  @ApiModelProperty()
  public readonly averageMedicarePayments?: string;

  @ApiModelProperty({ type: String, format: 'date-time' })
  public readonly createdAt?: Date;

  @ApiModelProperty({ type: String, format: 'date-time' })
  public readonly updatedAt?: Date;

  constructor(provider: ProviderSummaryTopDRG, fields?: string) {
    const clone = { ...provider };
    const props = fields
      ? String(fields)
          .split(',')
          .map(toCamelCase)
      : [...Object.keys(clone)];
    const asMoney = [
      'averageCostCharges',
      'averageTotalPayments',
      'averageMedicarePayments',
    ];

    delete clone.id;
    delete clone.createdAt;
    delete clone.updatedAt;
    delete clone.deletedAt;

    props.forEach(key => {
      let val = clone[key];

      if (!!~asMoney.indexOf(key)) {
        val = this.toMoney(val);
      }

      this[key] = val;
    });
  }

  /**
   * Convert an integer number represeting cents to a USD money format
   *
   * @param {number} val Integer represeting number of cents
   * @returns {string} Money formtted string e.g.: $1,208.35
   * @memberof ProviderFindResponseVm
   */
  toMoney(val: number): string {
    return (val / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }
}
