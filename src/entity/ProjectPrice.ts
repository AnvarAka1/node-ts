import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Project } from 'src/entity/Project'

@Entity()
export class ProjectPrice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('double')
  // min price is 1
  price: number

  @Column()
  // must contain something
  currency: string

  @OneToOne(_type => Project, project => project.price)
  @JoinColumn()
  project: Project
}
