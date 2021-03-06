import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Freelancer } from 'src/entity/Freelancer'

@Entity()
export class Portfolio extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: '' })
  github: string

  @Column({ default: '' })
  behance: string

  @Column({ default: '' })
  link: string

  @OneToOne(_type => Freelancer, freelancer => freelancer.portfolio)
  @JoinColumn()
  freelancer: Freelancer
}
