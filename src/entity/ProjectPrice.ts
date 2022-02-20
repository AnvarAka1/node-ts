import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Project } from 'src/entity/Project'

@Entity()
export class ProjectPrice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('double')
  price: number

  @Column()
  currency: string

  @OneToOne(_type => Project, project => project.price)
  @JoinColumn()
  project: Project
}
