import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './provider.entity';
import { ProviderFindRequestVm } from './vm';

type Filters = Map<string, Filter[]>;
type Filter = Array<string | number | undefined>;

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) {}

  async find(criteria?: ProviderFindRequestVm): Promise<Provider[]> {
    const query = this.providerRepository.createQueryBuilder();
    query.where('deleted_at IS NULL');

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
    filters.set('state', [['=', criteria.state]]);

    filters.forEach((items, field) => {
      items.forEach(item => {
        const [operator, value] = item;
        if (typeof value !== 'undefined') {
          query.andWhere(`${field} ${operator} :value`, { value });
        }
      });
    });

    return query
      .orderBy('provider_name')
      .limit(100)
      .getMany();
  }
}
