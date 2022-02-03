import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

import { UserType } from 'src/types'
import { Stack } from 'src/entity/Stack'
import { Skill } from 'src/entity/Skill'
import { Project } from 'src/entity/Project'
import { FreelancerPrice } from 'src/entity/FreelancerPrice'
import { Portfolio } from 'src/entity/Portfolio'
import { User } from 'src/entity/User'

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

  @ManyToMany(_type => Project, project => project.candidates)
  requestedProjects: Project[]

  @Column({ default: false })
  overwork: boolean

  @Column({ default: 'active' })
  status: string

  // TODO payment methods should be changed to object
  @Column()
  paymentMethods: string

  @Column()
  rating: number

  @OneToOne(_type => FreelancerPrice, { nullable: true })
  @JoinColumn()
  price: FreelancerPrice

  @OneToOne(_type => Portfolio, { nullable: true })
  @JoinColumn()
  portfolio: Portfolio

  @OneToOne(_type => User, user => user.freelancer)
  @JoinColumn()
  user: UserType
}
