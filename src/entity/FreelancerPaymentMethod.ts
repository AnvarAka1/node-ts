import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Freelancer } from 'src/entity/Freelancer'

@Entity()
export class FreelancerPaymentMethod extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  cash: boolean

  @Column()
  card: boolean

  @Column()
  transfer: boolean

  @OneToOne(_type => Freelancer, freelancer => freelancer.paymentMethods)
  @JoinColumn()
  freelancer: Freelancer
}
