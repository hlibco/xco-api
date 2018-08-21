import { BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';
import { QueryDto } from '../dto/query.dto';

export class ProviderFindRequestVm {
  public readonly maxDischarges: number;
  public readonly minDischarges: number;
  public readonly maxAverageCoveredCharges: number;
  public readonly minAverageCoveredCharges: number;
  public readonly maxAverageMedicarePayments: number;
  public readonly minAverageMedicarePayments: number;
  public readonly state: string;
  public readonly fields: string;

  constructor(query: QueryDto) {
    this.maxDischarges = query.max_discharges;
    this.minDischarges = query.min_discharges;
    this.maxAverageCoveredCharges = query.max_average_covered_charges;
    this.minAverageCoveredCharges = query.min_average_covered_charges;
    this.maxAverageMedicarePayments = query.max_average_medicare_payments;
    this.minAverageMedicarePayments = query.min_average_medicare_payments;
    this.state = query.state;
    this.fields = query.fields;

    // Validate query params
    this.validate(query);
  }

  validate(query) {
    const number = Joi.string().regex(/^\d+$/);
    const schema = Joi.object().keys({
      max_discharges: number,
      min_discharges: number,
      max_average_covered_charges: number,
      min_average_covered_charges: number,
      max_average_medicare_payments: number,
      min_average_medicare_payments: number,
      state: Joi.string()
        .alphanum()
        .min(2)
        .max(2),
      // @TODO Validate fields based on Provider attributes
      fields: Joi.string(),
    });

    const result = Joi.validate(query, schema);
    if (result.error) {
      throw new BadRequestException(
        'Invalid query params.',
        result.error.details,
      );
    }
  }
}
