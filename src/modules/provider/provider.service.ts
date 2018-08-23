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
      ['>=', 'minDischarges'],
      ['<=', 'maxDischarges'],
    ]);
    filters.set('average_cost_charges', [
      ['>=', 'minAverageCoveredCharges'],
      ['<=', 'maxAverageCoveredCharges'],
    ]);
    filters.set('average_medicare_payments', [
      ['>=', 'minAverageMedicarePayments'],
      ['<=', 'maxAverageMedicarePayments'],
    ]);
    filters.set('provider_state', [['=', criteria.state]]);

    filters.forEach((items, field) => {
      items.forEach(item => {
        const [operator, prop] = item;
        const value = criteria[prop];
        if (typeof value !== 'undefined') {
          query.andWhere(`${field} ${operator} :${prop}`, {
            [`${prop}`]: value,
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
