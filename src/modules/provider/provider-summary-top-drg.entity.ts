import { Entity, Column } from 'typeorm';
import { GlobalEntity } from '../global/global.entity';

@Entity({ name: 'provider_summary_for_the_top_diagnosis_related_groups' })
export class ProviderSummaryTopDRG extends GlobalEntity {
  @Column({
    nullable: true,
    name: 'provider_id',
  })
  providerId: number;

  @Column({
    nullable: true,
    name: 'drg_definition',
  })
  drgDefinition: string;

  @Column({
    nullable: true,
    name: 'provider_name',
  })
  providerName: string;

  @Column({
    nullable: true,
    name: 'provider_street_address',
  })
  providerStreetAddress: string;

  @Column({
    nullable: true,
    name: 'provider_city',
  })
  providerCity: string;

  @Column('char', {
    nullable: true,
    name: 'provider_state',
    length: 2,
  })
  providerState: string;

  @Column({
    nullable: true,
    name: 'provider_zip_code',
    length: 6,
  })
  providerZipCode: string;

  @Column({
    nullable: true,
    name: 'hospital_referral_region_description',
  })
  hospitalReferralRegionDescription: string;

  @Column({
    nullable: true,
    name: 'total_discharges',
    unsigned: true,
  })
  totalDischarges: number;

  @Column('bigint', {
    nullable: true,
    name: 'average_cost_charges',
    unsigned: true,
  })
  averageCostCharges: number;

  @Column('bigint', {
    nullable: true,
    name: 'average_total_payments',
    unsigned: true,
  })
  averageTotalPayments: number;

  @Column('bigint', {
    nullable: true,
    name: 'average_medicare_payments',
    unsigned: true,
  })
  averageMedicarePayments: number;

  @Column('smallint', {
    nullable: true,
    name: 'top_drg',
    unsigned: true,
  })
  topDRG: number;
}
