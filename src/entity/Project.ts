import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { Freelancer } from 'src/entity/Freelancer'
import { PaymentMethod } from 'src/entity/PaymentMethod'
import { Stack } from 'src/entity/Stack'
import { Skill } from 'src/entity/Skill'
import { Client } from 'src/entity/Client'
import { ProjectReview } from 'src/entity/ProjectReview'
import { ProjectPrice } from 'src/entity/ProjectPrice'

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('text')
  description: string

  @Column('text')
  requirement: string

  // validation
  @OneToOne(_type => PaymentMethod, paymentMethods => paymentMethods.project)
  paymentMethods: PaymentMethod

  // validation
  @OneToOne(_type => ProjectPrice, projectPrice => projectPrice.project)
  price: ProjectPrice

  @Column({ default: false })
  overwork: boolean

  @ManyToOne(_type => Stack, stack => stack.projects)
  stack: Stack

  @ManyToMany(_type => Skill, skill => skill.projects)
  @JoinTable()
  skills: Skill[]

  @Column({ default: 'active' })
  status: string

  @Column({ default: false })
  reassessment: boolean

  @Column({ nullable: true })
  file: string

  @ManyToOne(_type => Freelancer, freelancer => freelancer.projectOffers)
  requestedFreelancer: Freelancer

  @ManyToMany(
    _type => Freelancer,
    freelancer => freelancer.requestedProjects,
    { nullable: true }
  )
  @JoinTable()
  candidates: Freelancer[]

  @ManyToOne(
    _type => Freelancer,
    freelancer => freelancer.projects,
    { nullable: true }
  )
  freelancer: Freelancer

  @ManyToOne(_type => Client, client => client.projects)
  client: Client

  @Column()
  additionalComment?: string

  @OneToOne(
    _type => ProjectReview,
    projectReview => projectReview.project,
    { nullable: true }
  )
  review: ProjectReview

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
