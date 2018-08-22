import { Entity, Column } from 'typeorm';
import { GlobalEntity } from '../global/global.entity';

@Entity({ name: 'providers' })
export class Provider extends GlobalEntity {
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
  name: string;

  @Column({
    nullable: true,
    name: 'provider_street_address',
  })
  streetAddress: string;

  @Column({
    nullable: true,
    name: 'provider_city',
  })
  city: string;

  @Column('char', {
    nullable: true,
    name: 'provider_state',
    length: 2,
  })
  state: string;

  @Column({
    nullable: true,
    name: 'provider_zip_code',
    length: 6,
  })
  zipCode: string;

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
}
