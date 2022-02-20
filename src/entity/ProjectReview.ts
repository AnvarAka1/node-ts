import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

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
  @JoinColumn()
  project: Project

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
