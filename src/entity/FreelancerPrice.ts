import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Freelancer } from 'src/entity/Freelancer'

@Entity()
export class FreelancerPrice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('double')
  price: number

  @Column()
  currency: string

  @OneToOne(_type => Freelancer)
  freelancer: Freelancer
}
