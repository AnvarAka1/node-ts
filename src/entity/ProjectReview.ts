import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Project } from 'src/entity/Project'

@Entity()
export class ProjectReview extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  stars: number

  @Column('text')
  comment: string

  @OneToOne(_type => Project, project => project.review)
  project: Project
}
