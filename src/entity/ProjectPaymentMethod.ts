import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Project } from 'src/entity/Project'

@Entity()
export class ProjectPaymentMethod extends BaseEntity {
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
}
