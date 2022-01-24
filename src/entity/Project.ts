import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

import { Freelancer } from 'src/entity/Freelancer'
import { PaymentMethod } from 'src/entity/PaymentMethod'
import { Stack } from 'src/entity/Stack'
import { Skill } from 'src/entity/Skill'
import { Client } from 'src/entity/Client'
import { ProjectReview } from 'src/entity/ProjectReview'
import { ProjectPrice } from 'src/entity/ProjectPrice'
// Project has one client and many freelancers
// and also has one freelancer or group, that work on this project
@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('text')
  description: string

  @Column()
  requirement: string

  @OneToOne(_type => PaymentMethod)
  @JoinColumn()
  paymentMethods: PaymentMethod

  @OneToOne(_type => ProjectPrice)
  @JoinColumn()
  price: ProjectPrice

  @Column()
  overwork: boolean

  @ManyToOne(_type => Stack, stack => stack.projects)
  stack: Stack

  @ManyToMany(_type => Skill, skill => skill.projects)
  @JoinTable()
  skills: Skill[]

  @Column()
  status: string

  @Column()
  reassessment: boolean

  @Column()
  file: string

  @ManyToMany(_type => Freelancer, freelancer => freelancer.requestedProjects)
  @JoinTable()
  candidates: Freelancer[]

  @ManyToOne(_type => Freelancer, freelancer => freelancer.projects)
  freelancer: Freelancer

  @ManyToOne(_type => Client, client => client.projects)
  client: Client

  @Column()
  additionalComment?: string

  @OneToOne(_type => ProjectReview, projectReview => projectReview.project)
  @JoinColumn()
  review: ProjectReview
}
