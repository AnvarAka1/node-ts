import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Freelancer } from 'src/entity/Freelancer'
import { Project } from 'src/entity/Project'

@Entity()
export class Stack extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(_type => Freelancer, freelancer => freelancer.stack)
  freelancers: Freelancer[]

  @OneToMany(_type => Project, project => project.stack)
  projects: Project[]
}
