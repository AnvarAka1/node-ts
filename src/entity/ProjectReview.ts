import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { IsInt, Max, MaxLength, Min } from 'class-validator'

import { Project } from 'src/entity/Project'

@Entity()
export class ProjectReview extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsInt()
  @Min(1)
  @Max(5)
  stars: number

  @Column('text')
  @MaxLength(2048)
  comment: string

  @OneToOne(_type => Project, project => project.review)
  @JoinColumn()
  project: Project

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
