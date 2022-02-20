import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Project } from 'src/entity/Project'
import { Freelancer } from 'src/entity/Freelancer'

@Entity()
export class PaymentMethod extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  cash: boolean

  @Column()
  card: boolean

  @Column()
  transfer: boolean

  @OneToOne(_type => Project, project => project.paymentMethods)
  @JoinColumn()
  project: Project

  @OneToOne(_type => Freelancer, freelancer => freelancer.paymentMethods)
  @JoinColumn()
  freelancer: Freelancer
}
