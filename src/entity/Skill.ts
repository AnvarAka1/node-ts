import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { Freelancer } from 'src/entity/Freelancer'
import { Project } from 'src/entity/Project'

@Entity()
export class Skill extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(_type => Freelancer, freelancer => freelancer.skills)
  freelancers: Freelancer[]

  @ManyToMany(_type => Project, project => project.skills)
  projects: Project[]

  @CreateDateColumn({ select: false })
  createAt: Date

  @UpdateDateColumn({ select: false })
  updatedAt: Date
}
