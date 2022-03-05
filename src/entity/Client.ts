import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Length } from 'class-validator'

import { User } from 'src/entity/User'
import { ClientReview } from 'src/entity/ClientReview'
import { Position } from 'src/entity/Position'
import { Project } from 'src/entity/Project'

@Entity()
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Length(2, 20)
  companyName: string

  @ManyToOne(_type => Position, position => position.clients)
  position: Position

  @ManyToOne(_type => ClientReview, clientReview => clientReview.client, { nullable: true })
  reviews: ClientReview[]

  @OneToMany(_type => Project, project => project.client, { nullable: true })
  projects: Project[]

  @OneToOne(_type => User, user => user.client)
  @JoinColumn()
  user: User

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
