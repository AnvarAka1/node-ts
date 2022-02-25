import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { Stack } from 'src/entity/Stack'
import { Skill } from 'src/entity/Skill'
import { Project } from 'src/entity/Project'
import { FreelancerPrice } from 'src/entity/FreelancerPrice'
import { Portfolio } from 'src/entity/Portfolio'
import { User } from 'src/entity/User'
import { PaymentMethod } from 'src/entity/PaymentMethod'

@Entity()
export class Freelancer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(_type => Stack, stack => stack.freelancers)
  stack: Stack

  @ManyToMany(_type => Skill, skill => skill.freelancers)
  @JoinTable()
  skills: Skill[]

  @OneToMany(_type => Project, project => project.freelancer)
  projects: Project[]

  @OneToMany(_type => Project, project => project.requestedFreelancer)
  projectOffers: Project[]

  @ManyToMany(_type => Project, project => project.candidates)
  requestedProjects: Project[]

  @Column({ default: false })
  overwork: boolean

  @Column({ default: 'active' })
  status: string

  @OneToOne(_type => PaymentMethod, paymentMethod => paymentMethod.freelancer)
  paymentMethods: PaymentMethod

  @Column()
  rating: number

  @OneToOne(_type => FreelancerPrice, freelancerPrice => freelancerPrice.freelancer, { nullable: true })
  price: FreelancerPrice

  @OneToOne(_type => Portfolio, portfolio => portfolio.freelancer, { nullable: true })
  portfolio: Portfolio

  @OneToOne(_type => User, user => user.freelancer)
  @JoinColumn()
  user: User

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
