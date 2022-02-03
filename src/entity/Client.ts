import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from 'src/entity/User'
import { ClientReview } from 'src/entity/ClientReview'
import { Position } from 'src/entity/Position'
import { Project } from 'src/entity/Project'

@Entity()
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  companyName: string

  @ManyToOne(_type => Position, position => position.clients)
  position: Position

  @OneToOne(_type => ClientReview, clientReview => clientReview.client, { nullable: true })
  @JoinColumn()
  review: ClientReview

  @OneToMany(_type => Project, project => project.client, { nullable: true })
  projects: Project[]

  @OneToOne(_type => User, user => user.client)
  @JoinColumn()
  user: User
}
