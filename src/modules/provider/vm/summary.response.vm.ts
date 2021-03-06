import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { ProviderSummaryTopDRG } from '../provider-summary-top-drg.entity';
import { toCamelCase } from '../../../utils/format';

export interface Blob {
  'Provider Name'?: string;
  'Provider Street Address'?: string;
  'Provider City'?: string;
  'Provider State'?: string;
  'Provider Zip Code'?: string;
  'Hospital Referral Region Description'?: string;
  'Total Discharges'?: number;
  'Average Covered Charges'?: string;
  'Average Total Payments'?: string;
  'Average Medicare Payments'?: string;
}

export class SummaryResponseVm {
  @ApiModelPropertyOptional()
  public readonly id?: number;

  @ApiModelPropertyOptional()
  public readonly drgDefinition?: string;

  @ApiModelPropertyOptional()
  public readonly providerId?: number;

  @ApiModelPropertyOptional()
  public readonly providerName?: string;

  @ApiModelPropertyOptional()
  public readonly providerStreetAddress?: string;

  @ApiModelPropertyOptional()
  public readonly providerCity?: string;

  @ApiModelPropertyOptional()
  public readonly providerState?: string;

  @ApiModelPropertyOptional()
  public readonly providerZipCode?: string;

  @ApiModelPropertyOptional()
  public readonly hospitalReferralRegionDescription?: string;

  @ApiModelPropertyOptional()
  public readonly totalDischarges?: number;

  @ApiModelPropertyOptional()
  public readonly averageCostCharges?: string;

  @ApiModelPropertyOptional()
  public readonly averageTotalPayments?: string;

  @ApiModelPropertyOptional()
  public readonly averageMedicarePayments?: string;

  // @ApiModelPropertyOptional({ type: String, format: 'date-time' })
  public readonly createdAt?: Date;

  // @ApiModelPropertyOptional({ type: String, format: 'date-time' })
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

    delete clone.topDRG;
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

  toBlob(): Blob {
    const map = {
      providerName: 'Provider Name',
      providerStreetAddress: 'Provider Street Address',
      providerCity: 'Provider City',
      providerState: 'Provider State',
      providerZipCode: 'Provider Zip Code',
      hospitalReferralRegionDescription: 'Hospital Referral Region Description',
      totalDischarges: 'Total Discharges',
      averageCostCharges: 'Average Covered Charges',
      averageTotalPayments: 'Average Total Payments',
      averageMedicarePayments: 'Average Medicare Payments',
    };

    const output = {} as any;
    Object.keys(map).forEach(key => {
      if (typeof this[key] !== 'undefined') {
        const blobKey = map[key];
        output[blobKey] = this[key];
      }
    });

    return output;
  }
}
