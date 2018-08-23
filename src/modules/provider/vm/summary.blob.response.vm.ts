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

export class SummaryBlobResponseVm {
  @ApiModelPropertyOptional()
  ['Provider Name']?: string;

  @ApiModelPropertyOptional()
  ['Provider Street Address']?: string;

  @ApiModelPropertyOptional()
  ['Provider City']?: string;

  @ApiModelPropertyOptional()
  ['Provider State']?: string;

  @ApiModelPropertyOptional()
  ['Provider Zip Code']?: string;

  @ApiModelPropertyOptional()
  ['Hospital Referral Region Description']?: string;

  @ApiModelPropertyOptional()
  ['Total Discharges']?: number;

  @ApiModelPropertyOptional()
  ['Average Covered Charges']?: string;

  @ApiModelPropertyOptional()
  ['Average Total Payments']?: string;

  @ApiModelPropertyOptional()
  ['Average Medicare Payments']?: string;

  constructor(provider: ProviderSummaryTopDRG, fields?: string) {
    const clone = { ...provider };
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

    const allProps = Object.keys(map);

    const props = fields
      ? String(fields)
          .split(',')
          .map(toCamelCase)
      : allProps;
    const asMoney = [
      'averageCostCharges',
      'averageTotalPayments',
      'averageMedicarePayments',
    ];

    props.forEach(key => {
      let val = clone[key];

      if (!!~asMoney.indexOf(key)) {
        val = this.toMoney(val);
      }

      this[map[key]] = val;
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
