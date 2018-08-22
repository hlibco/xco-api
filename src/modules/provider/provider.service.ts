import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderSummaryTopDRG } from './provider-summary-top-drg.entity';
import { SummaryRequestVm } from './vm';

type Filters = Map<string, Filter[]>;
type Filter = Array<string | number | undefined>;

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(ProviderSummaryTopDRG)
    private readonly providerSummaryTopDRGRepository: Repository<
      ProviderSummaryTopDRG
    >,
  ) {}

  async summaryForTheTop100DRG(
    criteria?: SummaryRequestVm,
  ): Promise<ProviderSummaryTopDRG[]> {
    const query = this.providerSummaryTopDRGRepository.createQueryBuilder();
    query.where('deleted_at IS NULL');
    // Only the Top 100 DRGs
    query.andWhere(`top_drg = 100`);

    const filters: Filters = new Map();
    filters.set('total_discharges', [
      ['>=', criteria.minDischarges],
      ['<=', criteria.maxDischarges],
    ]);
    filters.set('average_cost_charges', [
      ['>=', criteria.minAverageCoveredCharges],
      ['<=', criteria.maxAverageCoveredCharges],
    ]);
    filters.set('average_medicare_payments', [
      ['>=', criteria.minAverageMedicarePayments],
      ['<=', criteria.maxAverageMedicarePayments],
    ]);
    filters.set('provider_state', [['=', criteria.state]]);

    filters.forEach((items, field) => {
      items.forEach(item => {
        const [operator, value] = item;
        if (typeof value !== 'undefined') {
          query.andWhere(`${field} ${operator} :${field}`, {
            [`${field}`]: value,
          });
        }
      });
    });

    const result = await query
      .orderBy('provider_name')
      .limit(50)
      .getMany();
    return result;
  }
}
